export async function waitForATime(time: number): Promise<unknown> {
	return new Promise((resolve) => {
		setTimeout(resolve, time);
	}).catch(() => {
		throw new Error('There was an error. XD');
	});
}
