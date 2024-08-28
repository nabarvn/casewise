import Stripe from "stripe";
import { Resend } from "resend";
import { db } from "@/server/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { OrderReceivedEmail } from "@/components/emails";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature");

    if (!signature) {
      return new Response("Invalid signature", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );

    if (event.type === "checkout.session.completed") {
      if (!event.data.object.customer_details?.email) {
        throw new Error("Missing user email");
      }

      const session = event.data.object as Stripe.Checkout.Session;

      const { userId, orderId } = session.metadata || {
        userId: null,
        orderId: null,
      };

      if (!userId || !orderId) {
        throw new Error("Invalid request metadata");
      }

      const billingAddress = session.customer_details
        ?.address as Stripe.Address;
      const shippingAddress = session.shipping_details
        ?.address as Stripe.Address;

      const updatedOrder = await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
          shippingAddress: {
            create: {
              name: session.customer_details?.name as string,
              street: shippingAddress.line1 as string,
              city: shippingAddress.city as string,
              postalCode: shippingAddress.postal_code as string,
              country: shippingAddress.country as string,
              state: shippingAddress.state,
            },
          },
          billingAddress: {
            create: {
              name: session.customer_details?.name as string,
              street: billingAddress.line1 as string,
              city: billingAddress.city as string,
              postalCode: billingAddress.postal_code as string,
              country: billingAddress.country as string,
              state: billingAddress.state,
            },
          },
        },
      });

      await resend.emails.send({
        from: "Casewise <info@nabarun.app>",
        to: [event.data.object.customer_details.email],
        subject: "Thanks for your order!",
        react: OrderReceivedEmail({
          orderId,
          orderDate: updatedOrder.createdAt.toLocaleDateString(),
          shippingAddress: {
            name: session.customer_details?.name as string,
            street: shippingAddress.line1 as string,
            city: shippingAddress.city as string,
            postalCode: shippingAddress.postal_code as string,
            country: shippingAddress.country as string,
            state: shippingAddress.state,
          },
        }),
      });
    }

    return NextResponse.json({ result: event, ok: true }, { status: 200 });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { message: "Something went wrong", ok: false },
      { status: 500 },
    );
  }
}
