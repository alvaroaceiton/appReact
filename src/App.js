import './App.css';
import ShowCalendar from './components/ShowCalendar';
import CreateCalendar from './components/CreateCalendar';
import EditCalendar from './components/EditCalendar';
import ListCalendar from './components/ListCalendar';
import LoginGoogle from './components/LoginGoogle';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <LoginGoogle />}></Route>
          <Route path='/list' element={ <ListCalendar />}></Route>
          <Route path='/show/:id' element={ <ShowCalendar />}></Route>
          <Route path='/create' element={ <CreateCalendar />}></Route>
          <Route path='/edit/:id' element={ <EditCalendar />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
