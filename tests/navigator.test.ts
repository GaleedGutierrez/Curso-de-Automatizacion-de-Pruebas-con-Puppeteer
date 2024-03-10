import pupperteer from 'puppeteer';

describe('First test', () => {
	it('Should open and close browser', async () => {
		const BROWSER = await pupperteer.launch({
			headless: false,
			slowMo: 0,
			devtools: false,
			// defaultViewport: {
			// 	width: 1280,
			// 	height: 720,
			// },
			// args: ['--window-size=1280,720'],
			defaultViewport: null,
		});
		const PAGE = await BROWSER.newPage();

		await PAGE.goto('https://www.google.com.ar/');
		await new Promise((resolve) => {
			setTimeout(resolve, 5000);
		});

		await BROWSER.close();
	}, 50000);
});
describe('Headless mode', () => {
	it('Should open and close browser on headless mode', async () => {
		const BROWSER = await pupperteer.launch({ headless: true });
		const PAGE = await BROWSER.newPage();

		await PAGE.goto('https://www.google.com.ar/');
		await BROWSER.close();
	});
});
