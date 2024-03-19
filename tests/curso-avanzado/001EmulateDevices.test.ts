/* eslint-disable no-console */
import pupperteer, { Browser, Device, KnownDevices, Page } from 'puppeteer';

import { waitForATime } from './lib/helpers.ts';

const TIMEOUT_JEST = 60000;
const BASE_URL = new URL('https://platzi.com');
const TIME_WAIT = 5000;
// New way
const IPHONE_6 = KnownDevices['iPhone 6'];
const TABLET = KnownDevices['iPad Pro'];
const TABLET_LANDSCAPE = KnownDevices['iPad Pro landscape'];

// Old way
const MY_DEVICE: Device = {
	userAgent:
		'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
	viewport: {
		width: 375,
		height: 667,
		deviceScaleFactor: 2,
		isMobile: true,
		hasTouch: true,
		isLandscape: false,
	},
};

jest.setTimeout(TIMEOUT_JEST);

describe('Emulate devices', () => {
	let browser: Browser;
	let page: Page;

	beforeAll(async () => {
		browser = await pupperteer.launch({
			headless: false,
			defaultViewport: null,
		});
		page = await browser.newPage();
		await page.goto(BASE_URL.href);
	});

	afterAll(async () => {
		await browser.close();
	});

	test('Should emulate device manually', async () => {
		await page.emulate(MY_DEVICE);
		await waitForATime(TIME_WAIT);
	});

	test('Should emulate phone', async () => {
		await page.emulate(IPHONE_6);
		await waitForATime(TIME_WAIT);
	});

	test('Should emulate tablet', async () => {
		await page.emulate(TABLET);
		await waitForATime(TIME_WAIT);
		await page.emulate(TABLET_LANDSCAPE);
		await waitForATime(TIME_WAIT);
	});

	test('Should emulate desktop', async () => {
		await page.setViewport({
			width: 1920,
			height: 1080,
		});
		await waitForATime(TIME_WAIT);
	});
});
