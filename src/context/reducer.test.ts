import { describe, it, expect, vi, beforeEach } from "vitest";
import { reducer } from "./reducer";
import { ACTIONS } from "@/constants/actions";
import type { RegexAppState } from "@/types/context";
import { RegexPattern } from "@/types/regex";
import { extractTermsFromAll } from "@/utils/extractTermsFromAll";

vi.mock("@/utils/extractTermsFromAll", () => ({
  extractTermsFromAll: vi.fn(() => ({})),
}));

const mockExtractTermsFromAll = vi.mocked(extractTermsFromAll);

const mockRegex: RegexPattern = {
  label: "Find dogs",
  pattern: "/dog/",
  isApproved: true,
};

const anotherRegex: RegexPattern = {
  label: "Find cats",
  pattern: "/cat/",
  isApproved: false,
};

const baseState: RegexAppState = {
  regexList: [mockRegex],
  selectedPattern: null,
  textContent: "dog and cat",
  extractedTerms: {},
};

describe(reducer.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockExtractTermsFromAll.mockReturnValue({});
  });

  it("adds a new regex pattern", () => {
    const result = reducer(baseState, {
      type: ACTIONS.ADD_REGEX,
      payload: anotherRegex,
    });

    expect(result.regexList).toHaveLength(2);
    expect(result.regexList[1]).toEqual(anotherRegex);
  });

  it("edits a regex pattern and updates extractedTerms", () => {
    const updated = {
      label: "Find dogs updated",
      pattern: "/dogs/",
      isApproved: false,
    };

    const result = reducer(baseState, {
      type: ACTIONS.EDIT_REGEX,
      payload: {
        oldPattern: "/dog/",
        newPattern: updated,
      },
    });

    expect(result.regexList[0]).toEqual(updated);
    expect(mockExtractTermsFromAll).toHaveBeenCalledWith(
      [updated],
      "dog and cat"
    );
  });

  it("deletes a regex pattern and updates extractedTerms", () => {
    const result = reducer(baseState, {
      type: ACTIONS.DELETE_REGEX,
      payload: "/dog/",
    });

    expect(result.regexList).toHaveLength(0);
    expect(mockExtractTermsFromAll).toHaveBeenCalledWith([], "dog and cat");
  });

  it("approves a regex pattern and updates extractedTerms", () => {
    const result = reducer(baseState, {
      type: ACTIONS.APPROVE_REGEX,
      payload: "/dog/",
    });

    expect(result.regexList[0].isApproved).toBe(true);
    expect(mockExtractTermsFromAll).toHaveBeenCalledWith(
      [mockRegex],
      "dog and cat"
    );
  });

  it("selects a pattern", () => {
    const result = reducer(baseState, {
      type: ACTIONS.SELECT_PATTERN,
      payload: "/dog/",
    });

    expect(result.selectedPattern).toBe("/dog/");
    expect(mockExtractTermsFromAll).not.toHaveBeenCalled();
  });

  it("sets text content and re-extracts terms", () => {
    const newText = "The quick brown dog jumps over the lazy dog";
    const result = reducer(baseState, {
      type: ACTIONS.SET_TEXT,
      payload: newText,
    });

    expect(result.textContent).toBe(newText);
    expect(mockExtractTermsFromAll).toHaveBeenCalledWith([mockRegex], newText);
  });

  it("returns current state on unknown action", () => {
    const result = reducer(baseState, {
      // @ts-expect-error testing fallback
      type: "UNKNOWN_ACTION",
    });

    expect(result).toEqual(baseState);
    expect(mockExtractTermsFromAll).not.toHaveBeenCalled();
  });
});
