import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNWSPoints } from '../features/nwsFetch/nwsFetchSlice';
import { fetchForecastDaily } from '../features/nwsFetch/forecastDailyFetchSlice';
import { selectDaily } from '../features/nwsFetch/forecastDailyFetchSlice';
import { isFirefox } from 'react-device-detect';

//imported functions
import { formatTime, formatDate } from '../utilities/dateTimeFormat';
import { urlSubstring } from '../utilities/urlSubString';
import { humidity } from '../utilities/humidity';

const DailyForecast = () => {
	const dispatch = useDispatch();
	const { latitude, longitude, errMsg, err, zipcode } = useSelector((state) => state.coordinates);
	const { city, state, gridX, gridY, gridId, isLoading } = useSelector((state) => state.NWSPoints);
	const { updated } = useSelector((state) => state.forecastDaily);
	const [isLoadingForecast, setLoadingForecast] = useState(true);
	const [failedLoadingForecast, setFailedLoadingForecast] = useState(false);

	useEffect(() => {
		if (latitude && longitude) {
			const cString = latitude.toFixed(4) + ',' + longitude.toFixed(4);
			console.log('Truncated zipcode coordinates:' + cString);
			dispatch(fetchNWSPoints(cString));
		}
	}, [dispatch, latitude, longitude]);

	useEffect(() => {
		if (gridX && gridY && gridId && city) {
			const url = `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast/`;
			console.log(`Fetching daily forecast for ${city} with URL: ${url}`);
			dispatch(fetchForecastDaily(url))
				.then(() => {
					setLoadingForecast(false);
					console.log('forecast daily loaded.');
				})
				.catch((error) => {
					setFailedLoadingForecast(true);
					console.error('Error fetching forecast:', error);
				});
		}
	}, [dispatch, gridX, gridY, gridId, city]);

	const daily = useSelector(selectDaily);

	if (!latitude && !longitude && !err) {
		if (!isFirefox) {
			return <div>Please enter your zipcode to see the current forecast.</div>;
		} else {
			return (
				<div>
					Browser Location data not currently available. Please enter your zipcode to see current forecast.
				</div>
			);
		}
	} else if (err) {
		return (
			<div>
				Error fetching forecast: <p className="text-red-600 inline-block font-bold">{errMsg}! </p>
			</div>
		);
	} else if (isLoading || isLoadingForecast) {
		return (
			<div>
				<div
					className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-blue-500 motion-reduce:animate-[spin_1.5s_linear_infinite]"
					role="status"
				/>
				<p className="text-black text-s font-semibold">Loading...</p>
			</div>
		);
	} else if (failedLoadingForecast) {
		return (
			<div>
				<p>Currently unable to get forecast data, retry soon.</p>
			</div>
		);
	} else {
		return (
			<div>
				<div>
					<h1 className="font-bold">
						{city}, {state} {zipcode ? ` - ${zipcode}` : ''}
					</h1>
					<h2 className="font-semibold">
						Updated at: {formatDate(updated)}, {formatTime(updated)}
					</h2>
					<p>Latitude: {latitude || 'N/A'}</p>
					<p className="mb-3">Longitude: {longitude || 'N/A'}</p>
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
											{period.name}, {formatDate(period.startTime)}
										</h3>
										<h2 className="font-semibold">{period.temperature}°F</h2>
										<div className="text-center text-gray-black text-xs font-semibold">
											<p>
												Precipitation:{' '}
												{period.probabilityOfPrecipitation.value !== null
													? period.probabilityOfPrecipitation.value
													: 0}
												%
											</p>
											<p>{humidity(period.temperature, period.dewpoint.value)}</p>
										</div>
										<div className="relative text-center text-black-400 text-sm font-semibold justify-items-center m-2">
											<div className="flex items-center">
												<p className="text-md text-left">
													{' '}
													<span className="font-bold">Forecast:</span>
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
	}
};

export default DailyForecast;
