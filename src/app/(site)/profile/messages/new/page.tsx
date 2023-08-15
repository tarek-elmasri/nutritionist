import createMessage from "@/actions/createMessage";
import getCurrentUser from "@/actions/get CurrentUser";
import getAdminUserId from "@/actions/getAdminUser";
import MessageForm from "@/components/message-form";
import routes from "@/constants/routes";

const UserNewMessagePage = async () => {
  const currentUser = await getCurrentUser();
  const senderId = currentUser!.id; // protected route
  const recieverId = (await getAdminUserId())!;

  return (
    <MessageForm
      senderId={senderId}
      recieverId={recieverId}
      onSubmit={createMessage}
      redirectTo={currentUser!.isAdmin ? routes.consoleInbox : routes.userInbox}
    />
  );
};

export default UserNewMessagePage;
