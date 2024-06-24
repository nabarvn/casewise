import { PropsWithChildren } from "react";
import { MaxWidthWrapper, Steps } from "@/components";

const ConfigureLayout = ({ children }: PropsWithChildren) => (
  <MaxWidthWrapper className="flex flex-1 flex-col px-6">
    <Steps />
    {children}
  </MaxWidthWrapper>
);

export default ConfigureLayout;
