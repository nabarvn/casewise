import Link from "next/link";
import { Separator } from "@/components/ui";
import { buttonVariants } from "@/components/ui/Button";

const NotFoundPage = () => (
  <main className="flex h-screen flex-col">
    <div className="flex h-full flex-1 flex-col">
      <div className="m-auto flex flex-col items-center gap-y-6">
        <img src="/logo-base.png" alt="logo base" className="mb-10 size-32" />

        <div className="flex flex-col items-center justify-center gap-x-6 gap-y-4 md:h-10 md:flex-row">
          <p className="text-2xl font-bold md:text-3xl">404</p>

          <Separator orientation="horizontal" className="md:hidden" />
          <Separator orientation="vertical" className="hidden md:block" />

          <p className="text-lg font-semibold md:text-xl">
            This page could not be found.
          </p>
        </div>

        <Link
          href="/"
          className={buttonVariants({
            variant: "default",
            className: "w-full",
          })}
        >
          Go home
        </Link>
      </div>
    </div>
  </main>
);

export default NotFoundPage;
