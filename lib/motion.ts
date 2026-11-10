import { createTimeline, cubicBezier, splitText, stagger, utils, type AnimationParams, type Timeline } from "animejs"

export const EASE_OUT_SOFT = [0.22, 1, 0.36, 1] as const
export const easeOutSoft = cubicBezier(...EASE_OUT_SOFT)

const REVEAL_ITEM = "[data-reveal-item]"
const REVEAL_SPLIT = "[data-reveal-split]"
const ANIMATED_PROPERTIES = ["opacity", "transform"]
const RISE_DISTANCE_PX = 8
const REVEAL_DURATION_MS = 600
const ITEM_STAGGER_MS = 50
const WORD_STAGGER_MS = 30
const ITEMS_AFTER_WORDS_MS = 120

export function prefersReducedMotion(): boolean {
  return typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function markRevealed(element: HTMLElement) {
  element.dataset.revealed = ""
}

export function setStyles(elements: HTMLElement[], styles: AnimationParams) {
  if (elements.length > 0) utils.set(elements, styles)
}

export function clearAnimatedStyles(elements: HTMLElement[]) {
  elements.forEach((element) => ANIMATED_PROPERTIES.forEach((property) => element.style.removeProperty(property)))
}

export function splitIntoClippedChars(element: HTMLElement): HTMLElement[] {
  return splitText(element, { chars: { wrap: "clip" } }).chars as HTMLElement[]
}

function splitIntoClippedWords(elements: HTMLElement[]): HTMLElement[] {
  return elements.flatMap((element) => splitText(element, { words: { wrap: "clip" } }).words as HTMLElement[])
}

export function playReveal(container: HTMLElement, delayMs: number): Timeline {
  const items = container.dataset.reveal === "items" ? Array.from(container.querySelectorAll<HTMLElement>(REVEAL_ITEM)) : []
  const splitItems = items.filter((item) => item.matches(REVEAL_SPLIT))
  const fadeItems = items.length > 0 ? items.filter((item) => !item.matches(REVEAL_SPLIT)) : [container]
  const words = splitIntoClippedWords(splitItems)

  setStyles(fadeItems, { opacity: 0, translateY: RISE_DISTANCE_PX })
  setStyles(words, { translateY: "100%" })
  markRevealed(container)

  const timeline = createTimeline({
    delay: delayMs,
    defaults: { ease: easeOutSoft, duration: REVEAL_DURATION_MS },
    onComplete: () => clearAnimatedStyles([...fadeItems, ...words]),
  })
  if (words.length > 0) timeline.add(words, { translateY: "0%", delay: stagger(WORD_STAGGER_MS) }, 0)
  if (fadeItems.length > 0) {
    timeline.add(fadeItems, { opacity: 1, translateY: 0, delay: stagger(ITEM_STAGGER_MS) }, words.length > 0 ? ITEMS_AFTER_WORDS_MS : 0)
  }
  return timeline
}
