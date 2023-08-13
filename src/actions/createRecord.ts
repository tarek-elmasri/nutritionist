"use server";

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

  return prisma.record.create({
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
  });
};

export default createRecord;
