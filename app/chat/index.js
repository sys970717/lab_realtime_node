'use strict';

module.exports = socketIO => {
  socketIO.sockets.on('connection', (socket) => {
    socket
      .on('send', (data) => {
        console.log(`Send Message: ${data.msg}`);
      })
      .on('disconnetced', () => {
        console.log('접속 종료');
      })
  });
}
