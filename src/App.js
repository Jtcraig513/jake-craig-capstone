import './App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from './pages/Search/Search';
import Header from './components/Header/Header';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import { useState } from 'react';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import AuthFailPage from './pages/AuthFailPage.js/AuthFailPage';
import Collection from './pages/Collection/Collection';
import Footer from './components/Footer/Footer';

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
              <Route path='/' element={<Search firstRender={firstRender} setFirstRender={setFirstRender} services={services} setServices={setServices}/>} />
              <Route path='/movie/:movieId' element={<MovieDetails services={services}/>} />
              <Route path='/collection' element={<Collection />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/auth-fail' element={<AuthFailPage />} />
          </Routes>
        </section>
        <Footer />
      </section>
    </BrowserRouter>
  );
}

export default App;
