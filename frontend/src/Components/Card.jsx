import React from 'react'

function Card({name,role,img}) {
  return (
    <div className='w-[250px] h-[300px] rounded-2xl '>
        <img src={img} className='w-[200px] h-[150px]' alt="imgs" />
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  )
}

export default Card
