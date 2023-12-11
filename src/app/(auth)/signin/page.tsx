import Image from "next/image";
import backImg from "@/assets/auth-image.png";
import AuthForm from "@/components/auth-form";
import getCurrentUser from "@/actions/get CurrentUser";
import { redirect } from "next/navigation";

interface LoginPageProps {
  searchParams: {
    callbackUrl?: string;
  };
}
const LoginPage = async ({ searchParams }: LoginPageProps) => {
  // TODO: redirection through middleware
  const user = await getCurrentUser();

  const redirectUrl =
    searchParams.callbackUrl ?? user?.isAdmin ? "/console" : `/profile`;

  if (user?.email && user.isAdmin) redirect("/console");
  if (user?.email) redirect(redirectUrl);

  return (
    <main className="relative min-h-[100dvh] grid md:grid-cols-2">
      {/* form container */}
      <div className="relative z-10 max-w-md self-center justify-self-center">
        <AuthForm variant="SIGN_IN" callbackURL={redirectUrl} />
      </div>

      {/* background image */}
      <div className="absolute top-0 right-0 opacity-10 md:opacity-100 md:static">
        <Image src={backImg} alt="fruits" className="h-full w-auto" />
      </div>
    </main>
  );
};

export default LoginPage;
