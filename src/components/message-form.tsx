"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import messageSchema, {
  type MessageSchema,
} from "@/lib/validations/message-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Profile } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FC, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import PageLoader from "./ui/page-loader";

interface MessageFormProps {
  recieverId: string;
  senderId: string;
  redirectTo: string;
  recieverList?: Profile[];
  initData?: { title: string; body: string };
  onSubmit: (form: MessageSchema) => Promise<unknown>;
}
const MessageForm: FC<MessageFormProps> = ({
  recieverList,
  recieverId,
  senderId,
  initData,
  onSubmit,
  redirectTo,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: {
        title: initData?.title ?? "",
        body: initData?.body ?? "",
      },
      recieverId,
      senderId,
    },
  });

  const handleSubmit = async (form: MessageSchema) => {
    startTransition(async () => {
      try {
        await onSubmit(form);
        toast.success("Your message has been sent successfully.");
        router.push(redirectTo);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }
    });
  };

  return (
    <div className="space-y-6">
      {isPending && (
        <PageLoader message="Please wait while your message is being sent." />
      )}

      <h4 className="section-header">New Message</h4>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 max-w-xl"
        >
          {recieverList && (
            <FormField
              control={form.control}
              name="recieverId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>To:</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? recieverList.find(
                                (profile) => profile.userId === field.value
                              )?.name
                            : "Select User"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] max-h-[15rem] overflow-y-auto p-0">
                      <Command>
                        <CommandInput placeholder="Search user..." />
                        <CommandEmpty>No user found.</CommandEmpty>
                        <CommandGroup>
                          {recieverList.map((profile) => (
                            <CommandItem
                              value={profile.userId}
                              key={profile.id}
                              onSelect={() => {
                                form.setValue("recieverId", profile.userId);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  profile.userId === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {profile.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="message.title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject:</FormLabel>
                <FormControl>
                  <Input {...field} autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message.body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message:</FormLabel>
                <FormControl>
                  <Textarea className="resize-none" rows={10} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-6 pb-12">
            <Button type="submit">Send</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MessageForm;
