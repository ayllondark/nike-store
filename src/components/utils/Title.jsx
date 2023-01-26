import React from 'react'

const Title = ({titlex}) => {
  return (
    <>
        <div className='grid items-center'>
            <h1 className='text-5xl lg:text-4xl md:text-3xl font-bold text-slate-900 filter drop-shadow-lg'>{titlex}</h1>
        </div>
    </>
  )
}

export default Title