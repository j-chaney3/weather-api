import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNWSPoints } from '../features/nwsFetch/nwsFetchSlice';
import { fetchForecastDaily } from '../features/nwsFetch/forecastDailyFetchSlice';
import { selectDaily } from '../features/nwsFetch/forecastDailyFetchSlice';

//imported functions
import { formatTime, formatDate } from '../utilities/dateTimeFormat';
import { urlSubstring } from '../utilities/urlSubString';

const DailyForecast = () => {
	const dispatch = useDispatch();
	const { latitude, longitude, errMsg } = useSelector((state) => state.coordinates);
	const { city, state, gridX, gridY, gridId, isLoading } = useSelector((state) => state.NWSPoints);

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
			<div>
				<h1 className="font-bold">
					{city}, {state}
				</h1>
				<h1 className="font-semibold">Daily Forecast</h1>
				<p>Latitude: {latitude}</p>
				<p className="mb-3">Longitude: {longitude}</p>
				{console.log('invalid zip?', errMsg)}
			</div>
			{/* cards */}
			<div className="grid grid-cols-1 gap-3">
				{daily.map((period, index) => (
					<div key={index} className="flex items-center justify-center">
						<div className="container mx-auto px-10 mb-5">
							<div className="bg-white rounded-lg shadow-md p-6 h-auto w-full flex flex-col items-center justify-center ">
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
									<h2 className="font-semibold">{formatDate(period.startTime)}</h2>
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
									<div className="relative text-center text-black-400 text-sm font-semibold justify-items-center m-2">
										<div className="flex items-center">
											<p className="text-md text-left">
												{' '}
												<span className="font-bold">Forecast:</span> {period.shortForecast}.{' '}
												{period.detailedForecast}
											</p>
											<p className="justify-items-center"></p>
										</div>
									</div>

									<div className="text-center text-gray-400 text-xs font-semibold my-3 mx-auto relative">
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

export default DailyForecast;
