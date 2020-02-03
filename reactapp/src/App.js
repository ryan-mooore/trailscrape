import React, { useEffect } from 'react';
import './App.css';

function App() {

  useEffect(() => {
    console.log(fetch('http://localhost:5000/api'))
  }, [])

  return (
    null
  );
}

export default App;
