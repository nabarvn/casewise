import "./globals.css";

import { Providers } from "@/components";
import { Recursive } from "next/font/google";
import { cn, constructMetadata } from "@/lib/utils";
import { Sonner, Toaster } from "@/components/ui";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="hydrated antialiased">
      <Providers>
        <body
          className={cn(
            "scrollbar-thumb-gray scrollbar-thumb-rounded scrollbar-track-gray-lighter scrollbar-w-4 scrolling-touch",
            recursive.className,
          )}
        >
          {children}
          <Sonner />
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
