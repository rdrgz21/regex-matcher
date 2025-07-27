import { getMatchesForPattern } from "../getMatchesForPattern/getMatchesForPattern";
import { RegexPattern, RegexMatches } from "@/types/regex";

export const extractTermsFromAll = (
  regexList: RegexPattern[],
  text: string
): RegexMatches => {
  const result: RegexMatches = {};
  regexList.forEach(({ pattern, isApproved }) => {
    if (!isApproved) return;

    result[pattern] = getMatchesForPattern(pattern, text);
  });

  return result;
};
