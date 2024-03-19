import pupperteer from 'puppeteer';

const TIMEOUT_JEST = 20000;

describe('Interacting with elements', () => {
	it(
		'Should right click',
		async () => {
			const BROWSER = await pupperteer.launch({
				headless: false,
				defaultViewport: null,
			});

			const PAGE = await BROWSER.newPage();

			await PAGE.goto(
				'https://demo.guru99.com/test/simple_context_menu.html',
			);
			// Right Click
			await PAGE.click('#authentication > span', {
				button: 'right',
				delay: 500,
			});
			await new Promise((r) => {
				setTimeout(r, 3000);
			});
			await BROWSER.close();
		},
		TIMEOUT_JEST,
	);

	it(
		'Should double click',
		async () => {
			const BROWSER = await pupperteer.launch({
				headless: false,
				defaultViewport: null,
			});

			const PAGE = await BROWSER.newPage();

			await PAGE.goto(
				'https://demo.guru99.com/test/simple_context_menu.html',
			);
			// eslint-disable-next-line @typescript-eslint/no-misused-promises
			PAGE.on('dialog', async (dialog) => {
				await dialog.accept();
			});
			// Double Click
			await PAGE.click('button[ondblclick="myFunction()"]', {
				count: 2,
			});
			await new Promise((r) => {
				setTimeout(r, 3000);
			});
			await BROWSER.close();
		},
		TIMEOUT_JEST,
	);

	it(
		'Should fill out the form',
		async () => {
			const BROWSER = await pupperteer.launch({
				headless: false,
				defaultViewport: null,
			});

			const PAGE = await BROWSER.newPage();

			await PAGE.goto('https://devexpress.github.io/testcafe/example/');
			// Your name
			await PAGE.type('#developer-name', 'Galeed Gutierrez', {
				delay: 500,
			});
			// Which features are important to you:
			await PAGE.click('label[for="remote-testing"]');
			// I have tried TestCafe
			await PAGE.click('label[for="tried-test-cafe"]');

			// What is your primary Operating System:
			await PAGE.click('#macos');

			// Which TestCafe interface do you use:
			await PAGE.select('#preferred-interface', 'JavaScript API');
			// Please let us know what you think:
			await PAGE.type('#comments', 'Comment by Galeed Gutierrez', {
				delay: 500,
			});

			await PAGE.click('#submit-button');

			await new Promise((r) => {
				setTimeout(r, 3000);
			});

			await BROWSER.close();
		},
		TIMEOUT_JEST + 20000,
	);
});
