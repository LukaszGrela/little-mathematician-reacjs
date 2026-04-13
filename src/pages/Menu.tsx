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

import "./Menu.scss";
import { useCallback, type FC, type ReactNode } from "react";
import { useSelector } from "react-redux";

import ButtonIconPlus from "../icons/ButtonIconPlus";
import ButtonIconMinus from "../icons/ButtonIconMinus";
import ButtonIconMultiply from "../icons/ButtonIconMultiply";
import ButtonIconDivide from "../icons/ButtonIconDivide";
import {
  GAME_MULTIPLICATION,
  GAME_ADDITION,
  GAME_SUBTRACTION,
  GAME_DIVISION,
  type TGameType,
} from "../gameTypes";
import type { TRootState } from "../store/types";

const MenuButton: FC<{
  className?: string;
  icon: ReactNode;
  score: number;
  onClick: () => void;
}> = ({ className, icon, onClick, score }) => {
  return (
    <button className={className} onClick={onClick}>
      <span className="badge score">{score}</span>
      {icon}
    </button>
  );
};

const AdditionMenuButton: FC<{
  onAction: (action: TGameType) => void;
}> = ({ onAction }) => {
  const score = useSelector((state: TRootState) => state.score.addScore);
  const handleOnClick = useCallback(() => {
    onAction(GAME_ADDITION);
  }, [onAction]);
  return (
    <MenuButton
      icon={<ButtonIconPlus />}
      onClick={handleOnClick}
      score={score}
      className="addition"
    />
  );
};
const SubtractionMenuButton: FC<{
  onAction: (action: TGameType) => void;
}> = ({ onAction }) => {
  const score = useSelector((state: TRootState) => state.score.subScore);
  const handleOnClick = useCallback(() => {
    onAction(GAME_SUBTRACTION);
  }, [onAction]);
  return (
    <MenuButton
      icon={<ButtonIconMinus />}
      onClick={handleOnClick}
      score={score}
      className="subtraction"
    />
  );
};
const MultiplicationMenuButton: FC<{
  onAction: (action: TGameType) => void;
}> = ({ onAction }) => {
  const score = useSelector((state: TRootState) => state.score.mulScore);
  const handleOnClick = useCallback(() => {
    onAction(GAME_MULTIPLICATION);
  }, [onAction]);
  return (
    <MenuButton
      icon={<ButtonIconMultiply />}
      onClick={handleOnClick}
      score={score}
      className="multiplication"
    />
  );
};
const DivisionMenuButton: FC<{
  onAction: (action: TGameType) => void;
}> = ({ onAction }) => {
  const score = useSelector((state: TRootState) => state.score.divScore);
  const handleOnClick = useCallback(() => {
    onAction(GAME_DIVISION);
  }, [onAction]);
  return (
    <MenuButton
      icon={<ButtonIconDivide />}
      onClick={handleOnClick}
      score={score}
      className="division"
    />
  );
};

export const Menu: FC<{ onAction: (action: TGameType) => void }> = ({
  onAction,
}) => {
  const handleClick = useCallback(
    (action: TGameType) => {
      onAction(action);
    },
    [onAction],
  );

  return (
    <div className="menu">
      <div className="row">
        <AdditionMenuButton onAction={handleClick} />
        <SubtractionMenuButton onAction={handleClick} />
      </div>
      <div className="row">
        <MultiplicationMenuButton onAction={handleClick} />
        <DivisionMenuButton onAction={handleClick} />
      </div>
    </div>
  );
};

export default Menu;
