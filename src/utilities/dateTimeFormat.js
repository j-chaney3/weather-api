export const formatTime = (isoTime) => {
	const date = new Date(isoTime);
	const options = {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	};

	return date.toLocaleTimeString(undefined, options);
};

export const formatDate = (isoTime) => {
	const date = new Date(isoTime);
	const options = {
		month: 'short',
		day: 'numeric',
	};

	return date.toLocaleDateString(undefined, options);
};
