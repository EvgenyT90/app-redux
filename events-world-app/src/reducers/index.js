import taskReduces from "./taskReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    tasks: taskReduces,
});

export default rootReducer;
