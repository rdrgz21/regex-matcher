"use client";

import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import { RegexAppState, ActionWithPayload } from "../types/context";
import { reducer } from "./reducer";
import { useHasMounted } from "@/hooks/useHasMounted";
import { initState } from "@/utils/initState";

export const RegexContext = createContext<
  | {
      state: RegexAppState;
      dispatch: React.Dispatch<ActionWithPayload>;
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

  return (
    <RegexContext.Provider value={{ state, dispatch }}>
      {children}
    </RegexContext.Provider>
  );
};
