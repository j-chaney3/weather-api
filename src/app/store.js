import { configureStore } from '@reduxjs/toolkit';

import { coordinatesReducer } from '../features/coordinates/coordinatesSlice';
import { NWSReducer } from '../features/nwsFetch/nwsFetchSlice';
import { forecastHourlyReducer } from '../features/nwsFetch/forecastHourlyFetchSlice';
import { forecastDailyReducer } from '../features/nwsFetch/forecastDailyFetchSlice';
import { navCoordinatesReducer } from '../features/coordinates/navCoordinatesSlice';

export const store = configureStore({
	reducer: {
		coordinates: coordinatesReducer,
		NWSPoints: NWSReducer,
		forecastHourly: forecastHourlyReducer,
		forecastDaily: forecastDailyReducer,
		navCoordinates: navCoordinatesReducer,
	},
});
