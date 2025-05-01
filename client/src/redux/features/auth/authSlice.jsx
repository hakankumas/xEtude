import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseURL from "../../../utils/baseURL";

const initialState = {
    user_id: null,
    username: null,
    type: null,
    class_number: null,
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
            state.user_id = localStorage.getItem("user_id");
            state.username = localStorage.getItem("username");
            state.type = localStorage.getItem("type");
            if (state.type == "3") {
                state.class_number = localStorage.getItem("class_number");
            }
            if (state.user_id && state.username && state.type) {
                state.session = true;
                state.message = null;
            }
        },
        logout: (state) => {
            state.user_id = null;
            state.username = null;
            state.session = false;
            state.message = null;
            state.class_number = null;
            state.type = null;
            localStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user_id = action?.payload.id;
                state.username = action?.payload.username;
                state.type = action?.payload.type;
                state.session = true;
                state.message = "Giriş Başarılı!";
                localStorage.setItem("user_id", action?.payload.id);
                localStorage.setItem("username", action?.payload.username);
                localStorage.setItem("type", action?.payload.type);
                if (action?.payload.type == "3") {
                    state.class_number = action?.payload.class_number;
                    localStorage.setItem(
                        "class_number",
                        action?.payload.class_number
                    );
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.session = false;
                state.message = action.payload;
            });
    },
});

export const { is_session, logout } = authSlice.actions;
export default authSlice.reducer;
