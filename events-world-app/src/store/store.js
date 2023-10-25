import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { weatherApi } from "../services/api-weather";
import { airQualityApi } from "../services/apiAirQuality";

export const store = configureStore({
    reducer: {
        [weatherApi.reducerPath]: weatherApi.reducer,
        [airQualityApi.reducerPath]: airQualityApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(weatherApi.middleware)
            .concat(airQualityApi.middleware),
});

setupListeners(store.dispatch);

// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// import rootReducer from "../reducers";

// const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(thunk)),
// );

// export default store;
