import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCoordinates = createAsyncThunk('coordinates/fetchCoordinates', async (zipcode) => {
	try {
		const response = await fetch(
			`https://us-central1-nucampfunctions-392201.cloudfunctions.net/first-function/geocode/:${zipcode}`
		);

		if (!response.ok) {
			throw new Error('Invalid Zipcode');
		}
		const data = await response.json();

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
	err: false,
	zipcode: '',
};

export const coordinatesSlice = createSlice({
	name: 'coordinates',
	initialState,
	reducers: {
		updateGeolocationCoordinates: (state, action) => {
			state.latitude = action.payload.latitude;
			state.longitude = action.payload.longitude;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCoordinates.pending, (state) => {
				state.err = false;
				state.isLoading = true;
			})
			.addCase(fetchCoordinates.fulfilled, (state, action) => {
				state.isLoading = false;
				state.err = false;
				state.errMsg = '';
				state.latitude = action.payload.lat;
				state.longitude = action.payload.lng;
				state.zipcode = action.meta.arg;
			})
			.addCase(fetchCoordinates.rejected, (state, action) => {
				state.err = true;
				state.isLoading = false;
				state.errMsg =
					action.payload?.status === 400 ? 'An error occurred, try again later.' : 'Invalid Zipcode';
			});
	},
});

export const { setCoordinates, updateGeolocationCoordinates } = coordinatesSlice.actions;
export const coordinatesReducer = coordinatesSlice.reducer;
