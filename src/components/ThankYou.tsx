"use client";

import Link from "next/link";
import { useClerk } from "@clerk/nextjs";
import { formatPrice } from "@/lib/utils";
import { CaseColor } from "@prisma/client";
import { OrderNotFound } from "@/config/errors";
import { Loader2, XCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { buttonVariants } from "@/components/ui/Button";
import { CasePreview, MaxWidthWrapper } from "@/components";
import { getPaymentStatus } from "@/server/actions/payment-status";

const ThankYou = () => {
  const { session } = useClerk();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") ?? "";

  const { data, failureReason } = useQuery({
    queryKey: ["payment-status"],
    queryFn: async () => await getPaymentStatus({ orderId }),
    retry: true,
    retryDelay: 500,
  });

  if (failureReason?.message === OrderNotFound) {
    return (
      <div className="mt-24 flex w-full justify-center">
        <div className="flex flex-col items-center gap-2">
          <XCircle className="size-8 text-red-500" />
          <h3 className="text-xl font-semibold">Order not found</h3>

          <p className="max-w-xs text-center">
            We couldn&apos;t find your order. Please double-check your order ID
            or contact our support team.
          </p>

          <Link
            href="/"
            className={buttonVariants({
              variant: "secondary",
              className: "mt-4",
            })}
          >
            Go home
          </Link>
        </div>
      </div>
    );
  }

  if (data === undefined)
    return (
      <div className="mt-24 flex w-full justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="size-8 animate-spin text-zinc-500" />
          <h3 className="text-xl font-semibold">Loading your order...</h3>
          <p>This won&apos;t take long.</p>
        </div>
      </div>
    );

  if (data === false)
    return (
      <div className="mt-24 flex w-full justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="size-8 animate-spin text-zinc-500" />
          <h3 className="text-xl font-semibold">Verifying your payment...</h3>
          <p>This might take a moment.</p>
        </div>
      </div>
    );

  const { configuration, amount, shippingAddress, billingAddress } = data;

  return (
    <div className="bg-white px-6 py-24 md:px-0">
      <MaxWidthWrapper>
        <div className="max-w-xl">
          <p className="text-base font-medium text-primary">
            Thank you for shopping with us, {session?.user.firstName}.
          </p>

          <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-5xl">
            Your case is on the way!
          </h1>

          <p className="mt-2 text-base text-zinc-500">
            We&apos;ve received your order and are now processing it.
          </p>

          <div className="mt-10 text-sm font-medium">
            <p className="text-zinc-900">Order number</p>
            <p className="mt-2 text-zinc-500">{orderId}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-200">
          <div className="mt-10 flex flex-auto flex-col">
            <h4 className="font-semibold text-zinc-900">
              You made a great choice!
            </h4>

            <p className="mt-2 text-sm text-zinc-600">
              At Casewise, we believe a phone case should not only look great
              but also stand the test of time. That&apos;s why we offer a 5-year
              print guarantee - if your case doesn&apos;t meet the highest
              quality standards, we&apos;ll replace it at no cost to you.
            </p>
          </div>
        </div>

        <div className="mt-4 flex space-x-6 overflow-hidden rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
          <CasePreview
            croppedImageUrl={configuration.croppedImageUrl as string}
            color={configuration.color as CaseColor}
          />
        </div>

        <div>
          <div className="grid grid-cols-2 gap-x-6 py-10 text-sm">
            <div>
              <p className="font-medium text-gray-900">Shipping address</p>

              <div className="mt-2 text-zinc-700">
                <address className="not-italic">
                  <span className="block">{shippingAddress?.name}</span>
                  <span className="block">{shippingAddress?.street}</span>

                  <span className="block">
                    {shippingAddress?.postalCode} {shippingAddress?.city}
                  </span>
                </address>
              </div>
            </div>

            <div>
              <p className="font-medium text-gray-900">Billing address</p>

              <div className="mt-2 text-zinc-700">
                <address className="not-italic">
                  <span className="block">{billingAddress?.name}</span>
                  <span className="block">{billingAddress?.street}</span>

                  <span className="block">
                    {billingAddress?.postalCode} {billingAddress?.city}
                  </span>
                </address>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 border-t border-zinc-200 py-10 text-sm">
            <div>
              <p className="font-medium text-zinc-900">Payment status</p>
              <p className="mt-2 text-zinc-700">Paid</p>
            </div>

            <div>
              <p className="font-medium text-zinc-900">Shipping Method</p>

              <p className="mt-2 text-zinc-700">
                DHL, takes up to 3 working days
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 border-t border-zinc-200 pt-10 text-sm">
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Subtotal</p>
            <p className="text-zinc-700">{formatPrice(amount)}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Shipping</p>
            <p className="text-zinc-700">{formatPrice(0)}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Total</p>
            <p className="text-zinc-700">{formatPrice(amount)}</p>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default ThankYou;
