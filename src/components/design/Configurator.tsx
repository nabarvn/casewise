"use client";

import { Rnd } from "react-rnd";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { cn, formatPrice } from "@/lib/utils";
import { ResizeHandler } from "@/components/design";
import { useEffect, useRef, useState, useTransition } from "react";
import { AspectRatio, ScrollArea, Label, Button } from "@/components/ui";
import { COLORS, FINISHES, MATERIALS, MODELS } from "@/lib/validators/options";

import {
  Description,
  Radio,
  RadioGroup,
  Label as RadioLabel,
} from "@headlessui/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown";

import { useToast } from "@/hooks/use-toast";
import { BASE_PRICE } from "@/config/products";
import { useUploadThing } from "@/lib/uploadthing";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";

import {
  saveConfig as _saveConfig,
  SaveConfigArgs,
} from "@/server/actions/configurator";

interface DesignConfiguratorProps {
  configId: string;
  imageUrl: string;
  imageName: string;
  imageDimensions: { width: number; height: number };
}

const DesignConfigurator = ({
  configId,
  imageUrl,
  imageName,
  imageDimensions,
}: DesignConfiguratorProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isTransitioning, startTransition] = useTransition();

  const dropdownMenuTriggerRef = useRef<HTMLButtonElement>(null);

  const [dropdownMenuContentWidth, setDropdownMenuContentWidth] =
    useState<string>("");

  useEffect(() => {
    if (dropdownMenuTriggerRef.current) {
      setDropdownMenuContentWidth(
        `${dropdownMenuTriggerRef.current.offsetWidth}px`,
      );
    }
  }, []);

  const { mutate: saveConfig, isPending } = useMutation({
    mutationKey: ["save-config"],
    mutationFn: async (args: SaveConfigArgs) => {
      await Promise.all([saveConfiguration(), _saveConfig(args)]);
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "There was an error on our end. Please try again later.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => router.push(`/configure/preview?id=${configId}`));
    },
  });

  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
    material: (typeof MATERIALS.options)[number];
    finish: (typeof FINISHES.options)[number];
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });

  const [renderedDimension, setRenderedDimension] = useState({
    width: imageDimensions.width / 4,
    height: imageDimensions.height / 4,
  });

  const [renderedPosition, setRenderedPosition] = useState({
    x: 150,
    y: 205,
  });

  const phoneCaseRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { startUpload } = useUploadThing("imageUploader");

  async function saveConfiguration() {
    {
      /*
            This function essentially captures the position of an image within a container, 
            draws it onto a canvas, converts the canvas to an image file, and then uploads this file.
        */
    }

    if (!phoneCaseRef.current || !containerRef.current) return;

    try {
      const {
        left: caseLeft,
        top: caseTop,
        width,
        height,
      } = phoneCaseRef.current.getBoundingClientRect();

      const { left: containerLeft, top: containerTop } =
        containerRef.current.getBoundingClientRect();

      const leftOffset = caseLeft - containerLeft;
      const topOffset = caseTop - containerTop;

      const actualX = renderedPosition.x - leftOffset;
      const actualY = renderedPosition.y - topOffset;

      const canvas = document.createElement("canvas");

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");

      const userImage = new Image();
      userImage.crossOrigin = "anonymous";
      userImage.src = imageUrl;

      // waiting for the `userImage` to be successfully loaded
      await new Promise((resolve) => (userImage.onload = resolve));

      ctx?.drawImage(
        userImage,
        actualX,
        actualY,
        renderedDimension.width,
        renderedDimension.height,
      );

      // base64 encoding is a way to represent binary data (like images or files) in an ASCII string format
      const base64 = canvas.toDataURL();
      const base64Data = base64.split(",")[1];

      // converting into a binary large object
      const blob = base64ToBlob(base64Data, "image/png");

      const file = new File(
        [blob],
        `${imageName}_cropped_${configId.slice(-4)}.png`,
        { type: "image/png" },
      );

      await startUpload([file], { configId });
    } catch (err) {
      toast({
        title: "Something went wrong",
        description:
          "There was a problem saving your config, please try again later.",
        variant: "destructive",
      });
    }
  }

  function base64ToBlob(base64: string, mimeType: string) {
    // decoding into a string where each character represents a byte of the image binary data
    const byteCharacters = atob(base64);

    // creating a new array to hold the ASCII values corresponding to each character
    const byteNumbers = new Array(byteCharacters.length);

    // converting the binary string into an array of numerical byte values
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    // creating a typed array from the numerical byte values
    // it ensures that JS engine treats each element strictly as a byte
    // this is crucial because `Blob` expects a binary format input
    const byteArray = new Uint8Array(byteNumbers);

    return new Blob([byteArray], { type: mimeType });
  }

  return (
    <div className="relative my-20 grid grid-cols-1 gap-x-6 gap-y-8 pb-20 lg:grid-cols-3">
      <div
        ref={containerRef}
        className="relative col-span-2 flex h-[37.5rem] w-full max-w-4xl items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 xl:h-[calc(100svh-56px)] 2xl:h-[37.5rem]"
      >
        <div className="pointer-events-none relative aspect-[896/1831] w-60 bg-opacity-50">
          <AspectRatio
            ref={phoneCaseRef}
            ratio={896 / 1831}
            className="pointer-events-none relative z-40 aspect-[896/1831] w-full"
          >
            <NextImage
              fill
              alt="phone image"
              src="/phone-template.png"
              className="pointer-events-none select-none"
            />
          </AspectRatio>

          <div className="absolute inset-0 bottom-px left-[3px] right-[3px] top-px z-40 rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />

          <div
            className={cn(
              "absolute inset-0 bottom-px left-[3px] right-[3px] top-px rounded-[32px]",
              {
                "bg-zinc-900": options.color.value === "black",
                "bg-rose-950": options.color.value === "rose",
                "bg-blue-950": options.color.value === "blue",
              },
            )}
          />
        </div>

        <Rnd
          default={{
            x: 150,
            y: 205,
            height: imageDimensions.height / 4,
            width: imageDimensions.width / 4,
          }}
          onResizeStop={(_, __, ref, ___, { x, y }) => {
            setRenderedDimension({
              height: parseInt(ref.style.height.slice(0, -2)),
              width: parseInt(ref.style.width.slice(0, -2)),
            });

            setRenderedPosition({ x, y });
          }}
          onDragStop={(_, data) => {
            const { x, y } = data;
            setRenderedPosition({ x, y });
          }}
          resizeHandleComponent={{
            topLeft: <ResizeHandler />,
            topRight: <ResizeHandler />,
            bottomLeft: <ResizeHandler />,
            bottomRight: <ResizeHandler />,
          }}
          lockAspectRatio
          disableDragging={isPending || isTransitioning}
          className="absolute z-20 border-[3px] border-primary"
        >
          <div className="relative h-full w-full">
            <NextImage
              fill
              alt="your image"
              src={imageUrl}
              className="pointer-events-none"
            />
          </div>
        </Rnd>
      </div>

      <div className="col-span-full flex w-full flex-col rounded-lg bg-white lg:col-span-1 lg:h-[37.5rem] xl:h-[calc(100svh-56px)] 2xl:h-[37.5rem]">
        <ScrollArea className="relative flex-1 overflow-auto">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-white"
          />

          <div className="px-8 py-4">
            <h2 className="text-3xl font-bold tracking-tight">
              Customize your case
            </h2>

            <div className="my-6 h-px w-full bg-zinc-200" />

            <div className="relative mt-4 flex h-full flex-col justify-between">
              <div className="flex flex-col gap-6">
                <RadioGroup
                  value={options.color}
                  onChange={(val) => {
                    setOptions((prev) => ({
                      ...prev,
                      color: val,
                    }));
                  }}
                >
                  <Label>Color: {options.color.label}</Label>

                  <div className="mt-3 flex items-center space-x-3">
                    {COLORS.map((color) => (
                      <Radio
                        key={color.label}
                        value={color}
                        className={({ focus, checked }) =>
                          cn(
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full border-2 border-transparent p-0.5 focus:outline-none focus:ring-0 active:outline-none active:ring-0",
                            {
                              "border-zinc-900":
                                color.value === "black" && (focus || checked),
                              "border-rose-950":
                                color.value === "rose" && (focus || checked),
                              "border-blue-950":
                                color.value === "blue" && (focus || checked),
                              "cursor-default": isPending || isTransitioning,
                            },
                          )
                        }
                        disabled={isPending || isTransitioning}
                      >
                        <span
                          className={cn(
                            "size-8 rounded-full border border-black border-opacity-10",
                            {
                              "bg-zinc-900": color.value === "black",
                              "bg-rose-950": color.value === "rose",
                              "bg-blue-950": color.value === "blue",
                            },
                          )}
                        />
                      </Radio>
                    ))}
                  </div>
                </RadioGroup>

                <div className="relative flex w-full flex-col gap-3">
                  <Label>Model</Label>

                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      disabled={isPending || isTransitioning}
                    >
                      <Button
                        role="combobox"
                        variant="outline"
                        className="w-full justify-between"
                        ref={dropdownMenuTriggerRef}
                      >
                        {options.model.label}
                        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      className="space-y-1"
                      style={{ width: dropdownMenuContentWidth }}
                    >
                      {MODELS.options.map((model) => (
                        <DropdownMenuItem
                          key={model.label}
                          className={cn(
                            "flex cursor-default items-center gap-1 p-1.5 text-sm hover:bg-zinc-100",
                            {
                              "bg-zinc-100":
                                model.label === options.model.label,
                            },
                          )}
                          onClick={() => {
                            setOptions((prev) => ({ ...prev, model }));
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 size-4",
                              model.label === options.model.label
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />

                          {model.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {[MATERIALS, FINISHES].map(
                  ({ name, options: selectableOptions }) => (
                    <RadioGroup
                      key={name}
                      value={options[name]}
                      onChange={(val) => {
                        setOptions((prev) => ({
                          ...prev,
                          [name]: val,
                        }));
                      }}
                    >
                      <Label>
                        {name.slice(0, 1).toUpperCase() + name.slice(1)}
                      </Label>

                      <div className="mt-3 space-y-4">
                        {selectableOptions.map((option) => (
                          <Radio
                            key={option.value}
                            value={option}
                            className={({ focus, checked }) =>
                              cn(
                                "relative block cursor-pointer rounded-lg border-2 border-zinc-200 bg-white px-6 py-4 shadow-sm outline-none ring-0 focus:outline-none focus:ring-0 sm:flex sm:justify-between",
                                {
                                  "border-primary": focus || checked,

                                  "cursor-default":
                                    isPending || isTransitioning,
                                },
                              )
                            }
                            disabled={isPending || isTransitioning}
                          >
                            <span className="flex items-center">
                              <span className="flex flex-col text-sm">
                                <RadioLabel
                                  as="span"
                                  className="font-medium text-gray-900"
                                >
                                  {option.label}
                                </RadioLabel>

                                {option.description ? (
                                  <Description
                                    as="span"
                                    className="text-gray-500"
                                  >
                                    <span className="block sm:inline">
                                      {option.description}
                                    </span>
                                  </Description>
                                ) : null}
                              </span>
                            </span>

                            <Description
                              as="span"
                              className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                            >
                              <span className="font-medium text-gray-900">
                                {formatPrice(option.price / 100)}
                              </span>
                            </Description>
                          </Radio>
                        ))}
                      </div>
                    </RadioGroup>
                  ),
                )}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex h-16 w-full flex-col justify-between rounded-b-lg bg-white px-8 pb-4">
          <div className="h-px w-full bg-zinc-200" />

          <div className="flex h-fit w-full items-center justify-end">
            <div className="flex w-full items-center gap-6">
              <p className="w-1/3 whitespace-nowrap font-medium">
                {formatPrice(
                  (BASE_PRICE + options.finish.price + options.material.price) /
                    100,
                )}
              </p>

              <Button
                size="sm"
                disabled={isPending || isTransitioning}
                className="group w-full gap-1.5"
                onClick={() =>
                  saveConfig({
                    configId,
                    color: options.color.value,
                    model: options.model.value,
                    material: options.material.value,
                    finish: options.finish.value,
                  })
                }
              >
                {isPending || isTransitioning ? "Saving" : "Continue"}

                {isPending || isTransitioning ? (
                  <span className="mt-1 flex items-center gap-x-1">
                    <span className="inline-block h-1 w-1 animate-flashing rounded-full bg-white" />
                    <span className="inline-block h-1 w-1 animate-flashing rounded-full bg-white delay-100" />
                    <span className="inline-block h-1 w-1 animate-flashing rounded-full bg-white delay-200" />
                  </span>
                ) : (
                  <ArrowRight className="size-3 transition duration-200 group-hover:translate-x-0.5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignConfigurator;
