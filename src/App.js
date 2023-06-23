import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './views/Landing';
import Main from './views/Main';
import Minting from './Main/Minting';
import Navbar from './Main/Navbar';

function App() {
  return (
    <div className="font-pop">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/main' element={<Main />} />
          <Route path='/minting' element={<Minting />} />
        </Routes>
      </Router>
      <Minting />
    </div>
  );
}

export default App;
