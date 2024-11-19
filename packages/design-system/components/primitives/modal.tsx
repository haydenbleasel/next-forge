"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { debounce } from "@/lib/utils/debounce";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";

interface DrawerDialogProps {
  asChild?: boolean;
  trigger?: React.ReactNode;
  dialogTitle?: string;
  dialogDescription?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export function Modal({
  asChild = false,
  trigger,
  dialogTitle,
  dialogDescription,
  open,
  children,
  onOpenChange,
  className,
  ...props
}: DrawerDialogProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(
    typeof open === "undefined" ? true : open,
  );
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Don't immediately close the modal, we need to wait for the modal to animate closed before we should navigate
  // @see https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#modals
  const debouncedRouteBack = React.useMemo(
    () => debounce(() => router.back(), 300),
    [router],
  );

  const handleOpenChange = async (open: boolean) => {
    setIsOpen(open);

    if (onOpenChange) {
      return onOpenChange(open);
    }

    if (!open) {
      debouncedRouteBack();
    }
  };

  // Todo: The children are rendered twice, so state is not maintained when changing screen sizes
  if (isDesktop) {
    return (
      <Dialog
        onOpenChange={handleOpenChange}
        open={typeof open === "undefined" ? isOpen : open}
        {...props}
      >
        {trigger && <DialogTrigger asChild={asChild}>{trigger}</DialogTrigger>}

        <DialogContent className={className}>
          <DialogHeader>
            {dialogTitle ? (
              <DialogTitle>{dialogTitle}</DialogTitle>
            ) : (
              <DialogTitle className="sr-only">
                {dialogTitle ?? "Modal"}
              </DialogTitle>
            )}
            {dialogDescription && (
              <DialogDescription>{dialogDescription}</DialogDescription>
            )}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      onOpenChange={handleOpenChange}
      open={typeof open === "undefined" ? isOpen : open}
    >
      {trigger && <DrawerTrigger asChild={asChild}>{trigger}</DrawerTrigger>}
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className={dialogTitle ? "" : "sr-only"}>
            {dialogTitle ?? "Modal"}
          </DrawerTitle>
          <DrawerDescription className={dialogDescription ? "" : "sr-only"}>
            {dialogDescription ?? ""}
          </DrawerDescription>
        </DrawerHeader>
        {children}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
