/*
*  database.js
*
*  Работа с БД (все подключение сохраняем в "conn" - (Example: global.databases.mysql.conn = ...)
*/
const colors = require('colors')
const dbConfig = global.config.databases
const { errCatcher } = require('../app/helpers/ErrorCatcher')

module.exports = {

  /*
  |--------------------------------------------------------------------------
  | Подключение к БД
  |--------------------------------------------------------------------------
  */
  connect () {
    if (dbConfig.mysql.enabled) {
      this.connectMysql()
    }

    if (dbConfig.sqlite.enabled) {
      this.connectSqlite()
    }

    if (dbConfig.mongodb.enabled) {
      this.connectMongodb()
    }
  },


  /*
  |--------------------------------------------------------------------------
  | Подключение к MySql
  |--------------------------------------------------------------------------
  */
  connectMysql () {
    let {host, user, password, database} = dbConfig.mysql
    const Mysql = require('sync-mysql')
    dbConfig.mysql.conn = new Mysql({
      host,
      user,
      password,
      database
    })
    console.log(colors.green.bold('MySQL') + ' => Connected')
  },


  /*
  |--------------------------------------------------------------------------
  | Подключение к SQLite
  |--------------------------------------------------------------------------
  */
  connectSqlite () {
    let {db_adress} = dbConfig.sqlite
    dbConfig.sqlite.conn = require('sqlite-sync').connect(db_adress)
    console.log(colors.green.bold('SQLite') + ' => Connected')
  },


  /*
  |--------------------------------------------------------------------------
  | Подключение к Mongodb
  |--------------------------------------------------------------------------
  */
  connectMongodb () {
    const {db_adress} = dbConfig.mongodb
    const mongoose = require('mongoose') 
    mongoose.connect(db_adress, { useNewUrlParser: true }).catch(() => {})

    // getting connection
    let db = mongoose.connection

    // set listeners to events of DB
    db.on('error', errCatcher)
    db.on('connected', () => console.log(colors.green.bold('MongoDB') + ' => Connected'))
  },
}
