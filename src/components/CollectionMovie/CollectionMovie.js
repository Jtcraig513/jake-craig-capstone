import { useState,useEffect } from 'react';
import './CollectionMovie.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function CollectionMovie({ movie }) {

    const [isRemoved, setIsRemoved] = useState(null);

    const handleClick = () => {
        // Toggle the removed state
        setIsRemoved(prevIsRemoved => !prevIsRemoved);
    };

    useEffect(() => {
        // Only perform API call if there is a change in the removed state
        if (isRemoved!=null) {
            // Send a PUT request to update the movie's removed status
            axios.put(`${SERVER_URL}/collection/${movie.movie_id}`, {
                movie_id: movie.movie_id,
                removed: isRemoved // Toggle the removed flag
            }, { withCredentials: true })
            .then(() => {
                console.log(`Movie ${movie.movie_id} updated successfully.`);
            })
            .catch((error) => {
                console.error('Error updating movie:', error);
            });
        }
    }, [isRemoved]);
    
    return (
        <section className="movie" id={`${movie.movie_id}`}>
            <Link to={`/movie/${movie.movie_id}`} className='movie__link'>
                <img className='movie__poster' src={movie.poster} alt={`${movie.title} Poster`} />
            </Link>

            <section className='movie__buncher'>
                <Link to={`/movie/${movie.movie_id}`} className='movie__link'>
                    <p className='p-large movie__buncher-title'>{movie.title}</p>
                </Link>
            
                <button className='movie__buncher-button' onClick={handleClick}>{!isRemoved ? '\u2713 Collection' : '+ Collection'}</button>
            </section>
        </section>
    )
}

export default CollectionMovie;