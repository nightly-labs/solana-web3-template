import React from 'react'
import NightlyLogo from '../img/nightly_logo.png'
import Image from 'next/image'
import StarryButton from './StarryButton'

const StickyHeader: React.FC = () => {
  return (
    <header className='fixed top-0 left-0 w-full bg-opacity-50 backdrop-blur-md p-6 z-10'>
      <div className='flex items-center justify-between'>
        <div>
          {/* <Image
            style={{ width: '200px', cursor: 'pointer' }}
            src={NightlyLogo}
            alt='logo'
            onClick={() => {
              // redirect to nightly.app
              window.location.href = 'https://nightly.app'
            }}
          /> */}
        </div>
        <div className='flex space-x-4'>
          <StarryButton
            connected={false}
            onConnect={async () => {}}
            onDisconnect={async () => {}}
            publicKey='sdsdds'
          />
        </div>
      </div>
    </header>
  )
}

export default StickyHeader
