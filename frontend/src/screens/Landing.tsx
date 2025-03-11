import React from 'react'
import chess from "../assets/chess.jpeg"
import { useNavigate } from 'react-router-dom'
import { Button } from '../Components/Button'
export const Landing = () => {

  const navigate = useNavigate()

  return (
    <div className='flex justify-center'>
      <div className='pt-8 max-w-screen-lg'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='flex justify-center'>
            <img  className = " max-w-96"src={chess}></img>
            </div>

            <div className='pt-16'>
              <div className='flex justify-center'>
              <h1 className='text-4xl font-bold text-white'>
                Play Chess online on the #3 site 
              </h1>
              </div>
             
              <div className='mt-4 flex justify-center'>
                    <Button onClick={()=>{
                      navigate("/game")
                    }}> Play Online</Button>
              </div>
            </div>
          
     
        </div>
      </div>
      
      
   
    </div>
    
  )
}
