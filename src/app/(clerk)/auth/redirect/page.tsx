"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserStatus } from "@/server/actions/user-status";
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

const MAX_QUERY_COUNT: number = 5;

const RedirectPage = () => {
  const router = useRouter();
  const [configId, setConfigId] = useState<string | null>(null);

  useEffect(() => {
    const configurationId = localStorage.getItem("configurationId");
    if (configurationId) setConfigId(configurationId);
  }, []);

  const { data, failureCount } = useQuery({
    queryKey: ["user-status"],
    queryFn: async () => await getUserStatus(),
    retry: MAX_QUERY_COUNT,
    retryDelay: 500,
  });

  useEffect(() => {
    if (data?.success) {
      if (configId) {
        localStorage.removeItem("configurationId");
        router.push(`/configure/preview?id=${configId}`);
      } else {
        router.push("/");
      }
    }
  }, [data, configId, router]);

  if (failureCount >= MAX_QUERY_COUNT) {
    return (
      <AuthenticateWithRedirectCallback
        signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
      />
    );
  }

  return (
    <div className="flex w-full justify-center">
      <div className="-mt-16 flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <h3 className="text-xl font-semibold">Redirecting...</h3>
        <p>This won&apos;t take long.</p>
      </div>
    </div>
  );
};

export default RedirectPage;
