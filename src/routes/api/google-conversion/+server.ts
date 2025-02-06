import _ from 'lodash-es';
import { json } from '@sveltejs/kit';
import { getEmbedUrl, getEmbedSource, regExp } from '$components/BodyParser/utils';

import type {
  Schema$Body,
  Schema$Document,
  Schema$Link,
  Schema$List,
  Schema$Paragraph,
  Schema$ParagraphElement,
  Schema$RichLinkProperties,
  Schema$StructuralElement,
  Schema$TableCell,
  Schema$TextRun,
  Schema$TextStyle,
} from '$lib/types/googleDoc';
import type { RequestHandler } from './$types';
import type {
  Author,
  CTAElement,
  TeamMemberBlock,
  TestimonialElement,
} from '$components/BodyParser/blocks';
import type {
  Parsed$Paragraph,
  Parsed$ParagraphElement,
  Parsed$ParagraphItems,
} from '$lib/types/googleConversion';
import { trimJoinArray } from '$lib/utils';

export const POST: RequestHandler = async ({ request }) => {
  const { data, updatedAt } = await request.json();
  const jsonData = convertToHoldexJson(data);
  return json(
    {
      blocks: jsonData,
      time: updatedAt,
      version: '2.20.0',
    },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

/**
 * Converts a Google Document (Schema$Document) into a Holdex JSON format.
 *
 * This function processes a provided Google Document by extracting header and body content to produce
 * a JSON structure compatible with Holdex. It extracts author details from headers by looking for
 * paragraphs containing "Authors:". It then iterates through the document body, handling different
 * content types:
 * - For paragraphs, it delegates processing to the `parseParagraph` function.
 * - For tables, it builds a nested content structure from table cells and attempts to extract team member
 *   data via `parseTeamMembersSection`, call-to-action (CTA) details via `parseCTASection`, or testimonials
 *   via `parseTestimonialSection`. The extracted content is added based on a prioritized check.
 * - For table of contents, it processes each paragraph entry to form a TOC block.
 *
 * The function returns a newly assembled array of content blocks structured for Holdex consumption.
 *
 * @param document - The Google Document object conforming to the Schema$Document interface.
 * @returns An array containing the transformed content blocks in Holdex JSON format.
 */
function convertToHoldexJson(document: Schema$Document) {
  const { body, headers } = document;

  const newContent: any[] = [];
  const authorBlock = {
    type: 'author',
    items: [] as Author[],
  };

  if (headers) {
    Object.values(headers).forEach(({ content }) => {
      (content as Schema$StructuralElement[]).forEach(({ paragraph }) => {
        if (
          paragraph &&
          Array.isArray(paragraph.elements) &&
          (paragraph.elements as Schema$ParagraphElement[])[0].textRun?.content?.includes(
            'Authors:'
          )
        ) {
          paragraph.elements.forEach((element) => {
            const author = getHeaderRowAuthor(element);
            if (author.name) {
              authorBlock.items.push(author);
            }
          });
        }
      });
    });

    newContent.push(authorBlock);
  }

  if (body && body.content) {
    body.content.forEach(({ paragraph, tableOfContents, table }, i) => {
      // Paragraphs
      if (paragraph) parseParagraph(document, body, newContent, paragraph, i);
      // Table
      else if (table && table.tableRows && table.tableRows.length > 0) {
        const tableContent: any[] = [];
        table.tableRows.forEach((row) => {
          const trowContent: any[] = [];
          (row.tableCells as Schema$TableCell[]).forEach((tableCell) => {
            const { content: cellContent } = tableCell;
            const tCellContent: any[] = [];
            cellContent?.forEach(({ paragraph }, i) => {
              if (paragraph) {
                parseParagraph(document, tableCell, tCellContent, paragraph, i, true);
              }
            });
            trowContent.push(tCellContent);
          });
          tableContent.push(trowContent);
        });

        const teamMember = parseTeamMemberSection(tableContent);
        const cta: CTAElement = parseCTASection(tableContent);
        const testimonial: TestimonialElement = parseTestimonialSection(tableContent);

        if (!_.isEmpty(teamMember)) {
          newContent.push(teamMember);
        } else if (!_.isEmpty(testimonial)) {
          newContent.push({
            type: 'testimonial',
            data: testimonial,
          });
        } else if (!_.isEmpty(cta)) {
          newContent.push({
            type: 'cta',
            data: cta,
          });
        } else {
          newContent.push({
            type: 'table',
            data: {
              content: tableContent,
            },
          });
        }
      } else if (tableOfContents) {
        const { content } = tableOfContents;

        if (content && content.length > 0) {
          const tocContent: any[] = [];
          content.map((el, i) => {
            if (el.paragraph) {
              parseParagraph(document, tableOfContents, tocContent, el.paragraph, i);
            }
          });

          newContent.push({
            type: 'toc',
            items: tocContent,
          });
        }
      }
    });
  }

  return newContent;
}

function parseCTASection(content: any[]) {
  const cta: CTAElement = {} as CTAElement;
  if (content.length === 7 && (content[0] as any[]).length === 2) {
    const contentHead = content[0];
    if (
      contentHead[0][0].type === 'paragraph' &&
      contentHead[0][0].data.text === 'type' &&
      contentHead[1][0].type === 'paragraph' &&
      contentHead[1][0].data.text === 'cta'
    ) {
      const data: any = {};
      content.forEach(([[first], [second]], i) => {
        if (first === undefined || first.type !== 'paragraph') return;
        if (second === undefined || second.type !== 'paragraph') data[first.data.text] = '';
        else data[first.data.text] = second.data.text;
      });
      cta.title = data['title'];
      cta.description = data['description'];
      if (data['button1_title'] === undefined || data['button1_title'] === '') cta.link1 = null;
      else {
        cta.link1 = {
          text: data['button1_title'],
          url: data['button1_url'],
        };
      }
      if (data['button2_title'] === undefined || data['button2_title'] === '') cta.link2 = null;
      else {
        cta.link2 = {
          text: data['button2_title'],
          url: data['button2_url'],
        };
      }
    }
  }
  return cta;
}

/**
 * Parses a testimonial section from the provided content array.
 *
 * This function extracts testimonial data from a specific two-dimensional array structure. It expects the content array to have exactly 5 rows,
 * each containing 2 elements. The header row must include a paragraph with the text "type" as its first element and a paragraph with the text "testimonial" as its second element.
 * For each subsequent row, the function interprets the first element as the key and the second element as the corresponding value.
 *
 * The extracted key-value pairs are used to populate a TestimonialElement object with the following properties:
 * - name: The name of the person giving the testimonial.
 * - title: The title or role of the person.
 * - content: The testimonial text.
 * - picture: An object containing the person's name (as text) and the URL of their picture.
 *
 * If the content does not meet the expected structure, an empty TestimonialElement is returned.
 *
 * @param content - An array representing rows of testimonial data, where each row is an array of two elements with paragraph objects.
 * @returns A populated TestimonialElement object if the expected structure is met; otherwise, an empty TestimonialElement.
 */
function parseTestimonialSection(content: any[]) {
  const testimonial: TestimonialElement = {} as TestimonialElement;
  if (content.length === 5 && (content[0] as any[]).length === 2) {
    const contentHead = content[0];
    if (
      contentHead[0][0].type === 'paragraph' &&
      contentHead[0][0].data.text === 'type' &&
      contentHead[1][0].type === 'paragraph' &&
      contentHead[1][0].data.text === 'testimonial'
    ) {
      const data: any = {};
      content.forEach(([[first], [second]], i) => {
        if (first === undefined || first.type !== 'paragraph') return;
        if (second === undefined || second.type !== 'paragraph') data[first.data.text] = '';
        else data[first.data.text] = second.data.text;
      });
      testimonial.name = data['name'];
      testimonial.title = data['title'];
      testimonial.content = data['content'];
      testimonial.picture = {
        text: data['name'],
        url: data['picture'],
      };
    }
  }
  return testimonial;
}

/**
 * Parses a team members section from table content and returns an array of team member blocks.
 *
 * The function expects the input to be an array of table rows, where each row is an array consisting of two cells.
 * The first row must serve as a header with specific identifiers, where the first cell contains a paragraph with the text "type"
 * and the second cell contains a paragraph with the text "teamMember". Subsequent rows are processed to extract key-value pairs,
 * where the key is taken from the first cell (converted to lowercase) and the value is taken from the second cell.
 *
 * When all of the required fields ("name", "role", "description", and "image") have been collected in a row,
 * a new team member block is created with an optional "link" field if provided.
 *
 * @param content - An array representing table rows; each row should contain two cells with paragraph data.
 * @returns An array of team member blocks extracted from the input content. Returns an empty array if the input format is invalid.
 */
function parseTeamMemberSection(content: any[]): TeamMemberBlock | null {
  if (content.length >= 5 && (content[0] as any[]).length === 2) {
    const contentHead = content[0];

    if (
      contentHead[0][0]?.type === 'paragraph' &&
      contentHead[0][0]?.data?.text === 'type' &&
      contentHead[1][0]?.type === 'paragraph' &&
      contentHead[1][0]?.data?.text === 'teamMember'
    ) {
      let currentMember: Record<string, string> = {};
      let link = '';

      for (const [[first], [second]] of content) {
        if (first?.type !== 'paragraph' || second?.type !== 'paragraph') continue;

        const key = first.data.text.toLowerCase();
        const value = second.data.text || '';

        if (key === 'link') {
          link = value;
          continue;
        }

        currentMember[key] = value;
      }

      if (
        currentMember['name'] &&
        currentMember['role'] &&
        currentMember['description'] &&
        currentMember['image']
      ) {
        return {
          type: 'teamMember',
          data: {
            name: currentMember['name'],
            role: currentMember['role'],
            description: currentMember['description'],
            image: currentMember['image'],
            link: link || undefined,
          },
        };
      }
    }
  }

  return null;
}

/**
 * Extracts the author information from a paragraph header element.
 *
 * This function inspects the provided paragraph element for a linked text run. If a link exists,
 * it cleans the text content to derive the author's name and retrieves the URL from the text style link.
 * An Author object with the extracted `name` and `url` is returned. If no link is present, an empty Author object is returned.
 *
 * @param content - A Schema$ParagraphElement that may contain author details embedded in a link.
 * @returns An Author object with `name` and `url` properties if available; otherwise, an empty Author object.
 */
function getHeaderRowAuthor(content: Schema$ParagraphElement) {
  const author: Author = {} as Author;
  if (content && content.textRun?.textStyle?.link) {
    const textRun = content.textRun as Schema$TextRun;
    author.name = cleanText(textRun.content as string);
    author.url = textRun.textStyle?.link?.url || '';
  }
  return author;
}

function getParagraphTag(p: Schema$Paragraph) {
  const tags: Record<string, string> = {
    NORMAL_TEXT: 'p',
    SUBTITLE: 'blockquote',
    HEADING_1: 'h1',
    HEADING_2: 'h2',
    HEADING_3: 'h3',
    HEADING_4: 'h4',
    HEADING_5: 'h5',
  };

  return tags[p?.paragraphStyle?.namedStyleType as string];
}

function getListTag(list: Schema$List, nestingLevel: number | null | undefined) {
  const glyphType = _.get(list, [
    'listProperties',
    'nestingLevels',
    nestingLevel ? nestingLevel : 0,
    'glyphType',
  ]);

  if (glyphType === 'GLYPH_TYPE_UNSPECIFIED') {
    return 'ul';
  }
  return glyphType !== undefined ? 'ol' : 'ul';
}

const twitterRegExp = new RegExp(regExp.twitter, 'mi');
const videoRegExp = new RegExp(regExp.video, 'mi');
const tallyRegExp = new RegExp(/^https:\/\/apply\.holdex\.io\/.*$/, 'mi');

function isLink(elements: Schema$ParagraphElement[]) {
  const [el1, el2] = elements;

  const s2 = cleanText(el2?.textRun?.content as string) === '';
  const s1 = el1.textRun && el1.textRun.textStyle && el1.textRun.textStyle.link !== undefined;

  return s1 && s2;
}

function getRichLink(el: Schema$ParagraphElement) {
  const richLinkProperties = el.richLink?.richLinkProperties as Schema$RichLinkProperties;

  const match = richLinkProperties?.uri?.match(videoRegExp) as RegExpMatchArray;
  return {
    type: 'embed',
    data: {
      service: getEmbedSource(match[0]),
      source: match[0],
      embed: getEmbedUrl(match[0]),
      caption: richLinkProperties.title || '',
    },
  };
}
const quoteExp = new RegExp(/^> (.*$)/, 'im');
function isQuote(el: Schema$ParagraphElement) {
  const { textRun } = el;
  if (textRun && textRun.content) {
    const txt = cleanText(textRun.content);
    return quoteExp.test(txt);
  } else {
    return false;
  }
}

function cleanText(text: string) {
  return text.replace(/\n/g, '').trim();
}

function getBulletContent(document: Schema$Document, element: Schema$ParagraphElement) {
  if (element.inlineObjectElement) {
    const image = getImage(document, element);
    if (image) {
      return `<img src="${image.source}" alt="${image.alt}" title="${image.title}" />`;
    }
  }

  return getText(element);
}

function getImage(document: Schema$Document, element: Schema$ParagraphElement) {
  const { inlineObjects } = document;

  if (!inlineObjects || !element.inlineObjectElement) {
    return null;
  }

  const inlineObject = inlineObjects[element.inlineObjectElement?.inlineObjectId as string];
  const embeddedObject = inlineObject?.inlineObjectProperties?.embeddedObject;

  if (embeddedObject && embeddedObject.imageProperties) {
    return {
      source: embeddedObject.imageProperties.sourceUri || embeddedObject.imageProperties.contentUri,
      title: embeddedObject.title || '',
      alt: embeddedObject.description || '',
    };
  }

  return null;
}

/**
 * Converts a paragraph element's content into HTML formatted text based on its styling.
 *
 * This function extracts and cleans text from the given paragraph element, then applies HTML tags
 * to represent text styles such as underline, italic, bold, and strikethrough. When a link is present,
 * it wraps the text in an anchor tag, unless it's a call-to-action link, in which case it returns the URL directly.
 * Bold formatting is omitted if the text is marked as a header.
 *
 * @param element - The paragraph element containing text and style information.
 * @param options - Optional flags to modify text processing.
 * @param options.isHeader - Indicates if the text is a header. Bold formatting will be skipped if true.
 * @param options.isCtaLink - Indicates if the text is linked as a call-to-action; if true, returns the link's URL.
 * @returns The HTML formatted text derived from the paragraph element.
 */
function getText(element: Schema$ParagraphElement, { isHeader = false, isCtaLink = false } = {}) {
  let text = cleanText(element.textRun?.content as string);
  const { link, underline, strikethrough, bold, italic } = element?.textRun
    ?.textStyle as Schema$TextStyle;

  if (underline && !link) {
    // Underline isn't supported in markdown so we'll use emphasis
    text = `<u>${text}</u>`;
  }

  if (italic) {
    text = `<i>${text}</i>`;
  }

  // Set bold unless it's a header
  if (bold && !isHeader) {
    text = `<b>${text}</b>`;
  }

  if (strikethrough) {
    text = `<s>${text}</s>`;
  }

  if (link) {
    if (isCtaLink) {
      return (link.url || text) as string;
    }
    return `<a href="${link.url}">${text}</a>`;
  }

  return text;
}

const parseParagraphElement = (
  document: Schema$Document,
  tag: string,
  parentContent: (Parsed$Paragraph | Parsed$ParagraphElement)[],
  element: Schema$ParagraphElement,
  wrappingTable: boolean | undefined = undefined
) => {
  const { textRun, richLink, inlineObjectElement } = element;

  if (inlineObjectElement) {
    const image = getImage(document, element);

    if (image) {
      parentContent.push({
        type: 'image',
        data: {
          file: {
            url: image.source as string,
          },
          caption: image.alt,
        },
      });
    }
  } else if (
    richLink &&
    richLink?.richLinkProperties &&
    videoRegExp.test(richLink.richLinkProperties?.uri as string)
  ) {
    // support for each link
    parentContent.push(getRichLink(element));
  }
  // Headings, Texts
  else if (textRun && textRun.content !== '\n' && (textRun.content as string).trim().length > 0) {
    parentContent.push({
      [tag]: getText(element, {
        isHeader: tag !== 'p',
        isCtaLink: wrappingTable,
      }),
    });
  }
};

const parseParagraph = (
  document: Schema$Document,
  body: Schema$Body,
  contents: (Parsed$Paragraph | Parsed$ParagraphElement)[],
  paragraph: Schema$Paragraph,
  i: number,
  wrappingTable = false
): void => {
  if (!body || !body.content) return;

  const { lists } = document;
  const { bullet, elements } = paragraph;

  const tag: string = getParagraphTag(paragraph);

  // Lists
  if (bullet && elements) {
    const { nestingLevel, listId } = bullet;
    const list = (lists as Record<string, Schema$List>)[listId as string];
    const listTag = getListTag(list, nestingLevel);

    const bulletContent = trimJoinArray(
      elements.map((element) => getBulletContent(document, element))
    );

    if (!bulletContent) {
      return;
    }

    const prev = (body.content as Schema$StructuralElement[])[i - 1];
    const prevListId = prev?.paragraph?.bullet?.listId;
    const listStyle = listTag === 'ol' ? 'ordered' : 'unordered';

    if (prevListId === listId) {
      const list: Parsed$ParagraphItems[] =
        (_.last(contents)?.data as Parsed$ParagraphItems).items ?? [];

      if (nestingLevel !== undefined) {
        const lastIndex = list.length - 1;
        list[lastIndex].items.push({ content: bulletContent, items: [] });
      } else {
        list.push({ content: bulletContent, items: [] });
      }
    } else {
      contents.push({
        type: 'nestedList',
        data: {
          style: listStyle,
          id: listId as string,
          items: [
            {
              content: bulletContent,
              items: [],
            },
          ],
        },
      });
    }
  }

  // Headings, Images, Texts
  else if (tag && elements) {
    const tagContent: (Parsed$Paragraph | Parsed$ParagraphElement)[] = [];

    if (elements.length === 2 && isLink(elements) && !wrappingTable) {
      const { textStyle, content } = elements[0].textRun as Schema$TextRun;
      const { url, headingId } = textStyle?.link as Schema$Link;

      if (url) {
        const link = textStyle?.link?.url as string;

        switch (true) {
          case twitterRegExp.test(link): {
            const match = /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)(?:\/.*)?$/
              .exec(link)
              ?.slice(2);

            tagContent.push({
              type: 'embed',
              data: {
                service: 'twitter',
                source: link,
                embed: `api/tweets.json?id=${match?.shift()}`,
              },
            });

            break;
          }

          case videoRegExp.test(link): {
            const match = link.match(videoRegExp) as RegExpMatchArray;

            tagContent.push({
              type: 'embed',
              data: {
                service: getEmbedSource(match[0]),
                source: match[0],
                embed: getEmbedUrl(match[0]) as string,
              },
            });

            break;
          }

          case tallyRegExp.test(link): {
            const match = link.match(tallyRegExp) as RegExpMatchArray;

            tagContent.push({
              type: 'embed',
              data: {
                service: 'tally',
                source: match[0],
                embed: match[0],
              },
            });

            break;
          }

          default: {
            if (!content) {
              break;
            }

            tagContent.push({
              type: 'linkTool',
              data: {
                url: link,
                title: content,
                embed: `api/link.json?url=${link}`,
              },
            });

            break;
          }
        }
      } else if (headingId && content) {
        const level =
          (paragraph?.paragraphStyle?.indentFirstLine?.magnitude
            ? paragraph?.paragraphStyle?.indentFirstLine?.magnitude
            : 0) /
            18 +
          2;

        tagContent.push({
          type: 'header',
          id: headingId.replace(/h./, ''),
          data: {
            level: level > 4 ? 4 : level,
            text: content,
          },
        });
      }
    } else {
      // trying to isolate the quote elements
      if (elements && isQuote(elements[0])) {
        const quoteElements: any[] = [];
        elements?.forEach((element) =>
          parseParagraphElement(document, tag, quoteElements, element)
        );

        tagContent.push({
          type: 'quote',
          data: {
            text: trimJoinArray(
              quoteElements
                .map((element) => element[tag])
                .filter((element) => Boolean(element.length))
            ).slice(2),
            caption: '',
            alignment: 'left',
          },
        });
      } else {
        elements?.forEach((element) =>
          parseParagraphElement(document, tag, tagContent, element, wrappingTable)
        );
      }
    }

    if (tagContent.every((element) => (element as any)[tag] !== undefined)) {
      if (tag !== 'p' && tag !== 'blockquote') {
        contents.push({
          type: 'header',
          id: paragraph?.paragraphStyle?.headingId?.replace(/h./, ''),
          data: {
            level: Number(tag.replace('h', '')),
            text: trimJoinArray(tagContent.map((element) => (element as any)[tag]) as string[]),
          },
        });
      } else if (tag == 'p') {
        contents.push({
          type: 'paragraph',
          data: {
            text: trimJoinArray(tagContent.map((element) => (element as any)[tag]) as string[]),
          },
        });
      } else {
        contents.push({
          type: 'quote',
          data: {
            text: trimJoinArray(
              tagContent
                .map((element) => (element as any)[tag])
                .filter((element) => element.length > 0) as string[]
            ),
            caption: '',
            alignment: 'left',
          },
        });
      }
    } else {
      contents.push(...tagContent);
    }
  }
};
