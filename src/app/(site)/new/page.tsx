import NewProfileForm from "./(components)/new-profile-form";
import getCurrentUser from "@/actions/get CurrentUser";
import { getProfile } from "@/actions/getProfiles";
import { redirect } from "next/navigation";
import createProfile from "@/actions/createProfile";
import Image from "next/image";
import backImg from "@/assets/auth-image.png";

const NewProfilePage = async () => {
  const user = await getCurrentUser();
  const profile = await getProfile(user?.id!); // protected page - user is available

  if (profile) redirect("/profile");

  return (
    <main className="relative min-h-[100dvh] grid lg:grid-cols-2">
      {/* form container */}
      <div className="relative z-10 py-12 self-center justify-self-center">
        <NewProfileForm userId={user?.id!} onSubmit={createProfile} />
      </div>

      {/* background image */}
      <div className="absolute top-0 right-0 opacity-5 lg:opacity-100 lg:static">
        <Image src={backImg} alt="" className="h-full object-cover w-auto" />
      </div>
    </main>
  );
};

export default NewProfilePage;
