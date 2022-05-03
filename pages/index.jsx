import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { getCookies, setCookies, checkCookies } from 'cookies-next'

import AppContext from '@context/AppContext'

import styles from '../styles/Home.module.scss'

const smiles = [
  {
    iconSrc: '/img/icons/face-with-monocle.svg',
    text: 'Слідкуйте за розкладом пар. Тепер це зручно!',
  },
  {
    iconSrc: '/img/icons/nerd-face.svg',
    text: 'Створюйте та оновлюйте розклад.',
  },
  {
    iconSrc: '/img/icons/smiling-face-with-sunglasses.svg',
    text: 'Зручно навчайте та навчайтесь самі.',
  },
]

const Home = () => {
  const router = useRouter()
  const { setPairs } = useContext(AppContext)

  const [token, setToken] = useState('')
  const [isRemember, setIsRemember] = useState(false)
  const [isAuthorizing, setIsAuthorizing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const cookiesExpire = new Date(Date.now())
  cookiesExpire.setFullYear(cookiesExpire.getFullYear() + 1)

  useEffect(() => {
    if (checkCookies('__token')) {
      const { __token } = getCookies()

      setToken(__token)
      authorize()
    }
  })

  const authorize = () => {
    setIsAuthorizing(true)

    const currentDay = new Date().getDay() - 1
    const currentTime = `${new Date().getHours()}:${new Date().getMinutes()}`

    axios({
      url: '/api/authorize',
      method: 'GET',
      params: { token, currentDay, currentTime },
    }).then(({ data }) => {
      if (typeof data === 'string') {
        setErrorMessage(data)
      } else {
        const { groupName, currentPair, nearestPair } = data

        setPairs({ current: currentPair, nearest: nearestPair, groupName })

        router.push('/group/' + uuidv4(token) + Date.now())
        isRemember && setCookies('__token', token, { expires: cookiesExpire })
      }

      setIsAuthorizing(false)
    })
  }

  const hideAfterFiveSeconds = () => {
    setTimeout(() => {
      setErrorMessage('')
    }, 5000)

    return true
  }

  // TODO: input validation
  return checkCookies('__token') ? (
    <div className={styles.loadingScreen}>Loading...</div>
  ) : (
    <>
      <Head>
        <title>Скедьюлер | Твій Помічник</title>
      </Head>

      <div className={styles.container}>
        <h1 className={styles.heading}>Вітаю в Скедьюлері! 👋</h1>

        <div className={styles.whiteBlock}>
          {errorMessage && hideAfterFiveSeconds() && (
            <div className={styles.error}>{errorMessage}</div>
          )}

          <h2 className={styles.proposition}>Будь ласка, введіть наданий вам токен викладача.</h2>

          <div>
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault()
                authorize()
              }}
            >
              <fieldset className={styles.input}>
                <input
                  value={token}
                  onInput={(e) => setToken(e.target.value.trim())}
                  type="text"
                  placeholder="Токен"
                  id="token-input"
                  disabled={isAuthorizing}
                />

                <button type="submit" className={styles.image} disabled={isAuthorizing}>
                  <Image src="/img/icons/arrow-right.svg" width={20} height={10} alt="arrow" />
                </button>
              </fieldset>

              <label htmlFor="token-input" className={styles.label}>
                *Не надавайте ваш токен нікому, це суперсекретно!​​🤐​
              </label>
            </form>
          </div>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={isRemember}
              onChange={() => setIsRemember(!isRemember)}
            />
            <span>Запам’ятати мене</span>
          </label>

          <div className={styles.smiles}>
            {smiles.map(({ iconSrc, text }) => {
              return (
                <div className={styles.smile} key={text}>
                  <div className={styles.icon}>
                    <Image
                      src={iconSrc}
                      width={32}
                      height={32}
                      quality={100}
                      alt={iconSrc.match(/[a-z|-]{1,}.(svg|png|jpg)/gi)[0]}
                    />
                  </div>

                  <p className={styles.caption}>{text}</p>
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
