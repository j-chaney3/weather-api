import { formatDate, formatTime } from '../../../utilities/dateTimeFormat';
import { selectCurrent } from '../../../features/nwsFetch/forecastHourlyFetchSlice';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const CurrentWeather = ({ city, state, zipcode, updated, latitude, longitude, high, low }) => {
	const current = useSelector(selectCurrent);
	const { forecastType } = useSelector((state) => state.setForecastType);

	let selectedForecast;
	switch (forecastType) {
		case 'hourly':
			selectedForecast = 'Hourly Forecast';
			break;
		case 'daily':
			selectedForecast = 'Daily Forecast';
			break;
		default:
			selectedForecast = '';
			break;
	}

	//ensure current data fetched successfully before return
	if (current !== undefined) {
		return (
			<div>
				<h1 className="font-bold">
					{city}, {state} | {selectedForecast}
				</h1>
				<div className="inline-block">
					<p className="italic text-sm">
						Updated at: {formatDate(updated)}, {formatTime(updated)}
					</p>
				</div>
				<div>
					<p>Latitude: {latitude || 'N/A'}</p>
					<p>Longitude: {longitude || 'N/A'}</p>
				</div>

				<div className="m-1 text-md">
					<p>
						Low: {low} °F / High: {high} °F
					</p>
					<p>Current Temperature: {current.temperature}°F </p>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<p>
					The
					<a
						className="px-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
						href="https://github.com/weather-gov/api/discussions/688"
						target="_blank"
						rel="noreferrer"
					>
						weather.gov
					</a>
					api used for this app is down until Jan, 1st, 2024. Sorry for the inconvenience.
				</p>
			</div>
		);
	}
};

export default CurrentWeather;
