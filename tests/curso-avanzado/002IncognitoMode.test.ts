/* eslint-disable no-console */
import pupperteer, {
	Browser,
	BrowserContext,
	KnownDevices,
	Page,
} from 'puppeteer';

import { waitForATime } from './utilities/waitForATime';

const TIMEOUT_JEST = 60000;
const TIME_WAIT = 5000;
const BASE_URL = new URL('https://platzi.com');
const IPHONE_6 = KnownDevices['iPhone 6'];

jest.setTimeout(TIMEOUT_JEST);

describe('Incognito mode', () => {
	let browser: Browser;
	let browserContext: BrowserContext;
	let page: Page;

	beforeAll(async () => {
		browser = await pupperteer.launch({
			headless: false,
			defaultViewport: null,
		});
		browserContext = await browser.createBrowserContext();
		// Obsolete
		browserContext.isIncognito();
		page = await browserContext.newPage();
		await page.goto(BASE_URL.href);
	});

	afterAll(async () => {
		await browser.close();
	});

	test('Should open incognito mode', async () => {
		await page.emulate(IPHONE_6);
		await waitForATime(TIME_WAIT);
	});
});
