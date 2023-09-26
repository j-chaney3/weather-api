import { createSlice } from '@reduxjs/toolkit';

// Define your initial state
const initialState = {
	navLat: null,
	navLng: null,
	isLoading: false,
	error: null,
};

// Create a Redux slice
const navCoordinatesSlice = createSlice({
	name: 'navCoordinates',
	initialState,
	reducers: {
		setNavCoordinates: (state, action) => {
			state.navLat = action.payload.navLat;
			state.navLng = action.payload.navLng;
		},
	},
});

export const { setNavCoordinates } = navCoordinatesSlice.actions;
export const navCoordinatesReducer = navCoordinatesSlice.reducer;

// Use this action to set navLat and navLng in the Redux store
export const setNavCoordinatesAsync = () => (dispatch) => {
	navigator.geolocation.getCurrentPosition(function (position) {
		const getNavLat = position.coords.latitude;
		const getNavLng = position.coords.longitude;

		// Dispatch the action to update the Redux store
		dispatch(setNavCoordinates({ navLat: getNavLat, navLng: getNavLng }));
	});
};
