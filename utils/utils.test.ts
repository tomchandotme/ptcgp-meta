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

  test("handles empty or null input", () => {
    expect(parseDeckName("")).toEqual([]);
  });
});
