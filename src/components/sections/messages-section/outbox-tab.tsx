"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import TableLoader from "@/components/ui/table-loader";
import useFetch from "@/hooks/useFetch";
import { columns, filterKeys } from "./outbox-columns";
import { format } from "date-fns";
import { getSentMessages } from "@/actions/getMessages";
import { type FC, useTransition } from "react";
import { useRouter } from "next/navigation";
import PageLoader from "@/components/ui/page-loader";

interface OutboxTabProps {
  userId: string;
  messagesLink: string;
}

const OutboxTab: FC<OutboxTabProps> = ({ userId, messagesLink }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { data: userMessages, isLoading } = useFetch(() =>
    getSentMessages(userId)
  );

  const formattedMessages = userMessages?.map((userMessage) => ({
    id: userMessage.id,
    senderId: userId,
    reciever: userMessage.reciever.Profile?.name ?? userMessage.reciever.name!,
    title: userMessage.message.title,
    href: messagesLink,
    createdAt: format(userMessage.message.createdAt, "dd-MM-yyyy"),
  }));

  if (isLoading) return <TableLoader id="outbox-loader" />;
  return (
    <div className="space-y-6">
      {isPending && <PageLoader />}
      <div className="flex items-center justify-between">
        <h4 className="section-header">Messages</h4>
        <Button
          size={"sm"}
          type="button"
          onClick={() =>
            startTransition(() => router.push(`${messagesLink}/new`))
          }
        >
          New
        </Button>
      </div>

      <div>
        <DataTable
          columns={columns}
          data={formattedMessages ?? []}
          filterKeys={filterKeys}
        />
      </div>
    </div>
  );
};

export default OutboxTab;
