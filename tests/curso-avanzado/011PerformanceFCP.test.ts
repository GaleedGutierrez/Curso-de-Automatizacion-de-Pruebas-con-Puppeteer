/* eslint-disable no-console */

import { toMatchImageSnapshot } from 'jest-image-snapshot';
import pupperteer, { Browser, Page } from 'puppeteer';

const TIMEOUT_JEST = 60000;
// const TIME_WAIT = 5000;
const BASE_URL = new URL('https://platzi.com');

expect.extend({ toMatchImageSnapshot });
jest.setTimeout(TIMEOUT_JEST);

describe('Performance', () => {
	let browser: Browser;
	let page: Page;

	beforeAll(async () => {
		browser = await pupperteer.launch({
			headless: true,
			defaultViewport: null,
		});
		page = await browser.newPage();
	});

	afterAll(async () => {
		await browser.close();
	});

	test('Measuring the performance for first paint and FCP', async () => {
		const NAVIGATION_PROMISE = page.waitForNavigation();

		await page.goto(BASE_URL.href);
		await NAVIGATION_PROMISE;

		const FIRS_PAINT = JSON.parse(
			await page.evaluate(() =>
				JSON.stringify(
					globalThis.performance.getEntriesByName('first-paint'),
				),
			),
		) as PerformanceEntryList;

		const FIRST_CONTENTFUL_PAINT = JSON.parse(
			await page.evaluate(() =>
				JSON.stringify(
					globalThis.performance.getEntriesByName(
						'first-contentful-paint',
					),
				),
			),
		) as PerformanceEntryList;

		console.log({ FIRS_PAINT });
		console.log({ FIRST_CONTENTFUL_PAINT });
	});

	test('Measuring the performance of frame per second', async () => {
		const DEVTOOLS_PROTOCOL_CLIENTE = await page.createCDPSession();

		await DEVTOOLS_PROTOCOL_CLIENTE.send('Overlay.setShowFPSCounter', {
			show: true,
		});
		await page.goto(BASE_URL.href);
		await page.screenshot({
			path: 'tests/curso-avanzado/screenshots/frames-per-second/frames.jpg',
			type: 'jpeg',
		});
	});
});
