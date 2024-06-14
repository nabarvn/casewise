"use client";

import { PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";

const Providers = ({ children }: PropsWithChildren) => (
  <ClerkProvider>{children}</ClerkProvider>
);

export default Providers;
