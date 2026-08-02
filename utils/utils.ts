import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns Tailwind CSS classes for win rate badges based on performance tiers.
 *
 * Tiers:
 * - S-Tier (>= 55%): Indigo
 * - Tier 1 (52.5% - 55%): Emerald
 * - Tier 2 (50% - 52.5%): Blue
 * - Tier 3 (47.5% - 50%): Orange
 * - Tier 4 (< 47.5%): Rose
 *
 * @param winRate - The win rate percentage
 * @returns Class string for the badge
 */
export function getWinRateColor(winRate: number): string {
  if (winRate >= 55) {
    return "border-indigo-500/50 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400";
  }
  if (winRate >= 52.5) {
    return "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
  }
  if (winRate >= 50) {
    return "border-blue-500/50 bg-blue-500/10 text-blue-600 dark:text-blue-400";
  }
  if (winRate >= 47.5) {
    return "border-orange-500/50 bg-orange-500/10 text-orange-600 dark:text-orange-400";
  }
  return "border-rose-500/50 bg-rose-500/10 text-rose-600 dark:text-rose-400";
}

const DECK_NAME_PREFIXES = [
  "Mega",
  "Alolan",
  "Galarian",
  "Hisuian",
  "Paldean",
  "Teal Mask",
  "Wellspring Mask",
  "Hearthflame Mask",
  "Cornerstone Mask",
];

const DECK_NAME_SUFFIXES = [
  "X",
  "Y",
  "ex",
  "Sunny Form",
  "Rainy Form",
  "Snowy Form",
];

const DECK_NAME_PATTERN_SOURCE = `(?:(?:${DECK_NAME_PREFIXES.join("|")})\\s+)*[A-Z][a-z]*(?:-[A-Z][a-z]*)*(?:\\s+(?:${DECK_NAME_SUFFIXES.join("|")}))*`;

const DECK_NAME_PATTERN = new RegExp(DECK_NAME_PATTERN_SOURCE, "g");

/**
 * Parses a deck name into individual Pokémon names.
 * Handles prefixes like "Mega", regional prefixes ("Alolan", "Galarian", "Hisuian", "Paldean"),
 * and suffixes like "ex".
 *
 * Example: "Mega Alolan Exeggutor ex" -> ["Mega Alolan Exeggutor ex"]
 * Example: "Palkia ex Dialga ex" -> ["Palkia ex", "Dialga ex"]
 */
export function parseDeckName(deck: string): string[] {
  if (!deck) return [];

  // Reset lastIndex — global regex is stateful across calls
  DECK_NAME_PATTERN.lastIndex = 0;
  const matches = deck.match(DECK_NAME_PATTERN);
  return matches || [deck];
}
