import Link from "next/link";
import { cn } from "@/lib/utils";
import { isAdmin } from "@/lib/admin";
import { Separator } from "@/components/ui";
import { MaxWidthWrapper } from "@/components";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/Button";

import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

const Navbar = async () => (
  <nav className="sticky inset-x-0 top-0 z-50 h-14 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
    <MaxWidthWrapper>
      <div className="flex h-14 items-center justify-between border-b border-zinc-200 px-6 md:px-0">
        <Link
          href="/"
          className="z-40 flex gap-x-1 font-semibold text-green-600"
        >
          <img
            src="/logo-base.png"
            alt="logo base"
            className="size-4 self-center"
          />
          casewise
        </Link>

        <div className="flex h-full items-center gap-x-4">
          <ClerkLoading>
            <SignedIn>
              <Button
                disabled
                size="sm"
                className="order-2 w-[71px] animate-pulse bg-gray-200 md:order-1"
              />

              {isAdmin() ? (
                <Button
                  disabled
                  size="sm"
                  className="order-1 w-[102px] animate-pulse bg-gray-200 md:order-2"
                />
              ) : null}
            </SignedIn>

            <SignedOut>
              <Button
                disabled
                size="sm"
                className="w-[67px] animate-pulse bg-gray-200"
              />

              <Button
                disabled
                size="sm"
                className="w-[55px] animate-pulse bg-gray-200"
              />
            </SignedOut>
          </ClerkLoading>

          <ClerkLoaded>
            <SignedIn>
              <SignOutButton redirectUrl="/">
                <Button
                  size="sm"
                  variant="ghost"
                  className="order-2 md:order-1"
                >
                  Sign out
                </Button>
              </SignOutButton>

              {isAdmin() ? (
                <Link
                  href="/dashboard"
                  className={cn(
                    buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    }),
                    "order-1 gap-x-1 md:order-2",
                  )}
                >
                  Dashboard
                  <Sparkles className="size-3" />
                </Link>
              ) : null}
            </SignedIn>

            <SignedOut>
              <SignUpButton>
                <Button size="sm" variant="ghost">
                  Sign up
                </Button>
              </SignUpButton>

              <SignInButton>
                <Button size="sm" variant="ghost">
                  Login
                </Button>
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>

          <Separator
            orientation="vertical"
            className="order-3 hidden h-8 sm:block"
          />

          <Link
            href="/configure/upload"
            className={cn(
              buttonVariants({
                size: "sm",
              }),
              "group order-4 hidden items-center gap-1 sm:flex",
            )}
          >
            Create case
            <ArrowRight className="size-4 transition duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  </nav>
);

export default Navbar;
