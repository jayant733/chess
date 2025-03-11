
import Chessboard from '../Components/Chessboard'
import { Button } from '../Components/Button'
import { useSocket } from '../hooks/useSocket'
import { useEffect, useState } from 'react'
import { Chess } from 'chess.js'
export const INIT_GAME = "init_game"

export const MOVE = "move"

export const GAME_OVER = "GAME_OVER"
const Game = () => {

  const socket = useSocket()
  const [chess, setchess] = useState(new Chess())
  const [board, setboard] = useState(chess.board())
  const [started , setstarted ] = useState(false)
  useEffect(() => {
    if (!socket)
      return

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data)

      // console.log(message)

      switch (message.type) {
        case INIT_GAME:
        setstarted(true)
        setboard(chess.board())
          break;
        case MOVE:
          const move = message.payload
          chess.move(move)
          setboard(chess.board())
          console.log("move aside")
          break;
        case GAME_OVER:
          console.log("game over");
          break
      }

    }
  }, [socket])

  if (!socket) return <div> COnnectiing.....</div>
  return (


    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4 w-full">
          {/* Chessboard Section */}
          <div className="col-span-4 w-full flex justify-center gap-x-14">
            <Chessboard chess= {chess} setboard = {setboard} socket = {socket} board={board} />
          </div>

          {/* Play Section */}
          <div className="bg-slate-900 col-span-2 w-full flex justify-center">
            <div className='pt-8'>
            {!started && <Button onClick={() => {

              socket.send(JSON.stringify({
                type: INIT_GAME
              }))
            }}> Play Online</Button>}
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Game