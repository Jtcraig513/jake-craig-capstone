import { useEffect, useState } from 'react';
import './Search.scss';
import axios from 'axios';
import Result from '../../components/Result/Result';

function Search({ firstRender }) {

    const apiKey = process.env.REACT_APP_API_KEY;

    const apiMHost = process.env.REACT_APP_MOVIES_API_HOST;
    const apiMUrl = process.env.REACT_APP_MOVIES_API_URL;

    //const [searchInput, setSearchInput] = useState("");
    const [searchInput, setSearchInput] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [services, setServices] = useState([
        'netflix',
        'apple_tv',
        'hbo_max',
        'hulu',
        'prime',
        'paramount_plus',
        'disney_plus',
        'peacock'
    ]);

    const handleChange = async (event) => {
        setSearchInput(event.target.value);
    }

    const filterServices = (unfiltered) => {
        if (unfiltered.contentType!=='movie' || unfiltered.sources.length===0) {
            return;
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

    useEffect(() => {
        let timeoutId;
    
        const fetchData = async () => {
            try {
                const options = {
                    method: 'GET',
                    url: `${apiMUrl}search`,
                    params: { query: searchInput },
                    headers: {
                        'X-RapidAPI-Key': apiKey,
                        'X-RapidAPI-Host': apiMHost
                    }
                };

                const response = await axios.request(options);
                const data = response.data.contents;
                console.log(data);
                let filteredData = data.map((m) => filterServices(m)).filter(Boolean);
                if (filteredData.length > 7) {
                    filteredData = filteredData.slice(0, 7);
                }
                console.log(filteredData);
                setMovieList(filteredData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        // Set a timeout to fetch data after 0.5 seconds if the search input remains unchanged
        if (searchInput.trim() !== '') {
            timeoutId = setTimeout(fetchData, 500);
        }
    
        // Clear the timeout when the component unmounts or when the search input changes
        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchInput]);

    const mapMovieList = () => {
        if (!movieList || movieList.length === 0) {
            return <p>No results found</p>;
        }
        return movieList.map((movie, index) => {
            return (
                <Result
                    key={index}
                    index={index}
                    id={movie._id}
                    title={movie.title}
                    release={movie.release_date}
                    sources={movie.sources}
                    poster={movie.poster_path}
                    movieList={movieList}
                />
            );
        })
    }

    return (
        <main className='search'>
            <section className='search__bar'>
                <input
                    type='search'
                    id='searchMovie'
                    name='searchName'
                    placeholder='Search Movies...'
                    className='search__bar-input'
                    onChange={handleChange}
                />
            </section>
            <section className='search__list'>
                {mapMovieList()}
            </section>
        </main>
    );
}

export default Search;