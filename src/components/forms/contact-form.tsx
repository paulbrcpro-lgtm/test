"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  budgetLabels,
  contactSchema,
  topicLabels,
  type ContactInput,
} from "@/lib/schemas";
import { submitContact } from "@/app/contact/actions";
import { pushDataLayer } from "@/lib/gtm";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      monthlyBudget: undefined,
      topic: undefined,
      message: "",
      consent: undefined,
      website: "",
    },
  });

  const onSubmit = async (data: ContactInput) => {
    setState("submitting");
    setServerError(null);
    const res = await submitContact(data);
    if (res.ok) {
      pushDataLayer({
        event: "generate_lead",
        form_name: "contact",
        topic: data.topic,
        monthly_budget: data.monthlyBudget,
      });
      setState("success");
      reset();
      return;
    }
    if (res.fieldErrors) {
      for (const [key, message] of Object.entries(res.fieldErrors)) {
        if (!message) continue;
        setError(key as keyof ContactInput, { type: "server", message });
      }
    }
    setServerError(res.error ?? "Une erreur est survenue.");
    setState("error");
  };

  if (state === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border border-ink-200 bg-background p-10 md:p-12"
      >
        <div className="flex h-12 w-12 items-center justify-center bg-gold/10 text-gold">
          <Check className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="mt-6 text-display-md text-ink-900">
          Message reçu.
        </h3>
        <p className="mt-4 max-w-prose text-base text-ink-600 leading-relaxed">
          Je reviens vers vous sous 24 heures ouvrées avec une proposition de
          créneau pour l&apos;audit. En attendant, si vous avez des documents
          pertinents (accès GTM en lecture, exports Ads récents, architecture
          actuelle), vous pouvez les partager à l&apos;avance, ça accélère le
          diagnostic.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid gap-6"
      aria-busy={state === "submitting"}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Votre nom" htmlFor="name" error={errors.name?.message}>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </Field>
        <Field label="Email professionnel" htmlFor="email" error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Société" htmlFor="company" error={errors.company?.message}>
          <Input
            id="company"
            autoComplete="organization"
            aria-invalid={!!errors.company}
            {...register("company")}
          />
        </Field>
        <Field label="Votre rôle (optionnel)" htmlFor="role" error={errors.role?.message}>
          <Input
            id="role"
            placeholder="Head of Growth, CMO, etc."
            autoComplete="organization-title"
            {...register("role")}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Budget media mensuel"
          htmlFor="monthlyBudget"
          error={errors.monthlyBudget?.message}
        >
          <Select
            id="monthlyBudget"
            aria-invalid={!!errors.monthlyBudget}
            {...register("monthlyBudget")}
          >
            <option value="">Sélectionner</option>
            {Object.entries(budgetLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Sujet principal" htmlFor="topic" error={errors.topic?.message}>
          <Select
            id="topic"
            aria-invalid={!!errors.topic}
            {...register("topic")}
          >
            <option value="">Sélectionner</option>
            {Object.entries(topicLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field
        label="Contexte et objectifs"
        htmlFor="message"
        error={errors.message?.message}
        hint="Stack actuelle, points bloquants, attentes. 2-3 phrases suffisent."
      >
        <Textarea
          id="message"
          rows={5}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
      </Field>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Site web</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div>
        <label
          htmlFor="consent"
          className="flex cursor-pointer items-start gap-3"
        >
          <input
            id="consent"
            type="checkbox"
            className="mt-1 h-4 w-4 accent-ink-900"
            {...register("consent")}
          />
          <span className="text-sm text-ink-600 leading-relaxed">
            J&apos;accepte d&apos;être recontacté à propos de cette demande.
            Aucune donnée n&apos;est utilisée à d&apos;autres fins.
          </span>
        </label>
        {errors.consent?.message && (
          <FieldError message={errors.consent.message} />
        )}
      </div>

      <AnimatePresence>
        {serverError && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 border border-red-300 bg-red-50 p-4 text-sm text-red-800"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <p>{serverError}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap items-center gap-4 border-t border-ink-200 pt-6">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={state === "submitting"}
        >
          {state === "submitting" ? "Envoi..." : "Envoyer ma demande"}
          {state !== "submitting" && <ArrowRight className="h-4 w-4" />}
        </Button>
        <p className="text-xs text-ink-500">
          Réponse sous 24 heures ouvrées.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && !error && (
        <p className="text-xs text-ink-500 leading-relaxed">{hint}</p>
      )}
      {error && <FieldError message={error} />}
    </div>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p role="alert" className="text-xs text-red-700">
      {message}
    </p>
  );
}

const Select = ({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    className={
      "flex h-12 w-full border border-ink-300 bg-background px-4 py-2 text-[0.95rem] text-ink-900 focus-visible:outline-none focus-visible:border-ink-900 transition-colors cursor-pointer " +
      (className ?? "")
    }
    {...props}
  >
    {children}
  </select>
);
