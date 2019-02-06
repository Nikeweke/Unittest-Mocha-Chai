/*
*   ErrorCatcher.js
*
*   error catcher fns
*/

const colors = require('colors')

module.exports = {

  /*
  |--------------------------------------------------------------------------
  | Catch unhandled promise rejection and show in which line error occured
  | (UnhandledPromiseRejectionWarning)
  |--------------------------------------------------------------------------
  */
  catchPromiseRejection: function (url, method, postData) {
    process.on('unhandledRejection', (reason, p) => {
      console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
      // application specific logging, throwing an error, or other logic here
    })
  },


  /*
  |--------------------------------------------------------------------------
  | Simple error catcher with colors
  |--------------------------------------------------------------------------
  */
  errCatcher (err) {
    let error = colors.red.bold('ERROR [' + err.name + '] - ')
    error += colors.yellow(err.message)
    console.log(error)
    // process.exit(1)
  }

}
