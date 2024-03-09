import pupperteer from 'puppeteer';

describe('First test', () => {
	it('Should open and close browser', async () => {
		const BROWSER = await pupperteer.launch({ headless: false });
		const PAGE = await BROWSER.newPage();

		await PAGE.goto('https://www.google.com.ar/');
		await new Promise((resolve) => {
			setTimeout(resolve, 5000);
		});

		await BROWSER.close();
	}, 10000);
});
