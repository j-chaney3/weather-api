import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCoordinates = createAsyncThunk('coordinates/fetchCoordinates', async (zipcode) => {
	try {
		const response = await fetch(`http://localhost:3000/geocode/:${zipcode}`);
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
			state.errMsg = action.payload?.status === 400 ? 'Invalid Zipcode' : 'Invalid Zipcode';
		},
	},
});

export const { setCoordinates } = coordinatesSlice.actions;
export const coordinatesReducer = coordinatesSlice.reducer;
