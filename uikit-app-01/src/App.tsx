import { CameraControls, Center, OrbitControls } from '@react-three/drei';
import './App.css';
import './index.css';
import { Canvas, Euler, ExtendedColors, Layers, Matrix4, NodeProps, NonFunctionKeys, Overwrite, Quaternion, useLoader, useThree, Vector3 } from '@react-three/fiber'
import { Root, Fullscreen, Container, Text, Input } from '@react-three/uikit'
import { XR, createXRStore, XRLayer, XROrigin } from '@react-three/xr'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useDrag } from '@use-gesture/react'
import { forwardHtmlEvents } from '@pmndrs/pointer-events'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/default/card';
import { useGLTF } from '@react-three/drei'
import { EventHandlers } from '@react-three/fiber/dist/declarations/src/core/events';
import { JSX } from 'react/jsx-runtime';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

//https://drei.docs.pmnd.rs/getting-started/introduction
//https://pmndrs.github.io/uikit/docs/getting-started/components-and-properties#container
//https://github.com/pmndrs/xr/blob/main/examples/uikit/app.tsx#L38
//https://pmndrs.github.io/xr/docs/tutorials/interactions
//https://codesandbox.io/p/sandbox/r3f-draggable-instances-gl6o1?file=%2Fsrc%2FApp.js%3A31%2C8-31%2C17
//https://github.com/pmndrs/xr/blob/main/examples/use-gesture/app.tsx
//Ipconfig getifaddr en0

const store = createXRStore()

function CardComponent() {
  return(
      <Card width={380}>
        <CardHeader>
          <CardTitle>
            <Text>Notifications</Text>
          </CardTitle>
          <CardDescription>
            <Text>You have 3 unread messages.</Text>
          </CardDescription>
        </CardHeader>
        <CardContent flexDirection="column" gap={16}>
          <Container flexDirection="row" alignItems="center" gap={16} borderRadius={6} borderWidth={2} padding={16}>
            <Text fontSize={14} lineHeight={20}>
              Send notifications to device.
            </Text>
          </Container>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
  )
}

const Model = () => {
  const gltf = useLoader(GLTFLoader, "/water_pump/scene.gltf");
  return (
    <>
      <primitive object={gltf.scene} scale={0.4}/>
    </>
  );
};

function App() {
  return (
    <>
    <div className='controls'>
        <button onClick={() => store.enterAR()}>Enter AR</button>
      </div>
      <Canvas style={{ height: '100vh', width: '100vw' }} orthographic camera={{ position: [0, 0, 100], zoom: 100 }}>
        <ambientLight intensity={0.5}/>
        <directionalLight position={[10, 10, 0]} intensity={10} castShadow />
        <XR store={store}>
        <group position={[0, 1.25, -0.5]}>
          <Root pixelSize={0.001}>
            <Container flexDirection="row" gap={50}>
              <CardComponent />
              <CardComponent />
            </Container>
          </Root>
          <Model/>
        </group>
        </XR>
        <CameraControls/>
      </Canvas>
    </>
  );
}

export default App;
