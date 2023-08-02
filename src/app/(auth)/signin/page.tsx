import Image from "next/image";
import backImg from "@/assets/auth-image.png";
import AuthForm from "@/components/auth-form";
import getCurrentUser from "@/actions/get CurrentUser";
import { redirect } from "next/navigation";

interface LoginPageProps {
  searchParams: {
    callbackURL?: string;
  };
}
const LoginPage = async ({ searchParams }: LoginPageProps) => {
  const user = await getCurrentUser();

  const redirectUrl = searchParams.callbackURL ?? `/profile`;
  if (user?.email) redirect(redirectUrl);

  return (
    <div className="h-full min-h-screen w-full">
      <div className="grid grid-cols-2">
        <div className="self-center justify-self-center w-full max-w-sm">
          <AuthForm variant="SIGN_IN" callbackURL={redirectUrl} />
        </div>
        {/* auth img */}
        <Image
          src={backImg}
          alt=""
          priority
          className="h-screen w-auto justify-self-end"
        />
      </div>
    </div>
  );
};

export default LoginPage;
