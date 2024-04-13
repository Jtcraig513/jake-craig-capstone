import { useEffect, useState } from 'react';
import './MovieDetails.scss';
import { useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import netflix from '../../assets/logos/netflix.png';
import hbo from '../../assets/logos/hbo_max.jpg';
import prime from '../../assets/logos/prime.jpg';
import apple from '../../assets/logos/apple_tv.png';
import hulu from '../../assets/logos/hulu.jpg'
import paramount_plus from '../../assets/logos/paramount_plus.png'
import disney_plus from '../../assets/logos/disney_plus.jpg'
import peacock from '../../assets/logos/peacock.jpg'
import PostsSection from '../../components/PostSection/PostSection';

const apiKey = process.env.REACT_APP_API_KEY;
const apiMHost = process.env.REACT_APP_MOVIES_API_HOST;
const apiMUrl = process.env.REACT_APP_MOVIES_API_URL;

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function MovieDetails({ services }) {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);

    const imagesMapped = {
        'netflix': netflix,
        'hbo_max': hbo,
        'hulu': hulu,
        'prime': prime,
        'apple_tv': apple,
        'paramount_plus': paramount_plus,
        'disney_plus': disney_plus,
        'peacock': peacock
    }
    const linksMapped = {
        'netflix': 'Netflix',
        'hbo_max': 'HBO Max',
        'hulu': 'hulu',
        'prime': 'prime',
        'apple_tv': 'Apple TV',
        'paramount_plus': 'Paramount+',
        'disney_plus': 'Disney+',
        'peacock': 'Peacock'
    }

    const filterServices = (unfiltered) => {
        if (unfiltered.sources.length === 0) {
            return unfiltered;
        }
        let newArray = [];
        for (let i = 0; i < unfiltered.sources.length; i++) {
            if (services.find((serv) => serv === unfiltered.sources[i].source)) {
                newArray.push(unfiltered.sources[i]);
            }
        }

        unfiltered.sources = newArray;
        return unfiltered;
    }



    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const getMovie = async () => {
            try {
                const options = {
                    method: 'GET',
                    url: `${apiMUrl}movie/${movieId}`,
                    headers: {
                        'X-RapidAPI-Key': apiKey,
                        'X-RapidAPI-Host': apiMHost
                    }
                };

                const response = await axios.request(options);
                const data = response.data.movie;
                setMovie(filterServices(data));
            } catch (error) {
                console.error('Invalid movie ID:', error);
                navigate('/');
            }
        }
        getMovie();
    });

    const formatRelease = () => {
        let date = movie.release_date.split('');
        date.push('-');
        const temp = date.splice(0, 4);
        date = date.concat(temp);
        date.shift();
        return date.join('');
    }

    function getVideoId(url) {
        const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : null;
    }

    // Replace placeholder with embedded YouTube video
    function embedYouTubeVideo(videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        return <iframe src={embedUrl} title='youtube-trailer' frameBorder='0' className='details-container__trailer-video' />
    }

    const getTrailerId = () => {
        const videoId = getVideoId(movie.youtube_trailer);
        if (videoId) {
            return embedYouTubeVideo(videoId);
        } else {
            console.error('Invalid YouTube URL');
        }
    }

    const populateSources = () => {
        return movie.sources.map((source) => {
            return (
                <section className='details-container__sources-source' key={source.source}>
                    <img className='details-container__sources-source-icon'
                        src={imagesMapped[source.source]} alt={linksMapped[source.source]} />
                    <a href={source.link} className='details-container__sources-source-link'>
                        <h2 className='details-container__sources-source-link-size'>{linksMapped[source.source]} Link</h2>
                    </a>
                </section>
            )
        })
    }

    //Collection Button
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is currently logged in, so we can display a form or login button conditionally
        const fetchProfile = async () => {
            try {
                // Check if user is currently logged in, so we can display a form or login button conditionally
                const res = await axios.get(`${SERVER_URL}/auth/profile`, { withCredentials: true });
                if (res.data) {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                // Handle error here, such as setting an error state or showing an error message to the user
            }
        };

        fetchProfile();
    }, []);

    const [collection, setCollection] = useState([]);

    const isMovieInCollection = (movieId) => {
        return collection.some(movie => movie.movie_id === movieId);
    };

    const handleAdd = (event) => {
        // Toggle the removed state
        if (isLoggedIn) {
            addCollection();
        } else {
            var popup = document.getElementById("myPopup");
            popup.classList.toggle("show");
        }
    }
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

    const addCollection = async () => {
        // Only perform API call if there is a change in the removed state
            axios.post(`${SERVER_URL}/collection/`, {
                movie_id: movie._id,
                title: movie.title,
                poster: movie.poster_path
            }, { withCredentials: true })
                .then(() => {
                    let but = document.getElementsByClassName('popup');
                    but[0].classList.add("noninteractive");
                    but[0].children[0].innerHTML = '\u2713 Collection';
                    
                    console.log(`Movie ${movie.id} added successfully.`);
                })
                .catch((error) => {
                    console.error('Error Adding movie:', error);
                });
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchCollection();
        }
    }, [isLoggedIn]);

    if (!movie) {
        <p>Loading...</p>
    }
    else {

        return (
            <main className='details'>
                <img src={movie.poster_path} className='details-poster' alt='' />

                <section className='details-container'>
                    <h1 className='details-container__title'>{movie.title}</h1>
                    <button className={`details-container__button popup ${isMovieInCollection(movie._id) && isLoggedIn ? 'noninteractive':''}`} onClick={handleAdd}>
                        <h3 className='details-container__button-txt'>{isMovieInCollection(movie._id) && isLoggedIn ? '\u2713 Collection' : '+ Collection'}</h3>
                        <span className='popuptext' id='myPopup'>You need to be logged in to add to your Collection</span>
                    </button>

                    <section className='details-container__sources'>
                        {populateSources()}
                    </section>

                    <section className='details-container__trailer' id='youtube-video'>
                        <h2 className='details-container__trailer-title'>Youtube Trailer</h2>
                        {getTrailerId()}
                    </section>

                    <section className='details-container__info'>
                        <section className='details-container__info-release'>
                            <p className='p-large details-container__info-release-txt'>Release Date: </p>
                            <p className='p-large details-container__info-release-date'>{formatRelease()}</p>
                        </section>

                        <section className='details-container__info-genres'>
                            <p className='p-large details-container__info-release-txt'>Genres: </p>
                            {movie.genres.map((genre) => {
                                return <p className='p-medium details-container__info-release-date genre' key={genre}>{genre}</p>
                            })}
                        </section>

                        <section className='details-container__info-overview'>
                            <p className='p-large details-container__info-overview-txt'>Release Date: </p>
                            <p className='p-large details-container__info-overview-summary'>{movie.overview}</p>
                        </section>
                    </section>
                    <PostsSection movie_id={movieId} />
                </section>
            </main>
        );
    }
}

export default MovieDetails;