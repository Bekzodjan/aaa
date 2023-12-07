import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
const Comp = (porps) => {
  return (
    <div className='border border-3 border-black p-2'>
        <h1 className='text-center'>{porps.salom}</h1>
        <h2 className='border border-2 border-black'>{porps.salom2}</h2>
        <h2 className='border border-2 border-black'>{porps.phone}</h2>
        <h2 className='border border-2 border-black'>{porps.address}</h2>
    </div>
  )
}

export default Comp