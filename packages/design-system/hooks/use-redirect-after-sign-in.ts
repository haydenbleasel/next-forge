import { routes } from "@/config/routes";
import { STATUS_CODES } from "@/config/status-codes";

import { AuthenticationError } from "@/lib/errors/authentication-error";
import { logger } from "@/lib/logger";
import { redirectWithCode } from "@/lib/utils/redirect-with-code";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRedirectAfterSignIn = (error: Error) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const redirectToSignIn = () => {
      redirectWithCode(routes.auth.signIn, {
        code: STATUS_CODES.AUTH.code,
        nextUrl: pathname,
      });
    };

    if (error instanceof AuthenticationError) {
      logger.info(
        "ErrorBoundary: Authentication error, redirecting to sign in",
      );
      redirectToSignIn();
    }

    // Optionally log the error to an error reporting service
    logger.error("ErrorBoundary", error);
  }, [error, router, pathname]);
};
