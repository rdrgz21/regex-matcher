"use client";

import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import { RegexAppState, ActionWithPayload } from "../types/context";
import { reducer } from "./reducer";
import { useHasMounted } from "@/hooks/useHasMounted";
import { initState } from "@/utils/initState";
import { ACTIONS } from "@/constants/actions";

export const RegexContext = createContext<
  | {
      state: RegexAppState;
      dispatch: React.Dispatch<ActionWithPayload>;
      setText: (text: string) => void;
    }
  | undefined
>(undefined);

const initialState: RegexAppState = {
  regexList: [],
  selectedPattern: null,
  mode: "edit",
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
  };

  return (
    <RegexContext.Provider value={{ state, dispatch, ...actions }}>
      {children}
    </RegexContext.Provider>
  );
};
