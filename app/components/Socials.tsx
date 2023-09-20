import React from 'react'
import TwitterIcon from '../svg/twitter.svg'
import DiscordIcon from '../svg/discord.svg'
import GithubIcon from '../svg/github.svg'
import Image from 'next/image'

const Socials: React.FC = () => {
  return (
    <div className='fixed right-4 bottom-4 p-2 rounded-xl bg-white bg-opacity-40 backdrop-blur-md  w-[170px]'>
      <div className='flex justify-center space-x-2'>
        <a
          href='https://twitter.com/Nightly_app'
          target='_blank'
          rel='noopener noreferrer'
          className=' mt-[2px] transform transition-transform duration-300  hover:-rotate-12'
        >
          <Image src={TwitterIcon} alt='Twitter' height={40} />
        </a>
        <a
          href='https://discord.com/invite/7nhFHA6yZq'
          target='_blank'
          rel='noopener noreferrer'
          className=' transform transition-transform duration-300  hover:-rotate-12'
        >
          <Image src={DiscordIcon} alt='Discord' height={45} />
        </a>
        <a
          href='https://github.com/nightly-labs/solana-web3-template'
          target='_blank'
          rel='noopener noreferrer'
          className=' mt-[2px] transform transition-transform duration-300  hover:-rotate-12'
        >
          <Image src={GithubIcon} alt='GitHub' height={40} />
        </a>
      </div>
    </div>
  )
}

export default Socials
