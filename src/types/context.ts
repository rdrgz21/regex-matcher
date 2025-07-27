import { ACTIONS } from "@/constants/actions";
import { RegexPattern, RegexMatches } from "./regex";

export type RegexAppState = {
  regexList: RegexPattern[];
  selectedPattern: string | null;
  textContent: string;
  extractedTerms: RegexMatches;
};

export type ActionType = (typeof ACTIONS)[keyof typeof ACTIONS];

export type ActionWithPayload =
  | { type: typeof ACTIONS.ADD_REGEX; payload: string }
  | {
      type: typeof ACTIONS.EDIT_REGEX;
      payload: { id: string; pattern: string };
    }
  | { type: typeof ACTIONS.DELETE_REGEX; payload: string }
  | { type: typeof ACTIONS.APPROVE_REGEX; payload: string }
  | { type: typeof ACTIONS.SELECT_PATTERN; payload: string | null }
  | { type: typeof ACTIONS.SET_TEXT; payload: string };
