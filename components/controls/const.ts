import { Languages } from '@/constants/enums';

export const enum RenderType {
  list = 'list',
  map = 'map',
}

export const BTNS_TITLES = [
  {
    key: RenderType.list,
    title: {
      [Languages.english]: {
        value: 'List',
      },
      [Languages.russian]: {
        value: 'Список',
      },
    },
  },
  {
    key: RenderType.map,
    title: {
      [Languages.english]: {
        value: 'Map',
      },
      [Languages.russian]: {
        value: 'Карта',
      },
    },
  },
];
