import getCurrentUser from "@/actions/get CurrentUser";
import {
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
  ValidationError,
  constructZodError,
} from "@/app/api/errors";
import prisma from "@/lib/prisma";
import dietPlanSchema from "@/lib/validations/create-diet-plan-schema";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params: { profileId } }: { params: { profileId: string } }
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new UnauthenticatedError();
    if (!currentUser.isAdmin) throw new UnauthorizedError();

    const json = await req.json();
    const form = {
      servePlan: json.servePlan,
      meals: json.meals,
      schedule: {
        startDate: new Date(json.schedule.startDate),
        endDate: new Date(json.schedule.endDate),
      },
    };
    const parsedData = dietPlanSchema.safeParse(form);
    if (!parsedData.success)
      throw new ValidationError(constructZodError(parsedData.error));

    const {
      servePlan,
      meals,
      schedule: { startDate, endDate },
    } = parsedData.data;

    const profile = await prisma.profile.findFirst({
      where: { id: profileId },
    });
    if (!profile) throw new NotFoundError();

    // create diet plan
    const dietPlan = await prisma.$transaction(async (tx) => {
      const plan = await tx.dietPlan.create({
        data: {
          profileId,
          servePlan: {
            create: servePlan,
          },
          startDate,
          endDate,
        },
      });

      // create array of promises for each meal and its content
      const promises = meals.map((meal) => {
        tx.meal.create({
          data: {
            dietPlanId: plan.id,
            label: meal.label,
            order: meal.order,
            contents: {
              createMany: {
                data: meal.contents,
              },
            },
          },
        });
      });

      // create meals
      await Promise.all(promises);

      return plan;
    });

    // TODO: create notification and message

    return NextResponse.json(dietPlan);
  } catch (error) {
    console.log(error, "DIET_PLAN_POST");
    if (error instanceof ValidationError) {
      return NextResponse.json({ errors: error.data }, { status: 400 });
    } else if (error instanceof UnauthenticatedError) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    } else if (error instanceof UnauthorizedError) {
      return NextResponse.json({ message: error.message }, { status: 403 });
    } else if (error instanceof NotFoundError) {
      return NextResponse.json({ message: error.message }, { status: 404 });
    } else {
      return new NextResponse("Server Error", { status: 500 });
    }
  }
};
