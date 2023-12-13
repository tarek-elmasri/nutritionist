import createMessage from "@/actions/createMessage";
import getCurrentUser from "@/actions/get CurrentUser";
import { getMessageById, getReplyForm } from "@/actions/getMessages";
import MessageForm from "@/components/message-form";
import routes from "@/constants/routes";
import { redirect } from "next/navigation";
import type { FC } from "react";

interface ReplyPageProps {
  params: {
    messageId: string;
  };
}

const ReplyPage: FC<ReplyPageProps> = async ({ params }) => {
  const currentUser = await getCurrentUser(); // protected route

  const userMessage = await getMessageById(currentUser!.id, params.messageId);
  if (!userMessage) redirect("/not-found");

  const isOwnMessage = currentUser!.id === userMessage.senderId;
  const initData = await getReplyForm(userMessage.messageId);

  return (
    <MessageForm
      initData={initData}
      senderId={currentUser!.id}
      recieverId={isOwnMessage ? userMessage.recieverId : userMessage.senderId}
      onSubmit={createMessage}
      redirectTo={routes.userInbox}
    />
  );
};

export default ReplyPage;
