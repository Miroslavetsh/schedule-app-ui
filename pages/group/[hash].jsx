import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useContext, useEffect } from 'react'

import AppContext from '@context/AppContext'
import Pair from '@components/Pair'

import styles from '../../styles/Group.module.scss'
import { removeCookies } from 'cookies-next'

const Group = () => {
  const router = useRouter()
  const { pairs } = useContext(AppContext)

  useEffect(() => {
    !pairs.groupName && router.push('/')
  }, [])

  return (
    <>
      <Head>
        <title>{pairs.groupName}</title>
      </Head>

      <div className={styles.container}>
        {pairs.groupName && (
          <div className={styles.whiteBlock}>
            <div>
              <h1 className={styles.heading}>{pairs.groupName}</h1>

              <div className={styles.pairs}>
                <Pair data={pairs.current} title={'Поточна пара'} />
                <Pair data={pairs.nearest} title={'Найближча пара'} />
              </div>
            </div>

            <Link href="/">
              <a
                className={styles.link}
                onClick={() => {
                  removeCookies('__token')
                }}
              >
                <span className={styles.arrow}>
                  <Image src="/img/icons/arrow-right.svg" width={20} height={10} alt="arrow" />
                </span>
                <span className={styles.text}>Спробувати інший токен</span>
              </a>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default Group
