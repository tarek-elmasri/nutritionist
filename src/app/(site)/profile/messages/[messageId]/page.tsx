import deleteMessage from "@/actions/deleteMessage";
import getCurrentUser from "@/actions/get CurrentUser";
import { getMessageById } from "@/actions/getMessages";
import updateMessage from "@/actions/updateMessage";
import Message from "@/components/message";
import routes from "@/constants/routes";
import { redirect } from "next/navigation";
import { FC } from "react";

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
  await updateMessage(currentUser!.id, params.messageId);

  return (
    <Message
      data={message}
      onDelete={deleteMessage}
      redirectAfterDelete={routes.userInbox}
    />
  );
};

export default UserShowMessagePage;
