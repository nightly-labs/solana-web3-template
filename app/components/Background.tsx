import React from 'react'

const Background: React.FC = () => {
  return (
    <div
      className='fixed inset-0 flex items-center justify-center'
      style={{ pointerEvents: 'none', backgroundColor: '#272730' }}
    >
      <div className='flex justify-center items-center h-screen'>
        <div className='text-white' style={{ fontSize: '12em', fontWeight: 800 }}>
          Solana
        </div>
      </div>
    </div>
  )
}

export default Background
