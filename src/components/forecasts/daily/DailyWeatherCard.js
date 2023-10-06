import { formatTime, formatDate } from '../../../utilities/dateTimeFormat';
import { urlSubstring } from '../../../utilities/urlSubString';
import { humidity } from '../../../utilities/humidity';

const DailyWeatherCard = ({ period }) => {
	return (
		<div className="flex items-center justify-center">
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
									<span className="font-bold">Forecast{': '} </span>
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
	);
};

export default DailyWeatherCard;
