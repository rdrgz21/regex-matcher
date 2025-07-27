import { RegexContext } from "@/context/RegexContext";
import { useContext } from "react";

export const useRegexContext = () => {
  const context = useContext(RegexContext);

  if (!context)
    throw new Error("useRegexContext must be used inside RegexProvider");

  return context;
};
