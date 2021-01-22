import React, { useState, useEffect } from 'react'
import Head from 'next/head'

import { useRouter } from 'next/router'

import Rating from '../components/rating'

import styles from '../../styles/Show.module.scss'

export async function getServerSideProps(context) {
    return {
      props: {}, // will be passed to the page component as props
    };
}

const Show = () => {
  const router = useRouter()
  const { id } = router.query

  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState({});
  const [cast, setCast] = useState([]);

  useEffect(() => {
    // fetch show info
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        setShow(data);
      })
      .catch(err => {
        setLoading(false);
      });

      // fetch show cast info
      fetch(`https://api.tvmaze.com/shows/${id}/cast`)
        .then(res => res.json())
        .then(data => {
          setLoading(false);
          setCast(data);
        })
        .catch(err => {
          setLoading(false);
        });
  }, [])

  return (
    <div className="wrapper">
      <Head>
        <title>TV Bland - Show</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="mainHeader">
        <a href="/">
            <h1>TV Bland</h1>
        </a>
      </header>

      <main className={styles.main}>
        {loading && <p>Loading show...</p>}
        {show && <div className={styles.show}>
            <div className={styles.summary}>
                <style jsx>{`
                    .show-image {
                        display: block;
                        margin: 0 0 1rem 0;
                        width: 100%;
                        min-height: 425px;
                        background: url(${show.image && show.image.original});
                        background-position: center;
                        background-size: cover;
                    }

                    /** Tablet and up **/
                    @media (min-width: 43em) {
                        .show-image {
                            min-height: 400px;
                            float: left;
                            width: 27rem;
                            margin-right: 3rem;
                        }
                    }
                `}</style>
                {show.image && <div className="show-image"></div>}
                <div className={styles.summaryText}>
                    {show.rating && <Rating average={show.rating.average} />}
                    <h2>{show.name}</h2>
                    <div dangerouslySetInnerHTML={{ __html: show.summary }}></div>
                </div>
            </div>
            <div className={styles.info}>
                <div>
                    <h2>Show info</h2>
                    <div className={styles.specifics}>
                        <div>
                            <h3>{show.webChannel ? 'Streamed on' : show.network && 'Broadcast on'}</h3>
                            <p>{show.webChannel ? show.webChannel.name : show.network && show.network.name}</p>
                        </div>
                        <div>
                            <h3>Schedule</h3>
                            <p>{show.schedule && show.schedule.days.join(', ')}</p>
                        </div>
                        <div>
                            <h3>Status</h3>
                            <p>{show.status}</p>
                        </div>
                        <div>
                            <h3>Genres</h3>
                            <p>{show.genres && show.genres.length > 0 ? show.genres.join(', ') : 'No genres given'}</p>
                        </div>                    
                    </div>
                </div>
                <div>
                    {cast && cast.length > 0 && <div className={styles.cast}>
                        <h2>Starring</h2>
                        <div className={styles.list}>
                            {cast.map(item => {
                                return (
                                    <div className={styles.actor} key={item.person.id}>
                                        <style jsx>{`
                                            .cast-image {
                                                display: inline-block;
                                                margin: 0 0 1rem 0;
                                                width: 45px;
                                                height: 45px;
                                                background: #ccc url(${item.person.image && item.person.image.medium});
                                                background-position: center;
                                                background-size: cover;
                                                border-radius: 22px;
                                            }
                        
                                            @media (min-width: 43em) {
                                            }
                                        `}</style>
                                        <div className="cast-image"></div>
                                        <div className={styles.name}>
                                            <p>{item.person.name}</p>
                                            <p>{item.character.name}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>}
                </div>
            </div>
        </div>}
      </main>
    </div>
  )
}

export default Show
