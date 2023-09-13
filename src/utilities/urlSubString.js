export const urlSubstring = (url) => {
	const comma = url.indexOf(',');
	if (comma !== -1) {
		return url.substring(0, comma);
	} else {
		return url;
	}
};
