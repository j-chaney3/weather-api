import { useState } from 'react';
import { useSelector } from 'react-redux';
import CoordinatesConverter from '../components/CoordinatesConverter';
import DailyForecast from '../components/DailyForecast';
import HourlyForecast from '../components/HourlyForecast';
import HourlyDailyButtons from '../components/HourlyDailyButtons';

const HomePage = () => {
	const [hourly, setHourly] = useState(true);
	const { latitude, longitude, err } = useSelector((state) => state.coordinates);

	if (hourly) {
		return (
			<div className="bg-slate-500">
				<div className="bg-slate-600 min-h-screen max-w-screen-md mx-auto">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-1 container p-2 mx-auto">
						<div className="bg-slate-300">
							<CoordinatesConverter />
						</div>

						<div className="bg-slate-300">
							{latitude && longitude && !err && (
								<HourlyDailyButtons hourly={hourly} setHourly={setHourly} />
							)}
							<HourlyForecast />
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (!hourly) {
		return (
			<div className="bg-slate-500">
				<div className="bg-slate-600 min-h-screen max-w-screen-md mx-auto">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-1 container p-2 mx-auto">
						<div className="bg-slate-300">
							<CoordinatesConverter />
						</div>

						<div className="bg-slate-300">
							{latitude && longitude && !err && (
								<HourlyDailyButtons hourly={hourly} setHourly={setHourly} />
							)}
							<DailyForecast />
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default HomePage;
