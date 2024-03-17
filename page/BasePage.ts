import { ClickOptions, KeyboardTypeOptions } from 'puppeteer';

export class BasePage {
	getUrl(): string {
		return page.url();
	}

	async waitForATime(time: number): Promise<void> {
		await new Promise((resolve) => {
			setTimeout(resolve, time);
		});
	}

	async getTitle(): Promise<string> {
		return await page.title();
	}

	async getText(selector: string): Promise<string> {
		try {
			await page.waitForSelector(selector);

			const TEXT = await page.$eval(
				selector,
				(element) => element.textContent,
			);

			if (!TEXT) {
				throw new Error(`Could not find text in selector: ${selector}`);
			}

			return TEXT;
		} catch (error) {
			throw new Error(
				`Could not find element with selector: ${selector}`,
			);
		}
	}

	async getAttribute(selector: string, attribute: string): Promise<string> {
		try {
			await page.waitForSelector(selector);

			const TEXT = await page.$eval(selector, (element) =>
				element.getAttribute(attribute),
			);

			if (!TEXT) {
				throw new Error(
					`Could not find attribute in selector: ${selector}`,
				);
			}

			return TEXT;
		} catch (error) {
			throw new Error(
				`Could not find element with selector: ${selector}`,
			);
		}
	}

	async getValue(selector: string): Promise<string | number> {
		try {
			await page.waitForSelector(selector);

			const COUNT_ELEMENTS = await page.$eval(selector, (element) => {
				const HAS_VALUE_ATTRIBUTE =
					element instanceof HTMLButtonElement ||
					element instanceof HTMLDataElement ||
					element instanceof HTMLInputElement ||
					element instanceof HTMLLIElement ||
					element instanceof HTMLMeterElement ||
					element instanceof HTMLOptionElement ||
					element instanceof HTMLProgressElement;

				if (!HAS_VALUE_ATTRIBUTE) {
					throw new Error(
						`The element with selector ${selector} has not "value" attribute`,
					);
				}

				return element.value;
			});

			return COUNT_ELEMENTS;
		} catch (error) {
			throw new Error(
				`Could not find element with selector: ${selector}`,
			);
		}
	}

	async getCount(selector: string): Promise<number> {
		try {
			await page.waitForSelector(selector);

			const COUNT = await page.$$eval(
				selector,
				(element) => element.length,
			);

			if (!COUNT) {
				throw new Error(
					`Could not find attribute in selector: ${selector}`,
				);
			}

			return COUNT;
		} catch (error) {
			throw new Error(
				`Could not find elements with selector: ${selector}`,
			);
		}
	}

	async click(selector: string, options?: ClickOptions): Promise<void> {
		try {
			await page.waitForSelector(selector);
			await page.click(selector, options);
		} catch (error) {
			throw new Error(`Could not click in selector: ${selector}`);
		}
	}

	async doubleClick(selector: string, options?: ClickOptions): Promise<void> {
		try {
			await page.waitForSelector(selector);
			await page.click(selector, { ...options, count: 2 });
		} catch (error) {
			throw new Error(`Could not double click in selector: ${selector}`);
		}
	}

	async type(
		selector: string,
		text: string,
		options?: KeyboardTypeOptions,
	): Promise<void> {
		try {
			await page.waitForSelector(selector);
			await page.type(selector, text, options);
		} catch (error) {
			throw new Error(`Could not write in selector: ${selector}`);
		}
	}

	async select(selector: string, ...values: string[]): Promise<void> {
		try {
			await page.waitForSelector(selector);
			await page.select(selector, ...values);
		} catch (error) {
			throw new Error(`Error to type text in the selector: ${selector}`);
		}
	}
}
