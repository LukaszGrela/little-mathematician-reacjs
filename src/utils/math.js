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
 * Returns random number from the given range
 * @param {number} min lower value to pick from
 * @param {number} max higher value to pick from
 * @param {boolean} includeZero Default true. If set to false, then zero is excluded from the result.
 * @returns number
 */
export function randomRange(min, max, includeZero=true) {

    if (min === max) min = 0;
    const result = min + Math.floor(Math.random() * (max - min + 1));
    if(!includeZero && result === 0) return randomRange(min, max, includeZero);
    return result;
}


/**
 * Returns random option from given list
 * @param {Array} list Array with elements to choose
 * @returns any
 */
export function randomOption(list) {
    return list[Math.floor(Math.random() * list.length)];
}


export function shuffle(array) {
    let m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}