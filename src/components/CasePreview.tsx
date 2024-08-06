"use client";

import { cn } from "@/lib/utils";
import { CaseColor } from "@prisma/client";
import { AspectRatio } from "@/components/ui";
import { useEffect, useRef, useState } from "react";

const CasePreview = ({
  croppedImageUrl,
  color,
}: {
  croppedImageUrl: string;
  color: CaseColor;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [renderedDimensions, setRenderedDimensions] = useState({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    if (!containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();
    setRenderedDimensions({ width, height });
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [containerRef]);

  let caseBackgroundColor = "bg-zinc-900";

  if (color === "rose") caseBackgroundColor = "bg-rose-950";
  if (color === "blue") caseBackgroundColor = "bg-blue-950";

  return (
    <AspectRatio ref={containerRef} ratio={3000 / 2001} className="relative">
      <div
        style={{
          left:
            renderedDimensions.width / 2 -
            renderedDimensions.width / (1216 / 121),
          top: renderedDimensions.height / 6.22,
        }}
        className="absolute z-20 scale-[1.0352]"
      >
        <img
          src={croppedImageUrl}
          alt="cropped image"
          width={renderedDimensions.width / (3000 / 637)}
          className={cn(
            "phone-skew relative z-20 rounded-b-[10px] rounded-t-[15px] md:rounded-b-[20px] md:rounded-t-[30px]",
            caseBackgroundColor,
          )}
        />
      </div>

      <div className="relative z-40 size-full">
        <img
          src="/clear_phone.png"
          alt="clear phone image"
          className="pointer-events-none size-full rounded-md antialiased"
        />
      </div>
    </AspectRatio>
  );
};

export default CasePreview;
