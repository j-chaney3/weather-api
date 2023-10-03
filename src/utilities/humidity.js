export const humidity = (tempF, dewpoint) => {
	const tempC = (tempF - 32) * (5 / 9);
	const relH = Math.exp((17.625 * dewpoint) / (243.04 + dewpoint)) / Math.exp((17.625 * tempC) / (243.04 + tempC));

	if (relH * 100 <= 100) {
		return 'Humidity: ' + (relH * 100).toFixed(0) + '%';
	} else {
		return 'Humidity: ' + '100%';
	}
};
