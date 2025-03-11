"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const messages_1 = require("./messages");
const Game_1 = require("./Game");
class GameManager {
    constructor() {
        this.games = []; // have a constructor which will initializw the game array
        this.pendingUser = null;
        this.Users = [];
    }
    addUser(socket) {
        this.Users.push(socket);
        this.handlemessage(socket);
    }
    removeUser(socket) {
    }
    handlemessage(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === messages_1.INIT_GAME) {
                if (this.pendingUser) {
                    //start a game
                    const game = new Game_1.Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = socket;
                }
            }
            if (message.type === messages_1.MOVE) {
                console.log("inside move");
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                console.log(game);
                if (game) {
                    console.log("inside make move");
                    game.makeMove(socket, message.payload.move);
                    console.log();
                }
            }
        });
    }
}
exports.GameManager = GameManager;
