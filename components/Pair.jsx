import Link from 'next/link'

import isLink from '@utils/isLink'

function Pair({ data, title }) {
  const { name, place, teacherName } = data

  return (
    <div>
      <h3>{title}</h3>

      {typeof data === 'string' ? (
        <h2>{data}</h2>
      ) : (
        <>
          <strong>{name}</strong>

          <p>
            Викладач: <strong>{teacherName}</strong>
          </p>

          {isLink(place) ? (
            <Link href={place}>
              <a target="_blank">Підключитися</a>
            </Link>
          ) : (
            <p>
              Аудиторія <strong>{place}</strong>
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default Pair
