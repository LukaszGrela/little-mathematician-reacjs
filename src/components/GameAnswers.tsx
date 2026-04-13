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
import { classNames } from "../utils/classNames";
import "./GameAnswers.scss";
import { useCallback, type FC } from "react";

interface IProps {
  selectionId?: number | null;
  options: number[];
  onSelection: (answer: number, optionId: number) => void;
}

const GameAnswers: FC<IProps> = ({ selectionId, onSelection, options }) => {
  const generateAnswers = useCallback(() => {
    let i = 0;

    return options.map((option) => {
      const id = ++i;
      const button = (
        <button
          className={classNames(
            "answer",
            `option-${id}`,
            selectionId && selectionId === id && "hidden",
          )}
          key={id}
          onClick={() => {
            onSelection(option, id);
          }}
        >
          {option}
        </button>
      );

      return button;
    });
  }, [onSelection, options, selectionId]);
  return (
    <div className={classNames("game-answers", selectionId && "locked")}>
      <hr />
      {generateAnswers()}
    </div>
  );
};

export default GameAnswers;
