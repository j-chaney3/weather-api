import { configureStore } from '@reduxjs/toolkit';

import { coordinatesReducer } from '../features/coordinates/coordinatesSlice';
import { NWSReducer } from '../features/nwsFetch/nwsFetchSlice';

export const store = configureStore({
	reducer: {
		coordinates: coordinatesReducer,
		NWSPoints: NWSReducer,
	},
});
