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
import {
  CHANGE_NUMBER_OF_QUESTIONS,
  ConfigType,
  CHANGE_RANGE_FROM,
  CHANGE_RANGE_TO,
  type TConfigActions,
} from "../actions/actions";
import type { TGeneralConfig } from "../types";

export type TConfigState = {
  general: TGeneralConfig;
};

export const DEFAULT_CONFIG_STATE: TConfigState = {
  general: {
    questionCount: 10,
    from: 0,
    to: 10,
  },
};

/**
 * Converts an incoming range value to a usable bound.
 * The game can only draw from whole, non negative numbers - anything else
 * (NaN, Infinity, fractions, negatives, non numeric payloads) would produce
 * unanswerable questions (NaN operands), so invalid input falls back to the
 * value already stored in the state.
 * @param {unknown} value value received with the action
 * @param {number} fallback value currently kept in the state
 * @returns number a whole number greater or equal to zero
 */
const normalizeRangeBound = (value: unknown, fallback: number): number => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return fallback;
  }
  return Math.max(0, Math.floor(numeric));
};

export default function reducer(
  state: TConfigState = DEFAULT_CONFIG_STATE,
  action: TConfigActions | { type: "@@INIT"; payload?: unknown },
) {
  const { payload, type } = action;
  let questionCount, configType;
  switch (type) {
    case CHANGE_NUMBER_OF_QUESTIONS:
      // the action and the store may receive any number - keep it playable
      questionCount = Math.max(1, Math.floor(payload.questionCount) || 1);
      configType = payload.configType;
      switch (configType) {
        case ConfigType.GENERAL:
          return {
            ...state,
            general: {
              ...state.general,
              questionCount,
            },
          };
        default:
          break;
      }
      break;
    case CHANGE_RANGE_FROM:
      configType = payload.configType;
      switch (configType) {
        case ConfigType.GENERAL:
          return {
            ...state,
            general: {
              ...state.general,
              from: normalizeRangeBound(payload.value, state.general.from),
            },
          };
        default:
          break;
      }
      break;
    case CHANGE_RANGE_TO:
      configType = payload.configType;
      switch (configType) {
        case ConfigType.GENERAL:
          return {
            ...state,
            general: {
              ...state.general,
              to: normalizeRangeBound(payload.value, state.general.to),
            },
          };
        default:
          break;
      }
      break;
  }
  return state;
}
