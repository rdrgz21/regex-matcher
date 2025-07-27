import { describe, expect, it } from "vitest";
import { getMatchesForPattern } from "./getMatchesForPattern";

describe(getMatchesForPattern.name, () => {
  const text =
    "The quick brown fox jumps over the lazy dog. Do dolore pariatur.";

  it("matches a simple word", () => {
    const matches = getMatchesForPattern("/dog/", text);
    expect(matches).toEqual(["dog"]);
  });

  it("matches using a word boundary", () => {
    const matches = getMatchesForPattern("/\\bDo\\b/", text);
    expect(matches).toEqual(["Do"]);
  });

  it("returns multiple matches", () => {
    const matches = getMatchesForPattern("/\\b\\w{3}\\b/", text); // all 3-letter words
    expect(matches).toContain("fox");
    expect(matches).toContain("dog");
    expect(matches).toContain("The");
  });

  it("returns empty array for no match", () => {
    const matches = getMatchesForPattern("/elephant/", text);
    expect(matches).toEqual([]);
  });

  it("handles invalid regex safely", () => {
    const matches = getMatchesForPattern("/[a-z/", text);
    expect(matches).toEqual([]);
  });
});
