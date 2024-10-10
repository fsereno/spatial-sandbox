import logo from './logo.svg';
import './App.css';
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber';

//https://r3f.docs.pmnd.rs/getting-started/your-first-scene
//https://r3f.docs.pmnd.rs/getting-started/examples
//https://codesandbox.io/p/sandbox/react-xr-simple-ar-demo-8w8hm

function App() {
  return (
    <>
    <Canvas>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshPhongMaterial />
      </mesh>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} color="red" />
    </Canvas>
    </>
  );
}

export default App;
