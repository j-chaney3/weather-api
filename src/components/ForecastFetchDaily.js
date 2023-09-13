import { useEffect, useState } from 'react';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { fetchNWSPoints } from '../features/nwsFetch/nwsFetchSlice';
import { fetchForecastDaily } from '../features/nwsFetch/forecastDailyFetchSlice';
import { selectDaily } from '../features/nwsFetch/forecastDailyFetchSlice';

//imported functions
import { formatTime, formatDate } from '../utilities/dateTimeFormat';

import { urlSubstring } from '../utilities/urlSubString';

const ForecastFetchDaily = () => {
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
			const url = `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast/`;
			console.log('Fetching daily forecast with URL:', url);
			dispatch(fetchForecastDaily(url));
		}
	}, [dispatch, gridX, gridY, gridId]);

	const daily = useSelector(selectDaily);

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

	return (
		<div>
			<h1 className="font-bold">Daily Forecast</h1>
			<h1>
				{city}, {state}
			</h1>
			<p>Latitude: {latitude}</p>
			<p className="mb-3">Longitude: {longitude}</p>
			<div className="grid grid-cols-1 gap-3">
				{daily.map((period, index) => (
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
										{period.name}, {period.temperature}°F
									</h3>
									<div className="text-center text-gray-black text-xs font-semibold">
										<p>
											Precipitation:{' '}
											{period.probabilityOfPrecipitation.value !== null
												? period.probabilityOfPrecipitation.value
												: 0}
											%
										</p>
										<p>Humidity: {period.relativeHumidity.value}%</p>
									</div>
									<div className="text-center text-black-400 text-sm font-semibold justify-items-center m-2">
										<p className="text-md">
											{' '}
											<span className="font-bold">Forecast:</span> {period.shortForecast}.
										</p>
										<p className="justify-items-center">{period.detailedForecast}</p>
									</div>

									<div className="text-center text-gray-400 text-xs font-semibold my-3 mx-auto relative">
										<p className="font-bold text-sm">{formatDate(period.startTime)}</p>
										<p>
											{formatTime(period.startTime)} - {formatTime(period.endTime)}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ForecastFetchDaily;
