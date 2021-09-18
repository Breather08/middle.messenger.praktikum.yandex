export type Rule = {
  text: string;
  fn: (v: string) => boolean;
};
export type RuleParams = <T>(...params: T[]) => Rule;
export type Rules = Record<string, RuleParams>;
