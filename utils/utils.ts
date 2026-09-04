import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns Tailwind CSS classes for win rate badges based on performance tiers.
 *
 * Sequential emerald → rose heat scale; [49, 51) is a neutral band around 50%:
 * - S-Tier (>= 55%): Emerald
 * - Tier 1 (51% - 55%): Teal
 * - Tier 2 (49% - 51%): Slate
 * - Tier 3 (47.5% - 49%): Amber
 * - Tier 4 (< 47.5%): Rose
 *
 * @param winRate - The win rate percentage
 * @returns Class string for the badge
 */
export function getWinRateColor(winRate: number): string {
  if (winRate >= 55) {
    return "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
  }
  if (winRate >= 51) {
    return "border-teal-500/50 bg-teal-500/10 text-teal-600 dark:text-teal-400";
  }
  if (winRate >= 49) {
    return "border-slate-500/50 bg-slate-500/10 text-slate-600 dark:text-slate-400";
  }
  if (winRate >= 47.5) {
    return "border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400";
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
  "Team Rocket's",
  "Team Rocket",
  "Dawn Wings",
  "Dusk Mane",
  "Rapid Strike",
  "Single Strike",
];

/**
 * Multi-word / irregular species from the PTCGP card list that the generic
 * Capitalized-token matcher would split (Tapu, paradox beasts, Rotom forms, etc.).
 */
const DECK_NAME_SPECIES = [
  "Type: Null",
  "Mr. Mime",
  "Mr. Rime",
  "Mime Jr.",
  "Farfetch'd",
  "Tapu Koko",
  "Tapu Lele",
  "Tapu Bulu",
  "Tapu Fini",
  "Flutter Mane",
  "Great Tusk",
  "Scream Tail",
  "Brute Bonnet",
  "Slither Wing",
  "Sandy Shocks",
  "Iron Treads",
  "Iron Bundle",
  "Iron Hands",
  "Iron Jugulis",
  "Iron Moth",
  "Iron Thorns",
  "Roaring Moon",
  "Iron Valiant",
  "Walking Wake",
  "Iron Leaves",
  "Gouging Fire",
  "Raging Bolt",
  "Iron Boulder",
  "Iron Crown",
  "Fan Rotom",
  "Frost Rotom",
  "Heat Rotom",
  "Mow Rotom",
  "Wash Rotom",
  "Ultra Necrozma",
  "Jangmo-o",
  "Hakamo-o",
  "Kommo-o",
  "Porygon2",
  "Nidoran♀",
  "Nidoran♂",
  "Flabébé",
];

const DECK_NAME_SUFFIXES = [
  "X",
  "Y",
  "ex",
  "Sunny Form",
  "Rainy Form",
  "Snowy Form",
];

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const toPatternAlt = (values: readonly string[]) =>
  [...values]
    .sort((a, b) => b.length - a.length)
    .map((value) => escapeRegExp(value).replace(/'/g, "['\u2019]"))
    .join("|");

const STANDARD_SPECIES =
  "[A-Z][A-Za-z\\u00C0-\\u024F]*\\d?(?:-[A-Za-z]+)*[♀♂]?";

const DECK_NAME_PATTERN_SOURCE = `(?:(?:${toPatternAlt(DECK_NAME_PREFIXES)})\\s+)*(?:${toPatternAlt(DECK_NAME_SPECIES)}|${STANDARD_SPECIES})(?:\\s+(?:${toPatternAlt(DECK_NAME_SUFFIXES)}))*`;

const DECK_NAME_PATTERN = new RegExp(DECK_NAME_PATTERN_SOURCE, "g");

/**
 * Parses a deck name into individual Pokémon names.
 * Handles prefixes like "Mega", "Team Rocket's", regional prefixes
 * ("Alolan", "Galarian", "Hisuian", "Paldean"), multi-word species from the
 * PTCGP card list, and suffixes like "ex".
 *
 * Example: "Mega Alolan Exeggutor ex" -> ["Mega Alolan Exeggutor ex"]
 * Example: "Palkia ex Dialga ex" -> ["Palkia ex", "Dialga ex"]
 * Example: "Team Rocket's Weezing ex Hoopa ex" -> ["Team Rocket's Weezing ex", "Hoopa ex"]
 */
export function parseDeckName(deck: string): string[] {
  if (!deck) return [];

  // Reset lastIndex — global regex is stateful across calls
  DECK_NAME_PATTERN.lastIndex = 0;
  const matches = deck.match(DECK_NAME_PATTERN);
  return matches || [deck];
}
