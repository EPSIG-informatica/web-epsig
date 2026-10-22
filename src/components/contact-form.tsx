"use client";

import Link from "@/components/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { originForSubmit } from "@/lib/attribution";
import { useLang, useT } from "@/components/lang-provider";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const t = useT();
  const lang = useLang();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const successRef = useRef<HTMLHeadingElement>(null);
  // Momento en que se carga el formulario (trampa de tiempo anti-bots).
  const startedAt = useRef<number | null>(null);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Al enviarse, el formulario desaparece: se lleva el foco al mensaje de confirmación.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = event.currentTarget;
    const data = {
      ...Object.fromEntries(new FormData(form).entries()),
      elapsed: startedAt.current ? Date.now() - startedAt.current : 0,
      origin: originForSubmit(),
      lang,
    };

    try {
      const res = await fetch("/api/contacto/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error || t("No se pudo enviar el formulario.", "No s'ha pogut enviar el formulari.", "The form could not be sent."));
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : t("Ha ocurrido un error inesperado.", "Hi ha hagut un error inesperat.", "An unexpected error occurred."));
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="pop-in rounded-brand border border-accent/30 bg-accent-pale p-8 text-center"
      >
        <h3 ref={successRef} tabIndex={-1} className="mb-2 text-lg font-semibold text-ink outline-none">
          {t("¡Gracias! Hemos recibido tu mensaje.", "Gràcies! Hem rebut el teu missatge.", "Thank you! We have received your message.")}
        </h3>
        <p className="text-sm text-ink-soft">
          {t(
            "Te hemos enviado un correo de confirmación y te responderemos lo antes posible.",
            "T'hem enviat un correu de confirmació i et respondrem al més prompte possible.",
            "We have sent you a confirmation email and will get back to you as soon as possible.",
          )}
        </p>
      </div>
    );
  }

  return (
    // method/action: si JavaScript no llega a cargar, el formulario se envía igualmente por POST.
    <form
      method="post"
      action="/api/contacto/"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <input type="hidden" name="lang" value={lang} />
      {/* Campo trampa: invisible para personas, los bots lo rellenan. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          {t("No rellenes este campo", "Deixa este camp en blanc", "Leave this field blank")}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={t("Nombre", "Nom", "Name")} name="name" autoComplete="name" required />
        <Field label={t("Correo electrónico", "Correu electrònic", "Email")} name="email" type="email" autoComplete="email" required />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={t("Teléfono", "Telèfon", "Phone")} name="phone" type="tel" autoComplete="tel" />
        <Field label={t("Empresa", "Empresa", "Company")} name="company" autoComplete="organization" />
      </div>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
        <span>
          {t("Cuéntanos qué necesitas", "Conta'ns què necessites", "Tell us what you need")}
          <RequiredMark />
        </span>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={5000}
          className="rounded-xl border border-line bg-surface px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-primary"
        />
      </label>

      <label className="flex items-start gap-3 text-[13.5px] leading-snug text-ink-soft">
        <input
          type="checkbox"
          name="privacy"
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
        />
        <span>
          {t("He leído y acepto la ", "He llegit i accepte la ", "I have read and accept the ")}
          <Link href="/politica-de-privacidad" target="_blank" className="font-medium text-primary underline underline-offset-2 hover:no-underline">
            {t("política de privacidad", "política de privacitat", "privacy policy")}
            <span className="sr-only">{t(" (se abre en una pestaña nueva)", " (s'obri en una pestanya nova)", " (opens in a new tab)")}</span>
          </Link>
          .<RequiredMark />
        </span>
      </label>

      {/* Siempre presente para que los lectores de pantalla anuncien el error. */}
      <p role="alert" className="text-sm font-medium text-red-700 empty:hidden">
        {status === "error" ? errorMsg : ""}
      </p>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 self-start rounded-full bg-ink px-7 py-3 text-[14px] font-semibold text-white transition hover:scale-[1.03] hover:bg-primary active:scale-[0.97] disabled:opacity-60"
      >
        {status === "loading" ? t("Enviando…", "Enviant…", "Sending…") : t("Enviar mensaje", "Enviar el missatge", "Send message")}
      </button>

      <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">
        <strong className="font-semibold text-ink">
          {t("Información básica sobre protección de datos.", "Informació bàsica sobre protecció de dades.", "Basic data protection information.")}
        </strong>{" "}
        {t(
          `Responsable: ${site.legalName}. Finalidad: atender tu solicitud de información o diagnóstico. Legitimación: tu consentimiento. Destinatarios: no se ceden datos a terceros, salvo obligación legal. Derechos: acceso, rectificación, supresión y otros derechos, escribiendo a ${site.email}. Más información en la `,
          `Responsable: ${site.legalName}. Finalitat: atendre la teua sol·licitud d'informació o de diagnòstic. Legitimació: el teu consentiment. Destinataris: no se cedixen dades a tercers, excepte per obligació legal. Drets: accés, rectificació, supressió i altres drets, escrivint a ${site.email}. Més informació en la `,
          `Controller: ${site.legalName}. Purpose: to handle your request for information or an assessment. Legal basis: your consent. Recipients: no data is disclosed to third parties unless required by law. Rights: access, rectification, erasure and other rights, by writing to ${site.email}. More information in our `,
        )}
        <Link href="/politica-de-privacidad" className="underline hover:text-primary">
          {t("política de privacidad", "política de privacitat", "privacy policy")}
        </Link>
        .
      </p>
    </form>
  );
}

function RequiredMark() {
  return (
    <span className="text-accent-strong" aria-hidden>
      {" "}
      *
    </span>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
      <span>
        {label}
        {required ? <RequiredMark /> : null}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="rounded-xl border border-line bg-surface px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-primary"
      />
    </label>
  );
}
