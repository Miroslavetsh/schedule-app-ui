import axios from 'axios'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

import AppContext from '@context/AppContext'

const Home = () => {
  const router = useRouter()
  const { setPairs } = useContext(AppContext)

  const [token, setToken] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    // Trying to find the token in this session
    const t = sessionStorage.getItem('__token')

    if (t) {
      setToken(t)
      authorize()
    }
  })

  const authorize = () => {
    axios({
      url: '/api/authorize',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { token },
    }).then(({ data }) => {
      if (typeof data === 'string') {
        setErrorMessage(data)
      } else {
        const { groupName, currentPair, nearestPair } = data

        setPairs({ current: currentPair, nearest: nearestPair, groupName })

        router.push('/group/' + token)
        sessionStorage.setItem('__token', token)
      }
    })
  }

  // TODO: input validation and 'remember me' checkbox
  return (
    <>
      Введи сюди токен, пліз!
      <input value={token} onInput={(e) => setToken(e.target.value.trim())} type="text" />
      {errorMessage && errorMessage}
      <button onClick={authorize}>Submit</button>
    </>
  )
}

export default Home
