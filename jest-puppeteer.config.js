/** @type {import('jest-environment-puppeteer').JestPuppeteerConfig}  */
const config = {
	launch: { headless: true, slowMo: 0, defaultViewport: null },
	BrowserContext: 'default',
};

export default config;
