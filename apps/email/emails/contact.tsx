import { ContactTemplate } from '@repo/email-templates/contact';
import type { FC } from 'react';

const ExampleContactEmail: FC = () => (
  <ContactTemplate
    username="alanturing"
    invitedByUsername="Alan"
    invitedByEmail="alan.turing@example.com"
    teamName="Enigma"
    inviteLink="https://vercel.com/teams/invite/foo"
    inviteFromIp="204.13.186.218"
    inviteFromLocation="São Paulo, Brazil"
  />
);

export default ExampleContactEmail;
