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
      days: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10, 11, 12],
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

const prodDB = {
  subjects: [
    {
      id: 'upr-pers',
      name: 'Управління Персоналом',
      place: 'https://us04web.zoom.us/j/2335875798?pwd=em9YVkdHamkyd0pkVEd1SjNSbnArZz09',
      teacherId: 'zzn',
    },
    {
      id: 'ruh-obj',
      name: "Зв'язок з Рухомими Об'єктами",
      place: 'https://us04web.zoom.us/j/72051470217?pwd=cFMxK1h4WnRLSUVUL1NkUzJublFjUT09',
      teacherId: 'ddc',
    },
    {
      id: 'baz-dan',
      name: 'Бази Даних',
      place: 'https://us02web.zoom.us/j/86480138473?pwd=dTFLMHBQWWZEK0RmWVVlQlNoSVVvZz09',
      teacherId: 'crv',
    },
    {
      id: 'obj-prg-lect',
      name: "Лекція з Об'єктно Орієнтованого Програмування",
      place: 'https://us02web.zoom.us/j/86480138473?pwd=dTFLMHBQWWZEK0RmWVVlQlNoSVVvZz09',
      teacherId: 'hrs',
    },
    {
      id: 'obj-prg-pract',
      name: "Практика з Об'єктно Орієнтованого Програмування",
      place: 'https://us02web.zoom.us/j/86480138473?pwd=dTFLMHBQWWZEK0RmWVVlQlNoSVVvZz09',
      teacherId: 'hrs',
    },
    {
      id: 'hmr-tec',
      name: 'Хмарні Технології',
      place: 'https://us04web.zoom.us/j/9894978759?pwd=Sm9pQ3ZWaVA3WWtaYXh0MFlqc1lmdz09',
      teacherId: 'mch',
    },
  ],
  teachers: [
    { id: 'zzn', name: 'Зюзюн ?.?.' },
    { id: 'ddc', name: 'Дудник ?.?.' },
    { id: 'mch', name: 'Махович ?.?.' },
    { id: 'crv', name: 'Кравченко Юрій Васильович' },
    { id: 'hrs', name: 'Герасименко Оксана Юріївна' },
  ],
  groups: [
    { id: 'djsaFnGDLk727uiogu3i710gDDA9GhdLIk', name: 'МІТ-31 (1 підгрупа)' },
    { id: 'reaopiHHSKbjhs876jIiy7ijggi1dKiOSd', name: 'МІТ-31 (2 підгрупа)' },
  ],
  schedules: [
    {
      groupId: 'djsaFnGDLk727uiogu3i710gDDA9GhdLIk',
      days: [
        [],
        ['vt-1', 'vt-2', 'vt-3', 'vt-4'],
        ['sr-1', 'sr-2', 'sr-3', 'sr-4'],
        ['ct-1', 'ct-2', 'ct-3', 'ct-4'],
        ['pt-1', 'pt-2', 'pt-3'],
      ],
    },
    {
      groupId: 'reaopiHHSKbjhs876jIiy7ijggi1dKiOSd',
      days: [
        [],
        ['vt-1', 'vt-2', 'vt-3', 'vt-4'],
        ['sr-1', 'sr-2', 'sr-3', 'sr-4'],
        ['ct-1', 'ct-2', 'ct-4', 'ct-3'],
        ['pt-1', 'pt-2', 'pt-3'],
      ],
    },
  ],
  pairs: [
    {
      id: 'vt-1',
      subjectId: 'upr-pers',
      time: '09:00 - 10:20',
    },
    {
      id: 'vt-2',
      subjectId: 'upr-pers',
      time: '10:30 - 11:50',
    },
    {
      id: 'vt-3',
      subjectId: 'ruh-obj',
      time: '12:10 - 13:30',
    },
    {
      id: 'vt-4',
      subjectId: 'hmr-tec',
      time: '13:40 - 15:00',
    },
    {
      id: 'sr-1',
      subjectId: 'baz-dan',
      time: '12:10 - 13:30',
    },
    {
      id: 'sr-2',
      subjectId: 'baz-dan',
      time: '13:40 - 15:00',
    },
    {
      id: 'sr-3',
      subjectId: 'obj-prg-lect',
      time: '15:00 - 16:30',
    },
    {
      id: 'sr-4',
      subjectId: 'obj-prg-pract',
      time: '16:40 - 18:00',
    },
    {
      id: 'ct-1',
      subjectId: 'hmr-tec',
      time: '09:00 - 10:20',
    },
    {
      id: 'ct-2',
      subjectId: 'ruh-obj',
      time: '10:30 - 11:50',
    },
    {
      id: 'ct-3',
      subjectId: 'obj-prg-pract',
      time: '12:10 - 13:30',
    },
    {
      id: 'ct-4',
      subjectId: 'hrm-tech',
      time: '13:40 - 15:00',
    },
    {
      id: 'pt-1',
      subjectId: 'obj-prog-pract',
      time: '10:30 - 11:50',
    },
    {
      id: 'pt-2',
      subjectId: 'obj-prog-pract',
      time: '12:00 - 13:30',
    },
    {
      id: 'pt-3',
      subjectId: 'obj-prog-pract',
      time: '13:40 - 15:00',
    },
  ],
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

export default process.env.NODE_ENV !== 'production' ? db : prodDB
