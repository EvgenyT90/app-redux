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
const API_KEY_YANDEX = "85eaff1b-ef9e-4c11-89bc-ca01d1ae43de";

export const weatherApi = createApi({
    reducerPath: "weatherApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://geocode-maps.yandex.ru/1.x",
    }),
    endpoints: (builder) => ({
        getCoor: builder.query({
            query: (geocode) => ({
                url: `?apikey=${API_KEY_YANDEX}&geocode=${geocode}&format=json`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetCoorQuery } = weatherApi;
