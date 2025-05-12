import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseURL from "../../../utils/baseURL";

const initialState = {
    etudes: [],
    mine_etudes: [],
    mine_notices: [],
};

// prettier-ignore
export const active_etudes = createAsyncThunk(
    "student/active-etudes",
    async (etude_class, { rejectWithValue }) => {
        try {
            const response = await baseURL().get(`/student/active-etudes/${etude_class}`);
            return response.data.etudes;
        } catch (error) {
            return rejectWithValue(error.response.data?.message + " | " + error.response.status + " " + error.response.statusText);
        }
    }
);

// prettier-ignore
export const my_etudes = createAsyncThunk(
    "student/my-etudes",
    async (student_id, { rejectWithValue }) => {
        try {
            const response = await baseURL().get(`/student/my-etudes/${student_id}`);
            return response.data.etudes;
        } catch (error) {
            return rejectWithValue(error.response.data?.message + " | " + error.response.status + " " + error.response.statusText);
        }
    }
);

// prettier-ignore
export const enroll_etude = createAsyncThunk(
    "student/enroll-etude",
    async (condition, { rejectWithValue }) => {
        try {
            const response = await baseURL().post(`/student/enroll-etude`, condition);
            return response.data.newData;
        } catch (error) {
            return rejectWithValue(error.response.data?.message + " | " + error.response.status + " " + error.response.statusText);
        }
    }
);

// prettier-ignore
export const release_etude = createAsyncThunk(
    "student/release-etude",
    async (condition, { rejectWithValue }) => {
        try {
            const response = await baseURL().post(`/student/release-etude`, condition);
            return response.data.releaseData;
        } catch (error) {
            return rejectWithValue(error.response.data?.message + " | " + error.response.status + " " + error.response.statusText);
        }
    }
);

// prettier-ignore
export const create_request_etude = createAsyncThunk(
    "student/create-request-etude",
    async (condition, { rejectWithValue }) => {
        try {
            const response = await baseURL().post(`/student/create-request-etude`, condition);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data?.message + " | " + error.response.status + " " + error.response.statusText);
        }
    }
);

// prettier-ignore
export const get_notices = createAsyncThunk(
    "student/get-notices",
    async (student_id, { rejectWithValue }) => {
        try {
            const response = await baseURL().get(`/student/get-notices/${student_id}`);
            return response.data.notices;
        } catch (error) {
            return rejectWithValue(error.response.data?.message + " | " + error.response.status + " " + error.response.statusText);
        }
    }
);

export const studentSlice = createSlice({
    name: "student",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(active_etudes.fulfilled, (state, action) => {
                state.etudes = action.payload;
            })
            .addCase(my_etudes.fulfilled, (state, action) => {
                state.mine_etudes = state.etudes.filter((etude) =>
                    action.payload.some((e) => e.etude_id === etude.etude_id)
                );
            })
            .addCase(enroll_etude.fulfilled, (state, action) => {
                const new_etude = state.etudes.find(
                    (etude) => etude.etude_id === action.payload.etude_id
                );
                if (new_etude) {
                    state.mine_etudes = [...state.mine_etudes, new_etude];
                }
            })
            .addCase(release_etude.fulfilled, (state, action) => {
                state.mine_etudes = state.mine_etudes.filter(
                    (etude) => etude.etude_id !== action.payload.etude_id
                );
            })
            .addCase(create_request_etude.fulfilled, (state, action) => {
                console.log(action.payload.message);
            })
            .addCase(get_notices.fulfilled, (state, action) => {
                state.mine_notices = action.payload;
            });
    },
});

export default studentSlice.reducer;
