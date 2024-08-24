"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";
import { OrderStatus } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { changeOrderStatus } from "@/server/actions/order-status";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown";

const LABEL_MAP: Record<keyof typeof OrderStatus, string> = {
  fulfilled: "Fulfilled",
  shipped: "Shipped",
  awaiting_shipment: "Awaiting Shipment",
};

const StatusDropdown = ({
  id,
  orderStatus,
}: {
  id: string;
  orderStatus: OrderStatus;
}) => {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["change-order-status"],
    mutationFn: changeOrderStatus,
    onSuccess: () => router.refresh(),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex w-52 items-center justify-between hover:bg-white"
        >
          {LABEL_MAP[orderStatus]}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-52 space-y-1">
        {Object.keys(OrderStatus).map((status) => (
          <DropdownMenuItem
            key={status}
            onClick={() => mutate({ id, newStatus: status as OrderStatus })}
            className={cn(
              "flex cursor-default items-center gap-1 p-1.5 text-sm hover:bg-zinc-100",
              {
                "bg-zinc-100": orderStatus === status,
              },
            )}
          >
            <Check
              className={cn(
                "mr-2 size-4 text-primary",
                orderStatus === status ? "opacity-100" : "opacity-0",
              )}
            />

            {LABEL_MAP[status as OrderStatus]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDropdown;
