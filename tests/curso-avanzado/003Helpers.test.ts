/* eslint-disable no-console */
import pupperteer, { Browser, Page } from 'puppeteer';

import {
	click,
	doubleClick,
	getCount,
	getText,
	select,
	type,
} from './lib/helpers.ts';

const TIMEOUT_JEST = 60000;
// const TIME_WAIT = 5000;
const BASE_URL_PLATZI = new URL('https://platzi.com');
const BASE_URL_TESTCAFE = new URL('https://devexpress.github.io');
const BASE_URL_DEMOGURU99 = new URL('https://demo.guru99.com');

jest.setTimeout(TIMEOUT_JEST);

describe('Helpers Platzi', () => {
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

	test('Should to get text', async () => {
		const TEXT = await getText(
			page,
			'body > main > section.HeroSection_HeroSection__sJMhH > h1',
		);

		console.log({ TEXT });
	});

	test('Should to get count of elements', async () => {
		const COUNT = await getCount(page, 'h2');

		console.log({ COUNT });
	});
});

describe('Helpers Testcafe', () => {
	let browser: Browser;
	let page: Page;

	beforeAll(async () => {
		const PAGE_EXAMPLE = new URL('/testcafe/example/', BASE_URL_TESTCAFE);

		browser = await pupperteer.launch({
			headless: false,
			defaultViewport: null,
		});
		page = await browser.newPage();
		await page.goto(PAGE_EXAMPLE.href);
	});

	afterAll(async () => {
		await browser.close();
	});

	test('Should fill out form', async () => {
		// Your name:
		await type(page, '#developer-name', 'Galeed Gutierrez', {
			delay: 200,
		});
		// Which features are important to you:
		await click(page, 'label[for="remote-testing"]');
		// I have tried TestCafe
		await click(page, 'label[for="tried-test-cafe"]');
		// What is your primary Operating System:
		await click(page, '#macos');
		// Which TestCafe interface do you use:
		await select(page, '#preferred-interface', 'JavaScript API');
		// Please let us know what you think:
		await type(page, '#comments', 'Comment by Galeed Gutierrez', {
			delay: 200,
		});
		// Send data:
		await click(page, '#submit-button');
	});
});

describe('Helpers demo.guru99.com', () => {
	let browser: Browser;
	let page: Page;

	beforeAll(async () => {
		const PAGE_EXAMPLE = new URL(
			'/test/simple_context_menu.html',
			BASE_URL_DEMOGURU99,
		);

		browser = await pupperteer.launch({
			headless: false,
			defaultViewport: null,
		});
		page = await browser.newPage();
		await page.goto(PAGE_EXAMPLE.href);
	});

	afterAll(async () => {
		await browser.close();
	});

	test('Should double click', async () => {
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		page.on('dialog', async (dialog) => await dialog.accept());
		await doubleClick(page, 'button[ondblclick="myFunction()"]');
	});

	test('Should right click', async () => {
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		await click(page, '#authentication > span', {
			button: 'right',
			delay: 500,
		});
	});
});
