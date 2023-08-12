"use server";

import prisma from "@/lib/prisma";
import { RecordsSchema } from "@/lib/validations/records-schema";

const createRecord = ({ height, weight, profileId }: RecordsSchema) => {
  return prisma.record.create({
    data: {
      profileId,
      height,
      weight,
    },
  });
};

export default createRecord;
