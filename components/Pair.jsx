import Link from 'next/link'

import isLink from '@utils/isLink'

import styles from '../styles/Group.module.scss'

const Pair = ({ data, title }) => {
  const { name, place, teacherName } = data

  return (
    <div className={styles.pair}>
      <h3 className={styles.heading}>{title}</h3>

      {typeof data === 'string' ? (
        <h2 className={styles.h2}>{data}</h2>
      ) : (
        <>
          <div className={styles.text}>
            <strong className={styles.h2}>{name}</strong>

            <p className={styles.teacher}>
              <span>Викладач:</span> <strong>{teacherName}</strong>
            </p>
          </div>

          {isLink(place) ? (
            <p className={styles.place}>
              <Link href={place}>
                <a target="_blank">
                  <span>Підключитись за посиланням</span>
                </a>
              </Link>
            </p>
          ) : (
            <p className={styles.place}>
              Аудиторія №<strong>{place}</strong>
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default Pair
