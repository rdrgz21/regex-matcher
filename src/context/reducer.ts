import { ACTIONS } from "@/constants/actions";
import { ActionWithPayload, RegexAppState } from "@/types/context";

export const reducer = (
  state: RegexAppState,
  action: ActionWithPayload
): RegexAppState => {
  switch (action.type) {
    case ACTIONS.ADD_REGEX: {
      // TODO: Implement
      return state;
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
    case ACTIONS.SET_MODE: {
      // TODO: Implement
      return state;
    }
    case ACTIONS.SELECT_PATTERN: {
      // TODO: Implement
      return state;
    }
    case ACTIONS.SET_TEXT: {
      // TODO: Implement
      return state;
    }
    default:
      return state;
  }
};
