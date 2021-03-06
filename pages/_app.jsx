import Head from 'next/head'
import { useState } from 'react'

import AppContext from '@context/AppContext'
import PageLayout from 'layout/page'

import '../styles/global.scss'

const MyApp = ({ Component, pageProps }) => {
  const [pairs, setPairs] = useState({})

  return (
    <AppContext.Provider value={{ pairs, setPairs }}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </AppContext.Provider>
  )
}

export default MyApp
