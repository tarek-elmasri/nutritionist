import AuthForm from "@/components/auth-form";
import getCurrentUser from "@/actions/get CurrentUser";
import { redirect } from "next/navigation";
import Image from "next/image";
import backImg from "@/assets/auth-image.png";

const SignupPage = async () => {
  // TODO: redirection through middleware
  const user = await getCurrentUser();

  const profileUrl = `/profile`;
  const newProfileUrl = `/new`;
  if (user?.email) redirect(profileUrl);

  return (
    <main className="relative min-h-[100dvh] grid md:grid-cols-2">
      {/* form container */}
      <div className="relative z-10 max-w-md self-center justify-self-center">
        <AuthForm variant="REGISTER" callbackURL={newProfileUrl} />
      </div>

      {/* background image */}
      <div className="absolute top-0 right-0 opacity-10 md:opacity-100 md:static">
        <Image src={backImg} alt="fruits" className="h-full w-auto" />
      </div>
    </main>
  );
};

export default SignupPage;
