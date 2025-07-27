"use client";

import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import { RegexAppState, ActionWithPayload } from "../types/context";
import { reducer } from "./reducer";
import { useHasMounted } from "@/hooks/useHasMounted";
import { initState } from "@/utils/initState";
import { ACTIONS } from "@/constants/actions";
import { RegexPattern } from "@/types/regex";

export const RegexContext = createContext<
  | {
      state: RegexAppState;
      dispatch: React.Dispatch<ActionWithPayload>;
      setText: (text: string) => void;
      addRegex: (pattern: RegexPattern) => void;
      editRegex: (oldPattern: string, newPattern: RegexPattern) => void;
      deleteRegex: (pattern: string) => void;
      selectPattern: (pattern: string | null) => void;
      approvePattern: (pattern: string | null) => void;
    }
  | undefined
>(undefined);

const initialState: RegexAppState = {
  regexList: [],
  selectedPattern: null,
  textContent: "",
  extractedTerms: {},
};

export const RegexProvider = ({ children }: { children: ReactNode }) => {
  const hasMounted = useHasMounted();

  const [state, dispatch] = useReducer(reducer, initialState, initState);

  useEffect(() => {
    localStorage.setItem("regexState", JSON.stringify(state));
  }, [state]);

  if (!hasMounted) return null;

  const actions = {
    setText: (text: string) => {
      dispatch({ type: ACTIONS.SET_TEXT, payload: text });
    },
    addRegex: (pattern: RegexPattern) => {
      dispatch({ type: ACTIONS.ADD_REGEX, payload: pattern });
    },
    editRegex: (oldPattern: string, newPattern: RegexPattern) => {
      dispatch({
        type: ACTIONS.EDIT_REGEX,
        payload: { oldPattern, newPattern },
      });
    },
    deleteRegex: (pattern: string) => {
      dispatch({ type: ACTIONS.DELETE_REGEX, payload: pattern });
    },
    selectPattern: (pattern: string | null) => {
      dispatch({ type: ACTIONS.SELECT_PATTERN, payload: pattern });
    },
    approvePattern: (pattern: string | null) => {
      dispatch({ type: ACTIONS.APPROVE_REGEX, payload: pattern });
    },
  };

  return (
    <RegexContext.Provider value={{ state, dispatch, ...actions }}>
      {children}
    </RegexContext.Provider>
  );
};
