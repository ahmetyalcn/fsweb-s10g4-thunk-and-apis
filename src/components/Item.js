import React from 'react'

function Item({ data }) {

  return (
    <div className='shadow-md bg-white text-center'>
      <img className='text-2xl p-10' alt={data.message} src={data.message} />
    </div>
  )
}

export default Item