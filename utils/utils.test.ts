import { expect, test, describe } from "bun:test";
import { parseDeckName } from "./utils";

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

  test("handles empty or null input", () => {
    expect(parseDeckName("")).toEqual([]);
  });
});
