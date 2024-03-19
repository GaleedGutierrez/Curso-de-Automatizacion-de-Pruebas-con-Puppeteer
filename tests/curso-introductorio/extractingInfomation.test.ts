/* eslint-disable no-console */
import pupperteer from 'puppeteer';

const TIMEOUT_JEST = 60000;

describe('Extracting information', () => {
	it(
		'Should extract info',
		async () => {
			const BROWSER = await pupperteer.launch({
				headless: false,
				defaultViewport: null,
			});

			const PAGE = await BROWSER.newPage();

			await PAGE.goto('https://platzi.com');

			const TITLE = await PAGE.title();
			const URL = PAGE.url();

			console.log({ TITLE, URL });

			await BROWSER.close();
		},
		TIMEOUT_JEST,
	);

	it(
		'Should extract information from element',
		async () => {
			const BROWSER = await pupperteer.launch({
				headless: false,
				defaultViewport: null,
			});

			const PAGE = await BROWSER.newPage();

			await PAGE.goto('https://platzi.com');
			await PAGE.waitForSelector('body > main > header > div > a > span');

			const NAME_LINK = await PAGE.$eval(
				'body > main > header > div > a > span',
				(element) => element.textContent,
			);

			console.log({ NAME_LINK });
			await BROWSER.close();
		},
		TIMEOUT_JEST,
	);

	it(
		'Should count element from a page',
		async () => {
			const BROWSER = await pupperteer.launch({
				headless: false,
				defaultViewport: null,
			});

			const PAGE = await BROWSER.newPage();

			await PAGE.goto('https://platzi.com');

			const IMAGES = await PAGE.$$eval('img', (images) => images.length);

			console.log({ IMAGES });
			await BROWSER.close();
		},
		TIMEOUT_JEST,
	);
});
