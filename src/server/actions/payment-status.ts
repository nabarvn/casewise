"use server";

import { db } from "@/server/db";
import { OrderNotFound } from "@/config/errors";
import { currentUser } from "@clerk/nextjs/server";

export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
  const user = await currentUser();

  if (!user?.id || !user.primaryEmailAddress?.emailAddress) {
    throw new Error("You need to be logged in to view this page");
  }

  const order = await db.order.findFirst({
    where: { id: orderId, userId: user.id },
    include: {
      user: true,
      configuration: true,
      shippingAddress: true,
      billingAddress: true,
    },
  });

  if (!order) throw new Error(OrderNotFound);

  if (order.isPaid) {
    return order;
  } else {
    return false;
  }
};
