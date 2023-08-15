import createMessage from "@/actions/createMessage";
import getCurrentUser from "@/actions/get CurrentUser";
import { getProfiles } from "@/actions/getProfiles";
import MessageForm from "@/components/message-form";
import routes from "@/constants/routes";

const ConsoleNewMessagePage = async () => {
  const currentUser = await getCurrentUser();
  const senderId = currentUser!.id;
  const profiles = await getProfiles();

  return (
    <MessageForm
      onSubmit={createMessage}
      recieverId=""
      recieverList={profiles}
      senderId={senderId}
      redirectTo={routes.consoleInbox}
    />
  );
};

export default ConsoleNewMessagePage;