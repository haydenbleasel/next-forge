export const Footer = () => (
  <div className="bg-dashed">
    <div className="container mx-auto flex items-center justify-between p-8 text-neutral-500">
      <p className="mx-auto block text-center text-sm">
        Built with love by{' '}
        <a
          href="https://www.haydenbleasel.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-950 underline"
        >
          Hayden Bleasel
        </a>
        . Maintained by a brilliant community of{' '}
        <a
          href="https://github.com/vercel/next-forge"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-950 underline"
        >
          developers
        </a>
        .
      </p>
    </div>
  </div>
);
