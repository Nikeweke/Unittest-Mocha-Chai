/*
*   Sleep.js
*
*/

const sleep = (ms) => new Promise((r, j)=>setTimeout(r, ms))


module.exports = sleep
