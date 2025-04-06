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
            localStorage.setItem("username", response.data.user[0].username);
            localStorage.setItem("type", response.data.type);
            return response.data;
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
            state.session = true;
            state.message = null;
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
                state.username = action?.payload.user[0].username;
                state.type = action.payload.type;
                state.session = true;
                state.message = "Giriş Başarılı!";
            })
            .addCase(login.rejected, (state, action) => {
                state.session = false;
                state.message = action.payload;
            });
    },
});

export const { is_session, logout } = authSlice.actions;
export default authSlice.reducer;
