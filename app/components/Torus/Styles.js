import React from 'react'
import { Link } from 'wouter'
import { a } from '@react-spring/web'

function Nav(props) {
  return (
    <>
      <div
        className='absolute right-12 top-12'
        style={{ willChange: 'transform, opacity' }}
        {...props}
      >
        <Link to='/' className='inline-block m-2'>
          Torus
        </Link>
        <Link to='/knot' className='inline-block m-2'>
          Knot
        </Link>
        <Link to='/bomb' className='inline-block m-2'>
          Bomb
        </Link>
      </div>
    </>
  )
}

export function Container({ children }) {
  return (
    <a.div
      className='fixed inset-0 flex items-center justify-center'
      style={{ pointerEvents: 'none', backgroundColor: '#272730' }}
    >
      {children}
    </a.div>
  )
}

export function Jumbo({ children }) {
  return (
    <div className='whitespace-pre mb-10 text-8xl font-extrabold leading-none tracking-tighter '>
      {children}
    </div>
  )
}

export function Box({ children }) {
  return (
    <a.div
      className='absolute'
      style={{ transform: 'translate3d(-50%, -42%, 0)', willChange: 'opacity' }}
    >
      {children}
    </a.div>
  )
}

export function Line({ children }) {
  return (
    <a.div
      className='relative w-full overflow-hidden'
      style={{ lineHeight: '1.2em', willChange: 'transform' }}
    >
      {children}
    </a.div>
  )
}

export function Cover({ children }) {
  return (
    <a.div
      className='absolute w-full h-full'
      style={{
        top: 0,
        left: 0,
        width: '120%',
        height: '120%',
        willChange: 'background, transform',
      }}
    >
      {children}
    </a.div>
  )
}

export { Nav }
