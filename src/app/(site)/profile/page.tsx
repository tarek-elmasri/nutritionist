import getCurrentUser from "@/actions/get CurrentUser";
import { redirect } from "next/navigation";
import { getProfile } from "@/actions/getProfiles";

const ProfilePage = async () => {
  const user = await getCurrentUser();
  const profile = await getProfile(user!.id); // protected page, user should be available

  if (!profile) {
    redirect("/profile/new");
  }

  return <div>{profile.id}</div>;
};

export default ProfilePage;
