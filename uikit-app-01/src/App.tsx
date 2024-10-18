import { OrbitControls } from '@react-three/drei';
import './App.css';
import './index.css';
import { Canvas, useThree } from '@react-three/fiber'
import { Root, Fullscreen, Container, Text } from '@react-three/uikit'
import { XR, createXRStore, XRLayer, XROrigin} from '@react-three/xr'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useDrag } from '@use-gesture/react'
import { forwardHtmlEvents } from '@pmndrs/pointer-events'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/default/card';

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
      <Card width={380} >
        <CardHeader>
          <CardTitle>
            <Text>Notifications</Text>
          </CardTitle>
          <CardDescription>
            <Text>You have 3 unread messages.</Text>
          </CardDescription>
        </CardHeader>
        <CardContent flexDirection="column" gap={16}>
          <Container flexDirection="row" alignItems="center" gap={16} borderRadius={6} borderWidth={1} padding={16}>
            <Text fontSize={14} lineHeight={20}>
              Send notifications to device.
            </Text>
          </Container>
        </CardContent>
        <CardFooter>
        <Text>Footer</Text>
        </CardFooter>
      </Card>
  )
}

function DragCube() {
  const bind = useDrag(({ movement, xy, delta }) => console.log(...xy, 'movement', ...movement, 'delta', ...delta))
  return (
    <mesh {...(bind() as any)} scale={0.1}>
      <boxGeometry />
      <meshBasicMaterial color="blue" />
    </mesh>
  )
}

export function SwitchToXRPointerEvents() {
  const domElement = useThree((s) => s.gl.domElement)
  const camera = useThree((s) => s.camera)
  const scene = useThree((s) => s.scene)
  useEffect(() => forwardHtmlEvents(domElement, () => camera, scene), [domElement, camera, scene])
  return null
}

function App() {
  return (
    <>
      <button onClick={() => store.enterAR()}>Enter AR</button>
      <button onClick={() => store.enterVR()}>Enter VR</button>
      <Canvas>
        <XR store={store}>
          <group position={[0, 1.5, -0.5]}>
            <Root pixelSize={0.001}>
              <CardComponent/>
            </Root>
            <directionalLight position={[1, 8, 1]} castShadow />
            <ambientLight />
          </group>
        </XR>
      </Canvas>
    </>
  );
}

export default App;
