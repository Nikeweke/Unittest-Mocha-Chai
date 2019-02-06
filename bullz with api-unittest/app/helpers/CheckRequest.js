/*
*   CheckRequest.js
*
*   Request helper functions
*/

function CheckRequest (req, res) {
  res.send({
    Method: req.method,
    Body: req.body,
    Params: req.params,
    Query: req.query,
    'Content-type (Request)': req.headers['content-type']
  })
}


module.exports = CheckRequest
  