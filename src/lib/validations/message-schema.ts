import * as z from "zod";

const messageCoreSchema = z.object({
  title: z.string().nonempty("Required"),
  body: z.string(),
});

const messageSchema = z.object({
  recieverId: z.string().cuid(),
  senderId: z.string().cuid(),
  message: messageCoreSchema,
});

export type MessageSchema = z.infer<typeof messageSchema>;

export default messageSchema;
