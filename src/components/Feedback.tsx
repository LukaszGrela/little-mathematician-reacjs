/*
   Copyright 2018 Łukasz 'Severiaan' Grela GrelaDesign

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
import "./Feedback.scss";
import React, { type RefObject, useState, type FC } from "react";
import MoodIcon from "../icons/MoodIcon";

import ButtonIconNext from "../icons/ButtonIconNext";
import type { TAnswer } from "../types";
import { classNames } from "../utils/classNames";

const Feedback: FC<{
  answer: TAnswer;
  correct: number;
  onAction?: () => void;
  /** Optional ref for the "next question" button - receives focus after answering. */
  nextButtonRef?: RefObject<HTMLButtonElement | null>;
}> = ({ answer, correct, onAction, nextButtonRef }) => {
  const [promptAnimation, setPromptAnimation] = useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPromptAnimation(true);
    return () => {
      setPromptAnimation(true);
    };
  }, []);

  return (
    <div
      className={classNames(
        "feedback",
        answer.correct ? "correct" : "incorrect",
      )}
    >
      <div className="row">
        <MoodIcon className="cell" isGood={answer.correct} />
        <div
          className="message cell"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {answer.correct
            ? "Well done!"
            : [
                "Not so, correct answer is ",
                <span key="correct-span" className="correct-answer">
                  {correct}
                </span>,
              ]}
        </div>
        <button
          ref={nextButtonRef}
          data-testid="Feedback-next"
          className={classNames("cell", promptAnimation && "animate")}
          onClick={() => {
            onAction?.();
          }}
          aria-label="Next question"
          aria-keyshortcuts="Enter"
        >
          <ButtonIconNext />
        </button>
      </div>
    </div>
  );
};

export default Feedback;
