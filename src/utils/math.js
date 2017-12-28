/**
 * Returns random number from the given range
 * @param {number} min lower value to pick from
 * @param {number} max higher value to pick from
 * @returns number
 */
export function randomRange(min, max) {

    if (min === max) min = 0;
    return min + Math.floor(Math.random() * (max - min + 1))
}


/**
 * Returns random option from given list
 * @param {Array} list Array with elements to choose
 * @returns any
 */
export function randomOption(list) {
    return list[Math.floor(Math.random() * list.length)];
}