"use server";

import { db } from "@/server/db";
import { stripe } from "@/lib/stripe";
import { Order } from "@prisma/client";
import { absoluteUrl } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";

export const createCheckoutSession = async ({
  configId,
}: {
  configId: string;
}) => {
  const configuration = await db.configuration.findUnique({
    where: { id: configId },
  });

  if (!configuration) {
    throw new Error("No such configuration found");
  }

  const user = await currentUser();

  if (!user?.id) {
    throw new Error("You need to be logged in");
  }

  const { material, finish } = configuration;

  let totalPrice = BASE_PRICE;

  if (material === "polycarbonate") {
    totalPrice += PRODUCT_PRICES.material.polycarbonate;
  }

  if (finish === "textured") {
    totalPrice += PRODUCT_PRICES.finish.textured;
  }

  let order: Order | undefined = undefined;

  const existingOrder = await db.order.findFirst({
    where: {
      userId: user.id,
      configurationId: configuration.id,
    },
  });

  if (existingOrder) {
    order = existingOrder;
  } else {
    order = await db.order.create({
      data: {
        userId: user.id,
        amount: totalPrice / 100,
        configurationId: configuration.id,
      },
    });
  }

  const product = await stripe.products.create({
    name: "Custom iPhone Case",
    images: [configuration.imageUrl],
    default_price_data: {
      currency: "USD",
      unit_amount: totalPrice,
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: user?.primaryEmailAddress?.emailAddress,
    success_url: absoluteUrl(`/thank-you?orderId=${order.id}`),
    cancel_url: absoluteUrl(`/configure/preview?id=${configuration.id}`),
    shipping_address_collection: {
      allowed_countries: ["US", "IN", "SG", "JP", "AE"],
    },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
  });

  return { url: stripeSession.url };
};
