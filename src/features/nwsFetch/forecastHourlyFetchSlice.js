import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const email = process.env.REACT_APP_DEV_EMAIL;

export const fetchForecastHourly = createAsyncThunk('forecastHourly/fetchForecastHourly', async (url) => {
	try {
		const userAgent = `NWS Portfolio Project, ${email}`;
		const headers = new Headers();

		headers.append('User-Agent', userAgent);
		const response = await fetch(`${url}`, {
			headers: headers,
		});

		if (!response.ok) {
			throw new Error('Network Response not okay');
		}
		const data = await response.json();
		return data.properties;
	} catch (error) {
		throw error;
	}
});

const initialState = {
	updated: '',
	periods: [],
};

export const forecastHourlySlice = createSlice({
	name: 'forecastHourly',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchForecastHourly.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchForecastHourly.fulfilled]: (state, action) => {
			state.loading = false;
			state.errMsg = '';
			state.updated = action.payload.updated;
			state.periods = action.payload.periods;
		},
		[fetchForecastHourly.rejected]: (state, action) => {
			state.isLoading = false;
			state.errMsg = action.err ? action.error.message : 'Fetch Failed';
		},
	},
});

export const select24hours = (state) => {
	return state.forecastHourly.periods.slice(0, 24);
};

export const { setGridPoints } = forecastHourlySlice.actions;
export const forecastHourlyReducer = forecastHourlySlice.reducer;
