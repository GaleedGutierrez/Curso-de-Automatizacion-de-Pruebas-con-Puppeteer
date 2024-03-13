/* eslint-disable no-console */
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import pupperteer, { Browser, Page } from 'puppeteer';

expect.extend({ toMatchImageSnapshot });

const TIMEOUT_JEST = 60000;
// const TIME_WAIT = 5000;
const BASE_URL_PLATZI = new URL('https://platzi.com');
// const BASE_URL_GOOGLE = new URL('https://google.com');

jest.setTimeout(TIMEOUT_JEST);

describe('PDF', () => {
	let browser: Browser;
	let page: Page;

	beforeAll(async () => {
		browser = await pupperteer.launch({
			headless: false,
			defaultViewport: null,
		});
		page = await browser.newPage();
		await page.goto(BASE_URL_PLATZI.href);
	});

	afterAll(async () => {
		await browser.close();
	});

	test('Should create PDF', async () => {
		const PDF_CSS: string[] = [
			'<style>',
			'h1 { font-size: 10px; margin-inline-start: 30px; }',
			'</style>',
		];
		const CSS = PDF_CSS.join('');

		await page.pdf({
			path: 'tests/curso-avanzado/pdf/platzi.pdf',
			format: 'A4',
			printBackground: true,
			displayHeaderFooter: true,
			headerTemplate: `${CSS} <h1>My first PDF with Pupperteer</h1>`,
			footerTemplate: `${CSS} <h1> Page <span class="pageNumber"></span> of <span class="totalPages"></span></h1>`,
			margin: {
				top: '100px',
				bottom: '200px',
				right: '30px',
				left: '30px',
			},
		});
	});

	test('Should create PDF landscape', async () => {
		const PDF_CSS: string[] = [
			'<style>',
			'h1 { font-size: 10px; margin-inline-start: 30px; }',
			'</style>',
		];
		const CSS = PDF_CSS.join('');

		await page.pdf({
			path: 'tests/curso-avanzado/pdf/platziLandscape.pdf',
			format: 'A4',
			printBackground: true,
			displayHeaderFooter: true,
			headerTemplate: `${CSS} <h1>My first PDF with Pupperteer</h1>`,
			footerTemplate: `${CSS} <h1> Page <span class="pageNumber"></span> of <span class="totalPages"></span></h1>`,
			margin: {
				top: '100px',
				bottom: '200px',
				right: '30px',
				left: '30px',
			},
			landscape: true,
		});
	});
});
