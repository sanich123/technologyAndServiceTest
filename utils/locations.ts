import moment from 'moment';

import { Activity } from '@/constants/types';
export function normalizeLocations({ activities }: { activities: Activity[] }) {
  return activities
    .filter(({ locations }) => locations?.length > 0)
    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
    .map(({ date, distance, duration, locations, id }) => ({
      id,
      date,
      distance,
      duration,
      locations: {
        start: formatDateFromTimestamp(locations[0]?.timestamp),
        end: formatDateFromTimestamp(locations[locations.length - 1]?.timestamp),
      },
    }));
}

export function formatDistance(meters: number) {
  const kilometres = meters / 1000;
  if (kilometres > 1) {
    return `${kilometres.toFixed(1)} км`.replace('.', ',');
  }
  return `${meters} м`;
}

export function formatDateFromTimestamp(date: number) {
  return new Date(date).toLocaleTimeString('ru').slice(0, -3);
}

export function getFormattedDate(date: string) {
  return new Date(date).toLocaleDateString('ru', { day: 'numeric', month: 'long' });
}

export function formatDuration(duration: number) {
  const formattedDuration = moment.utc(moment.duration(duration, 'ms').asMilliseconds()).format('HH:mm:ss');
  const hours = Number(formattedDuration.slice(0, 2));
  const minutes = Number(formattedDuration.slice(3, 5));
  const seconds = Number(formattedDuration.slice(6));

  return `${hours || ''} ${hours ? 'ч' : ''} ${minutes || ''} ${minutes ? 'мин' : ''} ${!hours && !minutes && seconds ? seconds : ''} ${!hours && !minutes && seconds ? 'с' : ''}`;
}

export function getSpeedInKmHours(milliseconds: number, meters: number) {
  const seconds = milliseconds / 1000;
  const speedInMetersInSecond = meters / seconds;
  const speedInKmHours = speedInMetersInSecond * 3.6;

  return `${speedInKmHours.toFixed(1)} км/ч`;
}
