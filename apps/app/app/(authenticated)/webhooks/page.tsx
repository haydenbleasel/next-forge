import { webhooks } from '@repo/webhooks';
import { notFound } from 'next/navigation';

const WebhooksPage = async () => {
  const response = await webhooks.getAppPortal();

  if (!response?.url) {
    notFound();
  }

  return (
    <div className="h-full w-full overflow-hidden">
      <iframe
        title="Webhooks"
        src={response.url}
        className="h-full w-full border-none"
        allow="clipboard-write"
        loading="lazy"
      />
    </div>
  );
};

export default WebhooksPage;
