"use server";

import { contactSchema, type ContactInput } from "@/lib/schemas";

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<keyof ContactInput, string>> };

export async function submitContact(input: unknown): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactInput;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      ok: false,
      error: "Champs invalides",
      fieldErrors,
    };
  }

  if (parsed.data.website && parsed.data.website.length > 0) {
    return { ok: true };
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("[contact] CONTACT_WEBHOOK_URL non défini, message non transmis.");
    return { ok: true };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...parsed.data,
        submittedAt: new Date().toISOString(),
        source: "contact-form",
      }),
    });
    if (!res.ok) {
      return {
        ok: false,
        error:
          "Nous n'avons pas pu transmettre votre message. Réessayez ou écrivez-nous directement.",
      };
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      error:
        "Erreur réseau. Réessayez dans un instant ou écrivez-nous directement.",
    };
  }
}
