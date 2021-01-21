import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import styles from '../styles/Home.module.scss'

import Rating from './components/rating'

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    fetch('https://api.tvmaze.com/schedule')
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        setSchedule(data);
      })
      .catch(err => {
        setLoading(false);
      })
  }, [])

  return (
    <div className="wrapper">
      <Head>
        <title>TV Bland - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="mainHeader">
        <a href="/">
            <h1>TV Bland</h1>
        </a>
        <p>TV Show and web series database.</p>
        <p>Create personalised schedules. Episode guide, cast, crew and character information.</p>
      </header>

      <main className={styles.main}>
        <h2>Last Added Shows</h2>
        {loading && <p>Loading shows...</p>}
        <div className={styles.grid}>
          {
            !loading && schedule.length > 0 ? schedule.map(item => {
              return (
                <Link key={item.id} href={{ pathname: '/show/[id]', query: { id: item.show.id }}} as={`/show/${item.show.id}`}>
                  <div className={styles.show}>
                    <style jsx>{`
                      .show-image {
                        display: block;
                        margin: 0 0 1rem;
                        width: 100%;
                        min-height: 205px;
                        background: url(${item.show.image && item.show.image.medium});
                        background-position: center;
                        background-size: cover;
                      }

                      @media (min-width: 32em) {
                          .show-image {
                              min-height: 400px;
                          }
                      }

                      @media (min-width: 43em) {
                          .show-image {
                              min-height: 300px;
                          }
                      }

                      @media (min-width: 87em) {
                          .show-image {
                              min-height: 500px;
                          }
                      }
                    `}</style>
                    {item.show.image && <div className="show-image"></div>}
                    {item.show.rating && <Rating page="home" average={item.show.rating.average} />}
                    <p>{item.show.name}</p>
                  </div>
                </Link>
              )
            }) : !loading && <p>No shows founds</p>
          }
        </div>
      </main>
    </div>
  )
}

export default Home
