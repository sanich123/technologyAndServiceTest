import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const trackingApi = createApi({
  reducerPath: 'trackingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://runich-backend-production.up.railway.app',
    timeout: 20000,
  }),

  endpoints: (builder) => ({
    getActivitiesByUserId: builder.query({
      query: ({ id, page, take }: { id: string; page: number; take: number }) =>
        `/activity/${id}?page=${page}&take=${take}`,
    }),

    getActivityByActivityId: builder.query({
      query: (id: string) => `/activity/activityId/${id}`,
    }),
    getLocationsByActivityId: builder.query({
      query: (activityId: string) => `/activity/${activityId}/locations`,
    }),
  }),
});

export const { useGetActivitiesByUserIdQuery, useGetActivityByActivityIdQuery, useGetLocationsByActivityIdQuery } =
  trackingApi;
