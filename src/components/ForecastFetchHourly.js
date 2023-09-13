import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNWSPoints } from '../features/nwsFetch/nwsFetchSlice';
import { fetchForecastHourly, select24hours, selectTemps } from '../features/nwsFetch/forecastHourlyFetchSlice';

//imported functions
import { lowHigh } from '../utilities/lowHigh';
import { formatTime } from '../utilities/dateTimeFormat';
import { urlSubstring } from '../utilities/urlSubString';

const ForecastFetchHourly = () => {
	const [forecastType, setForecastType] = useState('hourly');
	const dispatch = useDispatch();
	const { latitude, longitude } = useSelector((state) => state.coordinates);
	const { city, state, gridX, gridY, gridId, isLoading, errMsg } = useSelector((state) => state.NWSPoints);

	useEffect(() => {
		if (latitude && longitude) {
			const cString = latitude.toFixed(4) + ',' + longitude.toFixed(4);
			console.log('Truncated:' + cString);
			dispatch(fetchNWSPoints(cString));
		}
	}, [dispatch, latitude, longitude]);

	useEffect(() => {
		if (gridX && gridY && gridId) {
			const url = `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast/hourly`;
			console.log('Fetching hourly forecast with URL:', url);
			dispatch(fetchForecastHourly(url));
		}
	}, [dispatch, gridX, gridY, gridId]);

	const hourly = useSelector(select24hours);
	const tempArray = useSelector(selectTemps);

	if (!latitude && !longitude) {
		return <div>Please enter your zipcode to see the current forecast.</div>;
	} else if (errMsg) {
		return <div>Error fetching forecast: {errMsg}</div>;
	} else if (isLoading) {
		return (
			<div>
				<h1>Loading....</h1>
			</div>
		);
	}

	if (forecastType === 'hourly' && !isLoading) {
		const { low, high } = lowHigh(tempArray);

		return (
			<div>
				<h1>
					{city}, {state}
				</h1>
				<p>Latitude: {latitude}</p>
				<p>Longitude: {longitude}</p>

				<br />

				<div className="mb-5">
					Low: {low} °F / High: {high} °F
				</div>
				<div className="grid grid-cols-1 gap-3">
					{hourly.map((period, index) => (
						<div key={index} className="flex items-center">
							<div className="container mx-auto px-10 mb-5">
								<div className="bg-white rounded-lg shadow-md p-6 h-auto w-full flex flex-col justify-between">
									<div className="photo-wrapper p-2 w-a mx-auto relative mt-10 mb-3">
										<img
											className="w-225 h-225 rounded-full mx-auto"
											src={urlSubstring(period.icon)}
											alt="forecast icon"
										/>
									</div>
									<div className="p-2">
										<h3 className="text-center text-xl text-gray-900 font-medium leading-8">
											{period.temperature}°F
										</h3>
										<div className="text-center text-gray-black text-xs font-semibold">
											<p>Precipitation: {period.probabilityOfPrecipitation.value}%</p>
										</div>
										<div className="text-center text-black-400 text-xs font-semibold">
											<p>Forecast: {period.shortForecast}</p>
										</div>

										<div className="text-center text-gray-400 text-xs font-semibold my-3 mx-auto relative">
											<p>{formatTime(period.startTime)}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<h1>Daily Forecast</h1>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1 my-4"
					onClick={() => {
						setForecastType('hourly');
					}}
				>
					Hourly
				</button>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  my-4"
					onClick={() => {
						setForecastType('daily');
					}}
				>
					Daily
				</button>
			</div>
		);
	}
};

export default ForecastFetchHourly;