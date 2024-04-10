import { useEffect, useState } from 'react';
import axios from 'axios';
import CollectionMovie from '../../components/CollectionMovie/CollectionMovie';
import './Collection.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Collection() {
    const [collection, setCollection] = useState([]);

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

    useEffect(() => {
        // return () => {
        //     const removedMovies = collection.filter(movie => movie.removed === true);
        //     if (removedMovies.length > 0) {
        //         axios.post(`${SERVER_URL}/remove-collection`, removedMovies)
        //             .then(() => {
        //                 console.log('CollectionMovies marked as removed have been updated in the database.');
        //             })
        //             .catch((err) => {
        //                 console.log('Error updating removed CollectionMovies:', err);
        //             });
        //     }
        // };
        console.log(collection);
    }, [collection]);

    useEffect(() => {
        fetchCollection();
    }, []);

    return (
        <>
        <h1 className='collection-title'>Collection</h1>
        <section className="collection">
            

            {/* Render a list of Post components */}
            {collection.map((movie) => (
                <CollectionMovie key={movie.movie_id} movie={movie} />
            ))}
        </section>
        </>
    );
}

export default Collection;