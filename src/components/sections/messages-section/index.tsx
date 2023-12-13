"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { FC } from "react";
import InboxTab from "./inbox-tab";
import OutboxTab from "./outbox-tab";

interface MessageSectionProps {
  userId: string;
  messagesLink: string;
}

const MessagesSection: FC<MessageSectionProps> = ({ userId, messagesLink }) => {
  return (
    <Tabs defaultValue="inbox">
      <TabsList className="flex bg-lightgreen/40 mb-6">
        <TabsTrigger value="inbox" className="flex-1 font-semibold ">
          Inbox
        </TabsTrigger>
        <TabsTrigger value="outbox" className="flex-1 font-semibold ">
          Sent
        </TabsTrigger>
      </TabsList>
      <TabsContent value="inbox">
        <InboxTab userId={userId} messagesLink={messagesLink} />
      </TabsContent>
      <TabsContent value="outbox">
        <OutboxTab userId={userId} messagesLink={messagesLink} />
      </TabsContent>
    </Tabs>
  );
};

export default MessagesSection;
