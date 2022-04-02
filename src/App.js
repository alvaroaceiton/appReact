import './App.css';
import ShowCalendario from './components/ShowCalendario';
import CreateCalendario from './components/CreateCalendario';
import EditCalendario from './components/EditCalendario';
import LoginGoogle from './components/LoginGoogle';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <LoginGoogle />}></Route>
          <Route path='/calendarioGoogleFront' element={ <LoginGoogle />}></Route>
          <Route path='calendarioGoogleFront/show' element={ <ShowCalendario />}></Route>
          <Route path='calendarioGoogleFront/create' element={ <CreateCalendario />}></Route>
          <Route path='calendarioGoogleFront/edit/:id' element={ <EditCalendario />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
