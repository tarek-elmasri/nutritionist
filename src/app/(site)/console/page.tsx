import getCurrentUser from "@/actions/get CurrentUser";
import ConsoleView from "@/components/console-view";

const ConsolePage = async () => {
  const currentUser = await getCurrentUser(); // protected route

  return <ConsoleView userId={currentUser!.id} />;
};

export default ConsolePage;
