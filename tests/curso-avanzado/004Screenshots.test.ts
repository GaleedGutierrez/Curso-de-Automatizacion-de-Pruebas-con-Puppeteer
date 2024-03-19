/* eslint-disable no-console */
import pupperteer, { Browser, Page } from 'puppeteer';

const TIMEOUT_JEST = 60000;
// const TIME_WAIT = 5000;
// const BASE_URL_PLATZI = new URL('https://platzi.com');
const BASE_URL_GOOGLE = new URL('https://google.com');

jest.setTimeout(TIMEOUT_JEST);

describe('Screenshots', () => {
	let browser: Browser;
	let page: Page;

	beforeAll(async () => {
		browser = await pupperteer.launch({
			headless: true,
			defaultViewport: null,
		});
		page = await browser.newPage();
		await page.goto(BASE_URL_GOOGLE.href);
	});

	afterAll(async () => {
		await browser.close();
	});

	test('Should full screenshot', async () => {
		await page.screenshot({
			path: './tests/curso-avanzado/screenshots/screenshot.png',
			fullPage: true,
		});
	});

	test('Should screenshot selecting an area', async () => {
		await page.screenshot({
			path: './tests/curso-avanzado/screenshots/screenshotArea.png',
			clip: {
				x: 0,
				y: 0,
				width: 500,
				height: 500,
			},
		});
	});

	test('Should screenshot with transparent background', async () => {
		await page.goto(BASE_URL_GOOGLE.href);
		await page.evaluate(() => {
			document.body.style.background = 'transparent';
		});
		await page.screenshot({
			path: './tests/curso-avanzado/screenshots/screenshotTransparentBackground.png',
			omitBackground: true,
		});
	});

	test('Should screenshot to an element', async () => {
		const SELECTOR_GOOGLE_LOGO =
			'body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img';

		const ELEMENT = await page.waitForSelector(SELECTOR_GOOGLE_LOGO);

		await ELEMENT?.screenshot({
			path: './tests/curso-avanzado/screenshots/screenshotAnElement.png',
		});
	});
});
