import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

import AppContext from '@context/AppContext'

const Home = () => {
  const router = useRouter()
  const { setPairs } = useContext(AppContext)

  const [token, setToken] = useState('')
  const [isRemember, setIsRemember] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    // Trying to find the token in this session
    const t = window.localStorage.getItem('__token')

    if (t) {
      setToken(t)
      authorize()
    }
  })

  const authorize = () => {
    axios({
      url: '/api/authorize',
      method: 'GET',
      params: { token },
    }).then(({ data }) => {
      if (typeof data === 'string') {
        setErrorMessage(data)
      } else {
        const { groupName, currentPair, nearestPair } = data

        setPairs({ current: currentPair, nearest: nearestPair, groupName })

        router.push('/group/' + uuidv4(token) + Date.now())
        isRemember && window.localStorage.setItem('__token', token)
      }
    })
  }

  // TODO: input validation and 'remember me' checkbox
  return (
    <>
      <Head>
        <title>Скедюьлер | Твій Помічник</title>
      </Head>
      Введи сюди токен, пліз!
      <input value={token} onInput={(e) => setToken(e.target.value.trim())} type="text" />
      {errorMessage && errorMessage}
      <label>
        <input type="checkbox" checked={isRemember} onChange={() => setIsRemember(!isRemember)} />
        Remember
      </label>
      <br />
      <button onClick={authorize}>Submit</button>
    </>
  )
}

export default Home
