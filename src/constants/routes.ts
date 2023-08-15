import { TABS } from "@/constants";

const consoleProfiles = `/console/profiles`;
const userDietPlan = `/profile/diets`;
const userMessage = `/profile/messages`;
const consoleMessage = "/console/messages";
const userInbox = `/profile?tab=${TABS.MESSAGES}`;
const consoleInbox = `/console?tab=${TABS.MESSAGES}`;

const routes = {
  consoleProfiles,
  userDietPlan,
  userMessage,
  consoleMessage,
  userInbox,
  consoleInbox,
};

export default routes;
