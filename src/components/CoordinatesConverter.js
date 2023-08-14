import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoordinates, setCoordinates } from '../features/coordinates/coordinatesSlice';

const CoordinatesConverter = () => {
	const dispatch = useDispatch();
	const { latitude, longitude } = useSelector((state) => state.coordinates);

	const [zipcode, setZipcode] = useState('');

	const handleConvertClick = () => {
		dispatch(fetchCoordinates(zipcode))
			.then((data) => {
				const location = data.results[0].geometry.location;
				if (location) {
					const coordinates = {
						latitude: location.lat,
						longitude: location.lng,
					};
					dispatch(setCoordinates(coordinates));
				} else {
					console.error('No coordinates found in API response');
				}
			})
			.catch((error) => {
				console.error('Error fetching coordinates:', error);
			});
	};

	const handleZipcodeChange = (event) => {
		setZipcode(event.target.value);
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Enter zipcode"
				value={zipcode}
				name="zipcode"
				onChange={handleZipcodeChange}
			/>
			<button onClick={handleConvertClick}>Convert</button>
			<div>
				Latitude: {latitude !== '' ? latitude : 'N/A'}
				<br />
				Longitude: {longitude !== '' ? longitude : 'N/A'}
			</div>
		</div>
	);
};

export default CoordinatesConverter;
