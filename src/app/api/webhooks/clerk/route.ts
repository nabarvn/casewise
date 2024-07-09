import { Webhook } from "svix";
import { db } from "@/server/db";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!CLERK_WEBHOOK_SECRET) {
    throw new Error(
      "Please add 'CLERK_WEBHOOK_SECRET' from Clerk Dashboard to .env or .env.local",
    );
  }

  // get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // if there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // create a new Svix instance with your secret
  const cwh = new Webhook(CLERK_WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // verify the payload with headers
  try {
    evt = cwh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    if (!id) {
      return new Response("Error occurred -- missing data", {
        status: 400,
      });
    }

    try {
      const user = await db.user.delete({
        where: { id },
      });

      return new Response(
        `User with id of '${user.id}' has been deleted successfully from the database`,
        { status: 200 },
      );
    } catch (err) {
      return new Response(
        `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`,
        { status: 400 },
      );
    }
  } else {
    return new Response("Only user deletion is allowed", { status: 400 });
  }
}
