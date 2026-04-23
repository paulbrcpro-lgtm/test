import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Votre nom est requis").max(80),
  email: z.string().email("Adresse e-mail invalide").max(160),
  company: z.string().min(2, "Nom de société requis").max(120),
  role: z.string().max(120).optional().or(z.literal("")),
  monthlyBudget: z.enum(
    ["lt_5k", "5_15k", "15_50k", "50_100k", "gt_100k"],
    { errorMap: () => ({ message: "Sélectionnez une fourchette" }) },
  ),
  topic: z.enum(
    ["audit", "server_side", "pilotage", "other"],
    { errorMap: () => ({ message: "Sélectionnez un sujet" }) },
  ),
  message: z
    .string()
    .min(20, "Quelques phrases nous aident à préparer l'échange")
    .max(2000),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Merci d'accepter d'être recontacté" }),
  }),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const budgetLabels: Record<ContactInput["monthlyBudget"], string> = {
  lt_5k: "Moins de 5 000 € / mois",
  "5_15k": "5 000 à 15 000 € / mois",
  "15_50k": "15 000 à 50 000 € / mois",
  "50_100k": "50 000 à 100 000 € / mois",
  gt_100k: "Plus de 100 000 € / mois",
};

export const topicLabels: Record<ContactInput["topic"], string> = {
  audit: "Audit tracking",
  server_side: "Mise en place server-side",
  pilotage: "Pilotage Ads + mesure",
  other: "Autre sujet",
};
