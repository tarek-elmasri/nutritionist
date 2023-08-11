import AuthForm from "@/components/auth-form";
import getCurrentUser from "@/actions/get CurrentUser";
import { redirect } from "next/navigation";

const SignupPage = async () => {
  const user = await getCurrentUser();

  const profileUrl = `/profile`;
  const newProfileUrl = `/new`;
  if (user?.email) redirect(profileUrl);

  return (
    <div className="h-full w-full">
      {/* background image */}
      <div className="bg-image-fruits opacity-5 lg:opacity-100 pointer-events-none" />

      {/* form container */}
      <div className="relative z-10 h-full p-6  lg:px-28 xl:px-40  flex justify-center lg:justify-start items-center">
        <AuthForm variant="REGISTER" callbackURL={newProfileUrl} />
      </div>
    </div>
  );
};

export default SignupPage;
