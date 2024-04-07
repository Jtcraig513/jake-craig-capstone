import './App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from './pages/Search/Search';
import Header from './components/Header/Header';
import { useState } from 'react';

function App() {

  const [firstRender, setFirstRender] = useState(true);

  return (
    <BrowserRouter>
      <section className='page-container'>
        <Header />
        <section className='page-container__content'>
          <Routes>
              <Route path='/' element={<Search firstRender={firstRender}/>} />
          </Routes>
        </section>
      </section>
    </BrowserRouter>
  );
}

export default App;
