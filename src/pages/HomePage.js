import { useState } from 'react';
import { useSelector } from 'react-redux';
import CoordinatesConverter from '../components/CoordinatesConverter';
import ForecastFetchHourly from '../components/ForecastFetchHourly';
import ForecastFetchDaily from '../components/ForecastFetchDaily';
import HourlyDailyButtons from '../components/HourlyDailyButtons';

const HomePage = () => {
	const [hourly, setHourly] = useState(true);
	const { latitude, longitude } = useSelector((state) => state.coordinates);

	if (hourly) {
		return (
			<div className="bg-slate-500">
				<div className="bg-slate-600 min-h-screen max-w-screen-md mx-auto bg-slate-300">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-1 container p-2 mx-auto">
						<div className="bg-slate-300">
							<CoordinatesConverter />
						</div>

						<div className="bg-slate-300">
							{latitude && longitude && <HourlyDailyButtons hourly={hourly} setHourly={setHourly} />}
							<ForecastFetchHourly />
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (!hourly) {
		return (
			<div className="bg-slate-500">
				<div className="bg-slate-600 min-h-screen max-w-screen-md mx-auto bg-slate-300">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-1 container p-2 mx-auto">
						<div className="bg-slate-300">
							<CoordinatesConverter />
						</div>

						<div className="bg-slate-300">
							{latitude && longitude && <HourlyDailyButtons hourly={hourly} setHourly={setHourly} />}
							<ForecastFetchDaily />
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default HomePage;
