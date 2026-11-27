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

/**
 * Returns random integer from the given range (bounds are inclusive).
 * The order of the bounds does not matter.
 * @param {number} min lower value to pick from
 * @param {number} max higher value to pick from
 * @param {boolean} includeZero Default true. If set to false, then zero is excluded from the result.
 * @returns number
 */
export function randomRange(
  min: number,
  max: number,
  includeZero: boolean = true,
) {
  const low = Math.min(min, max);
  const high = Math.max(min, max);

  if (low === high) {
    // Single-value range: there is nothing to draw. When zero is excluded and
    // zero is the only available value, return the closest positive value
    // instead of recursing forever (the old implementation overflowed the
    // call stack for randomRange(0, 0, false)).
    return !includeZero && low === 0 ? 1 : low;
  }

  if (includeZero || low > 0 || high < 0) {
    // Zero is not part of the range, or it is allowed - plain uniform draw.
    return low + Math.floor(Math.random() * (high - low + 1));
  }

  // Zero must be skipped: draw uniformly from all values of the range except 0.
  const count = high - low; // total values minus the excluded zero
  const index = Math.floor(Math.random() * count);
  return index < -low ? low + index : index + low + 1;
}

/**
 * Returns random option from given list
 * @param {Array} list Array with elements to choose
 * @returns any
 * @throws {Error} when the list is empty (there is nothing to pick)
 */
export function randomOption<T>(list: readonly T[]): T {
  if (list.length === 0) {
    throw new Error("randomOption: cannot pick a value from an empty list");
  }
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * Returns a new, shuffled copy of the given array. The input is never mutated,
 * so callers can keep their original order (e.g. to read a value before the
 * shuffle happens).
 */
export function shuffle<T>(array: readonly T[]): T[] {
  const result = array.slice();

  for (let m = result.length; m > 1; ) {
    const i = Math.floor(Math.random() * m--);
    const t = result[m];
    result[m] = result[i];
    result[i] = t;
  }

  return result;
}
