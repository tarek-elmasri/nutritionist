"use server";

import routes from "@/constants/routes";
import prisma from "@/lib/prisma";
import { parseDateWithoutTime } from "@/lib/utils";
import { RecordsSchema } from "@/lib/validations/records-schema";

/**
 * create records,
 * only allows one record per day
 */
const createRecord = async (form: RecordsSchema) => {
  // find any records created at same day
  const {
    profileId,
    height,
    weight,
    waist,
    bust,
    abdominalGirth,
    hips,
    arm,
    thighs,
  } = form;

  const record = await prisma.record.findFirst({
    where: {
      profileId,
      createdAt: {
        gte: parseDateWithoutTime(new Date()),
      },
    },
  });

  if (record) throw new Error("Only one record is allowed per day");

  const newRecord = await prisma.record.create({
    data: {
      profileId,
      height,
      weight,
      bust,
      waist,
      abdominalGirth,
      hips,
      arm,
      thighs,
    },
    include: {
      profile: true,
    },
  });

  // create notification for admin user
  const adminUser = await prisma.user.findFirst({ where: { isAdmin: true } });

  if (adminUser) {
    await prisma.notification.create({
      data: {
        userId: adminUser.id,
        label: `New record added by: ${newRecord.profile.name}`,
        href: `${routes.consoleProfiles}/${profileId}`,
      },
    });
  }

  return newRecord;
};

export default createRecord;
