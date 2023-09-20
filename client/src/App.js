import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import CreateMeeting from './components/CreateMeeting';
import Meeting from './components/Meeting'
import './App.css';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route path="/" exact component={CreateMeeting}/>
        <Route path="/room/:roomId" component={Meeting}/>
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
