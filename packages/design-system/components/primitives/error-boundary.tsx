"use client";

import { Boundary } from "@/components/primitives/boundary";
import { Button } from "@/components/ui/button";
import { useRedirectAfterSignIn } from "@/hooks/use-redirect-after-sign-in";

export default function ErrorBoundary({
  error,
  resetAction,
}: {
  error: Error & { digest?: string };
  resetAction: () => void;
}) {
  useRedirectAfterSignIn(error);

  return (
    <Boundary title="Something went wrong." description={error.message}>
      <Button type="button" onClick={resetAction}>
        Try again
      </Button>
    </Boundary>
  );
}
