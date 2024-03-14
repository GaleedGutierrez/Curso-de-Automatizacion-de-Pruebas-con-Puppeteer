/* eslint-disable no-console */
import fs from 'node:fs';

import { toMatchImageSnapshot } from 'jest-image-snapshot';
import pupperteer, { Browser, Page } from 'puppeteer';

import { Cat, Name, Profile } from './types/trace';

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

	test('Measuring automation performance', async () => {
		await page.goto(BASE_URL.href);
		await page.waitForSelector('img');

		const METRICS = await page.metrics();

		console.log(METRICS);
	});

	test('Measuring page performance', async () => {
		await page.goto(BASE_URL.href);
		await page.waitForSelector('img');

		const METRICS = await page.evaluate(() =>
			JSON.stringify(globalThis.performance),
		);

		console.log(METRICS);
	});

	test('Measuring page load performance', async () => {
		await page.tracing.start({
			path: 'tests/curso-avanzado/performance/profile.json',
		});
		await page.goto(BASE_URL.href);
		await page.waitForSelector('img');
		await page.tracing.stop();
	});

	test('Measuring page load performance with screenshots', async () => {
		await page.tracing.start({
			path: 'tests/curso-avanzado/performance/profile.json',
			screenshots: true,
		});
		await page.goto(BASE_URL.href);
		await page.waitForSelector('img');
		await page.tracing.stop();
	});

	test('Measuring page load performance with screenshots extract', async () => {
		await page.tracing.start({
			path: 'tests/curso-avanzado/performance/profile.json',
			screenshots: true,
		});
		await page.goto(BASE_URL.href);
		await page.waitForSelector('img');
		await page.tracing.stop();

		const TRACING = JSON.parse(
			fs.readFileSync(
				'tests/curso-avanzado/performance/profile.json',
				'utf8',
			),
		) as Profile;

		// Filtrar el JSON
		const TRACE_SCREENSHOTS = TRACING.traceEvents.filter(
			(traceEvent) =>
				traceEvent.cat === Cat.DisabledByDefaultDevtoolsScreenshot &&
				traceEvent.name === Name.Screenshot &&
				typeof traceEvent.args.snapshot !== 'undefined',
		);

		// Iterate the array to obtain the images
		TRACE_SCREENSHOTS.forEach((snap, index) => {
			if (!snap.args.snapshot) {
				return;
			}

			fs.writeFile(
				`tests/curso-avanzado/performance/images/trace-screenshot-${index}.png`,
				snap.args.snapshot,
				'base64',
				(error) => {
					if (!error) {
						return;
					}

					console.error(`Can't create the file: ${error.message}`);
				},
			);
		});
	});
});
