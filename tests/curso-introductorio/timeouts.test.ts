/* eslint-disable no-console */
import pupperteer from 'puppeteer';

const TIMEOUT_JEST = 60000;

jest.setTimeout(TIMEOUT_JEST);

describe('Timeouts', () => {
	it('Timeouts', async () => {
		const BROWSER = await pupperteer.launch({
			headless: false,
			defaultViewport: null,
		});

		const PAGE = await BROWSER.newPage();

		PAGE.setDefaultTimeout(20000);
		PAGE.setDefaultNavigationTimeout(20000);
		await PAGE.goto('https://platzi.com', {
			waitUntil: 'networkidle0',
		});
		await PAGE.waitForFunction(
			() => !document.querySelector('#example-modal-sizes-title-sm'),
			{ timeout: 30000 },
		);
		await BROWSER.close();
	});
});
