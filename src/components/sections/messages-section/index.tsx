"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import TableLoader from "@/components/ui/table-loader";
import useFetch from "@/hooks/useFetch";
import { columns, filterKeys } from "./columns";
import { format } from "date-fns";
import { getMessages } from "@/actions/getMessages";
import { FC } from "react";
import { useRouter } from "next/navigation";

interface MessagesSectionProps {
  userId: string;
  newMessageLink: string;
}

const MessagesSection: FC<MessagesSectionProps> = ({
  userId,
  newMessageLink,
}) => {
  const router = useRouter();

  const { data: userMessages, isLoading } = useFetch(() => getMessages(userId));

  const formattedMessages = userMessages?.map((userMessage) => ({
    id: userMessage.id,
    sender: userMessage.sender.Profile?.name || userMessage.sender.name!,
    title: userMessage.message.title,
    seen: userMessage.seen,
    createdAt: format(userMessage.message.createdAt, "dd-MM-yyyy"),
  }));

  if (isLoading) return <TableLoader />;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="section-header">Messages</h4>
        <Button
          size={"sm"}
          type="button"
          onClick={() => router.push(newMessageLink)}
        >
          New
        </Button>
      </div>

      <div>
        <DataTable
          columns={columns}
          data={formattedMessages || []}
          filterKeys={filterKeys}
          seenKey="seen"
        />
      </div>
    </div>
  );
};

export default MessagesSection;