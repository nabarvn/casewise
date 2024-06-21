import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <div
    className={cn(
      "mx-auto h-full w-full max-w-screen-lg px-2.5 md:px-20 2xl:max-w-screen-xl",
      className,
    )}
  >
    {children}
  </div>
);

export default MaxWidthWrapper;
