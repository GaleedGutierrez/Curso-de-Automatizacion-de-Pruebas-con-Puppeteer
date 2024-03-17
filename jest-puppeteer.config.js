/** @type {import('jest-environment-puppeteer').JestPuppeteerConfig}  */
const config = {
	launch: { headless: true, slowMo: 100, defaultViewport: null },
	BrowserContext: 'default',
};

export default config;
