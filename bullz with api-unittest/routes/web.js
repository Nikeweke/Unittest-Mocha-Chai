/*
*   web.js
*
*   Web Routes
*
*/
const express = require('express')
const router  = express.Router()

const CheckReq = require('../app/helpers/CheckRequest')

// test your request
router.all('/test', CheckReq)

module.exports = router
