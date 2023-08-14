import React from 'react';
import { useSelector } from 'react-redux';

const ForecastFetch = () => {
	// Access latitude and longitude from the coordinates state
	const { latitude, longitude } = useSelector((state) => state.coordinates);

	if (!latitude && !longitude) {
		return <div>Please entere your zipcode to see the current forcest.</div>;
	}

	return (
		<div>
			<h1>I'll use these for the forecast</h1>
			<p>Latitude: {latitude}</p>
			<p>Longitude: {longitude}</p>
		</div>
	);
};

export default ForecastFetch;
