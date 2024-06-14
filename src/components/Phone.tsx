import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  dark?: boolean;
}

const Phone = ({ imgSrc, dark = false, className, ...props }: PhoneProps) => (
  <div
    {...props}
    className={cn(
      "pointer-events-none relative z-10 overflow-hidden rounded-[24px] lg:rounded-[32px] 2xl:rounded-[40px]",
      className,
    )}
  >
    <img
      src={
        dark
          ? "/phone-template-dark-edges.png"
          : "/phone-template-white-edges.png"
      }
      alt="phone image"
      className="pointer-events-none z-10 select-none"
    />

    <div className="absolute inset-0 -z-10">
      <img
        src={imgSrc}
        alt="underlaying case image"
        className="min-h-full min-w-full object-cover"
      />
    </div>
  </div>
);

export default Phone;
