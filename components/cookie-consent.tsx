"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { useTranslations } from "@/hooks/use-translations"
import { onOpenConsentPreferences, readConsent, saveConsent, subscribeToConsent, type ConsentChoice } from "@/lib/consent"

const NOT_READ_YET = "not-read-yet"

const readConsentOnServer = () => NOT_READ_YET

const buttonClass =
  "inline-flex h-9 cursor-pointer items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors duration-150"

export function CookieConsent() {
  const t = useTranslations().consent
  const choice = useSyncExternalStore(subscribeToConsent, readConsent, readConsentOnServer)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => onOpenConsentPreferences(() => setIsEditing(true)), [])

  if (choice === NOT_READ_YET || (choice !== null && !isEditing)) return null

  const choose = (next: ConsentChoice) => {
    saveConsent(next)
    setIsEditing(false)
  }

  return (
    <section
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-4 bottom-4 z-[60] rounded-2xl border border-border bg-card p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm"
    >
      <h2 id="cookie-consent-title" className="text-sm font-medium text-foreground">
        {t.title}
      </h2>
      <p className="mt-1.5 text-sm leading-6 text-subtle">{t.description}</p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => choose("granted")}
          className={`${buttonClass} bg-primary text-primary-foreground hover:bg-primary/90`}
        >
          {t.accept}
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className={`${buttonClass} border border-border text-foreground hover:bg-raised`}
        >
          {t.reject}
        </button>
      </div>
    </section>
  )
}
