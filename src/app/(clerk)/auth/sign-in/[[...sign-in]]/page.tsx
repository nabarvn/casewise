"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import { toast } from "sonner";
import { Input, Label, Icons } from "@/components/ui";
import { ArrowRight, CircleHelp } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/Button";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

const SignInPage = () => (
  <div className="grid w-full grow items-center px-4 sm:justify-center">
    <SignIn.Root>
      <Clerk.Loading>
        {(isGlobalLoading) => (
          <>
            <SignIn.Step name="start">
              <Card className="w-full border-0 shadow-none sm:w-96">
                <CardHeader className="mb-4 text-center">
                  <Link
                    href="/"
                    className="mb-6 flex items-center justify-center lg:hidden"
                  >
                    <img
                      src="/logo-base.png"
                      alt="logo base"
                      className="size-14"
                    />
                  </Link>

                  <CardTitle className="text-2xl lg:text-3xl">
                    Sign in to Casewise
                  </CardTitle>

                  <CardDescription className="text-balance">
                    Welcome back! Please sign in to continue.
                  </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-y-4">
                  <div className="grid grid-cols-2 gap-x-4">
                    <Clerk.Connection name="github" asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        type="button"
                        disabled={isGlobalLoading}
                      >
                        <Clerk.Loading scope="provider:github">
                          {(isLoading) =>
                            isLoading ? (
                              <Icons.spinner className="size-4 animate-spin" />
                            ) : (
                              <>
                                <Icons.gitHub className="mr-2 size-4" />
                                GitHub
                              </>
                            )
                          }
                        </Clerk.Loading>
                      </Button>
                    </Clerk.Connection>

                    <Clerk.Connection name="google" asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        type="button"
                        disabled={isGlobalLoading}
                      >
                        <Clerk.Loading scope="provider:google">
                          {(isLoading) =>
                            isLoading ? (
                              <Icons.spinner className="size-4 animate-spin" />
                            ) : (
                              <>
                                <Icons.google className="mr-2 size-4" />
                                Google
                              </>
                            )
                          }
                        </Clerk.Loading>
                      </Button>
                    </Clerk.Connection>
                  </div>

                  <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                    or
                  </p>

                  <Clerk.Field name="identifier" className="space-y-2">
                    <Clerk.Label asChild>
                      <Label className="flex gap-x-1">
                        Email address
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <CircleHelp className="-mt-px hidden size-3.5 lg:block" />
                          </TooltipTrigger>

                          <TooltipContent side="right">
                            We will send a verification code
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                    </Clerk.Label>

                    <Clerk.Input type="email" required asChild>
                      <Input placeholder="you@example.com" />
                    </Clerk.Input>

                    <Clerk.FieldError asChild>
                      {({ message }) => toast.error(message)}
                    </Clerk.FieldError>
                  </Clerk.Field>
                </CardContent>

                <CardFooter>
                  <div className="grid w-full gap-y-4">
                    <SignIn.Action submit asChild>
                      <Button disabled={isGlobalLoading}>
                        <Clerk.Loading>
                          {(isLoading) =>
                            isLoading ? (
                              <Icons.spinner className="size-4 animate-spin" />
                            ) : (
                              "Continue"
                            )
                          }
                        </Clerk.Loading>
                      </Button>
                    </SignIn.Action>

                    <div className="flex items-center justify-center gap-x-2">
                      <p className="self-center text-sm font-medium text-primary">
                        Don&apos;t have an account?
                      </p>

                      <Link
                        href="/auth/sign-up"
                        className={cn(
                          buttonVariants({
                            variant: "link",
                          }),
                          "group gap-x-1 px-0",
                        )}
                      >
                        Sign up
                        <ArrowRight className="size-3 transition duration-200 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </SignIn.Step>

            <SignIn.Step name="choose-strategy">
              <Card className="w-full sm:w-96">
                <CardHeader>
                  <CardTitle>Use another method</CardTitle>

                  <CardDescription>
                    Facing issues? You can also use any of these methods to sign
                    in.
                  </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-y-4">
                  <div className="grid grid-cols-2 gap-x-4">
                    <Clerk.Connection name="github" asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        type="button"
                        disabled={isGlobalLoading}
                      >
                        <Clerk.Loading scope="provider:github">
                          {(isLoading) =>
                            isLoading ? (
                              <Icons.spinner className="size-4 animate-spin" />
                            ) : (
                              <>
                                <Icons.gitHub className="mr-2 size-4" />
                                GitHub
                              </>
                            )
                          }
                        </Clerk.Loading>
                      </Button>
                    </Clerk.Connection>

                    <Clerk.Connection name="google" asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        type="button"
                        disabled={isGlobalLoading}
                      >
                        <Clerk.Loading scope="provider:google">
                          {(isLoading) =>
                            isLoading ? (
                              <Icons.spinner className="size-4 animate-spin" />
                            ) : (
                              <>
                                <Icons.google className="mr-2 size-4" />
                                Google
                              </>
                            )
                          }
                        </Clerk.Loading>
                      </Button>
                    </Clerk.Connection>
                  </div>
                </CardContent>

                <CardFooter>
                  <div className="grid w-full gap-y-4">
                    <SignIn.Action navigate="previous" asChild>
                      <Button disabled={isGlobalLoading}>Go back</Button>
                    </SignIn.Action>
                  </div>
                </CardFooter>
              </Card>
            </SignIn.Step>

            <SignIn.Step name="verifications">
              <SignIn.Strategy name="email_code">
                <Card className="w-full sm:w-96">
                  <CardHeader>
                    <CardTitle>Check your email</CardTitle>

                    <CardDescription>
                      Enter the verification code sent to&nbsp;
                      <SignIn.SafeIdentifier />.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="grid gap-y-4">
                    <div className="grid items-center justify-center gap-y-2">
                      <Clerk.Field name="code" className="space-y-2">
                        <Clerk.Label className="sr-only">
                          Email verification code
                        </Clerk.Label>

                        <div className="flex justify-center text-center">
                          <Clerk.Input
                            type="otp"
                            autoSubmit
                            autoFocus
                            className="flex justify-center has-[:disabled]:opacity-50"
                            render={({ value, status }) => (
                              <div
                                data-status={status}
                                className="relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md data-[status=cursor]:ring-1 data-[status=selected]:ring-1 data-[status=cursor]:ring-ring data-[status=selected]:ring-ring"
                              >
                                {value}

                                {status === "cursor" && (
                                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                    <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
                                  </div>
                                )}
                              </div>
                            )}
                          />
                        </div>

                        <Clerk.FieldError asChild>
                          {({ message }) => toast.error(message)}
                        </Clerk.FieldError>
                      </Clerk.Field>

                      <SignIn.Action
                        asChild
                        resend
                        className="gap-x-2 text-muted-foreground"
                        fallback={({ resendableAfter }) => (
                          <Button variant="link" size="sm" disabled>
                            Didn&apos;t recieve a code? Resend (
                            <span className="tabular-nums">
                              {resendableAfter}
                            </span>
                            )
                          </Button>
                        )}
                      >
                        <Button type="button" variant="link" size="sm">
                          Didn&apos;t recieve a code? Resend
                        </Button>
                      </SignIn.Action>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <div className="grid w-full gap-y-4">
                      <SignIn.Action submit asChild>
                        <Button disabled={isGlobalLoading}>
                          <Clerk.Loading>
                            {(isLoading) =>
                              isLoading ? (
                                <Icons.spinner className="size-4 animate-spin" />
                              ) : (
                                "Continue"
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                      </SignIn.Action>

                      <SignIn.Action navigate="choose-strategy" asChild>
                        <Button size="sm" variant="link">
                          Use another method
                        </Button>
                      </SignIn.Action>
                    </div>
                  </CardFooter>
                </Card>
              </SignIn.Strategy>
            </SignIn.Step>
          </>
        )}
      </Clerk.Loading>
    </SignIn.Root>
  </div>
);

export default SignInPage;
