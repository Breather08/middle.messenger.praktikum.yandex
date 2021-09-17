export type Rule = (v: string) => boolean;
export type RuleParams = {
  text: string;
  fn: Rule;
};
export type Rules = Record<string, RuleParams>;
