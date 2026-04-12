import type { TGameType } from "./gameTypes";

type TSectionConfig = {
  [key in TGameType]?: unknown;
};

export type TGameConfig = {
  type: TGameType;
  general: {
    /** number of questions to ask */
    questionCount: number;
    /** lower range of tested numbers */
    from: number;
    /** upper range of tested numbers */
    to: number;
  };
} & TSectionConfig;

export type TOperation = "+" | "-" | "x" | "/";
export type TAskOption = "a" | "b" | "result";

export type TQuestion = {
  id: number;
  operandA: number;
  operandB: number;
  result: number;
  ask: TAskOption;
  correct: number;
  distractors: number[];
  operation: TOperation;
};
