'use client'

import * as THREE from 'three'
import React, { Suspense, useLayoutEffect, useMemo, useRef } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Environment, Loader, useTexture, useGLTF, Shadow } from '@react-three/drei'
import { useTransition, useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'
import { useLocation, Switch, Route } from 'wouter'
import DistortionMaterial from './DistortionMaterial'
import { Container, Jumbo, Nav, Box, Line, Cover } from './Styles'

const torus = new THREE.TorusBufferGeometry(4, 1.2, 128, 128)
const torusknot = new THREE.TorusKnotBufferGeometry(3, 0.8, 256, 16)
const material1 = new DistortionMaterial()
const material2 = new DistortionMaterial()
const material3 = new DistortionMaterial()
const jumbo = {
  '/': ['The sun', 'is its father.'],
  '/knot': ['The moon', 'its mother.'],
  '/bomb': ['The wind', 'hath carried it', 'in its belly.'],
}

function Shape({
  geometry,
  material,
  args,
  textures,
  opacity,
  color,
  shadowScale = [9, 1.5, 1],
  ...props
}) {
  const ref = useRef()
  const { mouse, clock } = useThree()
  const [ao, normal, height, roughness] = textures
  const [rEuler, rQuaternion] = useMemo(() => [new THREE.Euler(), new THREE.Quaternion()], [])
  useFrame(() => {
    if (ref.current) {
      rEuler.set((-mouse.y * Math.PI) / 10, (mouse.x * Math.PI) / 6, 0)
      ref.current.quaternion.slerp(rQuaternion.setFromEuler(rEuler), 0.1)
      ref.current.material.time = clock.getElapsedTime() * 3
    }
  })
  return (
    <group {...props}>
      <a.mesh
        ref={ref}
        args={args}
        geometry={geometry}
        material={material}
        material-color={color}
        material-aoMap={ao}
        material-normalMap={normal}
        material-displacementMap={height}
        material-roughnessMap={roughness}
        material-opacity={opacity}
      >
        <Shadow opacity={0.2} scale={shadowScale} position={[0, -8.5, 0]} />
      </a.mesh>
    </group>
  )
}

function Shapes({ transition }) {
  const { nodes } = useGLTF('/bomb-gp.glb')
  const textures = useTexture(['/ao.jpg', '/normal.jpg', '/height.png', '/roughness.jpg'])
  useLayoutEffect(() => {
    textures.forEach(
      (texture) => (
        (texture.wrapT = texture.wrapS = THREE.RepeatWrapping), texture.repeat.set(4, 4)
      )
    )
  }, [textures])
  return transition(({ opacity, ...props }, location) => (
    <a.group {...props}>
      <Switch location={location}>
        <Route path='/'>
          <Shape
            geometry={torusknot}
            material={material2}
            textures={textures}
            color='#272730'
            opacity={opacity}
          />
        </Route>
        <Route path='/knot'>
          <Shape
            geometry={torusknot}
            material={material2}
            textures={textures}
            color='#272730'
            opacity={opacity}
          />
        </Route>
        <Route path='/bomb'>
          <Shape
            geometry={nodes.Little_Boy_Little_Boy_Material_0.geometry}
            material={material3}
            textures={textures}
            scale={[0.7, 0.7, 0.7]}
            rotation={[0, 0.5, 0]}
            shadowScale={[17, 2.5, 1]}
            color='black'
            opacity={opacity}
          />
        </Route>
      </Switch>
    </a.group>
  ))
}

function Text({ children, opacity, background }) {
  return (
    <Box style={{ opacity }}>
      {React.Children.toArray(children).map((text, index) => (
        <Line
          key={index}
          style={{
            transform: opacity.to(
              (t) => `translate3d(0,${index * -50 + (1 - t) * ((1 + index) * 40)}px,0)`
            ),
          }}
        >
          <div>{text}</div>
          <Cover
            style={{
              background,
              transform: opacity.to((t) => `translate3d(0,${t * 100}%,0) rotateZ(-10deg)`),
            }}
          />
        </Line>
      ))}
    </Box>
  )
}
export default function App() {
  // Current route
  const [location] = useLocation()
  // Animated background color
  const [oldProps, setOldProps] = React.useState({ background: 'black', color: 'white' })
  const propsInfer = useSpring({
    background: location === '/' ? 'white' : location === '/knot' ? '#272730' : '#ffcc6d',
    color: location === '/' ? 'black' : location === '/knot' ? 'black' : 'black',
  })
  // setOldProps(props)
  // Animated shape props
  const transition = useTransition(location, {
    from: { position: [0, 0, -20], rotation: [0, Math.PI, 0], scale: [0, 0, 0], opacity: 0 },
    enter: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1], opacity: 1 },
    leave: { position: [0, 0, -10], rotation: [0, -Math.PI, 0], scale: [0, 0, 0], opacity: 0 },
    config: () => (n) => n === 'opacity' && { friction: 60 },
  })
  const props = { ...propsInfer, ...oldProps }

  return (
    <>
      <Canvas
        concurrent
        camera={{ position: [0, 0, 20], fov: 50 }}
        onCreated={({ gl }) => (gl.toneMappingExposure = 1.5)}
      >
        <spotLight position={[0, 30, 40]} />
        <spotLight position={[-50, 30, 40]} />
        <Suspense fallback={null}>
          <Shapes transition={transition} />
          <Environment files='photo_studio_01_1k.hdr' />
        </Suspense>
      </Canvas>
      {/* <Nav style={{ color: props.color }} /> */}
    </>
  )
}
