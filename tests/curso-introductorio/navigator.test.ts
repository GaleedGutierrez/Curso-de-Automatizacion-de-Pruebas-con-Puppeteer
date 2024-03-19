import pupperteer from 'puppeteer';

describe('First test', () => {
	it('Should open and close browser', async () => {
		const BROWSER = await pupperteer.launch({
			headless: true,
			defaultViewport: null,
		});

		const PAGE = await BROWSER.newPage();

		await PAGE.goto('https://github.com/');
		await PAGE.waitForSelector('img');
		await PAGE.reload();
		await PAGE.waitForSelector('input');
		await PAGE.goto('https://platzi.com/');
		await PAGE.waitForSelector('img');
		await PAGE.goBack();
		await PAGE.goForward();

		const PAGE_2 = await BROWSER.newPage();

		await PAGE_2.goto('https://google.com/');

		await BROWSER.close();
	}, 20000);
});
