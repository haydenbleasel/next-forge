type SendEmailProps = {
  to: string;
  subject: string;
  body: string;
  replyTo?: string;
  cta?: {
    text: string;
    href: string;
  };
};

export const sendEmail = async ({
  to,
  subject,
  body,
  cta,
  replyTo,
}: SendEmailProps): Promise<void> => {
  if (
    !process.env.COMLINK_PASSPHRASE ||
    !process.env.POSTMARK_SERVER_API_TOKEN
  ) {
    const error = new Error(
      'COMLINK_PASSPHRASE and POSTMARK_SERVER_API_TOKEN must be set in the environment'
    );

    throw error;
  }

  const response = await fetch('https://comlink.beskar.co/api/send', {
    headers: {
      'Content-Type': 'application/json',
      'x-comlink-passphrase': process.env.COMLINK_PASSPHRASE,
    },
    method: 'POST',
    body: JSON.stringify({
      logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAORSURBVHgB7Z3NbdwwEIVffgpICewgTgXe3HJLUoGZCpwcc7JTgZMKdlOBk1tu3lQQd2B1YF9zsjngGvBhTY0s7g5/3gc8YAEJK2CeJJLDIQUQQgghhBBCCNkrz5CHV0E+6DDoIMihTS6DhqDfQevNb1Nc0DLotlMtYXizHQddo87A5ZTE4DP2zBnqDtoudIY9weAbmnAM4JZKamevIwe+8zW6xoSG+SX0nCB2N1PcBP1E7K7dbNQKLmgRdDRynsRIYvUJmS8+5vwFxg1qARd0jvF4ZI2FH7nYOfpDbri9tQVjjjv0h9zhqTbxFzLyL3GhJfrlOx6Py5XmD55Dx0Hi2F/0y2XimIMCrQEpBpAnk8MAMgMaYAwNMIYGGEMDjKEBxtAAY2iAMTTAGBpgDA0whgYYQwOMoQHG0ABjLA3wiFOdMrcq9UY9TOg/mdR88ALTOcH2KTyHuvBIxyYbOQ1YID2P6lAPHjMNsHgFLRLHHOIrKTUH3RQWBoxVyzlEE47QARYGaOplpEFeIbYVTWNhwBD0RXnuKTowQUPuXpDgoa84LtUEjwp7QQ+RxlZb8r5EeWMFjwp7QQ+RyrI30BV3ecTG2aEhSkhFDEFvoTNBnpimTCglFzQgmnCpONehIRNKSsYNiCZouqkOjZhQWjZUBmkfg34oznVooDS+1HS0rC7RmFB9yqJUA6S7eYgOKNEAh7giR3N3Z10GZEFpBjjoG1fpMX1D5ZRkgNzxcuc7xblr6McORVOKAUfQrzOWheAS/JYWgY+yq1yQMGX/iVOUhcfMXJCWXRlwgnqDL3hUbMCUbW88ysSjUgO0wb/G/FfcLvGo0IAFdMG/QvkjXY+ZBkzZriYXC8U5AxrpZo5RYlWEDLC6CL5gYcAKj5uwRkfBF6yegG1VEV0OsCzaAGGFeLd/QBz9rjfqDisDhAFxv52u4foAY2iAMTTAGBpgTA4DuLRoBjTAGK0BQ+JYN6tZtnCYOKap8lOT2rhVUsY9PgUO6UyoqmJD+wSk9gaV4Pe4dfHYtwKylsxIkMfy92KCQ/tILC4wHg+n+bMpX1FaQbdwTs5rdTfd14iTMGOv3BUyb18vOPADDhpN+oDDC+iRNPH/oHcgKb4G/cEOSe0Y3rv2lt2lCYbBv0dq+NkmGH3I7R6H2OLXFLCcWmJm13tKNzSFQyw3eb/53Wp6YkBMMUg3e4XO5q8JIYQQQgghpAnuAMZ0iIk5CRi8AAAAAElFTkSuQmCC',
      to,
      replyTo,
      from: 'noreply@beskar.co',
      token: process.env.POSTMARK_SERVER_API_TOKEN,
      subject,
      title: subject,
      body,
      cta,
      outro: 'If you did not request this, please ignore this email.',
      footer:
        'This email was sent to you because you have an account with Refraction, or you are creating one. If you did not request this, please ignore this email.',
    }),
  });

  if (!response.ok) {
    const { message } = (await response.json()) as {
      message: string;
    };

    const error = new Error(message);

    throw error;
  }
};
