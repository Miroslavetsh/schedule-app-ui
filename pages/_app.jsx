import Head from 'next/head'
import { useState } from 'react'

import AppContext from '@context/AppContext'

const MyApp = ({ Component, pageProps }) => {
  const [pairs, setPairs] = useState({})

  return (
    <AppContext.Provider value={{ pairs, setPairs }}>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default MyApp
