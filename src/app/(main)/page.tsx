import Link from "next/link";
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import { Icons } from "@/components/ui";
import { FEATURES } from "@/config/features";
import { buttonVariants } from "@/components/ui/Button";
import { MaxWidthWrapper, Phone, Reviews } from "@/components";
import { REVIEWERS, FIVE_STAR_REVIEWS } from "@/config/reviews";
import { ArrowRight, Check, CheckCircle, Star } from "lucide-react";

const HomePage = () => (
  <div className="grainy-light bg-slate-50">
    <section className="lg:h-[calc(100svh-56px)]">
      <MaxWidthWrapper className="pb-24 md:pb-32 md:pt-10 lg:grid lg:grid-cols-3 lg:gap-x-0 lg:pb-52 lg:pt-0 xl:pt-10 2xl:gap-x-8 2xl:pt-32">
        <div className="col-span-2 px-6 lg:pt-4">
          <div className="relative mx-auto flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="relative mt-16 w-fit text-balance text-4xl font-bold !leading-tight tracking-tight text-gray-900 lg:text-5xl 2xl:text-7xl">
              Your Image on a&nbsp;
              <span className="bg-green-600 px-2 text-white">Custom</span>
              &nbsp;Phone Case
            </h1>

            <p className="mt-8 max-w-prose text-balance text-center text-base lg:pr-10 lg:text-left 2xl:text-lg">
              Preserve your cherished moments with a unique,&nbsp;
              <span className="font-semibold">one-of-a-kind</span> phone case
              from Casewise. Safeguard not only your device but also the
              memories that mean the most to you.
            </p>

            <ul className="mt-8 flex flex-col items-center space-y-2 text-left font-medium sm:items-start">
              {FEATURES.map(
                (feature, i) =>
                  i <= 2 && (
                    <li
                      key={i}
                      className="flex items-center gap-1.5 text-left text-sm 2xl:text-base"
                    >
                      <Check className="size-4 shrink-0 text-green-600 2xl:size-5" />
                      {feature}
                    </li>
                  ),
              )}
            </ul>

            <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:items-start">
              <div className="flex -space-x-3 2xl:-space-x-4">
                {new Array(5).fill(0).map((_, i) => (
                  <img
                    key={i}
                    src={`/users/user-${i + 1}.png`}
                    alt={`user-${i + 1} image`}
                    className={cn(
                      "inline-block size-8 rounded-full ring-2 ring-slate-100 2xl:size-10",
                      {
                        "object-cover": i === 4,
                      },
                    )}
                  />
                ))}
              </div>

              <div className="flex flex-col items-center justify-between sm:items-start">
                <div className="flex gap-0.5">
                  {new Array(5).fill(0).map((_, i) => (
                    <Fragment key={i}>
                      <Star className="size-3 fill-green-600 text-green-600 2xl:size-4" />
                    </Fragment>
                  ))}
                </div>

                <p className="text-sm 2xl:text-base">
                  <span className="font-semibold">{FIVE_STAR_REVIEWS}+</span>
                  &nbsp;happy customers
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-full mt-32 flex h-fit w-full justify-center px-8 sm:px-16 md:px-0 lg:col-span-1 lg:mx-0 lg:mt-20">
          <div className="relative md:max-w-xl">
            <img
              src="/your-image.png"
              alt="your image text"
              className="absolute -top-16 left-20 z-20 w-36 select-none lg:left-32 lg:w-40 2xl:-top-20 2xl:left-40 2xl:w-52"
            />

            <img
              src="/line.png"
              alt="curved dotted line"
              className="absolute -bottom-3 -left-3 z-20 w-12 select-none lg:-bottom-4 lg:-left-4 lg:w-16 2xl:-bottom-6 2xl:-left-6 2xl:w-20"
            />

            <Phone
              imgSrc="/testimonials/1.jpg"
              className="w-40 lg:w-52 2xl:w-64"
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>

    {/* value proposition section */}
    <section className="bg-slate-100 py-24">
      <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
        <div className="px-6">
          <h2 className="mt-2 text-balance text-center text-4xl font-bold !leading-tight tracking-tight text-gray-900 lg:text-5xl 2xl:text-7xl">
            What our
            <span className="relative px-2">
              customers
              <Icons.underline className="pointer-events-none absolute inset-x-0 -bottom-6 hidden text-green-500 sm:block" />
            </span>
            say
          </h2>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 px-6 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-x-8 xl:gap-x-20">
          {REVIEWERS.map((reviewer, i) => (
            <div
              key={i}
              className="flex flex-auto flex-col justify-between gap-y-4"
            >
              <div className="flex flex-col gap-y-4">
                <div className="mb-2 flex gap-x-0.5">
                  {new Array(5).fill(0).map((_, i) => (
                    <Fragment key={i}>
                      <Star className="size-3 fill-green-600 text-green-600 2xl:size-4" />
                    </Fragment>
                  ))}
                </div>

                <div className="text-lg leading-8">
                  <p className="text-base 2xl:text-lg">
                    &quot;{reviewer.statement.preHighlight}
                    <span className="bg-green-800 px-0.5 text-white">
                      {reviewer.statement.highlight}
                    </span>
                    {reviewer.statement.postHighlight}&quot;
                  </p>
                </div>
              </div>

              <div className="mt-2 flex gap-x-4">
                <img
                  src={`/users/user-${reviewer.id}.png`}
                  alt={`user-${reviewer.id} image`}
                  className="size-12 rounded-full object-cover"
                />

                <div className="flex flex-col">
                  <p className="font-semibold">{reviewer.name}</p>

                  <div className="flex items-center gap-x-1.5 text-zinc-600">
                    <CheckCircle className="size-4 stroke-[3px] text-green-600" />
                    <p className="text-sm">{reviewer.status}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>

      <div className="mt-24">
        <Reviews />
      </div>
    </section>

    <section className="py-24">
      <MaxWidthWrapper className="flex flex-col items-center justify-center gap-16">
        <div className="px-6">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="order-1 text-balance text-center text-4xl font-bold !leading-tight tracking-tight text-gray-900 lg:text-5xl 2xl:text-7xl">
              Design&nbsp;
              <span className="relative bg-green-600 px-2 text-white">
                your custom case
              </span>
              &nbsp;by uploading your photo now
            </h2>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <div className="relative flex grid-cols-2 flex-col items-center gap-40 md:grid">
            <img
              src="/arrow.png"
              className="absolute left-1/2 top-[20rem] z-10 -translate-x-1/2 -translate-y-1/2 rotate-90 md:top-1/2 md:rotate-0"
            />

            <div className="relative h-60 w-full max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 md:justify-self-end lg:h-80 lg:rounded-2xl">
              <img
                src="/horse.jpg"
                className="h-full w-full rounded-md bg-white object-cover shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>

            <Phone
              imgSrc="/horse_phone.jpg"
              className="w-40 lg:w-52 2xl:w-64"
            />
          </div>
        </div>

        <ul className="mx-auto w-fit max-w-prose space-y-2 px-6 font-medium">
          {FEATURES.map(
            (feature, i) =>
              i > 2 && (
                <li
                  key={i}
                  className="flex items-center gap-1.5 text-left text-sm 2xl:text-base"
                >
                  <Check className="size-4 shrink-0 text-green-600 2xl:size-5" />
                  {feature}
                </li>
              ),
          )}
        </ul>

        <Link
          href="/configure/upload"
          className={cn(
            buttonVariants({
              size: "default",
            }),
            "group mx-auto w-fit items-center gap-1",
          )}
        >
          Customize your case now
          <ArrowRight className="size-4 transition duration-200 group-hover:translate-x-0.5" />
        </Link>
      </MaxWidthWrapper>
    </section>
  </div>
);

export default HomePage;
