"use server";

import prisma from "@/server/prisma";
import { type CreateProfileForm } from "@/hooks/useCreateProfile";
import profileSchema from "@/lib/validations/profile-schema";
import routes from "@/constants/routes";

const createProfile = async (form: CreateProfileForm) => {
  const data = profileSchema.parse(form);
  const { height, weight, ...rest } = data;

  const profile = await prisma.profile.create({
    data: { ...rest, records: { create: [{ height, weight }] } },
  });

  // create notification for the admin user
  const adminUser = await prisma.user.findFirst({ where: { isAdmin: true } });
  if (adminUser) {
    await prisma.notification.create({
      data: {
        userId: adminUser.id,
        href: `${routes.consoleProfiles}/${profile.id}`,
        label: `New profile created: ${profile.name}`,
      },
    });
  }

  return profile;
};

export default createProfile;
