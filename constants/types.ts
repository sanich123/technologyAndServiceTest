import { LocationObject } from 'expo-location';

import { RoutePointValues } from './enums';

export type User = {
  name: string;
  surname: string;
  middleName: string;
  position: string;
  phone: string;
  lastSeen: {
    latitude: number;
    longitude: number;
  };
  id: string;
};

export interface Activity {
  id: string;
  date: string;
  distance: number;
  duration: number;
  locations: LocationObject[];
}

export interface ActivityListItemProps {
  date: string;
  id: string;
  start: string;
  end: string;
  distance: number;
}

export interface RoutePointProps {
  value: RoutePointValues;
  longitude: number;
  latitude: number;
}
