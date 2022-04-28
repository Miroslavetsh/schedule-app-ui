import { useRouter } from 'next/router'

const Group = () => {
  const router = useRouter()
  const { hash } = router.query

  return <>Here is info about group {hash}</>
}

export const getServerSideProps = async () => {
  return { props: {} }
}

export default Group
