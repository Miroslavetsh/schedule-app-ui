import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import AppContext from '../../context/AppContext'

const Group = () => {
  const router = useRouter()
  const { pairs } = useContext(AppContext)

  useEffect(() => {
    !pairs.groupName && router.push('/')
  }, [])

  return (
    <>
      {pairs.groupName && (
        <div>
          Даю інфо за групою {pairs.groupName}
          <pre>{JSON.stringify(pairs, null, 2)}</pre>
        </div>
      )}

      <button
        onClick={() => {
          sessionStorage.removeItem('__token')
          router.push('/')
        }}
      >
        Ввести інший токен
      </button>
    </>
  )
}

export default Group
