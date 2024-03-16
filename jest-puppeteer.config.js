/** @type {import('jest-environment-puppeteer').JestPuppeteerConfig}  */
const config = {
	launch: { headless: false, slowMo: 100 },
	BrowserContext: 'default',
};

export default config;
