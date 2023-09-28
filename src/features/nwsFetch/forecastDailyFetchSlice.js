import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

const email = process.env.REACT_APP_DEV_EMAIL;

export const fetchForecastDaily = createAsyncThunk(`forecastDaily/fetchForecastDaily`, async (url) => {
	const maxTries = 3;
	let tries = 0;
	const retryDelay = 5000;

	while (tries < maxTries) {
		try {
			const userAgent = `https://nws-forecast-8af4a.web.app/, ${email}`;
			const headers = new Headers();

			headers.append('User-Agent', userAgent);
			const response = await fetch(`${url}`, {
				headers: headers,
			});
			if (!response.ok) {
				if (response.status === 500) {
					tries += 1;
					if (tries < maxTries) {
						await new Promise((resolve) => setTimeout(resolve, retryDelay));
					}
					continue;
				} else {
					throw new Error('Network Response not okay');
				}
			}

			const data = await response.json();
			return data.properties;
		} catch (error) {
			throw error;
		}
	}
});

const initialState = {
	isLoading: true,
	updated: '',
	periods: [],
	errMsg: '',
	err: false,
};

export const forecastDailySlice = createSlice({
	name: 'forecastDaily',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchForecastDaily.pending]: (state) => {
			state.loading = true;
			state.err = false;
		},
		[fetchForecastDaily.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.err = false;
			state.errMsg = '';
			state.updated = action.payload.updated;
			state.periods = action.payload.periods;
		},
		[fetchForecastDaily.rejected]: (state, action) => {
			state.isLoading = false;
			state.err = true;
			state.errMsg = action.err ? action.error.errMsg : 'Fetch failed';
		},
	},
});

const selectPeriods = (state) => state.forecastDaily.periods;
export const selectDaily = createSelector([selectPeriods], (periods) => {
	return periods;
});

export const forecastDailyReducer = forecastDailySlice.reducer;
