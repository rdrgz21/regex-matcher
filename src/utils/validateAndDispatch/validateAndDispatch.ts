import { isValidRegex } from "../isValidRegex/isValidRegex";
import { isDuplicatePattern } from "../isDuplicatePattern/isDuplicatePattern";
import { RegexPattern } from "@/types/regex";

export const validateAndDispatch = (
  pattern: string,
  regexList: RegexPattern[],
  dispatch: () => void,
  currentPattern?: string
) => {
  if (!isValidRegex(pattern)) {
    alert("Invalid regex pattern");
    return;
  }

  if (isDuplicatePattern(pattern, regexList, currentPattern)) {
    alert("This pattern already exists.");
    return;
  }

  dispatch();
};
