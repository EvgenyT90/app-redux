// import { METRIC } from "../data/metrics";

// export const ServiceWeather = (
//     place: string,
//     date: { startDate: string; endDate: string },
//     metric: METRIC,
// ) => {
//     // API Yandex

//     return [{ date: "12.12.2023", temp: "30" }, {}, {}];
// };

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const airQualityApi = createApi({
    reducerPath: "airQualityApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://air-quality-api.open-meteo.com/v1/air-quality",
    }),
    endpoints: (builder) => ({
        getQuality: builder.query({
            query: (coordinates) => ({
                url: `?latitude=${coordinates[0]}&longitude=${coordinates[1]}&hourly=pm10,pm2_5`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetQualityQuery } = airQualityApi;
