import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CoordinatesConverter from '../components/CoordinatesConverter';
import DailyForecast from '../components/DailyForecast';
import HourlyForecast from '../components/HourlyForecast';
import HourlyDailyButtons from '../components/HourlyDailyButtons';
import { setNavCoordinatesAsync } from '../features/coordinates/navCoordinatesSlice';

const HomePage = () => {
	const dispatch = useDispatch();
	const [hourly, setHourly] = useState(true);
	const { err } = useSelector((state) => state.coordinates);
	const { navLat, navLng } = useSelector((state) => state.navCoordinates);

	useEffect(() => {
		dispatch(setNavCoordinatesAsync());
	}, [dispatch, navLat, navLng]);

	if (hourly) {
		return (
			<div className="bg-slate-500">
				<div className="bg-slate-600 min-h-screen max-w-screen-md mx-auto">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-1 container p-2 mx-auto">
						<div className="bg-slate-300">
							<CoordinatesConverter />
						</div>

						<div className="bg-slate-300">
							{!err && <HourlyDailyButtons hourly={hourly} setHourly={setHourly} />}
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
							{!err && <HourlyDailyButtons hourly={hourly} setHourly={setHourly} />}
							<DailyForecast />
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default HomePage;
