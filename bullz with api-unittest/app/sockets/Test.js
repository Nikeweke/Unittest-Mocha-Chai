/*
*   Test.js
*
*   Test Socket
*
*/

// Models
// const myModel = require('../models/myModel');

module.exports = function (io) {
  // start working with sockets
  io.sockets.on('connection', function (socket) {

    // receiving message from client side  
    socket.on('send words', function (data) {
      //  console.log(data);
      var answer = ''

      if (data === 'hello') {
        answer = 'Hello, i am Socket, I have received your message. Well done!'
      } else {
        answer = 'You didnt say me hello and i am confused a little bit!'
      }

      socket.emit('socket message', answer)
    })

    // socket.on('disconnect', function()
    //  {
    //
    //  });
  })
}
