/* eslint-disable no-console */
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import pupperteer, { Browser, KnownDevices, Page } from 'puppeteer';

expect.extend({ toMatchImageSnapshot });

const TIMEOUT_JEST = 60000;
// const TIME_WAIT = 5000;
// const BASE_URL_PLATZI = new URL('https://platzi.com');
const BASE_URL_GOOGLE = new URL('https://google.com');
const TABLET = KnownDevices['iPad Pro'];

jest.setTimeout(TIMEOUT_JEST);

describe('Visual test', () => {
	let browser: Browser;
	let page: Page;

	beforeAll(async () => {
		browser = await pupperteer.launch({
			headless: false,
			defaultViewport: null,
		});
		page = await browser.newPage();
		await page.goto(BASE_URL_GOOGLE.href);
	});

	afterAll(async () => {
		await browser.close();
	});

	test('Snapshot full page', async () => {
		await page.waitForSelector('img');

		const SCREENSHOT = await page.screenshot();

		expect(SCREENSHOT).toMatchImageSnapshot();
	});

	test('Snapshot only one element', async () => {
		const IMAGE = await page.waitForSelector('img');
		const SCREENSHOT = await IMAGE?.screenshot();

		expect(SCREENSHOT).toMatchImageSnapshot({
			failureThreshold: 0.05,
			failureThresholdType: 'percent',
		});
	});

	test('Snapshot mobile device', async () => {
		await page.emulate(TABLET);
		await page.waitForSelector('img');

		const SCREENSHOT = await page.screenshot();

		expect(SCREENSHOT).toMatchImageSnapshot({
			failureThreshold: 0.05,
			failureThresholdType: 'percent',
		});
	});

	test('Remove image before to create a snapshot', async () => {
		await page.waitForSelector('img');
		await page.evaluate(() => {
			const IMAGES = document.querySelectorAll('img');

			IMAGES.forEach((image) => {
				image.remove();
			});
		});

		const SCREENSHOT = await page.screenshot();

		expect(SCREENSHOT).toMatchImageSnapshot({
			failureThreshold: 0.05,
			failureThresholdType: 'percent',
		});
	});
});
