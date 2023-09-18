import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//const API_KEY = process.env.REACT_APP_GMAP_API;

export const fetchCoordinates = createAsyncThunk('coordinates/fetchCoordinates', async (zipcode) => {
	try {
		const response = await fetch(
			//`https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${API_KEY}`
			`http://localhost:3000/geocode/:${zipcode}`
		);
		if (!response.ok) {
			throw new Error('Unable to fetch Latitude/Longitude');
		}
		const data = await response.json();
		//return data.results[0].geometry.location;
		return data;
	} catch (error) {
		throw error;
	}
});

const initialState = {
	latitude: null,
	longitude: null,
	isLoading: true,
	errMsg: '',
};

export const coordinatesSlice = createSlice({
	name: 'coordinates',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchCoordinates.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchCoordinates.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.errMsg = '';
			state.latitude = action.payload.lat;
			state.longitude = action.payload.lng;
		},
		[fetchCoordinates.rejected]: (state, action) => {
			state.isLoading = false;
			state.errMsg = action.error ? action.error.message : 'Fetch failed';
		},
	},
});

export const { setCoordinates } = coordinatesSlice.actions;
export const coordinatesReducer = coordinatesSlice.reducer;
