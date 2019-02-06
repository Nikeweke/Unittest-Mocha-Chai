/*
*  bootstrap.js
*
*  Import of packages and setup of app
*/
 
global.config    = require('../config.json')  // Set global config from './config.json'
const express    = require('express')
const nunjucks   = require('nunjucks')
const routes     = require('./routes')
const server     = require('./server.js')
const database   = require('./database.js')
const prototypes = require('./prototypes.js')


module.exports = function () {
  /*
  |--------------------------------------------------------------------------
  | Init app with express.js
  |--------------------------------------------------------------------------
  */
  const app = express()


  /*
  |--------------------------------------------------------------------------
  | Connect to DB
  |--------------------------------------------------------------------------
  */
  database.connect()


  /*
  |--------------------------------------------------------------------------
  | Apply custom prototypes
  |--------------------------------------------------------------------------
  |
  */
  prototypes()


  /*
  |--------------------------------------------------------------------------
  | Set templater
  |--------------------------------------------------------------------------
  |
  */
  nunjucks.configure('views', { autoescape: true, express: app })
  app.set('view engine', 'njk')


  /*
  |--------------------------------------------------------------------------
  | Static files (СSS, JS)
  |--------------------------------------------------------------------------
  |
  */
  app.use(express.static('./public'))


  /*
  |--------------------------------------------------------------------------
  |  Jobs start
  |--------------------------------------------------------------------------
  |   Запуск здесь 'app / jobs / jobs.js'.
  |
  */
  if (global.config.jobs) { require('../app/jobs/jobs.js').jobs() }


  /*
  |--------------------------------------------------------------------------
  | Sockets start
  |--------------------------------------------------------------------------
  |   Запуск здесь 'app / config / sockets.js', и там же можно изменить порт сокетов
  */
  if (global.config.sockets.enabled) { require('./sockets.js').sockets(app) }


  /*
  |--------------------------------------------------------------------------
  | Routes
  |--------------------------------------------------------------------------
  | Routes gather all routes in one file.
  | Routes lives in ./routes.
  |
  */
  routes(app)


  /*
  |--------------------------------------------------------------------------
  | Reload browser if javascript was changed, not views (for rerendering views use: npm i supervisor -g, npm start hrm)
  |--------------------------------------------------------------------------
  */
  if (global.config.reload) { require('reload')(app) }


  /*
  |--------------------------------------------------------------------------
  | Up the server
  |--------------------------------------------------------------------------
  */
  return server(app) // returning for test
}

// app.set('view engine', 'ejs');                     // Установка шаблонизатора "EJS": 1) npm i ejs --save;    2) Uncomment this line;    3) create file index.ejs;    4) use it;
// app.set('views', path.join(__dirname, 'templates')); // установить папку для шаблоново по ум. это "views"
