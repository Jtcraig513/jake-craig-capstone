import './App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import Header from './components/Header/Header';

function App() {
  return (
    <BrowserRouter>
      <section className='page-container'>
        <Header />
        <Routes>
            <Route path='/' element={<Home />} />
        </Routes>
      </section>
    </BrowserRouter>
  );
}

export default App;
