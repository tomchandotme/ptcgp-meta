import { expect, test, describe } from "bun:test";
import { getWinRateColor, parseDeckName } from "./utils";

describe("parseDeckName", () => {
  test("handles single pokemon", () => {
    expect(parseDeckName("Pikachu")).toEqual(["Pikachu"]);
  });

  test("handles pokemon with ex suffix", () => {
    expect(parseDeckName("Palkia ex")).toEqual(["Palkia ex"]);
  });

  test("handles pokemon with Mega prefix", () => {
    expect(parseDeckName("Mega Mewtwo")).toEqual(["Mega Mewtwo"]);
  });

  test("handles pokemon with Mega prefix and ex suffix", () => {
    expect(parseDeckName("Mega Mewtwo ex")).toEqual(["Mega Mewtwo ex"]);
  });

  test("handles regional prefixes", () => {
    expect(parseDeckName("Alolan Exeggutor")).toEqual(["Alolan Exeggutor"]);
    expect(parseDeckName("Galarian Weezing")).toEqual(["Galarian Weezing"]);
    expect(parseDeckName("Hisuian Samurott")).toEqual(["Hisuian Samurott"]);
    expect(parseDeckName("Paldean Clodsire")).toEqual(["Paldean Clodsire"]);
  });

  test("handles multiple prefixes", () => {
    expect(parseDeckName("Mega Alolan Exeggutor ex")).toEqual([
      "Mega Alolan Exeggutor ex",
    ]);
  });

  test("handles multiple pokemon in one string", () => {
    expect(parseDeckName("Charizard Pidgeot")).toEqual([
      "Charizard",
      "Pidgeot",
    ]);
    expect(parseDeckName("Palkia ex Dialga ex")).toEqual([
      "Palkia ex",
      "Dialga ex",
    ]);
    expect(parseDeckName("Mega Mewtwo ex Gardevoir")).toEqual([
      "Mega Mewtwo ex",
      "Gardevoir",
    ]);
  });

  test("handles Ogerpon mask prefixes", () => {
    expect(parseDeckName("Teal Mask Ogerpon ex")).toEqual([
      "Teal Mask Ogerpon ex",
    ]);
    expect(parseDeckName("Wellspring Mask Ogerpon ex")).toEqual([
      "Wellspring Mask Ogerpon ex",
    ]);
    expect(parseDeckName("Hearthflame Mask Ogerpon ex")).toEqual([
      "Hearthflame Mask Ogerpon ex",
    ]);
    expect(parseDeckName("Cornerstone Mask Ogerpon ex")).toEqual([
      "Cornerstone Mask Ogerpon ex",
    ]);
  });

  test("handles multiple pokemon with mask prefixes", () => {
    expect(parseDeckName("Teal Mask Ogerpon ex Regidrago ex")).toEqual([
      "Teal Mask Ogerpon ex",
      "Regidrago ex",
    ]);
  });

  test("handles hyphenated pokemon names", () => {
    expect(parseDeckName("Ho-Oh")).toEqual(["Ho-Oh"]);
    expect(parseDeckName("Ho-Oh ex")).toEqual(["Ho-Oh ex"]);
    expect(parseDeckName("Porygon-Z")).toEqual(["Porygon-Z"]);
    expect(parseDeckName("Porygon-Z ex")).toEqual(["Porygon-Z ex"]);
    expect(parseDeckName("Ho-Oh ex Porygon-Z")).toEqual([
      "Ho-Oh ex",
      "Porygon-Z",
    ]);
  });

  test("handles Mega X/Y suffixes", () => {
    expect(parseDeckName("Mega Charizard Y ex")).toEqual([
      "Mega Charizard Y ex",
    ]);
    expect(parseDeckName("Mega Charizard X ex")).toEqual([
      "Mega Charizard X ex",
    ]);
    expect(parseDeckName("Mega Mewtwo Y")).toEqual(["Mega Mewtwo Y"]);
  });

  test("handles Castform suffixes", () => {
    expect(parseDeckName("Castform Sunny Form")).toEqual([
      "Castform Sunny Form",
    ]);
    expect(parseDeckName("Castform Rainy Form")).toEqual([
      "Castform Rainy Form",
    ]);
    expect(parseDeckName("Castform Snowy Form")).toEqual([
      "Castform Snowy Form",
    ]);
  });

  test("handles empty or null input", () => {
    expect(parseDeckName("")).toEqual([]);
  });
});

describe("getWinRateColor", () => {
  test("returns S-tier at 55 and above", () => {
    expect(getWinRateColor(55)).toContain("emerald");
    expect(getWinRateColor(60)).toContain("emerald");
  });

  test("returns Tier 1 between 51 and 55", () => {
    expect(getWinRateColor(51)).toContain("teal");
    expect(getWinRateColor(54.9)).toContain("teal");
  });

  test("returns Tier 2 between 49 and 51", () => {
    expect(getWinRateColor(49)).toContain("slate");
    expect(getWinRateColor(50)).toContain("slate");
    expect(getWinRateColor(50.9)).toContain("slate");
  });

  test("returns Tier 3 between 47.5 and 49", () => {
    expect(getWinRateColor(47.5)).toContain("amber");
    expect(getWinRateColor(48.9)).toContain("amber");
  });

  test("returns Tier 4 below 47.5", () => {
    expect(getWinRateColor(47.4)).toContain("rose");
    expect(getWinRateColor(0)).toContain("rose");
  });
});
