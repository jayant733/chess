import { useEffect, useState } from "react"

const WS_URL = "ws://localhost:8081"

export const useSocket = () =>{

    const [socket , setsocket] = useState<WebSocket | null>(null); 

    useEffect(()=> {
        const ws = new WebSocket(WS_URL)
        ws.onopen = () => {
            setsocket(ws)
        }
        ws.onclose = () =>{
            console.log("disconnected")
            setsocket(null)
        }

        return () =>{
            ws.close()
        }


    },[])

    return socket
}

