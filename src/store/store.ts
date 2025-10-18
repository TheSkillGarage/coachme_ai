import { configureStore, type ThunkAction, type Action } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer: {
        // Add your reducers here
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;