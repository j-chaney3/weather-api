export const formatTime = (isoTime) => {
	const date = new Date(isoTime);
	const options = {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	};

	return date.toLocaleTimeString(undefined, options);
};
