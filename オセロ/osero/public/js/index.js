(function () {
    // 変数定義
    var BOARD_TYPE = {
        'WIDTH': 8,//盤面の横
        'HEIGHT': 8,//盤面の縦
    };

    var PIECE_TYPE = {
        'NONE': 0,
        'BLACK': 1,
        'WHITE': 2,
        'MAX': 3,
    };

    var stone;
    var board = [];//盤面を配列化

    var turn

    //石を裏返す処理
    var checkTurnOver = function (x, y, flip) {

        var ret = 0;
        //dxは描画イメージの短形のx座標
        //dyは描画イメージの短形のy座標

        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx == 0 && dy == 0) {
                    continue;
                }

                var nx = x + dx;
                var ny = y + dy;
                var n = 0;
                while (board[nx][ny] == PIECE_TYPE.MAX - turn) {
                    n++;
                    nx += dx;
                    ny += dy;
                }

                if (n > 0 && board[nx][ny] == turn) {
                    ret += n;

                    if (flip) {
                        nx = x + dx;
                        ny = y + dy;

                        while (board[nx][ny] == PIECE_TYPE.MAX - turn) {
                            board[nx][ny] = turn;
                            nx += dx;
                            ny += dy;
                        }
                        board[x][y]=turn;


                    }
                }
            }
        }

        return ret;
    };


    //ターンを表示する処理
    var turnChange = function () {
        var b = 0;
        var w = 0;

        turn = 3 - turn;
        var message = ((turn == 1) ? "黒" : "白");
        
        for (var x = 1; x <= 8; x++) {
            for (var y = 1; y <= 8; y++) {
                if (board[x][y] == 0 && checkTurnOver(x, y, false)) {//[x][y]に何もない状態で戦略的にも石がおけるなら
                    document.getElementById("message").innerHTML = message + "の番です";
                    showBoard();
                    return;
                }

            }

        }
        

        turn = PIECE_TYPE.MAX - turn;
        message += "は置ける場所がありません！" + ((turn == PIECE_TYPE.BLACK) ? "黒" : "白") + "の番です";

        for (var x = 1; x <= 8; x++) {
            for (var y = 1; y <= 8; y++) {
                if (board[x][y] == 0 && checkTurnOver(x, y, false)) {
                    document.getElementById('message').innerHTML = message;
                    showBoard();
                    return;
                }
                else {
                    if (board[x][y] == 1) {
                        b++;
                    }
                    if (board[x][y] == 2) {
                        w++;
                    }
                }
            }

        }

        message = "黒:" + b + "白:" + w + "<br>";
        if (b == w) {
            message += "お疲れさまでした！引き分けです！";
        }
        else {
            message += "お疲れさまでした！"+((b > w) ? "黒" : "白") + "の勝ちです！";
        }
        document.getElementById("message").innerHTML = message;
        showBoard();


    };

    var showBoard = function () {//盤面を表示するための関数

        var b = document.getElementById("board");

        while (b.firstChild) {
            b.removeChild(b.firstChild);
        }

        for (var y = 1; y <= BOARD_TYPE.HEIGHT; y++) {
            for (var x = 1; x <= BOARD_TYPE.WIDTH; x++) {
                var cell = stone[board[x][y]].cloneNode(true);//cloneNodeでノードを複製

                cell.style.left = ((x - 1) * 31) + "px";//盤面の緑の部分の配置(横)
                cell.style.top = ((y - 1) * 31) + "px";//盤面の緑の部分の配置(高さ)
                b.appendChild(cell);//cloneNodeで複製したノードをappendChildによってbにcellを追加

                if (board[x][y] == PIECE_TYPE.NONE) {
                    (function () {
                        var _x = x;
                        var _y = y;

                        cell.onclick = function () {
                            if (checkTurnOver(_x, _y, true)) {
                               turnChange();

                            }

                        };
                    })();
                }
            }
        }

    };
    //初期配置(最初に読み込んだ時の配置)？
    onload = function () {
        turn = PIECE_TYPE.WHITE;

        stone = [
            document.getElementById("cell"),//0=石なし
            document.getElementById("black"),//1=黒
            document.getElementById("white")//2=白
        ];

        // PIECE種別の凍結(オブジェクトを変更出来ないように固定)
        //Object.freeze(PIECE_TYPE);

        // 盤面を初期化
        for (var i = 0; i < 10; i++) {
            board[i] = [];//配列作成
            for (var j = 0; j < 10; j++) {
                board[i][j] = PIECE_TYPE.NONE;//盤面のために二次元配列
            }
        }

        // 石の初期配置
        board[4][5] = PIECE_TYPE.BLACK;
        board[5][4] = PIECE_TYPE.BLACK;
        board[4][4] = PIECE_TYPE.WHITE;
        board[5][5] = PIECE_TYPE.WHITE;

        turnChange();

        // 盤面表示
        //showBoard();


    };
})();

function score(black) {
    var elem = document.getElementById('black');
    document.getElementById("black");
}
/*
const socket = io();

let sendButton = document.getElementById('sendButton');
sendButton.addEventListener('click', sendButtonHandler, false);

// messageという名前のデータを受信したらonReceiveを呼び出す
socket.on('message',  onReceive);

// ボタンがクリックされたとき
function sendButtonHandler(ev) {
  ev.preventDefault();
  let userText = document.getElementById('userText');
  // 入力されたテキストをmessageという名前でサーバーに送る
  socket.emit('message', userText.value);
  userText.value = '';
}

// サーバーからデータを受信したとき
function onReceive(msg) {
  let messages = document.getElementById('chat');
  // <li>要素を作成する
  let li = document.createElement('li');
  li.textContent = msg;
  // 画面に要素を追加する
  messages.appendChild(li);
}
const socket = io();

let sendButton = document.getElementById('sendButton');
sendButton.addEventListener('click', sendButtonHandler, false);

// messageという名前のデータを受信したらonReceiveを呼び出す
socket.on('message',  onReceive);

// ボタンがクリックされたとき
function sendButtonHandler(ev) {
  ev.preventDefault();
  let userText = document.getElementById('userText');
  // 入力されたテキストをmessageという名前でサーバーに送る
  socket.emit('message', userText.value);
  userText.value = '';
}

// サーバーからデータを受信したとき
function onReceive(msg) {
  let messages = document.getElementById('chat');
  // <li>要素を作成する
  let li = document.createElement('li');
  li.textContent = msg;
  // 画面に要素を追加する
  messages.appendChild(li);
}
*/