"use client";

import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui";
import Confetti from "react-dom-confetti";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { cn, formatPrice } from "@/lib/utils";
import { Configuration } from "@prisma/client";
import { Phone, LoginModal } from "@/components";
import { useMutation } from "@tanstack/react-query";
import { COLORS, MODELS } from "@/lib/validators/options";
import { useEffect, useState, useTransition } from "react";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { createCheckoutSession } from "@/server/actions/checkout-session";

const DesignPreview = ({ configuration }: { configuration: Configuration }) => {
  const router = useRouter();
  const { toast } = useToast();

  const { isSignedIn } = useAuth();
  const [isTransitioning, startTransition] = useTransition();
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const { id, color, model, material, finish, croppedImageUrl } = configuration;

  useEffect(() => setShowConfetti(true), []);

  const colorValue = COLORS.find(
    (supportedColor) => supportedColor.value === color,
  )?.value;

  const modelLabel = MODELS.options.find(({ value }) => value === model)?.label;

  let totalPrice = BASE_PRICE;

  if (material === "polycarbonate") {
    totalPrice += PRODUCT_PRICES.material.polycarbonate;
  }

  if (finish === "textured") {
    totalPrice += PRODUCT_PRICES.finish.textured;
  }

  const { mutate: createPaymentSession, isPending } = useMutation({
    mutationKey: ["get-checkout-session"],
    mutationFn: createCheckoutSession,
    onSuccess: ({ url }) => {
      if (url) {
        startTransition(() => router.push(url));
      } else {
        throw new Error("Unable to retrieve payment URL");
      }
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "There was an error on our end. Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleCheckout = () => {
    if (isSignedIn) {
      createPaymentSession({ configId: id });
    } else {
      localStorage.setItem("configurationId", id);
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex select-none justify-center overflow-hidden"
      >
        <Confetti
          active={showConfetti}
          config={{ elementCount: 200, spread: 90 }}
        />
      </div>

      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />

      <div className="my-20 flex flex-col gap-x-12 text-sm md:grid md:grid-cols-12 lg:gap-x-14">
        <div className="self-start md:col-span-4 md:mt-6 lg:col-span-3">
          <Phone
            imgSrc={croppedImageUrl ?? ""}
            className={cn("max-w-[150px] md:max-w-full", {
              "bg-zinc-900": colorValue === "black",
              "bg-rose-950": colorValue === "rose",
              "bg-blue-950": colorValue === "blue",
            })}
          />
        </div>

        <div className="text-base md:col-span-8 lg:col-span-9">
          <div className="mt-8 md:mt-6">
            <h3 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
              Your {modelLabel} Case
            </h3>

            <div className="mt-1 flex items-center gap-1.5 text-sm md:text-base">
              <CheckCircle className="size-3 text-green-500 md:size-4" />
              In stock and ready to ship
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 lg:grid-cols-2 lg:gap-x-6 lg:py-10">
            <div>
              <p className="font-medium text-zinc-950">Highlights</p>

              <ol className="mt-3 list-inside list-disc text-zinc-700">
                <li>Wireless charging compatible</li>
                <li>TPU shock absorption</li>
                <li>Made from recycled materials</li>
                <li>5 year print warranty</li>
              </ol>
            </div>

            <div>
              <p className="font-medium text-zinc-950">Materials</p>

              <ol className="mt-3 list-inside list-disc text-zinc-700">
                <li>Premium and durable material</li>
                <li>Scratch-resistant coating</li>
              </ol>
            </div>
          </div>

          <div className="mt-8">
            <div className="rounded-lg bg-gray-50 p-6 md:p-8">
              <div className="flow-root text-sm">
                <div className="mt-2 flex items-center justify-between py-1">
                  <p className="text-gray-600">Base price</p>

                  <p className="font-medium text-gray-900">
                    {formatPrice(BASE_PRICE / 100)}
                  </p>
                </div>

                {finish === "textured" ? (
                  <div className="mt-2 flex items-center justify-between py-1">
                    <p className="text-gray-600">Textured finish</p>

                    <p className="self-start font-medium text-gray-900">
                      {formatPrice(PRODUCT_PRICES.finish.textured / 100)}
                    </p>
                  </div>
                ) : null}

                {material === "polycarbonate" ? (
                  <div className="mt-2 flex items-center justify-between py-1">
                    <p className="text-gray-600">Soft polycarbonate material</p>

                    <p className="self-start font-medium text-gray-900">
                      {formatPrice(PRODUCT_PRICES.material.polycarbonate / 100)}
                    </p>
                  </div>
                ) : null}

                <div className="my-2 h-px bg-gray-200" />

                <div className="flex items-center justify-between py-2">
                  <p className="font-semibold text-gray-900">Order total</p>

                  <p className="font-semibold text-gray-900">
                    {formatPrice(totalPrice / 100)}
                  </p>
                </div>
              </div>
            </div>

            <div className="my-8 flex justify-end">
              <Button
                size="lg"
                onClick={() => handleCheckout()}
                disabled={isPending || isTransitioning}
                className="group gap-1.5"
              >
                Check out
                {isPending || isTransitioning ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <ArrowRight className="size-4 transition duration-200 group-hover:translate-x-0.5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignPreview;
