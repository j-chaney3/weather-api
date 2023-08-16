import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const email = process.env.REACT_APP_DEV_EMAIL;

export const fetchNWSPoints = createAsyncThunk('NWSPoints, fetchNWSPoints', async (coords) => {
	try {
		const userAgent = `NWS Portfolio Project, ${email}`;
		const headers = new Headers();

		headers.append('User-Agent', userAgent);
		const response = await fetch(`https://api.weather.gov/points/${coords}`, {
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

			console.log(`Forecast Info: \n
                        gridID: ${state.gridId} \n
                        gridX: ${state.gridX} \n
                        gridY: ${state.gridY} \n 
                        forecast: ${state.forecast} \n
                        forecast hourly: ${state.forecastHourly} \n
                        city: ${state.city} \n
                        state: ${state.state}`);
		},
		[fetchNWSPoints.rejected]: (state, action) => {
			state.isLoading = false;
			state.errMsg = action.error ? action.error.message : 'Fetch failed';
		},
	},
});

export const { setPoints } = NWSSlice.actions;
export const NWSReducer = NWSSlice.reducer;
