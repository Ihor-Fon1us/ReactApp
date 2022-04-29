class GameItem{
    constructor(user, opponent, x, y, stepsToWin){
        this.cell_1 = null;
        this.cell_2 = null;
        this.cell_3 = null;
        this.cell_4 = null;
        this.cell_5 = null;
        this.cell_6 = null;
        this.cell_7 = null;
        this.cell_8 = null;
        this.cell_9 = null;
        this.board = [];
        this.user = user;
        this.opponent = opponent;
        this.x = x;
        this.y = y;
        this.stepsToWin = stepsToWin;
        this.step = 0;
        this.turn = 'X';
        this.timeout = null;
        this.on('timer', function(state, user) {
            if(state == 'stop') {
                clearTimeout(this.timeout);
                this.timeout = null;
            } else {
                let game = this;
                this.timeout = setTimeout(function() {
                    game.emit('timeout', user);
                }, 15000);
            }
        });
    }

    setCondition(x, y, turn){
        if(x = 0) {
            if(y == 0) {
                this.cell_1 = turn;
            } else if(y == 1) {
                this.cell_2 = turn;
            } else if(y == 2) {
                this.cell_3 = turn;
            }
        } else if(x == 1) {
            if(y == 0) {
                this.cell_4 = turn;
            } else if(y == 1) {
                this.cell_5 = turn;
            } else if(y == 2) {
                this.cell_6 = turn;
            }
        } else if(x == 2) {
            if(y == 0) {
                this.cell_7 = turn;
            } else if(y == 1) {
                this.cell_8 = turn;
            } else if(y == 2) {
                this.cell_9 = turn;
            }
        }
    }

    getCondition(){
        return {
            cell_1: this.cell_1,
            cell_2: this.cell_2,
            cell_3: this.cell_3,
            cell_4: this.cell_4,
            cell_5: this.cell_5,
            cell_6: this.cell_6,
            cell_7: this.cell_7,
            cell_8: this.cell_8,
            cell_9: this.cell_9
        }
    }

    step(x, y, user, cb) {
        if(this.board[x + 'x' + y] !== undefined || this.getTurn(user) != this.turn) return;
        this.emit('timer', 'stop');
        this.board[x + 'x' + y] = this.getTurn(user);
        this.turn = (user != this.user ? 'X' : 'O');
        this.steps++;
        this.setCondition(x, y, this.turn);
        this.emit('timer', 'start', (user == this.user ? this.opponent : this.user));
        cb(this.checkWinner(x, y, this.getTurn(user)), this.getTurn(user));
    }
    getTurn(user){
        return (user == this.user ? 'X' : 'O');
    }
    end(user, cb){
        delete this.free[user];
        if(this.users[user] === undefined) return;
        let gameId = this.users[user];
        if(this.games[gameId] === undefined) return;
        let game = this.games[gameId];
        let opponent = (user == game.user ? game.opponent : game.user);
        let turn = game.turn;
        delete this.games[gameId];
        game = null;
        delete this.users[user];
        cb(gameId, opponent, turn);
    }
    checkWinner(x, y, turn){
        if(this.steps == (this.x * this.y)) {
            // Ничья
            return 'none';
            // Проверка на победителя
        } else if(
            this.checkWinnerDynamic('-', x, y, turn)
                || this.checkWinnerDynamic('|', x, y, turn)
                || this.checkWinnerDynamic('\\', x , y, turn)
                || this.checkWinnerDynamic('/', x, y, turn)
            ) {
            // есть победитель
            return true;
        } else {
            // нет победителя
            return false;
        }
    }
    checkWinnerDynamic(a, x, y, turn){
        let win = 1;
        switch(a) {

            // поиск по горизонтали
            case '-':
                var toLeft = toRight = true,
                    min = x - this.stepsToWin, max = x + this.stepsToWin;
                min = (min < 1) ? 1 : min;
                max = (max > this.x) ? this.x : max;
                for(let i = 1; i <= this.stepsToWin; i++) {
                    if(win >= this.stepsToWin) return true;
                    if(!toLeft && !toRight) return false;
                    if(toLeft && min <= (x-i) && this.board[(x-i) + 'x' + y] == turn) { win++; } else { toLeft = false; }
                    if(toRight && (x+i) <= max && this.board[(x+i) + 'x' + y] == turn) { win++; } else { toRight = false; }
                }
                break;

            // поиск по вертикали
            case '|':
                var toUp = toDown = true,
                    min = y - this.stepsToWin, max = y + this.stepsToWin;
                min = (min < 1) ? 1 : min;
                max = (max > this.y) ? this.y : max;
                for(let i = 1; i <= this.stepsToWin; i++) {
                if(win >= this.stepsToWin) return true;
                if(!toUp && !toDown) return false;
                if(toUp && min <= (y-i) && this.board[x + 'x' + (y-i)] == turn) { win++; } else { toUp = false; }
                if(toDown && (y+i) <= max && this.board[x + 'x' + (y+i)] == turn) { win++; } else { toDown = false; }
                }
            break;

            // поиск по диагонали сверху вниз
            case '\\':
                var toUpLeft = toDownRight = true,
                    minX = x - this.stepsToWin, maxX = x + this.stepsToWin,
                    minY = y - this.stepsToWin, maxY = y + this.stepsToWin;
                minX = (minX < 1) ? 1 : minX;
                maxX = (maxX > this.x) ? this.x : maxX;
                minY = (minY < 1) ? 1 : minY;
                maxY = (maxY > this.y) ? this.y : maxY;
                for(let i = 1; i <= this.stepsToWin; i++) {
                if(win >= this.stepsToWin) return true;
                if(!toUpLeft && !toDownRight) return false;
                if(toUpLeft && minX <= (x-i) && minY <= (y-i) && this.board[(x-i) + 'x' + (y-i)] == turn) { win++; } else { toUpLeft = false; }
                if(toDownRight && (x+i) <= maxX && (y+i) <= maxY && this.board[(x+i) + 'x' + (y+i)] == turn) { win++; } else { toDownRight = false; }
                }
            break;

            // поиск по диагонали снизу вверх
            case '/':
                var toDownLeft = toUpRight = true,
                    minX = x - this.stepsToWin, maxX = x + this.stepsToWin,
                    minY = y - this.stepsToWin, maxY = y + this.stepsToWin;
                minX = (minX < 1) ? 1 : minX;
                maxX = (maxX > this.x) ? this.x : maxX;
                minY = (minY < 1) ? 1 : minY;
                maxY = (maxY > this.y) ? this.y : maxY;
                for(let i = 1; i <= this.stepsToWin; i++) {
                    if(win >= this.stepsToWin) return true;
                    if(!toDownLeft && !toUpRight) return false;
                    if(toDownLeft && minX <= (x-i) && (y+i) <= maxY && this.board[(x-i) + 'x' + (y+i)] == turn) { win++; } else { toDownLeft = false; }
                    if(toUpRight && (x+i) <= maxX && (y-i) <= maxY && this.board[(x+i) + 'x' + (y-i)] == turn) { win++; } else { toUpRight = false; }
                }
            break;

            default: return false; break;
        }
        return(win >= this.stepsToWin);
    }
}

module.exports = GameItem;