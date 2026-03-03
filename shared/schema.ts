import { z } from "zod";

export const experienceSchema = z.object({
  recipientName: z.string().min(1, "Le nom du destinataire est requis"),
  senderName: z.string().min(1, "Votre nom est requis"),
  message: z.string().min(1, "Un message est requis"),
  theme: z.enum(["particles", "hearts", "waves"]).default("particles"),
});

export type Experience = z.infer<typeof experienceSchema>;
