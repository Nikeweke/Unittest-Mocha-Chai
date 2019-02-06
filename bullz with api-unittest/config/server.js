/*
*  Поднятие сервера
*
*  server.js
*/
const getRoutes = require('../app/helpers/Routes')
const util      = require('util')
const colors    = require('colors')
const MODES = {
  dev:    { name: 'dev',   port: 8000,  color: 'yellow'  },
  test:   { name: 'test',  port: 3000,  color: 'magenta' },
  prod:   { name: 'prod',  port: 80,    color: 'green'   },
  routes: { name: 'routes' }
}

module.exports = function (app) {
  // что такое process.argv[...] ?
  // это просто параметры которые можно ловить с консоли - node  app  <modeName>
  //                                                        [0]   [1]  [2]
  let modeName = process.argv[2]

  // если просмотр маршрутов
  if (modeName === 'routes') {
    console.log( getRoutes(app) )    
    process.exit(1)
  }
  // определяем порт (по ум. - 8000). 
  let mode = modeName && modeName in MODES ? MODES[modeName] : MODES.dev 

  // запуск сервера
  app.listen(mode.port, () => {
    let coloredMsg = []
    for (let key of Object.keys(mode)) {
      coloredMsg.push(colors.bold[mode.color](mode[key]))
    }
    coloredMsg[2] = colors.bold[mode.color]('App')

    util.log(`${coloredMsg[2]} is running on port: ${coloredMsg[1]} (${coloredMsg[0]} mode)`)
  })

  return app
}
