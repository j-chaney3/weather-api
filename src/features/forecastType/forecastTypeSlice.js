import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	forecastType: 'hourly',
};

export const setForecastTypeSlice = createSlice({
	name: 'setForecastType',
	initialState,
	reducers: {
		setHourlyForecast: (state) => {
			state.forecastType = 'hourly';
		},
		setDailyForecast: (state) => {
			state.forecastType = 'daily';
		},
	},
});

export const { setHourlyForecast, setDailyForecast } = setForecastTypeSlice.actions;
export const setForecastTypeReducer = setForecastTypeSlice.reducer;
