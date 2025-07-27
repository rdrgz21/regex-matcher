import { RegexAppState } from "@/types/context";

export const initState = (initialState: RegexAppState): RegexAppState => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("regexState");
    if (stored) return JSON.parse(stored);
  }

  return initialState;
};
