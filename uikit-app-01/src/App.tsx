import { OrbitControls } from '@react-three/drei';
import './App.css';
import './index.css';
import { Canvas } from '@react-three/fiber'
import { Root, Fullscreen, Container, Text } from '@react-three/uikit'
import { XR, createXRStore, XRLayer, XROrigin} from '@react-three/xr'
import { useState } from 'react'
import * as THREE from 'three'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/default/card';

//https://drei.docs.pmnd.rs/getting-started/introduction
//https://pmndrs.github.io/uikit/docs/getting-started/components-and-properties#container

const store = createXRStore()

function MainPanel() {
  return (
    <mesh position={[0, 0.5, -3]} scale={[1.5, 2.5, 1]}>
      <planeGeometry />
      <meshBasicMaterial color="red" side={THREE.DoubleSide} />
    </mesh>
  );
}

function UI() {
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

function App() {

  return (
    <>
      <button onClick={() => store.enterAR()}>Enter AR</button>
      <button onClick={() => store.enterVR()}>Enter VR</button>
      <Canvas>
        <XR store={store}>
          
          <group position={[0, 1.5, -0.5]}>
          <Root pixelSize={0.001}>
            <MainPanel/>
            <UI/>
          </Root>
          </group>
        </XR>
      </Canvas>
    </>
  );
}

export default App;
