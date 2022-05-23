const getProductionDataBase = async () =>
  await (await fetch(process.env.NEXT_PUBLIC_PRODUCTION_DB_ENDPOINT)).json()

const db = {
  /**
   * @property {subject}
   *           @param {id} - PK
   *           @param {name} @type {string}
   *           @param {place} - can be a link
   *           or a room number @type {string}
   */
  subjects: [
    {
      id: 'subj-1',
      name: 'Понедельник - 1 пара',
      place: '114',
      teacherId: 1,
    },
    {
      id: 'subj-2',
      name: 'Понедельник - 2 пара',
      place: '114',
      teacherId: 1,
    },
    {
      id: 'subj-3',
      name: 'Понедельник - 3 пара',
      place: 'https://us04web.zoom.us/j/74357958497?pwd=ZF1f25FvTHS3G5BIQDTMb3myYU3PUW.1',
      teacherId: 2,
    },
    {
      id: 'subj-4',
      name: 'Вторник - 1 пара',
      place: '211',
      teacherId: 3,
    },
    {
      id: 'subj-5',
      name: 'Вторник - 2 пара',
      place: '113',
      teacherId: 3,
    },
    {
      id: 'subj-6',
      name: 'Вторник - 3 пара',
      place: '113',
      teacherId: 3,
    },
    {
      id: 'subj-7',
      name: 'Среда - 1 пара',
      place: '113',
      teacherId: 3,
    },
    {
      id: 'subj-8',
      name: 'Среда - 2 пара',
      place: '113',
      teacherId: 3,
    },
    {
      id: 'subj-9',
      name: 'Среда - 3 пара',
      place: '113',
      teacherId: 3,
    },
    {
      id: 'subj-10',
      name: 'Четверг - 1 пара',
      place: '113',
      teacherId: 3,
    },
    {
      id: 'subj-11',
      name: 'Четверг - 2 пара',
      place: '113',
      teacherId: 3,
    },
    {
      id: 'subj-12',
      name: 'Четверг - 3 пара',
      place: '113',
      teacherId: 3,
    },
  ],
  /**
   * @property {teacher}
   *           @param {id} - PK
   *           @param {name} @type {string}
   */
  teachers: [
    { id: 1, name: 'Миколайчук Роман Антонович' },
    { id: 2, name: 'Телешун Ярослав С.' },
    { id: 3, name: 'Герасименко Оксана Юріївна' },
  ],
  /**
   * @property {group}
   *           @param {id} - PK
   *           @param {name} @type {string}
   */
  groups: [
    { id: 'djsaFnGDLk727uiogu3i710gDDA9GhdLIk', name: 'МІТ-31 (1 підгрупа)' },
    { id: 'DjsafnGDLk727daogu3i710gDUR9RhdSIk', name: 'МІТ-31 (2 підгрупа)' },
  ],
  /**
   * @property {schedule}
   *           @param {id} - PK
   *           @param {groupId} - PK of group
   *           @param {days} @type {Array<pairId>}
   *           // each id related to the pair with corresponding info
   */
  schedules: [
    {
      id: 1,
      groupId: 'djsaFnGDLk727uiogu3i710gDDA9GhdLIk',
      days: [[1, 2, 3], [], [7, 8, 9], [10, 11, 12], [], [], []],
    },
    {
      id: 2,
      groupId: 'DjsafnGDLk727daogu3i710gDUR9RhdSIk',
      days: [[], [4, 5, 6], [7, 8, 9], [10, 11, 12], [], [], []],
    },
  ],
  /**
   * @property {pair}
   *           @param {id} - PK
   *           @param {subjectId} - PK of subject
   *           @param {time} @type {string} must math the template: HH:MM - HH:MM
   *           Where first time segment is earlier than second
   *
   *           Difference between @property {pair}
   *           and the specific @property {subject} - is in time
   *
   *           @property {pair}  - in such time, @property {subject} - abstract entity
   */
  pairs: [
    {
      id: 1,
      subjectId: 'subj-1',
      time: '09:00 - 10:20',
    },
    {
      id: 2,
      subjectId: 'subj-2',
      time: '10:30 - 11:50',
    },
    {
      id: 3,
      subjectId: 'subj-3',
      time: '12:10 - 13:30',
    },
    {
      id: 4,
      subjectId: 'subj-4',
      time: '09:00 - 10:20',
    },
    {
      id: 5,
      subjectId: 'subj-5',
      time: '10:30 - 11:50',
    },
    {
      id: 6,
      subjectId: 'subj-6',
      time: '12:10 - 13:30',
    },
    {
      id: 7,
      subjectId: 'subj-7',
      time: '09:00 - 10:20',
    },
    {
      id: 8,
      subjectId: 'subj-8',
      time: '10:30 - 11:50',
    },
    {
      id: 9,
      subjectId: 'subj-8',
      time: '12:10 - 13:30',
    },
    {
      id: 10,
      subjectId: 'subj-10',
      time: '09:00 - 10:20',
    },
    {
      id: 11,
      subjectId: 'subj-11',
      time: '10:30 - 11:50',
    },
    {
      id: 12,
      subjectId: 'subj-12',
      time: '12:10 - 13:30',
    },
  ],
  /**
   * @property {day}
   *           @param {id} - PK
   *           @param {name} @type {string}
   */
  days: [
    { id: 1, name: 'Понеділок' },
    { id: 2, name: 'Вівторок' },
    { id: 3, name: 'Середа' },
    { id: 4, name: 'Четвер' },
    { id: 5, name: "П'ятниця" },
    { id: 6, name: 'Субота' },
    { id: 7, name: 'Неділя' },
  ],
}

let exported = db

if (process.env.NODE_ENV === 'production') {
  getProductionDataBase().then((data) => {
    exported = data
  })
}

export default exported
