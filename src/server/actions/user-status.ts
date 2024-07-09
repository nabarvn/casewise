"use server";

import { db } from "@/server/db";
import { currentUser } from "@clerk/nextjs/server";

export const getUserStatus = async () => {
  const user = await currentUser();

  if (!user?.id || !user.primaryEmailAddress?.emailAddress) {
    throw new Error("Invalid user data");
  }

  const existingUser = await db.user.findFirst({
    where: { id: user.id },
  });

  if (!existingUser) {
    await db.user.create({
      data: {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress as string,
      },
    });
  }

  return { success: true };
};
