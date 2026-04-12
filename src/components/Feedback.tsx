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
import React, { useState, type FC } from "react";
import MoodIcon from "../icons/MoodIcon";

import ButtonIconNext from "../icons/ButtonIconNext";

const Feedback: FC<{
  answer: { correct: boolean };
  correct: string;
  onAction?: () => void;
}> = ({ answer, correct, onAction }) => {
  const [promptAnimation, setPromptAnimation] = useState(false);

  React.useEffect(() => {
    setPromptAnimation(true);
    return () => {
      setPromptAnimation(true);
    };
  }, []);

  return (
    <div className={"feedback" + (answer.correct ? " correct" : " incorrect")}>
      <div className="row">
        <MoodIcon className="cell" isGood={answer.correct} />
        <div className="message cell">
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
          className={"cell" + (promptAnimation ? " animate" : "")}
          onClick={() => {
            onAction?.();
          }}
        >
          <ButtonIconNext />
        </button>
      </div>
    </div>
  );
};

export default Feedback;
