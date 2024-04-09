import './App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from './pages/Search/Search';
import Header from './components/Header/Header';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import { useState } from 'react';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import PostsSection from './components/PostSection/PostSection';
import AuthFailPage from './pages/AuthFailPage.js/AuthFailPage';

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
              <Route path='/collection' element={<placeholder />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/posts' element={<PostsSection />} />
              <Route path='/auth-fail' element={<AuthFailPage />} />
          </Routes>
        </section>
      </section>
    </BrowserRouter>
  );
}

export default App;
