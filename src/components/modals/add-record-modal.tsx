"use client";

import recordsSchema, {
  type RecordsSchema,
} from "@/lib/validations/records-schema";
import type { FC } from "react";
import Modal from "@/components/ui/modal";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Separator from "@/components/ui/separator";
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
import { Button } from "@/components/ui/button";

interface AddRecordModalProps {
  profileId: string;
  initialData?: { weight?: number; height?: number };
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (form: RecordsSchema) => void;
}

const AddRecordModal: FC<AddRecordModalProps> = ({
  profileId,
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const form = useForm<RecordsSchema>({
    resolver: zodResolver(recordsSchema),
    defaultValues: {
      height: initialData?.height ?? 0,
      weight: initialData?.weight ?? 0,
      profileId,
    },
  });

  const handleSubmit = (form: RecordsSchema) => {
    onSubmit(form);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <DialogHeader>
        <DialogTitle>Add new record</DialogTitle>
        <Separator className="py-3" />
      </DialogHeader>

      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid grid-cols-2 gap-6 items-end">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight:</FormLabel>
                  <FormControl>
                    <Input {...field} className="max-w-[6rem]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height:</FormLabel>
                  <FormControl>
                    <Input {...field} className="max-w-[6rem]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bust"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Bust: <span className="text-xs">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="max-w-[6rem]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="waist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Waist: <span className="text-xs">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="max-w-[6rem]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="abdominalGirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Abdominal Girth: <span className="text-xs">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="max-w-[6rem]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hips"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Hips: <span className="text-xs">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="max-w-[6rem]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="arm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Arm: <span className="text-xs">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="max-w-[6rem]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thighs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Thighs: <span className="text-xs">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="max-w-[6rem]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
              Add
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default AddRecordModal;
