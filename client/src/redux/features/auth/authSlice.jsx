import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseURL from "../../../utils/baseURL";

const initialState = {
    username: null,
    type: null,
    session: false,
    message: null,
};

export const login = createAsyncThunk(
    "auth/login",
    async (condition, { rejectWithValue }) => {
        try {
            const response = await baseURL().post("/login", condition);
            return response.data.user[0];
        } catch (error) {
            return rejectWithValue(
                error.response.data.message +
                    " | " +
                    error.response.status +
                    " " +
                    error.response.statusText
            );
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        is_session: (state) => {
            state.username = localStorage.getItem("username");
            state.type = localStorage.getItem("type");
            if (state.username && state.type) {
                state.session = true;
                state.message = null;
            }
        },
        logout: (state) => {
            state.username = null;
            state.type = null;
            state.session = false;
            state.message = null;
            localStorage.removeItem("username");
            localStorage.removeItem("type");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.username = action?.payload.username;
                state.type = action?.payload.type;
                state.session = true;
                state.message = "Giriş Başarılı!";
                localStorage.setItem("username", action?.payload.username);
                localStorage.setItem("type", action?.payload.type);
            })
            .addCase(login.rejected, (state, action) => {
                state.session = false;
                state.message = action.payload;
            });
    },
});

export const { is_session, logout } = authSlice.actions;
export default authSlice.reducer;
