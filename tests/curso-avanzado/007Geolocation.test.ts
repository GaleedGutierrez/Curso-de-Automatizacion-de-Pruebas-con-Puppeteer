/* eslint-disable no-console */
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import pupperteer, { Browser, Page } from 'puppeteer';

import { waitForATime } from './lib/helpers';

expect.extend({ toMatchImageSnapshot });

const TIMEOUT_JEST = 60000;
// const TIME_WAIT = 5000;
const BASE_URL = new URL('https://www.infobyip.com/browsergeolocation.php');
// const BASE_URL = new URL('https://chercher.tech/practice/geo-location.html');

jest.setTimeout(TIMEOUT_JEST);

describe('Geolocation', () => {
	let browser: Browser;
	let page: Page;

	beforeEach(async () => {
		browser = await pupperteer.launch({
			headless: false,
			defaultViewport: null,
		});
		page = await browser.newPage();
		// await page.goto(BASE_URL.href);
	});

	afterEach(async () => {
		await browser.close();
	});

	test('Should current get location', async () => {
		const CONTEXT = browser.defaultBrowserContext();

		await CONTEXT.overridePermissions(BASE_URL.href, ['geolocation']);
		await page.setGeolocation({ latitude: 90, longitude: 20 });
		await page.goto(BASE_URL.href);
		await waitForATime(5000);
	});

	test('Should current get location 2', async () => {
		const CONTEXT = browser.defaultBrowserContext();

		await CONTEXT.overridePermissions(BASE_URL.href, ['geolocation']);
		await page.setGeolocation({ latitude: 90, longitude: 0 });
		await page.goto(BASE_URL.href);

		await waitForATime(5000);
	});
});
