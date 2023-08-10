"use server";

import prisma from "@/lib/prisma";

const getFood = () => prisma.food.findMany();

export default getFood;
