import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import teacherReducer from "../features/teacher/teacherSlice";
import studentReducer from "../features/student/studentSlice";

const appReducer = combineReducers({
    auth: authReducer,
    teacher: teacherReducer,
    student: studentReducer,
});

const rootReducer = (state, action) => {
    if (action.type === "auth/logout") {
        state = undefined; // tüm store sıfırlanır
    }
    return appReducer(state, action);
};

export default rootReducer;
