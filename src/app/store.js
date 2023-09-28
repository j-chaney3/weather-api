import { configureStore } from '@reduxjs/toolkit';

import { coordinatesReducer } from '../features/coordinates/coordinatesSlice';
import { NWSReducer } from '../features/nwsFetch/nwsFetchSlice';
import { forecastHourlyReducer } from '../features/nwsFetch/forecastHourlyFetchSlice';
import { forecastDailyReducer } from '../features/nwsFetch/forecastDailyFetchSlice';

export const store = configureStore({
	reducer: {
		coordinates: coordinatesReducer,
		NWSPoints: NWSReducer,
		forecastHourly: forecastHourlyReducer,
		forecastDaily: forecastDailyReducer,
	},
});
