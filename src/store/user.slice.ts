import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
    name: string;
    email: string;
    token: string;
    role: string;
    loggedInAt: string;
}

interface UserState {
    currentUser: User | null;
}

const getStoredUser = (): User | null => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
};

const initialState: UserState = {
    currentUser: getStoredUser(),
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        loadUserFromStorage: (state) => {
            const stored = getStoredUser();
            if (stored) {
                state.currentUser = stored;
            }
        },
        logout: (state) => {
            state.currentUser = null;
            localStorage.removeItem("user");
        },
    },
});

export const { setUser, logout, loadUserFromStorage } = userSlice.actions;
export default userSlice.reducer;
