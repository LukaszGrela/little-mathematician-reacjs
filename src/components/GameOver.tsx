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

import "./GameOver.scss";
import { useCallback, type FC } from "react";

import IconReplay from "../icons/IconReplay";
import IconMenu from "../icons/IconMenu";

const GameOver: FC<{
  hudCorrectAnswers: number;

  onAction?: (action: "replay" | "menu") => void;
}> = ({ onAction, hudCorrectAnswers }) => {
  const handleClick = useCallback(
    (action: "replay" | "menu") => {
      onAction?.(action);
    },
    [onAction],
  );

  return (
    <div className="game-over">
      <div className="title">
        <span className="p1">Game </span>
        <span className="p2">Over</span>
        <span className="p3">!</span>
      </div>
      <div className="content">
        You have resolved {hudCorrectAnswers} equation
        {hudCorrectAnswers === 1 ? "" : "s"} correctly.
      </div>
      <div className="footer">
        <button
          className="replay-button"
          onClick={() => {
            handleClick("replay");
          }}
        >
          <IconReplay />
        </button>
        <button
          className="menu-button"
          onClick={() => {
            handleClick("menu");
          }}
        >
          <IconMenu />
        </button>
      </div>
    </div>
  );
};

export default GameOver;
