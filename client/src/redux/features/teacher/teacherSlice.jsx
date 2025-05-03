import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseURL from "../../../utils/baseURL";

const initialState = {
    work_hours: [],
    etudes: [],
    req_etudes: [],
};

// prettier-ignore
export const get_teacher_work_hours = createAsyncThunk(
    "teacher/work-hours",
    async (user_id, { rejectWithValue }) => {
        try {
            const response = await baseURL().get(`/teacher/work-hours/${user_id}`);
            return response.data.workhours;
        } catch (error) {
            return rejectWithValue(`${error.response.data.message} | ${error.response.status} ${error.response.statusText}`);
        }
    }
);

// prettier-ignore
export const active_etudes = createAsyncThunk(
    "teacher/active-etudes",
    async (teacher_id, { rejectWithValue }) => {
        try {
            const response = await baseURL().get(`/teacher/active-etudes/${teacher_id}`);
            return response.data.etudes;
        } catch (error) {
            return rejectWithValue(`${error.response.data.message} | ${error.response.status} ${error.response.statusText}`);
        }
    }
);

// prettier-ignore
export const request_etudes = createAsyncThunk(
    "teacher/request-etudes",
    async (teacher_id, { rejectWithValue }) => {
        try {
            const response = await baseURL().get(`/teacher/request-etudes/${teacher_id}`);
            return response.data.etudes;
        } catch (error) {
            return rejectWithValue(`${error.response.data.message} | ${error.response.status} ${error.response.statusText}`);
        }
    }
);

// prettier-ignore
export const create_etude = createAsyncThunk(
    "teacher/create-etude",
    async (condition, { rejectWithValue }) => {
        try {
            const response = await baseURL().post(`/teacher/create-etude`, condition);
            return response.data;
        } catch (error) {
            return rejectWithValue(`${error.response.data.message} | ${error.response.status} ${error.response.statusText}`);
        }
    }
);

export const teacherSlice = createSlice({
    name: "teacher",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(get_teacher_work_hours.fulfilled, (state, action) => {
                state.work_hours = action.payload;
            })
            .addCase(active_etudes.fulfilled, (state, action) => {
                state.etudes = action.payload;
            })
            .addCase(request_etudes.fulfilled, (state, action) => {
                state.req_etudes = action.payload;
            })
            .addCase(create_etude.fulfilled, (state, action) => {
                console.log("ok");
            });
    },
});

export default teacherSlice.reducer;
