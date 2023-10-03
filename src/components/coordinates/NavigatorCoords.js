import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateGeolocationCoordinates } from '../../features/coordinates/coordinatesSlice';
import { fetchNWSPoints } from '../../features/nwsFetch/nwsFetchSlice';

const NavigatorCoords = () => {
	const dispatch = useDispatch();

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
};

export default NavigatorCoords;
