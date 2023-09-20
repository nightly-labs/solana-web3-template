import React from 'react'
import './StarryButton.css'
export interface ActionStarryButtonProps {
  onClick: () => Promise<void>
  name: string
}
const ActionStarryButton: React.FC<ActionStarryButtonProps> = ({ onClick, name }) => {
  return (
    <button
      onClick={async () => {
        await onClick()
      }}
      className=' relative overflow-hidden bg-black text-white w-[180px] h-[50px] rounded-lg glow-effect hover:scale-110 transition-transform duration-250'
    >
      <span className='absolute inset-0 flex items-center justify-center z-10'>{name}</span>
      <div className='absolute inset-0 bg-black stars-bg animate-move-stars z-0'></div>
    </button>
  )
}

export default ActionStarryButton
