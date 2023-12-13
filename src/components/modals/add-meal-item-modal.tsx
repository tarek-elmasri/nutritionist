"use client";

import { type FC, useMemo, useState } from "react";
import Modal from "@/components/ui/modal";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Separator from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import type { MealItemForm, ServeTypeKey } from "@/type";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import type { Food } from "@prisma/client";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type MealItemSchema,
  mealItemSchema,
} from "@/lib/validations/create-diet-plan-schema";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { serveOptions } from "@/constants/serves";

interface AddMealItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mealItem: MealItemForm) => void;
  items: Food[];
}

const AddMealItemModal: FC<AddMealItemModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  items,
}) => {
  const [isServeTypeMenuOpen, setIsServeTypeMenuOpen] = useState(false);
  const [currentServeType, setCurrentServeType] = useState<ServeTypeKey | null>(
    serveOptions[0]!.value
  );
  const [isItemMenuOpen, setIsItemMenuOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(mealItemSchema),
    defaultValues: {
      amount: 1,
      itemId: "",
    } as MealItemSchema,
  });

  const itemId = form.watch("itemId");
  const serveAmount = form.watch("amount");

  const currentServeTypeLabel = useMemo(
    () =>
      serveOptions.find((serve) => serve.value === currentServeType)?.label ??
      "Select Serve Category ...",
    [currentServeType]
  );

  const serveTypeItems = useMemo(
    () => items.filter((item) => item.serveType === currentServeType),
    [currentServeType, items]
  );

  const currentItemLabel = useMemo(() => {
    const currentItem = items.find((item) => item.id === itemId);
    return currentItem
      ? `${(parseInt(serveAmount.toString()) || 1) * currentItem.amount} ${
          currentItem.unit
        } ${currentItem.label}`
      : "Select Item ...";
  }, [itemId, serveAmount, items]);

  const handleSubmit = (data: MealItemSchema) => {
    const mealItem: MealItemForm = {
      ...data,
      item: items.find((item) => item.id === data.itemId)!,
    };
    onSubmit(mealItem);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <DialogHeader>
        <DialogTitle>Add Item</DialogTitle>
        <Separator className="py-3" />
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            name="serveCategory"
            render={() => (
              <FormItem>
                <FormLabel className="block">Serve Category</FormLabel>
                <FormControl>
                  <Popover
                    open={isServeTypeMenuOpen}
                    onOpenChange={setIsServeTypeMenuOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isServeTypeMenuOpen}
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
                                setCurrentServeType(serveOption.value);
                                form.setValue("itemId", "");
                                setIsServeTypeMenuOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  currentServeType === serveOption.value
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

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Serve Count:</FormLabel>
                <FormControl>
                  <Input className="w-12" {...field} maxLength={2} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="itemId"
            render={() => (
              <FormItem>
                <FormLabel className="block">Select Item:</FormLabel>
                <FormControl>
                  <Popover
                    open={isItemMenuOpen}
                    onOpenChange={setIsItemMenuOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isItemMenuOpen}
                        className="w-[250px] justify-between"
                      >
                        {currentItemLabel}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[250px] p-0 max-h-[15rem] overflow-auto"
                      align="start"
                    >
                      <Command>
                        <CommandInput placeholder="Select Item ..." />
                        <CommandEmpty>No Result.</CommandEmpty>
                        <CommandGroup>
                          {serveTypeItems.map((item) => (
                            <CommandItem
                              key={item.id}
                              value={item.id}
                              onSelect={() => {
                                form.setValue("itemId", item.id);
                                setIsItemMenuOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  itemId === item.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {(parseInt(serveAmount.toString()) || 1) *
                                item.amount}{" "}
                              {item.unit} {item.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full gap-6 items-center">
            <Button size={"sm"} type="submit" className="w-20">
              Add
            </Button>
            <Button
              type="button"
              size={"sm"}
              className="w-20"
              variant={"ghost"}
              onClick={() => onClose()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default AddMealItemModal;
