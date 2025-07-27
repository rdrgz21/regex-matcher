import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ApprovalModeContent } from ".";
import { RegexContext } from "@/context/RegexContext";
import { RegexAppState } from "@/types/context";

const mockSelectPattern = vi.fn();
const mockApprovePattern = vi.fn();

const baseState: RegexAppState = {
  regexList: [
    {
      label: "Email",
      pattern: "\\S+@\\S+\\.\\S+",
      isApproved: false,
    },
    {
      label: "Phone",
      pattern: "\\d{3}-\\d{3}-\\d{4}",
      isApproved: true,
    },
  ],
  selectedPattern: null,
  textContent: "Reach me at john@example.com or 123-456-7890",
  extractedTerms: {
    "\\d{3}-\\d{3}-\\d{4}": ["123-456-7890"],
  },
};

const renderWithContext = (stateOverrides = {}) => {
  const mockState = {
    ...baseState,
    ...stateOverrides,
  };

  render(
    <RegexContext.Provider
      value={{
        state: mockState,
        dispatch: vi.fn(),
        setText: vi.fn(),
        addRegex: vi.fn(),
        editRegex: vi.fn(),
        deleteRegex: vi.fn(),
        selectPattern: mockSelectPattern,
        approvePattern: mockApprovePattern,
      }}
    >
      <ApprovalModeContent />
    </RegexContext.Provider>
  );
};

describe(ApprovalModeContent.name, () => {
  beforeEach(() => {
    mockSelectPattern.mockClear();
    mockApprovePattern.mockClear();
  });

  it("renders dropdown options correctly", () => {
    renderWithContext();

    expect(screen.getByText("Email: \\S+@\\S+\\.\\S+")).toBeInTheDocument();
    expect(screen.getByText("Phone: \\d{3}-\\d{3}-\\d{4}")).toBeInTheDocument();
  });

  it("disables Approve button when no pattern is selected", () => {
    renderWithContext();
    const button = screen.getByRole("button", { name: /approve/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("title", "No pattern selected");
  });

  it("disables Approve button when selected pattern is already approved", () => {
    renderWithContext({ selectedPattern: "\\d{3}-\\d{3}-\\d{4}" });
    const button = screen.getByRole("button", { name: /approve/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("title", "Pattern already approved");
  });

  it("enables Approve button when selected pattern is unapproved", () => {
    renderWithContext({ selectedPattern: "\\S+@\\S+\\.\\S+" });
    const button = screen.getByRole("button", { name: /approve/i });
    expect(button).toBeEnabled();
    expect(button).toHaveAttribute("title", "Approve this pattern");
  });

  it("displays selected pattern matches", () => {
    renderWithContext({
      selectedPattern: "\\S+@\\S+\\.\\S+",
      textContent: "Email me at test@example.com",
    });

    expect(screen.getByText("Selected Pattern Matches")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("shows 'No matches found' when no matches exist", () => {
    renderWithContext({
      selectedPattern: "\\d+xyz",
      textContent: "nothing here",
    });

    expect(screen.getByText("No matches found.")).toBeInTheDocument();
  });

  it("calls approvePattern when approve button is clicked", () => {
    renderWithContext({ selectedPattern: "\\S+@\\S+\\.\\S+" });

    const button = screen.getByRole("button", { name: /approve/i });
    fireEvent.click(button);

    expect(mockApprovePattern).toHaveBeenCalledWith("\\S+@\\S+\\.\\S+");
  });

  it("calls selectPattern on dropdown change", () => {
    renderWithContext();

    const dropdown = screen.getByRole("combobox");
    fireEvent.change(dropdown, { target: { value: "\\S+@\\S+\\.\\S+" } });

    expect(mockSelectPattern).toHaveBeenCalledWith("\\S+@\\S+\\.\\S+");
  });
});
