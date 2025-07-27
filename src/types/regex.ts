export type RegexPattern = {
  label: string;
  pattern: string;
  isApproved: boolean;
};

export type RegexMatches = {
  [regexPattern: string]: string[];
};
