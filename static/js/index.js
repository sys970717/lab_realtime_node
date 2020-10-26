'use strict';

const socket = io();
const user = {
  name: '',
}

socket.on('connect', () => {
  user.name = prompt('이름 입력', '') || '익명';
  socket.emit('newUser', user);
});

socket.on('update', async (data) => {
  console.log(data);
  await insertHistory(data);
})

async function send() {
  let message = document.getElementById('mInputMessage').value;
  const data = {
    message,
    sender: user.name
  }
  socket.emit('message', data);
  console.log(data);
  await insertHistory(data);
  document.getElementById('mInputMessage').value = '';
};

async function insertHistory(data) {
  let historyDiv = document.getElementById('historyDiv');
  let pTag = document.createElement('p');
  var content = document.createTextNode(`${data.sender}: ${data.message}`);
  pTag.appendChild(content);
  historyDiv.appendChild(pTag)
}
