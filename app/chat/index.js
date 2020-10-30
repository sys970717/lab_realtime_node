'use strict';

module.exports = (socketIO) => {
  socketIO.sockets.on('connection', (socket) => {
    socket
      .on('disconnetced', () => {
        console.log('접속 종료');
        socket.broadcast.emit('update', {
          type: 'disconnected',
          sender: 'SERVER',
          message: `${name} 님이 ${roomId} 에 퇴장하였습니다.`,
        })
      })
      .on('newUser', (userObj) => {
        console.log(`new user: ${JSON.stringify(userObj)}`);
        socket.name = userObj.name;
        socket.broadcast.emit('update', {
          sender: 'SERVER',
          message: `${userObj.name} 님이 입장하였습니다.`,
        });
      })
      .on('message', (data) => {
        console.log(data)
        data.name = socket.name;
        socket.broadcast.emit('update', data);
      })
  });
}
