"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

const SSOCallback = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleSSOCallback = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);
      } catch (error) {
        console.error("Error handling SSO callback", error);
        setIsLoading(false);
      }
    };

    handleSSOCallback();
  }, [router]);

  if (isLoading)
    return (
      <div className="flex w-full justify-center">
        <div className="-mt-16 flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          <h3 className="text-xl font-semibold">Setting up your account...</h3>
          <p>You will be redirected automatically.</p>
        </div>
      </div>
    );

  return <AuthenticateWithRedirectCallback />;
};

export default SSOCallback;
