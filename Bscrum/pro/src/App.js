import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path= '/' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='Home' element = {<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
