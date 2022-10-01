"use strict";
/**
 * @constructs chunk
 * @function
 * @param {String} array 
 * @param {Number} size 
 * @returns {Array}
 * @example
 * const { chunk } = require('coders.js');
 * console.log(chunk(['a', 'b', 'c', 'd'], 2));
 * // Output: [['a', 'b'], ['c', 'd']]
 */
function chunk(array, size) {
    if (!Array.isArray(array)) throw new Error('array must be an array');
    if (typeof size !== 'number') throw new Error('size must be a number');
    const chunked_arr = [];
    for (let i = 0; i < array.length; i += size) {
        chunked_arr.push(array.slice(i, i + size));
    }
    return chunked_arr;
}
/**
 * @constructs StringToMs
 * @function
 * @param {String} string 
 * @returns {Number}
 * @example
 * const { StringToMs } = require('coders.js');
 * console.log(StringToMs('1d'));
 * // Output: 86400000
 */
function StringToMs(string) {
    if (typeof string !== 'string') throw new Error('string must be a string');
    const seconds = string.match(/(\d+(?:\.\d+)?)\s*(?:s(?:ec(?:ond)?s?)?|seconds?)/i);
    const minutes = string.match(/(\d+(?:\.\d+)?)\s*(?:m(?:in(?:ute)?s?)?|minutes?)/i);
    const hours = string.match(/(\d+(?:\.\d+)?)\s*(?:h(?:ou(?:r)?s?)?|hours?)/i);
    const days = string.match(/(\d+(?:\.\d+)?)\s*(?:d(?:ay)?s?|days?)/i);
    const weeks = string.match(/(\d+(?:\.\d+)?)\s*(?:w(?:ee(?:k)?s?)?|weeks?)/i);
    const months = string.match(/(\d+(?:\.\d+)?)\s*(?:mo(?:n(?:th)?s?)?|months?)/i);
    const years = string.match(/(\d+(?:\.\d+)?)\s*(?:y(?:ea(?:r)?s?)?|years?)/i);
    let ms = 0;
    if (seconds) ms += parseFloat(seconds[1]) * 1000;
    if (minutes) ms += parseFloat(minutes[1]) * 60000;
    if (hours) ms += parseFloat(hours[1]) * 3600000;
    if (days) ms += parseFloat(days[1]) * 86400000;
    if (weeks) ms += parseFloat(weeks[1]) * 604800000;
    if (months) ms += parseFloat(months[1]) * 2629800000;
    if (years) ms += parseFloat(years[1]) * 31557600000;
    return ms;
}
/**
 * @constructs ms
* @function
* @param {Number} ms 
* @returns {String}
* @example
* const { ms } = require('coders.js');
* console.log(ms(86400000));
* // Output: 1d
*/                                                                                                                                          
function ms(ms) {
    if (typeof ms !== 'number') throw new Error('ms must be a number');
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    days = days < 10 ? '0' + days : days;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    if (days > 0) {
        return `${days}:${hours}:${minutes}:${seconds}`;
    } else if (hours > 0) {
        return `${hours}:${minutes}:${seconds}`;
    } else if (minutes > 0) {
        return `${minutes}:${seconds}`;
    } else {
        return `${seconds}`;
    }
};
/**
 * @constructs shuffleArray
 * @function
 * @param {Number} time 
 * @returns {String}
 * @example
 * const { shuffleArray } = require('coders.js');
 * console.log(shuffleArray([1, 2, 3, 4, 5]));
 * // Output: [ 2, 5, 1, 4, 3 ]
 */
function shuffleArray(array) {
    if (!Array.isArray(array)) throw new Error('array must be an array');
    let i = array.length, temp, randomIndex;
    while (0 !== i) {
        randomIndex = Math.floor(Math.random() * i);
        i -= 1;
        temp = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
};

module.exports = {
    chunk,
    StringToMs,
    ms,
    shuffleArray
}