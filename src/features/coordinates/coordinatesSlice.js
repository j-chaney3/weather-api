import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = process.env.REACT_APP_GMAP_API;
//const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${API_KEY}`;

export const fetchCoordinates = createAsyncThunk('coordinates/fetchCoordinates', async (zipcode) => {
	const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${API_KEY}`);
	if (!response.ok) {
		return Promise.reject('Unable to fetch Latitude/Longitude: ' + response.status);
	}
	const data = await response.json();
	return data;
});

export const coordinatesSlice = createSlice({
	name: 'coordinates',
	initialState: {
		latitude: '',
		longitude: '',
	},
});

export const { setCoordinates } = coordinatesSlice.actions;
export const coordinatesReducer = coordinatesSlice.reducer;
