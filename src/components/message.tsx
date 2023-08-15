"use client";

import { MessageDetails } from "@/type";
import { FC, useState } from "react";
import Separator from "@/components/ui/separator";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { HashLoader } from "react-spinners";
import { useRouter } from "next/navigation";

type MessageProps = {
  data: MessageDetails;
} & (
  | {
      onDelete: (recieverId: string, messageId: string) => Promise<unknown>;
      redirectAfterDelete: string;
    }
  | {
      onDelete?: undefined;
      redirectAfterDelete?: undefined;
    }
);

const Message: FC<MessageProps> = ({
  data: userMessage,
  onDelete,
  redirectAfterDelete,
}) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOnDelete = async () => {
    if (!onDelete) return;
    try {
      setIsDeleting(true);
      await onDelete(userMessage.recieverId!, userMessage.id);

      if (redirectAfterDelete) {
        router.push(redirectAfterDelete);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div className="space-y-6">
      <h4 className="section-header">{userMessage.message.title}</h4>

      <div className="flex items-center gap-12">
        <div>
          <p className="font-semibold">
            From: {userMessage.sender.Profile?.name || userMessage.sender.name}
          </p>
          <p className="text-xs font-semibold">
            at: {userMessage.message.createdAt.toDateString()}
          </p>
        </div>
        {onDelete && (
          <Button
            size={"icon"}
            type="button"
            variant={"destructive"}
            className="w-7 h-7 aspect-square rounded-full"
            onClick={handleOnDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <HashLoader size={10} color="#fff" />
            ) : (
              <Trash2 className="w-4 h-h" color="#fff" />
            )}
          </Button>
        )}
      </div>

      <Separator />
      <div className="p-6">{userMessage.message.body}</div>
    </div>
  );
};

export default Message;
