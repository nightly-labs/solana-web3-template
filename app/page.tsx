'use client'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import StickyHeader from './components/StickyHeader'
import Background from './components/Background'
import { Loader } from '@react-three/drei'

const App = dynamic(() => import('./app'), { ssr: false })
export default function Home() {
  return (
    <>
      <App />
    </>
  )
}