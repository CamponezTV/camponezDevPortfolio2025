export type ConsentChoice = "granted" | "denied"

export const CONSENT_STORAGE_KEY = "cookie-consent"
const CONSENT_CHANGED_EVENT = "cookie-consent-changed"
const OPEN_PREFERENCES_EVENT = "cookie-preferences-open"
const CONSENT_UPDATE_WAIT_MS = 500

declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}

export function googleConsentState(choice: ConsentChoice) {
  return {
    analytics_storage: choice,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  } as const
}

export const CONSENT_DEFAULT_SCRIPT = [
  "window.dataLayer=window.dataLayer||[];",
  "function gtag(){dataLayer.push(arguments)}",
  `gtag('consent','default',${JSON.stringify({ ...googleConsentState("denied"), wait_for_update: CONSENT_UPDATE_WAIT_MS })});`,
  `try{if(localStorage.getItem('${CONSENT_STORAGE_KEY}')==='granted'){gtag('consent','update',${JSON.stringify(googleConsentState("granted"))})}}catch(e){}`,
].join("")

function isConsentChoice(value: unknown): value is ConsentChoice {
  return value === "granted" || value === "denied"
}

export function readConsent(): ConsentChoice | null {
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    return isConsentChoice(stored) ? stored : null
  } catch {
    return null
  }
}

const gtagCommand = function () {
  // eslint-disable-next-line prefer-rest-params
  return arguments
} as (...values: unknown[]) => IArguments

function pushGoogleConsentUpdate(choice: ConsentChoice) {
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push(gtagCommand("consent", "update", googleConsentState(choice)))
}

function persistConsent(choice: ConsentChoice): boolean {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice)
    return true
  } catch {
    return false
  }
}

export function saveConsent(choice: ConsentChoice) {
  persistConsent(choice)
  pushGoogleConsentUpdate(choice)
  window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT))
}

export function subscribeToConsent(onChange: () => void): () => void {
  window.addEventListener(CONSENT_CHANGED_EVENT, onChange)
  window.addEventListener("storage", onChange)
  return () => {
    window.removeEventListener(CONSENT_CHANGED_EVENT, onChange)
    window.removeEventListener("storage", onChange)
  }
}

export function openConsentPreferences() {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))
}

export function onOpenConsentPreferences(open: () => void): () => void {
  window.addEventListener(OPEN_PREFERENCES_EVENT, open)
  return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, open)
}
