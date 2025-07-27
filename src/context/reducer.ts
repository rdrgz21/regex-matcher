import { ACTIONS } from "@/constants/actions";
import { ActionWithPayload, RegexAppState } from "@/types/context";
import { extractTermsFromAll } from "@/utils/extractTermsFromAll";

export const reducer = (
  state: RegexAppState,
  action: ActionWithPayload
): RegexAppState => {
  switch (action.type) {
    case ACTIONS.ADD_REGEX: {
      return {
        ...state,
        regexList: [...state.regexList, action.payload],
      };
    }
    case ACTIONS.EDIT_REGEX: {
      const updatedList = state.regexList.map((regex) =>
        regex.pattern === action.payload.oldPattern
          ? action.payload.newPattern
          : regex
      );
      return {
        ...state,
        regexList: updatedList,
        extractedTerms: extractTermsFromAll(updatedList, state.textContent),
      };
    }
    case ACTIONS.DELETE_REGEX: {
      const updatedList = state.regexList.filter(
        (regex) => regex.pattern !== action.payload
      );
      return {
        ...state,
        regexList: updatedList,
        extractedTerms: extractTermsFromAll(updatedList, state.textContent),
      };
    }
    case ACTIONS.APPROVE_REGEX: {
      const updatedList = state.regexList.map((regex) =>
        regex.pattern === action.payload
          ? { ...regex, isApproved: true }
          : regex
      );
      return {
        ...state,
        regexList: state.regexList.map((regex) =>
          regex.pattern === action.payload
            ? { ...regex, isApproved: true }
            : regex
        ),
        extractedTerms: extractTermsFromAll(updatedList, state.textContent),
      };
    }
    case ACTIONS.SELECT_PATTERN: {
      return {
        ...state,
        selectedPattern: action.payload,
      };
    }
    case "SET_TEXT": {
      return {
        ...state,
        textContent: action.payload,
        extractedTerms: extractTermsFromAll(state.regexList, action.payload),
      };
    }
    default:
      return state;
  }
};
