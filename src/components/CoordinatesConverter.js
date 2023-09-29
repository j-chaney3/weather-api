import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCoordinates } from '../features/coordinates/coordinatesSlice';
import { updateGeolocationCoordinates } from '../features/coordinates/coordinatesSlice';
import { fetchNWSPoints } from '../features/nwsFetch/nwsFetchSlice';

const CoordinatesConverter = ({ setHourly }) => {
	const dispatch = useDispatch();
	const [zipcode, setZipcode] = useState('');
	const [isValidZipcode, setIsValidZipcode] = useState(false);

	useEffect(() => {
		const getGeolocation = () => {
			return new Promise((resolve, reject) => {
				if ('geolocation' in navigator) {
					navigator.geolocation.getCurrentPosition(
						(position) => {
							const navLat = position.coords.latitude;
							const navLng = position.coords.longitude;
							console.log('Received navigator coordinates: ', navLat, navLng);
							const shortString = navLat.toFixed(4) + ',' + navLng.toFixed(4);
							// Dispatch the new action to update coordinates from geolocation
							dispatch(updateGeolocationCoordinates({ latitude: navLat, longitude: navLng }));

							resolve(shortString);
						},
						(error) => {
							// dispatch(updateGeolocationCoordinates({ latitude: null, longitude: null }));
							reject(error);
						},
						{
							once: true,
							timeout: 10000,
							maximumAge: 60000,
						}
					);
				} else {
					reject(new Error('Geolocation is not available in this browser.'));
				}
			});
		};

		getGeolocation()
			.then((shortString) => {
				console.log(`dispatched fetchNWS(${shortString})`);
				dispatch(fetchNWSPoints(shortString));
			})
			.catch((error) => {
				console.error('Error getting geolocation:', error);
			});

		//eslint - disable - next - line;
	}, [dispatch]);

	const handleConvertClick = async () => {
		try {
			dispatch(fetchCoordinates(zipcode));
		} catch (error) {
			console.error('Error fetching coordinates:', error);
		}
	};

	const validate = (value) => {
		const regex = /^\d{5}$/;

		if (regex.test(value)) {
			setIsValidZipcode(true);
		} else {
			setIsValidZipcode(false);
		}
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Enter zipcode"
				value={zipcode}
				onChange={(event) => {
					setZipcode(event.target.value);
					validate(event.target.value);
					event.preventDefault();
				}}
				onKeyDown={(event) => {
					if (event.key === 'Enter') {
						event.preventDefault();
						handleConvertClick();
					}
				}}
				maxLength={5}
			/>
			<button
				type="submit"
				id="check"
				onClick={() => {
					handleConvertClick();
					setHourly(true);
				}}
				className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 my-4 disabled:bg-red-200 rounded-full`}
				disabled={!isValidZipcode}
			>
				<i className="fas fa-cloud-sun-rain text-sm text-white"></i>
			</button>
		</div>
	);
};

export default CoordinatesConverter;
