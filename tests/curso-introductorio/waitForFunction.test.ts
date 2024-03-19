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

			await PAGE.goto('https://demoqa.com/modal-dialogs');
			await PAGE.waitForSelector('#showSmallModal');
			await PAGE.click('#showSmallModal');
			await PAGE.waitForSelector('#example-modal-sizes-title-sm');
			await PAGE.waitForFunction(() => {
				const TEXT = document.querySelector(
					'#example-modal-sizes-title-sm',
				);

				return TEXT?.innerHTML === 'Small Modal';
			});
			await PAGE.waitForSelector('#closeSmallModal');
			await PAGE.click('#closeSmallModal');
			await PAGE.waitForFunction(
				() => !document.querySelector('#example-modal-sizes-title-sm'),
			);

			// Example to observe viewport
			const OBSERVER_RESIZE = PAGE.waitForFunction(
				'window.innerWidth < 100',
			);

			await PAGE.setViewport({ width: 50, height: 50 });
			await OBSERVER_RESIZE;

			await BROWSER.close();
		},
		TIMEOUT_JEST,
	);
});
