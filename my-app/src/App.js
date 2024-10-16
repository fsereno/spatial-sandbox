import logo from './logo.svg';
import './App.css';
import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber';
import React, { Suspense, useState, useRef } from 'react'
import { Interactive, XR, ARButton, Controllers } from '@react-three/xr'
import { OrbitControls, useCursor, CameraControls, Gltf, Text, Preload, MeshPortalMaterial, Html } from '@react-three/drei';
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
  const [color, setColor] = useState('white')

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

function LeftPanel() {
  return (
    <mesh position={[-1.5, 0.5, -2]} scale={[1.5, 2.5, 1]} rotation={[Math.PI / 1, -1, 0]}>
      <planeBufferGeometry />
      <meshBasicMaterial color="grey" side={THREE.DoubleSide} />
    </mesh>
  );
}

function MainPanel() {
  return (
    <mesh position={[0, 0.5, -3]} scale={[1.5, 2.5, 1]}>
      <planeBufferGeometry />
      <meshBasicMaterial color="wite" side={THREE.DoubleSide} />
    </mesh>
  );
}

function RightPanel() {
  return (
    <mesh position={[1.5, 0.5, -2]}  scale={[1.5, 2.5, 1]} rotation={[Math.PI / 1, 1, 0]}>
      <planeBufferGeometry />
      <meshBasicMaterial color="grey" side={THREE.DoubleSide} />
    </mesh>
  );
}

function ToolTip1() {
  return (
    <Html center position={[-5, 1, -5]}>
      <p style={{width: '200px'}}>Some info always in view</p>
    </Html>
  );
}

function App() {
  return (
    <>
      <ARButton /> 
        <Canvas style={{ height: '100vh', width: '100vw' }}>
          <XR referenceSpace="local">
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Button position={[0, 1, -0.2]} />
            <group>
              <LeftPanel />
              <MainPanel />
              <RightPanel />
              <ToolTip1 />
            </group>
            <Controllers />
            <OrbitControls maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
          </XR>
        </Canvas>
    </>
  );
}

export default App;
