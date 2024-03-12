import { ClickOptions, KeyboardTypeOptions, Page } from 'puppeteer';

function couldNotFindSelectorErrorMessage(selector: string): never {
	throw new Error(`Could not find selector: ${selector}`);
}

export async function waitForATime(time: number): Promise<void> {
	await new Promise((resolve) => {
		setTimeout(resolve, time);
	});
}

export async function click(
	page: Page,
	selector: string,
	options?: ClickOptions,
): Promise<void> {
	try {
		await page.waitForSelector(selector);
		await page.click(selector, options);
	} catch (error) {
		couldNotFindSelectorErrorMessage(selector);
	}
}

export async function doubleClick(
	page: Page,
	selector: string,
	options?: ClickOptions,
): Promise<void> {
	try {
		await page.waitForSelector(selector);
		await page.click(selector, { ...options, count: 2 });
	} catch (error) {
		couldNotFindSelectorErrorMessage(selector);
	}
}

export async function type(
	page: Page,
	selector: string,
	text: string,
	options?: KeyboardTypeOptions,
): Promise<void> {
	try {
		await page.waitForSelector(selector);
		await page.type(selector, text, options);
	} catch (error) {
		throw new Error(`Error to type text in the selector: ${selector}`);
	}
}

export async function select(
	page: Page,
	selector: string,
	...values: string[]
): Promise<void> {
	try {
		await page.waitForSelector(selector);
		await page.select(selector, ...values);
	} catch (error) {
		throw new Error(`Error to type text in the selector: ${selector}`);
	}
}

export async function getCount(page: Page, selector: string): Promise<number> {
	try {
		await page.waitForSelector(selector);

		const COUNT_ELEMENTS = await page.$$eval(
			selector,
			(elements): number => elements.length,
		);

		return COUNT_ELEMENTS;
	} catch (error) {
		throw new Error(`Error to type text in the selector: ${selector}`);
	}
}

export async function getText(page: Page, selector: string): Promise<string> {
	try {
		await page.waitForSelector(selector);

		const TEXT = await page.$eval(selector, (element): string => {
			const CONTENT = element.textContent;

			if (!CONTENT) {
				throw new Error(
					`Could not find text in the selector: ${selector}`,
				);
			}

			return CONTENT;
		});

		return TEXT;
	} catch (error) {
		couldNotFindSelectorErrorMessage(selector);
	}
}
