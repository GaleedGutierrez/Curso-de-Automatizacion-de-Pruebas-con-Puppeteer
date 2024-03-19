import { BasePage } from './BasePage.ts';

interface Inputs {
	from: { openSelect: string; selected: string };
	to: { openSelect: string; selected: string };
	departDate: string;
	passengers: { openSelect: string; plusAdult: string };
	search: string;
}

export class FlightsPage extends BasePage {
	inputs: Inputs;
	form: string;

	constructor() {
		super();
		this.form = 'form[data-select2-id="flights-search"]';
		this.inputs = {
			from: {
				openSelect: 'span[data-select2-id="2"] span[role="combobox"]',
				selected: 'div.most--popular-from',
			},
			to: {
				openSelect: 'span[data-select2-id="5"] span[role="combobox"]',
				selected: 'div.most--popular-to',
			},
			departDate: '#departure',
			passengers: {
				openSelect: 'a[data-toggle="dropdown"]',
				plusAdult: '#fadults + div',
			},
			search: 'button#flights-search',
		};
	}

	async validatePage(): Promise<void> {
		await page.waitForNavigation({
			waitUntil: 'networkidle2',
		});
		await page.waitForSelector(this.form);
	}

	async selectFlight(): Promise<void> {
		const { inputs } = this;

		await this.click(inputs.from.openSelect);

		// Flight From

		const SELECT_FROM = await page.$(inputs.from.selected);
		const SELECTED_FROM = await SELECT_FROM?.$(':scope div');

		await SELECTED_FROM?.click();

		// Flight to
		await this.click(inputs.to.openSelect);

		const SELECT_TO = await page.$(inputs.to.selected);
		const SELECTED_TO = await SELECT_TO?.$(':scope div');

		await SELECTED_TO?.click();

		// Depart Date
		const INPUT_DEPART_DATE = await page.$(inputs.departDate);

		await INPUT_DEPART_DATE?.click({ count: 3 });
		await this.type(inputs.departDate, '14-06-2024');
		// Passengers
		await this.click(inputs.passengers.openSelect);
		await this.click(inputs.passengers.plusAdult);
		await this.click(inputs.search);
	}

	async validateFlightSearchPage(): Promise<void> {
		await page.waitForSelector('button[data-value="asc"]');
		await page.waitForSelector('input[data-ref="range-slider-a"]');
	}
}
