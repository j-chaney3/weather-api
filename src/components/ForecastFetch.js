import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNWSPoints } from '../features/nwsFetch/nwsFetchSlice';

const ForecastFetch = () => {
	const dispatch = useDispatch();
	const { latitude, longitude } = useSelector((state) => state.coordinates);
	const { city, state } = useSelector((state) => state.NWSPoints);

	useEffect(() => {
		if (latitude && longitude) {
			const cString = latitude.toFixed(4) + ',' + longitude.toFixed(4);
			console.log('Truncated:' + cString);
			dispatch(fetchNWSPoints(cString));
		}
	}, [dispatch, latitude, longitude]);

	if (!latitude && !longitude) {
		return <div>Please enter your zipcode to see the current forecast.</div>;
	}

	return (
		<div>
			<h1>
				{city}, {state}
			</h1>
			<p>Latitude: {latitude}</p>
			<p>Longitude: {longitude}</p>
		</div>
	);
};

export default ForecastFetch;
