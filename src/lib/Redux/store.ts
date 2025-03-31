import { configureStore } from '@reduxjs/toolkit';
import extensionsReducer from './extension-slice';

export const store = configureStore({
    reducer: {
        extensions: extensionsReducer,
    },
});
