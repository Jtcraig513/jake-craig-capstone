import { useState } from 'react';
import './Home.scss';
import axios from 'axios';

function Home() {

    const apiKey = process.env.REACT_APP_API_KEY;
    const apiHost = process.env.REACT_APP_API_HOST;
    const apiUrl = process.env.REACT_APP_API_URL;

    const [searchInput, setSearchInput] = useState("");
    const [services, setServices] = useState(['netflix','hulu','hbo','prime']);

    const handleChange = async (event) => {
        setSearchInput(event.target.value);
        
        if (searchInput.length>1) {
            handleSearch();
        }
    }

    const filterServices = (unfiltered) => {
        for (let i=0;i<unfiltered.length;i++) {
            if (!unfiltered[i].streamingInfo.us) {
                continue;
            }

            let newArray = [];
            let temp = unfiltered[i];
            console.log(unfiltered[i]);
            for (let j=0;j<temp.streamingInfo.us.length;j++) {
                if (services.find((serv)=>serv===temp.streamingInfo.us[j].service)) {
                    newArray.push(unfiltered[i].streamingInfo.us[j]);
                }
            }

            unfiltered[i].streamingInfo.us = newArray;
        }
        return unfiltered;
    }

    const handleSearch = async () => {
        const options = {
            method: 'GET',
            url: `${apiUrl}search/title`,
            params: {
                title: searchInput,
                country: 'us',
                show_type: 'movie',
                output_language: 'en'
            },
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': apiHost
            }
        };

        try {
            const response = await axios.request(options);

	        const unfilteredMovies = response.data.result;
            console.log(unfilteredMovies);
            const filteredMovies = filterServices(unfilteredMovies);
            console.log(filteredMovies);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <main className='home'>
            <section className='search-container'>
                <h2>Search bar</h2>
                <input
                    type='search'
                    id='searchMovie'
                    name='searchName'
                    placeholder='Search Movie...'
                    onChange={handleChange}
                    />
            </section>
        </main>
    );
}

export default Home;