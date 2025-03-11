import { Chess, Color, PieceSymbol, Square } from 'chess.js'
import { useState } from 'react';
import { MOVE } from '../screens/Game';


export const Chessboard = ({chess,setboard ,board, socket} : {
  chess  :  Chess,
  setboard : any;
    board : ({
      square : Square,
      type : PieceSymbol,
      color : Color;
      
    } | null)[][];
    socket : WebSocket
}) => {
  const [from , setfrom] = useState<null| Square>(null)
  const [to , setto ]= useState<null | Square>(null)
  return (
    <div className='text-white-200 '>
    
          {board.map((row, i )=> {
            return <div key={i} className='flex'>
              {row.map((square, j)=> {
                const squarerep = String.fromCharCode( 97 + (j%8) )+ "" + (8-i ) as Square;
                return <div
                  onClick={()=>{
                    if(!from){
                      setfrom(squarerep)

                    }else{
                      console.log(square?.square)
                      socket.send(JSON.stringify({
                        type : MOVE,
                        payload : {
                          move :{
                            from : from,
                            to : squarerep
                          }
                       
                        }
                      }))
                      setfrom(null)
                      chess.move({
                        from ,
                        to : squarerep
                      })
                      setboard(chess.board())
                    }
                  }}
                key={j} className={
                  `w-16 h-16  ${ (i+j)%2 ===0 ? 'bg-green-500' : 'bg-white'}`
                }>{
                  <div className='w-full justify-center flex h-full'>
                    <div className='h-full justify-center flex flex-col '>
                       {square ? <img className='w-8' src={`/${square?.color === "b" ? square?.type : `${square?.type?.toUpperCase()} copy`}.png`}/> : null}
                    </div>     
                    </div>
             
                }                   </div>
              })}
              </div> 
          })}
    </div>
  )
}

export default Chessboard