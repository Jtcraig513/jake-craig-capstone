import './App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from './pages/Search/Search';
import Header from './components/Header/Header';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import { useState } from 'react';

function App() {

  const [firstRender, setFirstRender] = useState(true);
  const [services, setServices] = useState([
    'netflix',
    'apple_tv',
    'hbo_max',
    'hulu',
    'prime',
    'paramount_plus',
    'disney_plus',
    'peacock',
    'peacock_free'
]);

  return (
    <BrowserRouter>
      <section className='page-container'>
        <Header />
        <section className='page-container__content'>
          <Routes>
              <Route path='/' element={<Search firstRender={firstRender} services={services} setServices={setServices}/>} />
              <Route path='/movie/:movieId' element={<MovieDetails services={services}/>} />
          </Routes>
        </section>
      </section>
    </BrowserRouter>
  );
}

export default App;
