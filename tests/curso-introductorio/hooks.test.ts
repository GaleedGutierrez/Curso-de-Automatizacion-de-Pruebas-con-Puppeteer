/* eslint-disable no-console */
import pupperteer, { Browser, Page } from 'puppeteer';

const TIMEOUT_JEST = 60000;
const BASE_URL = new URL('https://platzi.com');

jest.setTimeout(TIMEOUT_JEST);

describe('Timeouts', () => {
	let browser: Browser;
	let page: Page;

	beforeEach(async () => {
		browser = await pupperteer.launch({
			headless: false,
			defaultViewport: null,
		});
		page = await browser.newPage();
		await page.goto(BASE_URL.href);
	});

	afterEach(async () => {
		await browser.close();
	});

	it('Timeouts', async () => {
		page.setDefaultTimeout(20000);
		page.setDefaultNavigationTimeout(20000);
		await page.waitForFunction(
			() => !document.querySelector('#example-modal-sizes-title-sm'),
		);
	});
});
