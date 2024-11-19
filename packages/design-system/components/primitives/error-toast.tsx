"use client";

import { STATUS_CODES } from "@/config/status-codes";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export const ErrorToast = () => {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("code");

  useEffect(() => {
    if (errorCode && Object.keys(STATUS_CODES).includes(errorCode)) {
      const error = STATUS_CODES[errorCode as keyof typeof STATUS_CODES];

      console.log(error, toast);
      if (error) {
        // Todo: renders twice - maybe strict mode is causing this
        setTimeout(() => {
          toast.error(error.message);
        }, 500);
      }
    }
  }, [errorCode]);

  return null;
};
