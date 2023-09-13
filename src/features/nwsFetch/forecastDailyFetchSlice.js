import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const email = process.env.REACT_APP_DEV_EMAIL;

export const fetchForecastDaily = createAsyncThunk(`forecastDaily/fetchForecastDaily`, async (url) => {
	try {
		const userAgent = `NWS Portfolio Project, ${email}`;
		const headers = new Headers();

		headers.append('User-Agent', userAgent);
		const response = await fetch(`${url}`, {
			headers: headers,
		});
		if (!response.ok) {
			throw new Error(`Network response not okay`);
		}

		const data = await response.json();
		return data.properties;
	} catch (error) {
		throw error;
	}
});

const initialState = {
	isLoading: true,
	updated: '',
	periods: [],
	errMsg: '',
};

export const forecastDailySlice = createSlice({
	name: 'forecastDaily',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchForecastDaily.pending]: (state) => {
			state.loading = true;
		},
		[fetchForecastDaily.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.errMsg = '';
			state.updated = action.payload.updated;
			state.periods = action.payload.periods;
		},
		[fetchForecastDaily.rejected]: (state, action) => {
			state.isLoading = false;
			state.errMsg = action.err ? action.error.errMsg : 'Fetch failed';
		},
	},
});

export const forecastDailyReducer = forecastDailySlice.reducer;
