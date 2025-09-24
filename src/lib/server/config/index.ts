import {
  VERCEL_ENV,
  VERCEL_GIT_COMMIT_SHA,
  SITEMAP_AUTHORIZATION_KEY,
  CONTACT_FORM_SUBMIT_URL,
  ROLLBAR_ACCESS_TOKEN,
  HOLDEX_UTILS_API_KEY,
  RESEND_API_KEY,
  CONTACT_FORM_RECIPIENT_EMAIL,
  CONTACT_FORM_SENDER_EMAIL,
} from '$env/static/private';
import { dev } from '$app/environment';

type Config = {
  sitemapAuthKey: string;
  contactFormSubmitUrl: string;
  rollbarAccessToken: string;
  gitCommitSha: string;
  utilsApiKey: string;
  resendApiKey: string;
  contactFormRecipientEmail: string;
  contactFormSenderEmail: string;
};

const config: Config = {
  sitemapAuthKey: SITEMAP_AUTHORIZATION_KEY,
  contactFormSubmitUrl: CONTACT_FORM_SUBMIT_URL,
  rollbarAccessToken: ROLLBAR_ACCESS_TOKEN,
  gitCommitSha: VERCEL_GIT_COMMIT_SHA,
  utilsApiKey: HOLDEX_UTILS_API_KEY,
  resendApiKey: RESEND_API_KEY,
  contactFormRecipientEmail: CONTACT_FORM_RECIPIENT_EMAIL,
  contactFormSenderEmail: CONTACT_FORM_SENDER_EMAIL,
};

export const isDev = dev;
export const isStage = VERCEL_ENV === 'preview';

export default config;
