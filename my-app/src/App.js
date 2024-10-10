import logo from './logo.svg';
import './App.css';

//import { Canvas } from '@react-three/fiber'
//import { XR, createXRStore } from '@react-three/xr'
//import { useState } from 'react'

//https://r3f.docs.pmnd.rs/getting-started/installation
//https://github.com/pmndrs/xr

//const store = createXRStore()

function App() {
  //const [red, setRed] = useState(false)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
