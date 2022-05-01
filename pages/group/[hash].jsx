import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useContext, useEffect } from 'react'

import AppContext from '@context/AppContext'
import Pair from '@components/Pair'

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

      <div>
        {pairs.groupName && (
          <div>
            <h1>{pairs.groupName}</h1>

            <div>
              <Pair data={pairs.current} title={'Поточна пара'} />
              <Pair data={pairs.nearest} title={'Найближча пара'} />
            </div>
          </div>
        )}

        <Link href="/">
          <a
            onClick={() => {
              window.localStorage.removeItem('__token')
            }}
          >
            <Image src="/img/icons/arrow-right.svg" width={20} height={10} alt="arrow" />
            <span>Спробувати інший токен</span>
          </a>
        </Link>
      </div>
    </>
  )
}

export default Group
