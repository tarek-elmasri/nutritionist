"use client";

import foodSchema, { FoodSchema } from "@/lib/validations/food-schema";
import { FC, useState } from "react";
import Modal from "@/components/ui/modal";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Separator from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { serveLabels, serveOptions } from "@/constants/serves";
import { ServeTypeKey } from "@/type";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface CreateItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: FoodSchema) => void;
}

const CreateItemModal: FC<CreateItemModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [isServeMenuOpen, setIsServeMenuOpen] = useState(false);
  const form = useForm<FoodSchema>({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      amount: 1,
      unit: "",
      label: "",
      serveType: "fruit",
    },
  });

  const serveType = form.watch("serveType");
  const currentServeTypeLabel = serveLabels[serveType as ServeTypeKey];

  const handleSubmit = (item: FoodSchema) => {
    onSubmit(item);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <DialogHeader>
        <DialogTitle>Add Ingredient</DialogTitle>
        <Separator />
      </DialogHeader>

      <div className="px-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="etc tea-spoon, gram, peice"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity / Serve:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="serveType"
              render={() => (
                <FormItem className="pt-3">
                  <FormLabel className="block">Serve Category:</FormLabel>
                  <FormControl>
                    <Popover
                      open={isServeMenuOpen}
                      onOpenChange={setIsServeMenuOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={isServeMenuOpen}
                          className="w-[250px] justify-between"
                        >
                          {currentServeTypeLabel}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-[250px] p-0 max-h-[15rem] overflow-auto"
                        align="start"
                      >
                        <Command>
                          <CommandInput placeholder="Search Serve Type ..." />
                          <CommandEmpty>No Result.</CommandEmpty>
                          <CommandGroup>
                            {serveOptions.map((serveOption) => (
                              <CommandItem
                                key={serveOption.value}
                                value={serveOption.value}
                                onSelect={() => {
                                  form.setValue("serveType", serveOption.value);
                                  setIsServeMenuOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    serveType === serveOption.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {serveOption.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="py-3 flex items-center gap-6 justify-end">
              <Button
                variant={"ghost"}
                size={"sm"}
                type="button"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                size={"sm"}
                type="button"
                onClick={form.handleSubmit(handleSubmit)}
              >
                Create
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateItemModal;
