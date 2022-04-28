import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Home = () => {
  const [token, setToken] = useState('')
  const router = useRouter()

  // TODO: remember me checkbox
  return (
    <>
      Your token, please!
      <input value={token} onInput={(e) => setToken(e.target.value)} type="text" />
      <button
        onClick={() => {
          axios({
            url: '/authorize',
            method: 'POST',
            data: { token },
          }).then((res) => {
            // Set data to the context
            console.log(res.data)

            router.push('/group/' + token)
          })
        }}
      >
        Submit
      </button>
    </>
  )
}

export default Home
