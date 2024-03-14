/* eslint-disable no-console */
import { AxePuppeteer } from '@axe-core/puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import pupperteer, { Browser, Page } from 'puppeteer';

const TIMEOUT_JEST = 60000;
// const TIME_WAIT = 5000;
const BASE_URL = new URL('https://platzi.com');

expect.extend({ toMatchImageSnapshot });
jest.setTimeout(TIMEOUT_JEST);

describe('Accessibility', () => {
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

	test('Should get snapshot', async () => {
		await page.goto(BASE_URL.href);
		await page.waitForSelector('img');

		const SNAPSHOT = await page.accessibility.snapshot();

		console.log(SNAPSHOT);
	});

	test('Try accessibility with Axe', async () => {
		await page.setBypassCSP(true);
		await page.goto(BASE_URL.href);
		await page.waitForSelector('img');

		const RESULT = await new AxePuppeteer(page).analyze();
		const VIOLATION_0 = RESULT.violations[0].nodes[0];
		const ALL_VIOLATION = RESULT.violations[0];

		console.log({ VIOLATION_0, ALL_VIOLATION });
	});
});
