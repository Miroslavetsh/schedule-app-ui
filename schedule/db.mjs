export default {
  /**
   * @property {subject}
   *           @param {id} - PK
   *           @param {name} @type {string}
   *           @param {place} - can be a link
   *           or a room number @type {string}
   */
  subjects: [
    {
      id: 1,
      name: 'Бази даних та інформаційні системи (лаб)',
      place: '114',
      teacherId: 1,
    },
    {
      id: 2,
      name: 'Бази даних та інформаційні системи (Пр.)',
      place: '114',
      teacherId: 1,
    },
    {
      id: 3,
      name: 'Соціально політичні студії (С)',
      place: 'https://us04web.zoom.us/j/74357958497?pwd=ZF1f25FvTHS3G5BIQDTMb3myYU3PUW.1',
      teacherId: 2,
    },
    {
      id: 3,
      name: "Об'єктно-орієнтовне програмування (лаб)",
      place: '211',
      teacherId: 3,
    },
    {
      id: 5,
      name: "Об'єктно-орієнтовне програмування (Пр)",
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
      days: [
        [1, 2, 3, 4, 5],
        [7, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
      ],
    },
    {
      id: 2,
      groupId: 'DjsafnGDLk727daogu3i710gDUR9RhdSIk',
      days: [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
      ],
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
      subjectId: 1,
      time: '09:00 - 10:20',
    },
    {
      id: 2,
      subjectId: 2,
      time: '10:30 - 11:09',
    },
    {
      id: 3,
      subjectId: 3,
      time: '11:10 - 11:50',
    },
    {
      id: 4,
      subjectId: 3,
      time: '12:10 - 12:49',
    },
    {
      id: 5,
      subjectId: 1,
      time: '13:40 - 14:19',
    },
    {
      id: 6,
      subjectId: 3,
      time: '14:20 - 15:59',
    },
    {
      id: 7,
      subjectId: 3,
      time: '09:00 - 10:20',
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
