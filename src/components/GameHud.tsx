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
import "./GameHud.scss";

import type { FC } from "react";
import IconGrade from "../icons/IconGrade";
import type { TGameType } from "../gameTypes";
import { classNames } from "../utils/classNames";

interface IProps {
  type?: TGameType;
  hudCorrectAnswers: number;
  hudQuestionCurrent: number;
  questionCount: number;
}

const GameHud: FC<IProps> = ({
  hudCorrectAnswers,
  hudQuestionCurrent,
  questionCount,
  type,
}) => {
  return (
    <div
      className={classNames(
        "game-hud",
        type,
        hudCorrectAnswers > 0 &&
          "gain-" + (hudCorrectAnswers % 2 === 0 ? "even" : "odd"),
      )}
    >
      <div className="container">
        <div className="question-counter">
          {hudQuestionCurrent} / {questionCount}
        </div>
        <div className="correct-answers">
          <IconGrade className="icon-grade" />
          <span className="label">{hudCorrectAnswers}</span>
        </div>
      </div>
    </div>
  );
};

export default GameHud;
