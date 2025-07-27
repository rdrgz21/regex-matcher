import { RegexPattern } from "@/types/regex";

export const isDuplicatePattern = (
  pattern: string,
  regexList: RegexPattern[],
  currentPattern?: string
): boolean => {
  return regexList.some(
    (r) => r.pattern === pattern && r.pattern !== currentPattern
  );
};
