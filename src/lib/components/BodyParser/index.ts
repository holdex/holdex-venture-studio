import parseBlocks from "./blocks";
import { getVideoCover } from "./utils";
import type { Community, CommunityPostedThreadConnectionEdge, Message as DefaultMessage, ThreadAllRepliesConnection, Maybe, MessagePostedInCommunityConnectionEdge } from "$lib/types/api";

type Message = DefaultMessage & {
    messageSlug: string,
    communitySlug: string,
    viewsCount?: number,
    allReplies?: Maybe<ThreadAllRepliesConnection>
}

type ParsedMessage = Partial<Message> & {
    subtitle: string,
    blocks: any[],
    parsedBody: Record<string, any>,
    tocs: any[],
    cover?: string
    isGoogleDoc: string
}

class Parser {
    static parse(message: Message): ParsedMessage {
        let parsedBody = Parser.parseBody(message);
        let [parsedBlocks, subtitle, isGoogleDoc] = Parser.parseSubtitle(parsedBody?.blocks);
        let blocks = Parser.parseBlocks(parsedBlocks);
        let tocs = Parser.parseTocs(blocks);

        let cover = Parser.parseThreadCover(blocks);

        return {
            ...message,
            isGoogleDoc,
            blocks,
            parsedBody,
            tocs,
            subtitle,
            cover
        }
    }

    static parseFromCategory(category: Community, communitySlug?: string): ParsedMessage {
        let { postedThread, ...rest } = category;
        let newMessage = {
            ...(postedThread as CommunityPostedThreadConnectionEdge).node as DefaultMessage,
            messageSlug: (postedThread as CommunityPostedThreadConnectionEdge).messageSlug,
            communitySlug: communitySlug || rest.slug,
            viewsCount: (postedThread as CommunityPostedThreadConnectionEdge).viewsCount || 0,
            allReplies: (postedThread as CommunityPostedThreadConnectionEdge).allReplies,
        }

        return Parser.parse(newMessage);
    }

    static parseViaCategory(message: DefaultMessage, communitySlug?: string): ParsedMessage {
        let { postedIn, ...rest } = message;
        let newMessage = {
            ...rest,
            messageSlug: (postedIn as MessagePostedInCommunityConnectionEdge).messageSlug,
            communitySlug: communitySlug || (postedIn as MessagePostedInCommunityConnectionEdge).node?.slug || '',
            viewsCount: (postedIn as MessagePostedInCommunityConnectionEdge).viewsCount || 0,
            allReplies: (postedIn as MessagePostedInCommunityConnectionEdge).allReplies,
        }

        return Parser.parse(newMessage);
    }

    private static parseBody(message: Message): Record<string, any> {
        let body = {};
        if (message && message.body) {
            try {
                body = JSON.parse(message.body);
            } catch (error) { }
        }
        return body;
    }

    private static parseBlocks(blocks: any[]): any[] {
        return parseBlocks(blocks || []);
    }

    private static parseTocs(blocks: any[], allowedDepth: number[] = [2, 3, 4]): any[] {
        let tocs = [];
        for (let block of blocks) {
            if (block.type === 'heading' && allowedDepth.includes(block.level)) {
                tocs.push(block)
            }
        }
        return tocs;
    }

    private static parseSubtitle(blocks: any[]): [any[], string, string] {
        try {
            let firstBlock = blocks[0];

            let subtitle = "";
            let isGoogleDoc = "";

            if (firstBlock && firstBlock.type === 'subtitle') {
                blocks = blocks.slice(1);
                subtitle = firstBlock.data.text;
            }

            let isSourceBlock = blocks.find(b => b.type === "source");
            if (isSourceBlock) {
                blocks = blocks.filter(b => b.type !== "source");
                isGoogleDoc = isSourceBlock.url;
            }
            return [blocks, subtitle, isGoogleDoc];
        } catch (error) { }
        return [blocks, "", ""];
    }

    private static parseThreadCover(blocks: any[]): string | undefined {
        let block = blocks.find(b => b.type === "image" || b.type === "embed");
        if (block) {
            if (block.type === "image") {
                return block.src;
            }

            if (block.type === "embed") {
                return getVideoCover(block.source);
            }
        }
        return undefined;
    }
}

export type { ParsedMessage };
export default Parser;