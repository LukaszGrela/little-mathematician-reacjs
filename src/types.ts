import type { TGameType } from "./gameTypes";

type TSectionConfig = {
  [key in TGameType]?: Partial<TGeneralConfig>;
};

export type TGeneralConfig = {
  /** number of questions to ask */
  questionCount: number;
  /** lower range of tested numbers */
  from: number;
  /** upper range of tested numbers */
  to: number;
};

export type TGameConfig = {
  type: TGameType;
  general: TGeneralConfig;
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

  answer?: TAnswer;
};

export type TAnswer = {
  correct: boolean;
  selectionId: number;
  user: number;
};

export type TGameObject = {
  type: TGameType;
  history: TQuestion[];
  hudQuestionCurrent: number;
  hudCorrectAnswers: number;
  questions: (TQuestion | null)[];
  operation: TOperation;
  questionCount: number;
  from: number;
  to: number;
};
