import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNWSPoints } from '../features/nwsFetch/nwsFetchSlice';
import { fetchForecastHourly, select24hours, selectTemps } from '../features/nwsFetch/forecastHourlyFetchSlice';

const ForecastFetch = () => {
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

	//selectors
	const hourly = useSelector(select24hours);
	const tempArray = useSelector(selectTemps);

	//date time format conversion
	const formatTime = (isoTime) => {
		const date = new Date(isoTime);
		const options = {
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
		};

		return date.toLocaleTimeString(undefined, options);
	};

	const lowHigh = (array) => {
		const sort = [...array].sort();
		if (sort.length) {
			return {
				low: sort[0],
				high: sort[sort.length - 1],
			};
		}
	};

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
				<p>
					X:{gridX} Y:{gridY} Id:{gridId}
				</p>
				<br />
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

				<div className="mb-5">
					Low: {low} / High: {high}
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-3">
					{hourly.map((period, index) => (
						<div key={index} className="flex items-center">
							<div className="container mx-auto px-20 mb-5 w-9/10">
								<div className="bg-white rounded-lg shadow-md p-6 h-64 flex flex-col justify-between">
									<div className="w-16 mx-auto relative -mt-10 mb-3">
										<img
											className="-mt-1 rounded-full border-slate-400 border-2"
											src={period.icon}
											alt="weather icon"
										/>
									</div>
									<p className="w-full sm:w-48 block leading-normal text-gray-800 text-md mb-3 text-s text-left mb-0 ">
										Forecast: {period.shortForecast}
									</p>
									<p className="w-full sm:w-48 block leading-normal text-gray-800 text-md mb-3 text-s text-left">
										Chance of Precipitation: {period.probabilityOfPrecipitation.value}% <br />
										Temperature: {period.temperature}°F
									</p>
									<div className="mx-auto relative text-center">
										<p className="text-xs text-gray-400 mr-1 text-center">
											{formatTime(period.startTime)}
										</p>
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

export default ForecastFetch;
