import { loadMessage } from '$lib/models/message';
import config from '$lib/server/config';
import { default as clientConfig } from '$lib/config';
import { fail } from '@sveltejs/kit';
import sgMail from '@sendgrid/mail';
import type { Actions, PageServerLoad } from './$types';

sgMail.setApiKey(config.sendgridApiKey);

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

    const rawEmail = data.get('email');
    const rawName = data.get('name');
    const rawMessage = data.get('message');

    if (!(typeof rawEmail === 'string' && typeof rawName === 'string' && typeof rawMessage === 'string')) {
      return fail(400, { error: 'Invalid form data types' });
    }

    const email = rawEmail.trim();
    const name = rawName.trim();
    const message = rawMessage.trim();

    const escapeHtml = (unsafe: string) =>
      unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    if (!email) {
      return fail(400, { email, name, message, missing: { email: true } });
    }

    if (!name) {
      return fail(400, { email, name, message, missing: { name: true } });
    }

    if (name.length > 40) {
      return fail(400, {
        email,
        name,
        message,
        error: 'Name exceeds the 40 character limit.',
      });
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
        to: config.contactFormRecipientEmail,
        from: config.contactFormSenderEmail,
        subject: `Contact Form Submission from ${escapeHtml(name)}`,
        text: `You have received a new message:\n\nName: ${escapeHtml(name)}\nEmail: ${escapeHtml(email)}\nMessage: ${escapeHtml(message)}`,
      };

      await sgMail.send(msg);

      return { success: true };
    } catch (error: unknown) {
      throw new Error('Failed to send email. Please try again later.');
    }
  },
};
