import pupperteer from 'puppeteer';

const TIMEOUT_JEST = 60000;

describe('Type of waits', () => {
	it(
		'Wait for the navigation',
		async () => {
			const BROWSER = await pupperteer.launch({
				headless: false,
				defaultViewport: null,
			});
			const PAGE = await BROWSER.newPage();

			await PAGE.goto('https://platzi.com', {
				waitUntil: 'load',
			});

			// Wait for a selector
			await PAGE.waitForSelector('figure');

			await PAGE.goto('https://demoqa.com/modal-dialogs', {
				waitUntil: 'load',
			});

			const BUTTON = await PAGE.waitForSelector('#showSmallModal', {
				visible: true,
			});

			await BUTTON?.click();

			await BROWSER.close();
		},
		TIMEOUT_JEST,
	);
});
