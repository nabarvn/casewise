import Link from "next/link";
import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => (
  <div className="grid min-h-screen grid-cols-1 md:h-[100svh] lg:grid-cols-2">
    <div className="col-span-1 flex w-full flex-col items-center justify-center">
      {children}
    </div>

    <div className="col-span-1 -mt-20 hidden flex-col items-center justify-center gap-y-2 bg-green-500 lg:flex">
      <Link href="/">
        <img src="/logo-white.png" alt="logo white" className="size-20" />
      </Link>

      <h1 className="prose select-none text-6xl font-bold tracking-tight text-white">
        casewise
      </h1>
    </div>
  </div>
);

export default AuthLayout;
