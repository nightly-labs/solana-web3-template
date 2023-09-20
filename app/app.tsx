'use client'
import StickyHeader from './components/StickyHeader'
import Background from './components/Background'
import Torus from './components/Torus/App'
import { Loader } from '@react-three/drei'

export default function Home() {
  return (
    <>
      <Background />
      <StickyHeader />
      <Torus />
      <Loader />
    </>
  )
}
