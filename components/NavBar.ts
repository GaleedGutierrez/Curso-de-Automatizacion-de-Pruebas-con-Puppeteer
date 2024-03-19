import { BasePage } from '@/page/BasePage.ts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export enum MenuItemsLinks {
	FLIGHTS = 'flights',
	HOTELS = 'hotels',
	TOURS = 'tours',
	CARS = 'cars',
	BLOGS = 'blogs',
}

interface Menu {
	flights: string;
	hotels: string;
	tours: string;
	cars: string;
	blogs: string;
}

export class NavBar extends BasePage {
	navBar: string;
	menu: Menu;

	constructor() {
		super();
		this.navBar = 'header';
		this.menu = {
			flights: 'a[href="https://phptravels.net/flights"]',
			hotels: 'a[href="https://phptravels.net/hotels"]',
			tours: 'a[href="https://phptravels.net/tours"]',
			cars: 'a[href="https://phptravels.net/cars"]',
			blogs: 'a[href="https://phptravels.net/blogs"]',
		};
	}

	async validateNavBarIsPresent(): Promise<void> {
		await page.waitForSelector(this.navBar);
		await page.waitForSelector(this.menu.flights);
		await page.waitForSelector(this.menu.hotels);
		await page.waitForSelector(this.menu.tours);
		await page.waitForSelector(this.menu.cars);
		await page.waitForSelector(this.menu.blogs);
	}

	async selectMenuItem(menuItem: keyof Menu): Promise<void> {
		await this.click(this.menu[menuItem]);
	}
}
