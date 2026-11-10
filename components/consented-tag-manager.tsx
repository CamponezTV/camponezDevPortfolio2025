"use client"

import { useSyncExternalStore } from "react"
import { GoogleTagManager } from "@next/third-parties/google"
import { readConsent, subscribeToConsent } from "@/lib/consent"

const readNothingOnServer = () => null

export function ConsentedTagManager({ gtmId }: { gtmId: string }) {
  const choice = useSyncExternalStore(subscribeToConsent, readConsent, readNothingOnServer)
  if (choice !== "granted") return null
  return <GoogleTagManager gtmId={gtmId} />
}
