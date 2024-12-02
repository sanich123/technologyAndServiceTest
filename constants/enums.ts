export const enum RoutePointValues {
  start = 'start',
  finish = 'finish',
}

export const enum Languages {
  english = 'ensligh',
  russian = 'russian',
}

export const LANGUAGES_ARRAY = {
  [Languages.russian]: {
    values: [
      { value: Languages.english, title: 'Английский' },
      { value: Languages.russian, title: 'Русский' },
    ],
  },
  [Languages.english]: {
    values: [
      { value: Languages.english, title: 'English' },
      { value: Languages.russian, title: 'Russian' },
    ],
  },
};

export const METRICS_TITLES = {
  [Languages.russian]: {
    duration: 'Продолжительность',
    distance: 'Расстояние',
    speed: 'Скорость',
  },
  [Languages.english]: {
    duration: 'Duration',
    distance: 'Distance',
    speed: 'Speed',
  },
};
