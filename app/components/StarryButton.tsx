import React from 'react'
import './StarryButton.css'
export interface StarryButtonProps {
  connected: boolean
  publicKey?: string
  onConnect: () => Promise<void>
  onDisconnect: () => Promise<void>
}
const StarryButton: React.FC<StarryButtonProps> = ({
  connected,
  onConnect,
  onDisconnect,
  publicKey,
}) => {
  const [connecting, setConnecting] = React.useState(false)
  return (
    <button
      onClick={async () => {
        if (connecting) return
        if (connected) {
          setConnecting(true)
          await onDisconnect()
          setConnecting(false)
        } else {
          setConnecting(true)
          await onConnect()
          setConnecting(false)
        }
      }}
      className=' relative overflow-hidden bg-black text-white w-[150px] h-[40px] rounded-lg glow-effect hover:scale-110 transition-transform duration-300'
    >
      <span className='absolute inset-0 flex items-center justify-center z-10'>
        {connected ? publicKey?.substring(0, 8) : 'Connect'}
      </span>
      <div className='absolute inset-0 bg-black stars-bg animate-move-stars z-0'></div>
    </button>
  )
}

export default StarryButton
