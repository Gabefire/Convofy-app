export const truncateNumber = (number: number) => {
	let votes = number.toString();
	if (number >= 1000000) {
		votes = (Math.round(number) / 1000000).toFixed(1).toString();
		return `${votes}m`;
	}
	if (number >= 1000) {
		votes = (Math.round(number) / 1000).toFixed(1).toString();
		return `${votes}k`;
	}
	return votes;
};
