import { useEffect, useState } from 'react';
import './MovieDetails.scss';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
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
        if (unfiltered.sources.length===0) {
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

    const apiKey = process.env.REACT_APP_API_KEY;
    const apiMHost = process.env.REACT_APP_MOVIES_API_HOST;
    const apiMUrl = process.env.REACT_APP_MOVIES_API_URL;


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
    },[movieId]);

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
        return <iframe src={embedUrl} frameBorder= '0' className='details-container__trailer-video'/>
    }

    const getTrailerId = () => {
        const videoId = getVideoId(movie.youtube_trailer);
        if (videoId) {
            return embedYouTubeVideo(videoId);
        } else {
            console.error('Invalid YouTube URL');
        }
    }

    const handleAdd = (event) => {

    }

    const populateSources = () => {
        return movie.sources.map((source) => {
            return (
                <section className='details-container__sources-source'>
                    <img className='details-container__sources-source-icon'
                        src={imagesMapped[source.source]} alt={linksMapped[source.source]} />
                    <a href={source.link} className='details-container__sources-source-link'>
                        <h2 className='details-container__sources-source-link-size'>{linksMapped[source.source]} Link</h2>
                    </a>
                </section>
            )
        })
    }

    if (!movie) {
        <p>Loading...</p>
    }
    else {

    return (
        <main className='details'>
            <img src={movie.poster_path} className='details-poster' alt='' />

            <section className='details-container'>
                <h1 className='details-container__title'>{movie.title}</h1>
                <button className='details-container__button' onClick={handleAdd}>
                    <h3 className='details-container__button-txt'>+ Collection</h3>
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
                            return <p className='p-medium details-container__info-release-date genre'>{genre}</p>
                        })}
                    </section>

                    <section className='details-container__info-overview'>
                        <p className='p-large details-container__info-overview-txt'>Release Date: </p>
                        <p className='p-large details-container__info-overview-summary'>{movie.overview}</p>
                    </section>
                </section>
                <PostsSection movie_id={movieId}/>
            </section>
        </main>
    );}
}

export default MovieDetails;