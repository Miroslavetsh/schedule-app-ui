import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import Head from 'next/head'

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

      {pairs.groupName && (
        <div>
          Даю інфо за групою {pairs.groupName}
          <Pair data={pairs.current} title={"Поточна пара"} />
          <Pair data={pairs.nearest} title={"Найближча пара"} />
        </div>
      )}

      <button
        onClick={() => {
          window.localStorage.removeItem('__token')
          router.push('/')
        }}
      >
        Ввести інший токен
      </button>
    </>
  )
}

export default Group
