"use server";

import getCurrentSession from "./getCurrentSession";

const getCurrentUser = async () => (await getCurrentSession())?.user;

export default getCurrentUser;
