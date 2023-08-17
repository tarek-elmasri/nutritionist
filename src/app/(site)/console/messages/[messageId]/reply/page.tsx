import createMessage from "@/actions/createMessage";
import getCurrentUser from "@/actions/get CurrentUser";
import { getMessageById, getReplyForm } from "@/actions/getMessages";
import { getProfiles } from "@/actions/getProfiles";
import MessageForm from "@/components/message-form";
import routes from "@/constants/routes";
import { redirect } from "next/navigation";
import { FC } from "react";

interface ReplyPageProps {
  params: {
    messageId: string;
  };
}

const ReplyPage: FC<ReplyPageProps> = async ({ params }) => {
  const currentUser = await getCurrentUser(); // protected route
  const senderId = currentUser!.id;

  const userMessage = await getMessageById(currentUser!.id, params.messageId);
  if (!userMessage) redirect("/not-found");

  const profiles = await getProfiles();

  const initData = await getReplyForm(userMessage.messageId);

  return (
    <MessageForm
      recieverId={userMessage.senderId}
      senderId={senderId}
      redirectTo={routes.consoleInbox}
      initData={initData}
      recieverList={profiles}
      onSubmit={createMessage}
    />
  );
};

export default ReplyPage;
