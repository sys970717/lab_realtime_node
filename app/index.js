'use strict';

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const port = 8080;

const app = express();

app.use(cors());

app.use('/css', express.static(path.join(__dirname, '../static/css')));
app.use('/js', express.static(path.join(__dirname, '../static/js')));

app.get("/", (req, res) => {
    fs.readFile(path.join(__dirname, '../static/index.html'), (err, data) => {
        if (err) {
            return res.send('에러');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        }
    });
});


const server = http.createServer(app);
const io = socketIO(server);

require('./chat')(io);

server.listen(port, () => {
    console.log(`Express on ${port}`);
});

exports.app = app;