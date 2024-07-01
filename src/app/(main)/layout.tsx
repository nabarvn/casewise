import { Footer, Navbar } from "@/components";
import { Fragment, PropsWithChildren } from "react";

const MainLayout = ({ children }: PropsWithChildren) => (
  <Fragment>
    <Navbar />

    <main className="grainy-light dark:grainy-dark flex min-h-[calc(100svh-136px)] flex-col">
      <div className="flex h-full flex-1 flex-col">{children}</div>
    </main>

    <Footer />
  </Fragment>
);

export default MainLayout;
