// "use client";

// import * as z from "zod";
// import profileSchema from "@/lib/validations/profile-schema";
// import useCreateProfile from "@/hooks/useCreateProfile";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { SubscriptionPlan } from "@prisma/client";
// import { FC } from "react";
// import SubscriptionPlanCard from "@/components/subscription-plan-card";

// const plansSchema = profileSchema.pick({
//   subscriptionPlanId: true,
// });
// type PlanSchema = z.infer<typeof plansSchema>;

// interface PlansStepProps {
//   subscriptionPlans: SubscriptionPlan[];
// }

// const PlansStep: FC<PlansStepProps> = ({ subscriptionPlans }) => {
//   const { form: data, setForm, prevStep, nextStep } = useCreateProfile();
//   const form = useForm<PlanSchema>({
//     resolver: zodResolver(plansSchema),
//     defaultValues: { ...data, subscriptionPlanId: subscriptionPlans[0]?.id },
//   });

//   const planId = form.watch("subscriptionPlanId");

//   const handleNavigation = async (action: "NEXT" | "PREV") => {
//     setForm({
//       ...form.getValues(),
//     });
//     if (action === "NEXT") {
//       nextStep();
//     } else {
//       prevStep();
//     }
//   };

//   return (
//     <div className="w-full space-y-6">
//       <h1 className="text-lg font-semibold text-center">Choose your plan</h1>

//       <Form {...form}>
//         <form className="space-y-6">
//           <div className="w-full grid grid-cols-2 gap-6">
//             {subscriptionPlans.map((plan) => (
//               <SubscriptionPlanCard
//                 key={plan.id}
//                 plan={plan}
//                 onClick={() => form.setValue("subscriptionPlanId", plan.id)}
//                 selected={plan.id === planId}
//               />
//             ))}

//           </div>
//           <div className=" flex flex-row-reverse items-center gap-3 w-full">
//             <Button
//               type="button"
//               className="w-full text-lg"
//               onClick={form.handleSubmit(() => handleNavigation("NEXT"))}
//             >
//               Next
//             </Button>

//             <Button
//               type="button"
//               variant={"outline"}
//               className="w-full text-lg"
//               onClick={() => handleNavigation("PREV")}
//             >
//               Back
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default PlansStep;
