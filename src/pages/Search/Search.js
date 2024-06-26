import { useEffect, useState,useCallback } from 'react';
import './Search.scss';
import axios from 'axios';
import Result from '../../components/Result/Result';

function Search({ firstRender, setFirstRender, services, setServices }) {

    const apiKey = process.env.REACT_APP_API_KEY;
    const apiMHost = process.env.REACT_APP_MOVIES_API_HOST;
    const apiMUrl = process.env.REACT_APP_MOVIES_API_URL;

    //const [searchInput, setSearchInput] = useState("");
    const [searchInput, setSearchInput] = useState('');
    const [movieList, setMovieList] = useState([]);
    // const [services, setServices] = useState([
    //     'netflix',
    //     'apple_tv',
    //     'hbo_max',
    //     'hulu',
    //     'prime',
    //     'paramount_plus',
    //     'disney_plus',
    //     'peacock',
    //     'peacock_free'
    // ]);

    const handleChange = async (event) => {
        setSearchInput(event.target.value);
    }

    const filterServices = useCallback((unfiltered) => {
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
    }, [services]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

                let filteredData = data.map((m) => filterServices(m)).filter(Boolean);
                if (filteredData.length > 7) {
                    filteredData = filteredData.slice(0, 7);
                }
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchInput]);

    const mapMovieList = () => {
        if (!movieList || movieList.length === 0) {
            return <p className='hide'>No results found</p>;
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
                />
            );
        })
    }

    const handleFirst = () => {
        setFirstRender(false);
    }

    if (firstRender) {
        return (
            <section className='home'>
                <h1 className='home__header'>StreamFinder</h1>

                <h3 className='home__subhead'>Search for any movie on all your streaming services</h3>

                <button className='home__button' onClick={handleFirst}>Start Searching</button>
            </section>
        )
    }

    else {

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
}

export default Search;