import { useState } from 'react'

import AppContext from '@context/AppContext'

const MyApp = ({ Component, pageProps }) => {
  const [pairs, setPairs] = useState({})

  return (
    <AppContext.Provider value={{ pairs, setPairs }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default MyApp
