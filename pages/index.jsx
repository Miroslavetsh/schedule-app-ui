import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

import AppContext from '@context/AppContext'

const smiles = [
  {
    iconSrc: '/img/icons/face-with-monocle.svg',
    text: 'Слідкуйте за розкладом пар. Тепер це зручно!',
  },
  {
    iconSrc: '/img/icons/smiling-face-with-sunglasses.svg',
    text: 'Створюйте та оновлюйте розклад.',
  },
  {
    iconSrc: '/img/icons/nerd-face.svg',
    text: 'Зручно навчайте та навчайтесь самі.',
  },
]

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

  // TODO: input validation
  return (
    <>
      <Head>
        <title>Скедюьлер | Твій Помічник</title>
      </Head>

      <div>
        <h1>Вітаю в Скедьюлері! 👋</h1>

        <div>
          {errorMessage && <div>{errorMessage}</div>}

          <h2>Будь ласка, введіть наданий вам токен викладача.</h2>

          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                authorize()
              }}
              action=""
            >
              <input
                value={token}
                onInput={(e) => setToken(e.target.value.trim())}
                type="text"
                placeholder="Токен"
                id="token-input"
              />

              <label htmlFor="token-input">
                *Не надавайте ваш токен нікому, це суперсекретно!​​🤐​
              </label>
            </form>
          </div>

          <label>
            <input
              type="checkbox"
              checked={isRemember}
              onChange={() => setIsRemember(!isRemember)}
            />
            Запам’ятати мене
          </label>

          <div>
            {smiles.map(({ iconSrc, text }) => {
              return (
                <div key={text}>
                  <Image
                    src={iconSrc}
                    width={32}
                    height={32}
                    quality={100}
                    alt={iconSrc.match(/[a-z|-]{1,}.(svg|png|jpg)/gi)[0]}
                  />

                  <p>{text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
