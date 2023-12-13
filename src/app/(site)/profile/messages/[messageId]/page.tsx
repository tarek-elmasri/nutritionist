import getCurrentUser from "@/actions/get CurrentUser";
import { getMessageById } from "@/actions/getMessages";
import updateMessage from "@/actions/updateMessage";
import Message from "@/components/message";
import routes from "@/constants/routes";
import { redirect } from "next/navigation";
import type { FC } from "react";

interface UserShowMessagePageProps {
  params: {
    messageId: string;
  };
}
const UserShowMessagePage: FC<UserShowMessagePageProps> = async ({
  params,
}) => {
  const currentUser = await getCurrentUser(); // protected route
  const message = await getMessageById(currentUser!.id, params.messageId);

  if (!message) redirect("/not-found");

  const isInboxMessage = currentUser!.id === message.recieverId;

  if (isInboxMessage && !message.seen) {
    await updateMessage(currentUser!.id, params.messageId);
  }

  return (
    <Message
      type={isInboxMessage ? "INBOX" : "OUTBOX"}
      data={message}
      messagesLink={routes.userMessage}
      redirectAfterDelete={routes.userInbox}
    />
  );
};

export default UserShowMessagePage;
