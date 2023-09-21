import dynamic from 'next/dynamic'
import Head from 'next/head'

const App = dynamic(() => import('./app'), { ssr: false })
export default function Home() {
  return (
    <>
      <Head>
        <title>Solana Template App</title>
        <meta
          name='description'
          content='Start your Solana journey here, without unnecessary configuration and setup. Just clone it and code on top of it. Powered by Nightly Wallet.'
        />
        <meta property='og:title' content='Solana Template App' />
        <meta
          property='og:description'
          content='Start your Solana journey here, without unnecessary configuration and setup. Just clone it and code on top of it. Powered by Nightly Wallet.'
        />
        <meta property='og:image' content='https://solana-web3-template.nightly.app/preview.png' />
        <meta property='twitter:title' content='Solana Template App' />
        <meta
          property='twitter:description'
          content='Start your Solana journey here, without unnecessary configuration and setup. Just clone it and code on top of it. Powered by Nightly Wallet.'
        />
        <meta
          property='twitter:image'
          content='https://solana-web3-template.nightly.app/preview.png'
        />
        <meta property='twitter:card' content='summary_large_image' />
      </Head>
      <App />
    </>
  )
}
