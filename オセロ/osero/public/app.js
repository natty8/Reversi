/*
const express = require('express');
const app = express();
const httpserver = require('http').Server(app);
const io = require('socket.io')(httpserver);
const PORT = 3000;

app.use(express.static('public'));

io.on('connection', onConnect);

httpserver.listen(PORT, onStartServer);

// 新しい接続の処理
function onConnect(socket) {
  console.log('新しい接続: id=' + socket.id);
  // messageという名前のデータを受信したらonReceiveを呼び出す
  socket.on('message', onReceive);
}

// データを受信したときの処理
function onReceive(data) {
  console.log(this.id + ' : ' + data);
  // 全員にmessageという名前でdataを送信する
  io.emit('message', data);
}

function onStartServer() {
  console.log(`ポート ${PORT} で待機中`);
}*/