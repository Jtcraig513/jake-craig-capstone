import { Link } from 'react-router-dom';
import './Result.scss';
import { useEffect, useState } from 'react';
import netflix from '../../assets/logos/netflix.png';
import hbo from '../../assets/logos/hbo_max.jpg';
import prime from '../../assets/logos/prime.jpg';
import apple from '../../assets/logos/apple_tv.png';
import hulu from '../../assets/logos/hulu.jpg'
import paramount_plus from '../../assets/logos/paramount_plus.png'
import disney_plus from '../../assets/logos/disney_plus.jpg'
import peacock from '../../assets/logos/peacock.jpg'

function Result({index, id,title, release, sources,poster,moviesList}) {
    const imagesMapped = {
        'netflix': netflix,
        'hbo_max': hbo,
        'hulu': hulu,
        'prime': prime,
        'apple_tv': apple,
        'paramount_plus': paramount_plus,
        'disney_plus': disney_plus,
        'peacock': peacock,
        'peacock_free': peacock
    }
    return (
        <Link to='' className='result' id={`result${id}`}>
            <section className='result-container'>
                <section className='result-container__buncher'>
                    <img src={poster} className='result-container__buncher-img' alt='Poster' />
                    <p>{title}</p>
                </section>
                <section className='result-container__sources'>
                    <p>Sources:</p>
                    <section className='result-container__sources-icons' id={`result${id}`}>
                        <p className={sources.length===0 ? '':'hide'}>N/A</p>
                        {sources.map((s) => {
                            return (
                                <img src={imagesMapped[s.source]} key={s.id} className='result-container__sources-icons-icon'
                                     alt={s.display_name} />
                            );
                        })}
                    </section>
                </section>
            </section>
        </Link>
    );
}

export default Result;