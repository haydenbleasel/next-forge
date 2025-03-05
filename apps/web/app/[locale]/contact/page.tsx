import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import { ContactForm } from './components/contact-form';

const title = 'Contact';
const description =
  "Let us know what's on your mind. We'll get back to you as soon as possible.";

export const metadata: Metadata = createMetadata({
  title,
  description,
});

const Contact = () => <ContactForm />;

export default Contact;
