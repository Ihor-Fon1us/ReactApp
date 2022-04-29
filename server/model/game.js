const GameItem = require('./gameItem');
class Game{
    constructor(){
        this.games = [];
        this.users = [];
        this.free = [];
        this.x = 3;
        this.y = 3;
        this.stepsToWin = 3;
    }
    step(gameId, x, y, cb){
        this.games[gameId].step(x, y, user, cb);
    }
    start(user, cb){
        if(Object.keys(this.free).length > 0) {
            var opponent = Object.keys(this.free).shift();
            delete this.free[opponent];
            var game = new GameItem(user, opponent, this.x, this.y, this.stepsToWin);
            var id = [
                Math.random() * 0xffff | 0
                , Math.random() * 0xffff | 0
                , Math.random() * 0xffff | 0
                , Date.now()
            ].join('-');
            this.games[id] = game;
            this.users[user] = id;
            this.users[opponent] = id;
            game.emit('timer', 'start', user);
            cb(true, id, opponent, this.x, this.y);
        } else {
            this.free[user] = true;
            cb(false);
        }
    }
}

module.exports = Game;
