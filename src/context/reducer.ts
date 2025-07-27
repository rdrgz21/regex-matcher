import { ACTIONS } from "@/constants/actions";
import { ActionWithPayload, RegexAppState } from "@/types/context";

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
      // TODO: Implement
      return {
        ...state,
        regexList: state.regexList.map((regex) =>
          regex.pattern === action.payload.oldPattern
            ? action.payload.newPattern
            : regex
        ),
      };
    }
    case ACTIONS.DELETE_REGEX: {
      const updatedList = state.regexList.filter(
        (regex) => regex.pattern !== action.payload
      );
      return {
        ...state,
        regexList: updatedList,
      };
    }
    case ACTIONS.APPROVE_REGEX: {
      return {
        ...state,
        regexList: state.regexList.map((regex) =>
          regex.pattern === action.payload
            ? { ...regex, isApproved: true }
            : regex
        ),
      };
    }
    case ACTIONS.SELECT_PATTERN: {
      return {
        ...state,
        selectedPattern: action.payload,
      };
    }
    case ACTIONS.SET_TEXT: {
      return {
        ...state,
        textContent: action.payload,
      };
    }
    default:
      return state;
  }
};
