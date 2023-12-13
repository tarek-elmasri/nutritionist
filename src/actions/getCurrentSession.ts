"use server";

import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";

const currentSession = () => getServerSession(authOptions);
export default currentSession;
