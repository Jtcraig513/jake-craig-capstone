import { useEffect, useState } from 'react';
import axios from 'axios';
import CollectionMovie from '../../components/CollectionMovie/CollectionMovie';
import './Collection.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Collection() {
    const [collection, setCollection] = useState([]);
    const [removedMovies,setRemovedMovies] = useState([]);

    // Fetch posts from the DB
    const fetchCollection = () => {
        // Make sure to user `withCredentials` for a GET request, to pass the cookie to the server
        axios
            .get(`${SERVER_URL}/collection`, { withCredentials: true })
            .then((collection) => {
                // Update state with fetched posts
                setCollection(collection.data);
            })
            .catch((err) => {
                console.log('Error fetching collection:', err);
            });
    };

    const renderCollection = () => {
        return collection.map((movie) => (
            <CollectionMovie key={movie.movie_id} movie={movie} />
        ))
    }

    useEffect(() => {
        setRemovedMovies(collection.filter(movie => movie.removed));
    },[collection]);

    useEffect(() => {
        // Cleanup logic to delete removed movies
        const cleanup = () => {
            //const removedMovies = collection.filter(movie => movie.removed);
            const movieIds = removedMovies.map(movie => movie.movie_id);
            movieIds.forEach(movieId => {
                let tar = document.getElementById(`${movieId}`)
                if (tar) {
                    tar.classList.add("hide")
                }
                axios.delete(`${SERVER_URL}/collection/${movieId}`, { withCredentials: true })
                    .then(() => {
                        console.log(`CollectionMovie ${movieId} marked as removed has been deleted.`);
                    })
                    .catch((err) => {
                        console.log('Error deleting removed CollectionMovie:', err);
                    });
            });
        };
        // Run cleanup logic when component unmounts (navigating away from the page)
        return cleanup;
    }, [removedMovies]);

    useEffect(() => {
        fetchCollection();
    }, []);

    return (
        <>
        <h1 className='collection-title'>Collection</h1>
        <section className="collection">
            

            {/* Render a list of Post components */}
            {renderCollection()}
        </section>
        </>
    );
}

export default Collection;