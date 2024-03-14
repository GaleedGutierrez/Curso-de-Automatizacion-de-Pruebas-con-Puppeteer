/* eslint-disable no-console */
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import pupperteer, { Browser } from 'puppeteer';

const TIMEOUT_JEST = 60000;
// const TIME_WAIT = 5000;
// const BASE_URL = new URL('https://platzi.com');

expect.extend({ toMatchImageSnapshot });
jest.setTimeout(TIMEOUT_JEST);

describe('Firefox', () => {
	let browser: Browser;
	// let page: Page;

	beforeAll(async () => {
		browser = await pupperteer.launch({
			headless: false,
			product: 'firefox',
			defaultViewport: null,
		});
		// page = await browser.newPage();
		// await page.goto(BASE_URL.href);
	});

	afterAll(async () => {
		await browser.close();
	});

	test('Should open Firefox', async () => {
		// const IMAGE = await page.waitForSelector('img');
		// console.log(IMAGE);
	});
});
