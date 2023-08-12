"use client";

import recordsSchema, { RecordsSchema } from "@/lib/validations/records-schema";
import React, { FC } from "react";
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
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight:</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
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
    </Modal>
  );
};

export default AddRecordModal;
