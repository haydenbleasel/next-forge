export const Footer = () => (
  <div className="bg-dashed">
    <div className="container mx-auto flex items-center justify-between p-8 text-muted-foreground">
      <p className="mx-auto block text-center text-sm">
        Built with love by{' '}
        <a
          href="https://x.com/haydenbleasel"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline"
        >
          Hayden Bleasel
        </a>
        . Maintained by a brilliant community of{' '}
        <a
          href="https://github.com/vercel/next-forge"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline"
        >
          developers
        </a>
        .
      </p>
    </div>
  </div>
);
