import { configureStore } from '@reduxjs/toolkit';

import { coordinatesReducer } from '../features/coordinates/coordinatesSlice';

export const store = configureStore({
	reducer: {
		coordinates: coordinatesReducer,
	},
});
