import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNWSPoints } from '../features/nwsFetch/nwsFetchSlice';
import { fetchForecastHourly, select24hours, selectTemps } from '../features/nwsFetch/forecastHourlyFetchSlice';
import { isFirefox } from 'react-device-detect';

//imported functions
import { lowHigh } from '../utilities/lowHigh';
import { formatTime } from '../utilities/dateTimeFormat';
import { urlSubstring } from '../utilities/urlSubString';

const HourlyForecast = () => {
	const dispatch = useDispatch();
	const { latitude, longitude, errMsg, err, zipcode } = useSelector((state) => state.coordinates);
	const { city, state, gridX, gridY, gridId, isLoading } = useSelector((state) => state.NWSPoints);

	useEffect(() => {
		if (latitude && longitude) {
			const cString = latitude.toFixed(4) + ',' + longitude.toFixed(4);
			console.log('Truncated:' + cString);
			dispatch(fetchNWSPoints(cString));
		}
	}, [dispatch, latitude, longitude]);

	useEffect(() => {
		if (gridX && gridY && gridId && city) {
			const url = `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast/hourly`;
			console.log(`Fetching hourly forecast for ${city} with URL: ${url}`);
			dispatch(fetchForecastHourly(url));
		}
	}, [dispatch, gridX, gridY, gridId, city]);

	const hourly = useSelector(select24hours);
	const tempArray = useSelector(selectTemps);
	const { low, high } = lowHigh(tempArray);

	if (!latitude && !longitude && !err) {
		if (!isFirefox) {
			return <div>Please enter your zipcode to see the current forecast.</div>;
		} else {
			return (
				<div>Browser Location data not currently working with firefox, please manually enter your zipcode.</div>
			);
		}
	} else if (err) {
		return (
			<div>
				Error fetching forecast: <p className="text-red-600 inline-block font-bold">{errMsg}! </p>
			</div>
		);
	} else if (isLoading) {
		return (
			<div>
				<h1>Loading....</h1>
			</div>
		);
	}

	return (
		<div>
			<h1 className="font-bold">
				{city}, {state} - {zipcode}
			</h1>
			<h1 className="font-semibold">Hourly Forecast</h1>
			<p>Latitude: {latitude || 'N/A'}</p>
			<p>Longitude: {longitude || 'N/A'}</p>

			<div className="m-3">
				Today's Temperatures - Low: {low} °F / High: {high} °F
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
										<p>
											<span className="font-bold">Forecast:</span> {period.shortForecast}
										</p>
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
};

export default HourlyForecast;
