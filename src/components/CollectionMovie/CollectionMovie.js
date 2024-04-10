import { useState } from 'react';
import './CollectionMovie.scss';
import { Link } from 'react-router-dom';


function CollectionMovie({ movie }) {

    const [isRemoved, setIsRemoved] = useState(false);

    const handleClick = (event) => {
        if (event.target.innerHTML == '+ Collection'){
            event.target.innerHTML = '&#10003; Collection';
            setIsRemoved(false);
        } else {
            event.target.innerHTML = '+ Collection';
            setIsRemoved(true);
        }
        return;
    }
    
    return (
        <section className="movie">
            <Link to={`/movie/${movie.movie_id}`} className='movie__link'>
                <img className='movie__poster' src={movie.poster} alt={`${movie.title} Poster`} />
            </Link>

            <section className='movie__buncher'>
                <Link to={`/movie/${movie.movie_id}`} className='movie__link'>
                    <p className='p-large movie__buncher-title'>{movie.title}</p>
                </Link>
            
                <button className='movie__buncher-button' onClick={handleClick}>&#10003; Collection</button>
            </section>
        </section>
    )
}

export default CollectionMovie;