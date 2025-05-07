import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseURL from "../../../utils/baseURL";

const initialState = {
    work_hours: [],
    etudes: [],
    req_etudes: [],
    notices: [],
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

// prettier-ignore
export const update_request_etude = createAsyncThunk(
    "teacher/update-request-etude",
    async (condition, { rejectWithValue }) => {
        try {
            const response = await baseURL().post(`/teacher/update-request-etude`, condition);
            return response.data.etude;
        } catch (error) {
            return rejectWithValue(`${error.response.data.message} | ${error.response.status} ${error.response.statusText}`);
        }
    }
);

// prettier-ignore
export const create_notice = createAsyncThunk(
    "teacher/create-notice",
    async (condition, { rejectWithValue }) => {
        try {
            const response = await baseURL().post(`/teacher/create-notice`, condition);
            return response.data;
        } catch (error) {
            return rejectWithValue(`${error.response.data.message} | ${error.response.status} ${error.response.statusText}`);
        }
    }
);

// prettier-ignore
export const get_notices = createAsyncThunk(
    "teacher/get-notices",
    async (etude_id, { rejectWithValue }) => {
        try {
            const response = await baseURL().get(`/teacher/get-notices/${etude_id}`);
            return response.data.notices;
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
                console.log(action.payload.message);
            })
            .addCase(update_request_etude.fulfilled, (state, action) => {
                // Etüt İsteklerinden Çıkarıldı.
                state.req_etudes = state.req_etudes.filter(
                    (etude) => etude.etude_id !== action.payload.id
                );
                // Aktif Etütlere Eklendi.
                state.etudes = [...state.etudes, action.payload];
            })
            .addCase(create_notice.fulfilled, (state, action) => {
                console.log(action.payload.message);
            })
            .addCase(get_notices.fulfilled, (state, action) => {
                console.log(action.payload);
                state.notices = action.payload;
            });
    },
});

export default teacherSlice.reducer;
