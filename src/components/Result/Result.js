import { Link } from 'react-router-dom';
import './Result.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Result({index, id,title, release, sources,poster,moviesList}) {


    return (
        <Link to='' className='result' id={`result${id}`}>
            <section className='result-container'>
                <section className='result-container__buncher'>
                    <img src={poster} className='result-container__buncher-img' alt='Poster' />
                    <p>{title}</p>
                </section>
                <section className='result-container__sources'>
                    <p>Sources:</p>
                    <p>{sources.length}</p>
                </section>
            </section>
        </Link>
    );
}

export default Result;