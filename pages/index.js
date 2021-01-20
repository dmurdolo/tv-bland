import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import appStyles from '../styles/app.module.scss'
import styles from '../styles/Home.module.scss'

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
    <div className={appStyles.wrapper}>
      <Head>
        <title>TV Bland - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.homeHeader}>
        <h1>
          TV Bland
        </h1>
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
                <Link key={item.id} href={`/show/${item.id}`}>
                  <div className={styles.show}>
                    {item.show.image ? <Image src={item.show.image.medium} height={295} width={210} layout="responsive" alt={item.name} /> : <Image src="/images/image-not-found.png" width={32} height={32} alt="Image not found" />}
                    {item.show.rating.average ? <div className={styles.rating}>{item.show.rating.average}</div> : <div className={styles.rating}>No rating information</div>}
                    <p>{item.name}</p>
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
