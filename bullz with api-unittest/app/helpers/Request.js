/*
*   Request.js
*
*   Math helper functions
*/

const axios = require('axios')

module.exports = {

  /*
  |--------------------------------------------------------------------------
  | Получить рандомное целочисельное
  |--------------------------------------------------------------------------
  */
  makeReq: function (url, method = 'get', postData = {}) {
    let headers = {}
    // let headers = {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    // };

    return axios[method](url, postData, {headers: headers})
      .then(res => res)
      .catch(console.log)
  }

}
