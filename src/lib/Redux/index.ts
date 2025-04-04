import {
    type TypedUseSelectorHook,
    useDispatch,
    useSelector,
} from 'react-redux';
import type { store } from './store';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector = <TypedUseSelectorHook<RootState>>useSelector;
