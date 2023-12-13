"use server";

import prisma from "@/server/prisma";

const getFood = () => prisma.food.findMany();

export default getFood;
