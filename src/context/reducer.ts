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
      return state;
    }
    case ACTIONS.DELETE_REGEX: {
      // TODO: Implement
      return state;
    }
    case ACTIONS.APPROVE_REGEX: {
      // TODO: Implement
      return state;
    }
    case ACTIONS.SELECT_PATTERN: {
      // TODO: Implement
      return state;
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
