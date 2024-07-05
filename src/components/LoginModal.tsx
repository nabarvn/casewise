import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";

import { Button } from "@/components/ui";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

const LoginModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[21rem] md:max-w-[25rem]">
        <DialogHeader>
          <div className="relative mx-auto mb-2 size-24">
            <Image
              fill
              src="/logo-base.png"
              alt="logo base"
              className="object-contain"
            />
          </div>

          <DialogTitle className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Log in to continue
          </DialogTitle>

          <DialogDescription className="py-2 text-center text-base">
            <span className="font-medium text-zinc-900">
              Your configuration was saved!
            </span>
            &nbsp;Please login or create an account to complete your purchase.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 divide-x divide-gray-200 px-2">
          <SignedOut>
            <SignUpButton>
              <Button variant="outline">Sign up</Button>
            </SignUpButton>

            <SignInButton>
              <Button variant="default">Login</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
