import React from 'react'

export const Button = ({onClick, children} : {onClick : ()=> void , children : React.ReactNode}) => {
  return (
    <button onClick={onClick} className='bg-green-600 hover:bg-green-800 text-white font-bold px-8 py-4 rounded'>
  {children}
</button>
  )
}
