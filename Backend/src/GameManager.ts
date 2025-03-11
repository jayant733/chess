import { WebSocket } from "ws"
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";


export class GameManager{
    private games : Game[]  //games jo hai woh game class ka array bana raha hai games = array of class Game which can contain only properties in the game class
    private pendingUser : WebSocket | null
     private Users : WebSocket[]
    constructor (){
        this.games = [] // have a constructor which will initializw the game array
        this.pendingUser = null
        this.Users = []

   

    }

    addUser(socket :WebSocket){
            this.Users.push(socket)
            this.handlemessage(socket)
    }

    removeUser(socket : WebSocket){

    }

    private handlemessage (socket :WebSocket){
        socket.on("message", (data)=>{
            const message = JSON.parse(data.toString())

            if(message.type === INIT_GAME){
                if(this.pendingUser){

                    
                    //start a game
                    const game = new Game(this.pendingUser , socket)
                    this.games.push(game)
                    this.pendingUser = null
                }
                else {
                    this.pendingUser = socket
                }
            }
           
            if(message.type === MOVE){
                
                console.log("inside move")
                const game = this.games.find(game =>
                    game.player1===socket || game.player2 ===socket
                 )
                console.log(game)
         
                if(game){
                    console.log("inside make move")
                    game.makeMove(socket, message.payload.move)
                    console.log()
                }

            }
        })
    }


}