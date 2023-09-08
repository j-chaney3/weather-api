export const lowHigh = (temps) => {
	const sort = [...temps].sort();
	if (sort.length) {
		return {
			low: sort[0],
			high: sort[sort.length - 1],
		};
	} else {
		return {
			low: 'NA',
			high: 'NA',
		};
	}
};
