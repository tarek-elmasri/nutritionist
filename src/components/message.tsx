"use client";

import type { MessageDetails } from "@/type";
import { type FC, useTransition } from "react";
import Separator from "@/components/ui/separator";
import { Button } from "./ui/button";
import { Reply, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import deleteMessage, { deleteSentMessage } from "@/actions/deleteMessage";
import PageLoader from "./ui/page-loader";

type MessageProps = {
  data: MessageDetails;
  redirectAfterDelete: string;
  messagesLink: string;
  type: "INBOX" | "OUTBOX";
};

const Message: FC<MessageProps> = ({
  data: userMessage,
  messagesLink,
  redirectAfterDelete,
  type,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleOnDelete = async () => {
    startTransition(async () => {
      try {
        if (type === "INBOX") {
          await deleteMessage(userMessage.recieverId, userMessage.id);
        } else {
          await deleteSentMessage(userMessage.senderId, userMessage.id);
        }
        router.push(redirectAfterDelete);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    });
  };
  return (
    <div className="space-y-6">
      {isPending && <PageLoader />}
      <h4 className="section-header">{userMessage.message.title}</h4>

      <div className="flex items-center gap-12">
        <div>
          <p className="font-semibold">
            From: {userMessage.sender.Profile?.name ?? userMessage.sender.name}
          </p>
          <p className="text-xs font-semibold">
            at: {userMessage.message.createdAt.toDateString()}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size={"icon"}
            type="button"
            className="w-7 h-7 aspect-square rounded-full"
            onClick={() =>
              startTransition(() =>
                router.push(`${messagesLink}/${userMessage.id}/reply`)
              )
            }
            disabled={isPending}
          >
            <Reply className="w-4 h-h" color="#fff" />
          </Button>
          <Button
            size={"icon"}
            type="button"
            variant={"destructive"}
            className="w-7 h-7 aspect-square rounded-full"
            onClick={handleOnDelete}
            disabled={isPending}
          >
            <Trash2 className="w-4 h-h" color="#fff" />
          </Button>
        </div>
      </div>

      <Separator />
      <div className="p-6 whitespace-pre-wrap">{userMessage.message.body}</div>
    </div>
  );
};

export default Message;
