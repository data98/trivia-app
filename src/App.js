import React, { useState } from 'react';
import './App.css';
import BlobRight from './assets/blob-right.png';
import BlobLeft from './assets/blob-left.png';
import Welcome from './components/Welcome.js';
import Quiz from './components/Quiz.js';

function App() {
  const [started, setStarted] = useState(false)

  const getStarted = () => {
    setStarted(true)
  }

  return (
    <main className="container center">
      <div className="blobs">
        <img className="blob-left" src={BlobLeft} alt="blob" />
        <img className="blob-right" src={BlobRight} alt="blob" />
      </div>
      {started 
      ? <Quiz /> 
      : <Welcome getStarted={getStarted} />}
    </main>
  );
}

export default App;
