describe('Google', () => {
	test('Go to Google', async () => {
		await page.goto('https://google.com');
		await page.waitForSelector('span');
	});
});
