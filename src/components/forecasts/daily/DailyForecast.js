import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNWSPoints } from '../../../features/nwsFetch/nwsFetchSlice';
import { fetchForecastDaily } from '../../../features/nwsFetch/forecastDailyFetchSlice';
import { selectTemps } from '../../../features/nwsFetch/forecastHourlyFetchSlice';
import { selectDaily } from '../../../features/nwsFetch/forecastDailyFetchSlice';
import DailyWeatherCard from './DailyWeatherCard';
import CurrentWeather from '../current/CurrentWeather';

//imported functions
import { lowHigh } from '../../../utilities/lowHigh';

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
			console.log('Received coordinates:' + cString);
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

	const tempArray = useSelector(selectTemps);
	const { low, high } = lowHigh(tempArray);

	switch (true) {
		case !latitude && !longitude && !err:
			return (
				<div>
					Browser Location data not currently available. Please enter your zipcode to see the current
					forecast.
				</div>
			);
		case err:
			return (
				<div>
					Error fetching forecast: <p className="text-red-600 inline-block font-bold">{errMsg}!</p>
				</div>
			);
		case isLoading || isLoadingForecast:
			return (
				<div>
					<div
						className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-blue-500 motion-reduce:animate-[spin_1.5s_linear_infinite]"
						role="status"
					/>
					<p className="text-black text-s font-semibold">Loading...</p>
				</div>
			);
		case failedLoadingForecast:
			return (
				<div>
					<p>Currently unable to get forecast data, retry soon.</p>
				</div>
			);
		default:
			return (
				<div>
					<CurrentWeather
						city={city}
						state={state}
						zipcode={zipcode}
						updated={updated}
						latitude={latitude}
						longitude={longitude}
						high={high}
						low={low}
					/>
					<div className="grid grid-cols-1 gap-3">
						{daily.map((period, index) => (
							<DailyWeatherCard key={index} period={period} />
						))}
					</div>
				</div>
			);
	}
};

export default DailyForecast;
