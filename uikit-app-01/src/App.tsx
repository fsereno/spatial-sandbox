import { OrbitControls } from '@react-three/drei';
import './App.css';
import './index.css';
import { Canvas } from '@react-three/fiber'
import { Fullscreen, Container, Text } from '@react-three/uikit'
import { XR, createXRStore } from '@react-three/xr'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/default/card';


const store = createXRStore()

const notifications = [
  {
    title: 'Your call has been confirmed.',
    description: '1 hour ago',
  },
  {
    title: 'You have a new message!',
    description: '1 hour ago',
  },
  {
    title: 'Your subscription is expiring soon!',
    description: '2 hours ago',
  },
]

function App() {

  return (
    <>
      <button onClick={() => store.enterAR()}>Enter AR</button>
      <button onClick={() => store.enterVR()}>Enter VR</button>
      <Canvas>

        <XR store={store}>
          <Fullscreen>
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

              </CardFooter>
            </Card>
          </Fullscreen>
        </XR>

      </Canvas>
    </>
  );
}

export default App;
