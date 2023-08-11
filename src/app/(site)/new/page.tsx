import { CreateProfileForm } from "@/hooks/useCreateProfile";
import profileSchema from "@/lib/validations/profile-schema";
import prisma from "@/lib/prisma";
import NewProfileForm from "./(components)/new-profile-form";
import getCurrentUser from "@/actions/get CurrentUser";
import { getProfile } from "@/actions/getProfiles";
import { redirect } from "next/navigation";

const createProfile = async (form: CreateProfileForm) => {
  "use server";
  const data = profileSchema.parse(form);
  const { height, weight, ...rest } = data;
  return prisma.profile.create({
    data: { ...rest, records: { create: [{ height, weight }] } },
  });
};

const NewProfilePage = async () => {
  const user = await getCurrentUser();
  const profile = await getProfile(user?.id!); // protected page - user is available

  if (profile) redirect("/profile");

  return (
    <div className="h-full w-full">
      {/* background image */}
      <div className="bg-image-fruits opacity-5 lg:opacity-100 pointer-events-none" />

      {/* form container */}
      <div className="relative z-10 h-full p-6 lg:px-28 xl:px-40  flex justify-center lg:justify-start items-center">
        <NewProfileForm userId={user?.id!} onSubmit={createProfile} />
      </div>
    </div>
  );
};

export default NewProfilePage;
