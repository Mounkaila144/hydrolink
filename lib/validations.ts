import { z } from "zod";

export const contactFormSchema = z.object({
  fullname: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  subject: z.string().min(5, "Le sujet doit contenir au moins 5 caractères"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

export const quoteFormSchema = z.object({
  fullname: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  service: z.enum(["btp", "hydraulique", "ecommerce", "commerce_general"]),
  budget: z.string().optional(),
  city: z.string().min(2, "Veuillez spécifier la localisation").optional(),
  deadline: z.string().optional(),
  attachment: z.any().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type QuoteFormData = z.infer<typeof quoteFormSchema>;