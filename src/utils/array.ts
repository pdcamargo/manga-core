export const createArrayGroups = <T>(item: T[], perPage: number) => {
	const newArrayLength = Math.ceil(item.length / perPage);

	const newArray: T[][] = new Array(newArrayLength).fill([]);

	item.forEach((item, index) => {
		const arrayIndex = Math.floor(index / perPage);

		if (newArray[arrayIndex]) {
			newArray[arrayIndex] = [...newArray[arrayIndex], item];
		}
	});

	return newArray;
};
