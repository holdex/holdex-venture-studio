import type { TestimonialElement } from '$components/BodyParser/blocks';

export function parseTestimonialSection(content: any[]) {
  const testimonial: TestimonialElement = {} as TestimonialElement;
  if (content.length === 5 && (content[0] as any[]).length === 2) {
    const contentHead = content[0];
    if (
      contentHead[0][0].type === 'paragraph' &&
      contentHead[0][0].items[0].text === 'type' &&
      contentHead[1][0].type === 'paragraph' &&
      contentHead[1][0].items[0].text === 'testimonial'
    ) {
      const data: any = {};
      console.log('ogin: parseTestimonialSection:', content);
      console.log('ogin: parseTestimonialSection: if', content);
      console.log('ogin: data', contentHead[0][0]);
      console.log('ogin: data', contentHead[1][0]);
      console.log('ogin: parseTestimonialSection: data', data);
      content.forEach(([[first], [second]], i) => {
        console.log('ogin: parseTestimonialSection: first', first);
        console.log('ogin: parseTestimonialSection: second', second);
        if (first === undefined || first.type !== 'paragraph') return;
        if (second === undefined || second.type !== 'paragraph') data[first.data.text] = '';
        else if (first.items[0].text == 'picture') {
          data[first.items[0].text] = second.items[0].href;
        } else data[first.items[0].text] = second.items[0].text;
      });
      console.log('ogin: parseTestimonialSection: data', data);
      testimonial.name = data['name'];
      testimonial.title = data['title'];
      testimonial.content = data['content'];
      testimonial.picture = {
        text: data['picture'],
        url: data['picture'],
      };
      console.log('ogin: parseTestimonialSection: testimonial', testimonial);
    }
  }
  return testimonial;
}
