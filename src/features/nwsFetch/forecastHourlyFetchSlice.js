import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

const email = process.env.REACT_APP_DEV_EMAIL;

export const fetchForecastHourly = createAsyncThunk('forecastHourly/fetchForecastHourly', async (url) => {
	const maxTries = 3;
	let tries = 0;
	const retryDelay = 3000;

	while (tries < maxTries) {
		try {
			const userAgent = `NWS Portfolio Project, ${email}`;
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
					throw new Error(`Network Response not okay, retrying in ${retryDelay / 1000} seconds...`);
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
	temps: [],
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
			state.isLoading = false;
			state.errMsg = '';
			state.updated = action.payload.updated;
			state.periods = action.payload.periods;
			state.temps = action.payload.periods.temperature;
		},
		[fetchForecastHourly.rejected]: (state, action) => {
			state.isLoading = false;
			state.err = true;
			state.errMsg = action.err ? action.error.message : 'Fetch Failed';
		},
	},
});

const selectPeriods = (state) => state.forecastHourly.periods;

export const select24hours = createSelector([selectPeriods], (periods) => periods.slice(0, 24));
export const selectTemps = createSelector([selectPeriods], (periods) =>
	periods.slice(0, 24).map((period) => period.temperature)
);

export const { setGridPoints } = forecastHourlySlice.actions;
export const forecastHourlyReducer = forecastHourlySlice.reducer;
