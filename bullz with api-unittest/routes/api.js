/*
*   api.js
*
*   API Routes
*
*/
const express = require('express')
const router  = express.Router()

/** All routes here are under group of 'localhost/api/...' */

// controllers
const ApiController = require('../app/controllers/ApiController')

// middlewares
const checkRequest = require('./middleware/CheckRequest')
const middlewares = []

router.get( '/stack', middlewares, (req, res) => ApiController.getFromStack(req, res))
router.post('/stack', middlewares, (req, res) => ApiController.addToStack(req, res))

router.post('/store',        middlewares, (req, res) => ApiController.addKeyToStore(req, res))
router.get( '/store/:key',   middlewares, (req, res) => ApiController.getValueByKey(req, res))
router.delete('/store/:key', middlewares, (req, res) => ApiController.deleteValueByKey(req, res))

module.exports = router

