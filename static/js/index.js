'use strict';

const socket = io();

socket.on('connect', () => {
  var receiveMsg = '접속 됨';
  let historyDiv = document.getElementById('historyDiv');
  let pTag = document.createElement('p');
  var content = document.createTextNode(receiveMsg);
  pTag.appendChild(content);
  historyDiv.appendChild(pTag)
});

function send() {
  let message = document.getElementById('mInputMessage').value;
  document.getElementById('mInputMessage').value = '';
  socket.emit('send', { msg: message });
};
