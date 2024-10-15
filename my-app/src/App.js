import logo from './logo.svg';
import './App.css';
import * as THREE from 'three'
import { DoubleSide } from 'three';
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber';
import React, { Suspense, useState, useRef } from 'react'
import { Interactive, XR, ARButton, Controllers } from '@react-three/xr'
import { OrbitControls, useCursor, CameraControls, Gltf, Text, Preload, MeshPortalMaterial } from '@react-three/drei';
import { useRoute, useLocation } from 'wouter'
import { easing, geometry } from 'maath'
import { suspend } from 'suspend-react'

//https://r3f.docs.pmnd.rs/getting-started/your-first-scene
//https://r3f.docs.pmnd.rs/getting-started/examples
//https://codesandbox.io/p/sandbox/react-xr-simple-ar-demo-8w8hm

function Box({ color, size, scale, children, ...rest }) {
  return (
    <mesh scale={scale} {...rest}>
      <boxBufferGeometry attach="geometry" args={size} />
      <meshPhongMaterial attach="material" color={color} />
      {children}
    </mesh>
  )
}

function Button(props) {
  const [hover, setHover] = useState(false)
  const [color, setColor] = useState('blue')

  const onSelect = () => {
    setColor((Math.random() * 0xffffff) | 0)
  }

  return (
    <Interactive onHover={() => setHover(true)} onBlur={() => setHover(false)} onSelect={onSelect}>
      <Box color={color} scale={hover ? [0.6, 0.6, 0.6] : [0.5, 0.5, 0.5]} size={[0.4, 0.1, 0.1]} {...props}>
        <Suspense fallback={null}>
          <Text position={[0, 0, 0.06]} fontSize={0.05} color="#000" anchorX="center" anchorY="middle">
            Hello react-xr!
          </Text>
        </Suspense>
      </Box>
    </Interactive>
  )
}

function Panel1() {
  return (
    <mesh position={[-1.5, 0.1, -0.2]}>
      <planeGeometry  />
      <meshBasicMaterial color="blue" />
    </mesh>
  );
}

function Panel2() {
  return (
    <mesh position={[0, 0.1, -0.2]}>
      <planeGeometry  />
      <meshBasicMaterial color="green" />
    </mesh>
  );
}

function Panel3() {
  return (
    <mesh position={[1.5, 0.1, -0.2]}>
      <planeGeometry />
      <meshBasicMaterial color="red" />
    </mesh>
  );
}

function App() {
  return (
    <>
      <ARButton />
      <div style={{ height: '100vh', width: '100vw' }}>
        <Canvas>
          <XR referenceSpace="local">
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Button position={[0, 1, -0.2]} />
            <group>
              <Panel1 />
              <Panel2 />
              <Panel3 />
            </group>
            <Controllers />
            <OrbitControls maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
          </XR>
        </Canvas>
      </div>
    </>
  );
}

export default App;
