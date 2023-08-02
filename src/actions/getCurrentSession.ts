"use server";

import authOptions from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const currentSession = () => getServerSession(authOptions);
export default currentSession;
