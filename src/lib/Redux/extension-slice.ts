import {
    type PayloadAction,
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import type { Tab } from '../../components/tabs';

export type ExtensionsData = {
    logo: string;
    name: string;
    description: string;
    isActive: boolean;
};

const initialState = {
    data: [] as Array<ExtensionsData>,
    error: '' as unknown,
    loading: false,
    selectedTab: 'All' as Tab,
};

type FetchExtensionsResult = {
    data: Array<ExtensionsData>;
    error: string;
};

type FetchExtensionsError = {
    data: Array<ExtensionsData>;
    error: unknown;
};

export const fetchExtensions = createAsyncThunk<
    FetchExtensionsResult, // Success return type
    { uri: string }, // Argument type (none in this case)
    {
        // ThunkAPI configuration
        rejectValue: FetchExtensionsError;
    }
>('extensions/fetch', async ({ uri }, thunkApi) => {
    try {
        const response = await fetch(uri);
        const data = (await response.json()) as Array<ExtensionsData>;
        return {
            data,
            error: '',
        };
    } catch (error) {
        console.error('error while fetching the extensions: ', error);
        return thunkApi.rejectWithValue({
            data: [] as Array<ExtensionsData>,
            error: error ?? '',
        });
    }
});

const extensionsSlice = createSlice({
    name: 'extensions',
    initialState,
    reducers: {
        // setExtensionsData: (
        //     state,
        //     action: PayloadAction<Array<ExtensionsData>>,
        // ) => {
        //     state.data = action.payload;
        // },
        markActiveStatus: (
            state,
            action: PayloadAction<Pick<ExtensionsData, 'name' | 'isActive'>>,
        ) => {
            state.data = state.data.map(_ext => {
                if (_ext.name === action.payload.name) {
                    _ext.isActive = action.payload.isActive;
                }
                return _ext;
            });
        },
        remove: (state, action: PayloadAction<ExtensionsData['name']>) => {
            state.data = state.data.filter(
                _ext => _ext.name !== action.payload,
            );
        },
        setSelectedTab: (state, action: PayloadAction<Tab>) => {
            state.selectedTab = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchExtensions.pending, state => {
            state.loading = true;
        });
        builder.addCase(fetchExtensions.fulfilled, (state, action) => {
            state.data = action.payload.data;
            state.loading = false;
        });
        builder.addCase(fetchExtensions.rejected, (state, action) => {
            state.error = action.payload?.error ?? '';
            state.loading = false;
        });
    },
});

export const {
    markActiveStatus,
    remove,
    // setExtensionsData,
    setSelectedTab,
} = extensionsSlice.actions;

export default extensionsSlice.reducer;
