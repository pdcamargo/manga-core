export const sleep = (milli: number) =>
	new Promise<void>((res) => {
		setTimeout(() => {
			res();
		}, milli * 1000);
	});
