/** @module ApiController */

module.exports = {

  stack: [],
  store: {},

  /**
  * @api {GET}  /api/stack  getFromStack()
  * @apiDescription         Get word from a stack
  * @apiGroup               ApiController
  */
  getFromStack (req, res) {
    let item   = this.stack.pop()
    let result = item || { success: 0, msg: 'No item left' }  
    return res.json(result)
  },

  /**
  * @api {GET} /api/stack   addToStack()
  * @apiDescription         Add to stack a word
  * @apiGroup               ApiController
  */
  addToStack (req, res) {
    let { word } = req.body
    this.stack.push(word)
    return res.json({ success: 1, msg: 'Word was added'})
  },  


  /**
  * @api {POST} /api/stack   addKeyToStore()
  * @apiDescription          Add to stack a word
  * @apiGroup                ApiController
  */
  addKeyToStore (req, res) {
    let {key, value, ttl} = req.body
    this.store[key] = ttl ? { value, ttl } : value
    return res.json({ success: 1, msg: 'Key was added'}) 
  },

  /**
  * @api {GET} /api/store/:key   getValueByKey()
  * @apiDescription              Add to stack a word
  * @apiGroup                    ApiController
  */
  getValueByKey (req, res) {
    let { key } = req.params
    if (!this.store[key]) {
      return res.json({success: 0, msg: 'No such key in store'})
    }

    return res.json({ value: this.store[key] })
  },

  /**
  * @api {DELETE} /api/store/:key   deleteValueByKey()
  * @apiDescription                 Delete key from store by key
  * @apiGroup                       ApiController
  */
  deleteValueByKey (req, res) {
    let { key } = req.params
    delete this.store[key]
    return res.json({ success: 1, msg: 'Key was deleted'})     
  },


 

}
