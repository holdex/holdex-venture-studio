import { loadMessage } from '$lib/models/message';
import config from '$lib/server/config';
import { default as clientConfig } from '$lib/config';
import { fail } from '@sveltejs/kit';
import sgMail from '@sendgrid/mail';
import type { Actions, PageServerLoad } from './$types';

sgMail.setApiKey(config.contactFormSubmitUrl);

export const load: PageServerLoad = async ({ locals }) => {
  const options = await loadMessage(locals.apolloClient, clientConfig.articles.home);

  return {
    queryOptions: JSON.stringify(options),
    apollo: locals.apolloClient.extract(),
  };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const email = data.get('email') as string;
    const name = data.get('name') as string;
    const message = data.get('message') as string;

    if (!email) {
      return fail(400, { email, name, message, missing: { email: true } });
    }

    if (!name) {
      return fail(400, { email, name, message, missing: { name: true } });
    }

    if (!message) {
      return fail(400, { email, name, message, missing: { message: true } });
    }

    if (message.length > 160) {
      return fail(400, {
        email,
        name,
        message,
        error: 'Message exceeds the 160 character limit.',
      });
    }

    try {
      const msg = {
        to: 'lmonterom879@gmail.com',
        from: 'lmonterom879@gmail.com',
        subject: `Contact Form Submission from ${name}`,
        text: `You have received a new message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong></p>
               <p>${message}</p>`,
      };

      await sgMail.send(msg);

      console.log('Email sent successfully');
      return { success: true };
    } catch (error: unknown) {
      console.error('Error sending email:', error);

      if (error instanceof Error && 'response' in error) {
        const sgError = error as { response: { body: any } };
        console.error('SendGrid response error:', sgError.response.body);
      }

      return fail(500, { error: 'Failed to send email. Please try again later.' });
    }
  },
};
