import { env } from '@/env';
import { Button } from '@repo/design-system/components/ui/button';
import { MoveRight, PhoneCall } from 'lucide-react';
import Link from 'next/link';

export const CTA = () => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="flex flex-col items-center gap-8 rounded-md bg-muted p-4 text-center lg:p-14">
        <div className="flex flex-col gap-2">
          <h3 className="max-w-xl font-regular text-3xl tracking-tighter md:text-5xl">
            Try our platform today!
          </h3>
          <p className="max-w-xl text-lg text-muted-foreground leading-relaxed tracking-tight">
            Managing a small business today is already tough. Avoid further
            complications by ditching outdated, tedious trade methods. Our goal
            is to streamline SMB trade, making it easier and faster than ever.
          </p>
        </div>
        <div className="flex flex-row gap-4">
          <Button className="gap-4" variant="outline" asChild>
            <Link href="/contact">
              Jump on a call <PhoneCall className="h-4 w-4" />
            </Link>
          </Button>
          <Button className="gap-4" asChild>
            <Link href={env.NEXT_PUBLIC_APP_URL}>
              Sign up here <MoveRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </div>
);
