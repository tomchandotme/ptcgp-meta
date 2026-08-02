import { describe, expect, test } from "bun:test";
import { parseCurrentSet, parseMeta, parsePageHtml } from "./crawler";
import * as cheerio from "cheerio";

const FIXTURE_HTML = `
<!DOCTYPE html>
<html>
<body>
  <div class="container content">
    <p>Last 14 days · Standard format</p>
    <select id="set">
      <option value="A4a" selected>Wisdom of Sea and Sky</option>
    </select>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Deck</th>
          <th>Count</th>
          <th>Share</th>
          <th>Score</th>
          <th>Win %</th>
        </tr>
      </thead>
      <tbody>
        <tr data-share="0.1234" data-winrate="0.556">
          <td>1</td>
          <td>
            <img src="https://r2.limitlesstcg.net/pokemon/gen9/miraidon.png" />
            <a href="/decks/miraidon">Miraidon ex</a>
          </td>
          <td>42</td>
          <td>12.34%</td>
          <td><a href="/decks/miraidon/matchups">20-10-2</a></td>
          <td>55.6%</td>
        </tr>
        <tr>
          <td>2</td>
          <td>
            <a href="/decks/palkia">Palkia ex Dialga ex</a>
          </td>
          <td>1,234</td>
          <td>8.5%</td>
          <td>5-5-0</td>
          <td>50%</td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
</html>
`;

describe("parseMeta", () => {
  test("parses data attributes, score total, and deck urls", () => {
    const $ = cheerio.load(FIXTURE_HTML);
    const rows = parseMeta($);

    expect(rows).toHaveLength(2);

    expect(rows[0]).toEqual({
      deck: "Miraidon ex",
      deckUrl: "https://play.limitlesstcg.com/decks/miraidon",
      pokemonImages: ["https://r2.limitlesstcg.net/pokemon/gen9/miraidon.png"],
      count: 42,
      sharePercent: 12.34,
      total: 32,
      winPercent: 55.6,
    });

    expect(rows[1]).toMatchObject({
      deck: "Palkia ex Dialga ex",
      deckUrl: "https://play.limitlesstcg.com/decks/palkia",
      count: 1234,
      sharePercent: 8.5,
      total: 10,
      winPercent: 50,
    });
    expect(rows[1]?.pokemonImages).toBeUndefined();
  });

  test("returns empty array when headers are missing", () => {
    const $ = cheerio.load("<table><tbody><tr><td>x</td></tr></tbody></table>");
    expect(parseMeta($)).toEqual([]);
  });

  test("scopes to the meta table when other tables exist", () => {
    const html = `
      <table><tr><th>Other</th></tr><tbody><tr><td>noise</td></tr></tbody></table>
      ${FIXTURE_HTML}
    `;
    const $ = cheerio.load(html);
    const rows = parseMeta($);
    expect(rows).toHaveLength(2);
    expect(rows[0]?.deck).toBe("Miraidon ex");
  });

  test("treats data-share / data-winrate values > 1 as already percent", () => {
    const html = `
      <table>
        <thead><tr><th>Deck</th><th>Share</th><th>Win %</th></tr></thead>
        <tbody>
          <tr data-share="12.34" data-winrate="55.6">
            <td><a href="/decks/x">Test Deck</a></td>
            <td>12.34%</td>
            <td>55.6%</td>
          </tr>
        </tbody>
      </table>
    `;
    const $ = cheerio.load(html);
    const rows = parseMeta($);
    expect(rows[0]?.sharePercent).toBe(12.34);
    expect(rows[0]?.winPercent).toBe(55.6);
  });

  test("parses Limitless-style table without thead/tbody wrappers", () => {
    const html = `
      <table class="meta">
        <tr><th></th><th>Deck</th><th>Count</th><th>Share</th><th>Score</th><th>Win %</th></tr>
        <tr data-share="0.0656" data-winrate="0.4927">
          <td>1</td>
          <td><a href="/decks/hydreigon">Hydreigon</a></td>
          <td>77</td>
          <td>6.6%</td>
          <td>200-210-0</td>
          <td>49.3%</td>
        </tr>
      </table>
    `;
    const $ = cheerio.load(html);
    const rows = parseMeta($);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      deck: "Hydreigon",
      count: 77,
      sharePercent: 6.56,
      total: 410,
      winPercent: 49.27,
    });
  });
});

describe("parseCurrentSet", () => {
  test("prefers selected option text over value", () => {
    const $ = cheerio.load(FIXTURE_HTML);
    expect(parseCurrentSet($)).toBe(
      "Wisdom of Sea and Sky (Last 14 days · Standard format)",
    );
  });

  test("reads option text when value attribute is omitted", () => {
    const html = `
      <p>12 tournaments, 1174 players</p>
      <select id="set"><option data-set="B4" selected>B4 -  Ruler of the Skies</option></select>
      <table class="meta"><tr><th>Deck</th></tr></table>
    `;
    const $ = cheerio.load(html);
    // description via table.meta prev p
    expect(parseCurrentSet($)).toBe(
      "B4 - Ruler of the Skies (12 tournaments, 1174 players)",
    );
  });
});

describe("parsePageHtml", () => {
  test("returns rows and set together", () => {
    const { rows, set } = parsePageHtml(FIXTURE_HTML);
    expect(rows).toHaveLength(2);
    expect(set).toContain("Wisdom of Sea and Sky");
  });
});
