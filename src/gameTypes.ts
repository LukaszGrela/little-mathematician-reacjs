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

export const GAME_ADDITION = "addition" as const;
export const GAME_SUBTRACTION = "subtraction" as const;
export const GAME_MULTIPLICATION = "multiplication" as const;
export const GAME_DIVISION = "division" as const;

export type TGameType =
  | typeof GAME_ADDITION
  | typeof GAME_SUBTRACTION
  | typeof GAME_MULTIPLICATION
  | typeof GAME_DIVISION;

export const GAME_TYPES: readonly TGameType[] = [
  GAME_ADDITION,
  GAME_SUBTRACTION,
  GAME_MULTIPLICATION,
  GAME_DIVISION,
];

/**
 * Runtime guard for a game type coming from an untrusted source (e.g. the URL).
 */
export const isGameType = (value: unknown): value is TGameType =>
  typeof value === "string" &&
  (GAME_TYPES as readonly string[]).includes(value);
