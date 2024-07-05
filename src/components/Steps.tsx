"use client";

import { cn } from "@/lib/utils";
import { STEPS } from "@/config/steps";
import { usePathname } from "next/navigation";

const Steps = () => {
  const pathname = usePathname();

  return (
    <ol className="bg-white md:flex md:rounded-none md:border-l md:border-r md:border-gray-200">
      {STEPS.map((step, i) => {
        const isCurrent = pathname.endsWith(step.url);

        // verify the current step completion
        // check if any of the next existing step urls match with the current pathname
        const isCompleted = STEPS.slice(i + 1).some((step) =>
          pathname.endsWith(step.url),
        );

        return (
          <li key={step.name} className="relative overflow-hidden md:flex-1">
            <div>
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-0 top-0 h-full w-1 bg-zinc-400 md:bottom-0 md:top-auto md:h-1 md:w-full",
                  {
                    "bg-primary": isCompleted,
                    "bg-zinc-700": isCurrent,
                  },
                )}
              />

              <span className="flex items-center px-4 py-4 text-sm font-medium lg:px-6">
                <span className="ml-4 mt-0.5 flex h-full min-w-0 flex-col justify-center gap-y-1">
                  <span
                    className={cn("text-sm font-semibold text-zinc-700", {
                      "text-primary": isCompleted,
                      "text-zinc-700": isCurrent,
                    })}
                  >
                    {step.name}
                  </span>

                  <span className="text-xs text-zinc-500">
                    {step.description}
                  </span>
                </span>
              </span>

              {/* separator */}
              {i !== 0 ? (
                <div className="absolute inset-0 hidden w-3 md:block">
                  <svg
                    className="h-full w-full text-gray-300"
                    viewBox="0 0 12 82"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0.5 0V31L10.5 41L0.5 51V82"
                      stroke="currentcolor"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default Steps;
