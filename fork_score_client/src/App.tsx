import React from 'react';
import Button from './button.tsx';
import Pic from './images/salad.svg';
import './App.css';


function App() {
  return (
    <div className="content">
      <div className="App">
        <h1 className="title">Fork Score</h1>
        <img className="salad" src={Pic} alt={"Salad"}/>
      </div>
      <div className="App">
        <h1 className="title">Hey there!</h1>
        <p>Welcome to Fork Score, where we help you see what restaurants meet your needs.</p>
        <Button />
      </div>
    </div>
  );
}
