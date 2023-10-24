import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "../services/users";

export const store = configureStore({
    reducer: {
        [usersApi.reducerRath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(usersApi.middleware),
});
// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// import rootReducer from "../reducers";

// const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(thunk)),
// );

// export default store;
