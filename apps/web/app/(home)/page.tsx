import { Button } from '@repo/design-system/components/ui/button';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ShipKit - Ship Better Software Faster',
  description:
    'ShipKit is your all-in-one toolkit for building, deploying, and managing modern web applications. Built with Next.js, TypeScript, and best practices in mind.',
};

export const Page = () => {
  return (
    <main className="flex-1">
      <>
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-8 text-4xl font-bold tracking-tight md:text-6xl">
              Ship Better Software{' '}
              <span className="text-gradient-primary">Faster</span>
            </h1>
            <p className="mb-12 text-lg text-muted-foreground md:text-xl">
              Your complete toolkit for modern web development. Start building
              production-ready applications with Next.js, TypeScript, and
              industry-leading practices.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/sign-up">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/docs">View Documentation</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border p-6">
              <h3 className="mb-3 text-xl font-semibold">
                Type-Safe Development
              </h3>
              <p className="text-muted-foreground">
                Built with TypeScript and modern tooling for a robust
                development experience with fewer bugs.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="mb-3 text-xl font-semibold">Modern Stack</h3>
              <p className="text-muted-foreground">
                Next.js, Tailwind CSS, and industry-leading tools pre-configured
                for optimal performance.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="mb-3 text-xl font-semibold">Production Ready</h3>
              <p className="text-muted-foreground">
                Enterprise-grade security, scalability, and best practices built
                in from the start.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="rounded-xl bg-muted p-8 text-center md:p-12">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Ready to Ship Faster?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of developers building better software with
              ShipKit.
            </p>
            <Button asChild size="lg">
              <Link href="/sign-up">Start Building Now</Link>
            </Button>
          </div>
        </section>
      </>
    </main>
  );
};

export default Page;
