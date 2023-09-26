import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const email = process.env.REACT_APP_DEV_EMAIL;

export const fetchNWSPoints = createAsyncThunk('NWSPoints/fetchNWSPoints', async (coords) => {
	const maxTries = 3;
	let tries = 0;
	const retryDelay = 3000;

	while (tries < maxTries) {
		try {
			const userAgent = `NWS Portfolio Project, ${email}`;
			const headers = new Headers();

			headers.append('User-Agent', userAgent);
			const response = await fetch(`https://api.weather.gov/points/${coords}`, {
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
	gridId: null,
	gridX: null,
	gridY: null,
	forecast: '',
	forecastHourly: '',
	city: '',
	state: '',
};

export const NWSSlice = createSlice({
	name: 'NWSPoints',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchNWSPoints.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchNWSPoints.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.errMsg = '';
			state.gridId = action.payload.gridId;
			state.gridX = action.payload.gridX;
			state.gridY = action.payload.gridY;
			state.forecast = action.payload.forecast;
			state.forecastHourly = action.payload.forecastHourly;
			state.city = action.payload.relativeLocation.properties.city;
			state.state = action.payload.relativeLocation.properties.state;
		},
		[fetchNWSPoints.rejected]: (state, action) => {
			state.isLoading = false;
			state.errMsg = action.error ? action.error.message : 'Fetch failed';
		},
	},
});

export const { setPoints } = NWSSlice.actions;
export const NWSReducer = NWSSlice.reducer;
