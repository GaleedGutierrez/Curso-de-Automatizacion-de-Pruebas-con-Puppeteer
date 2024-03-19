import { MenuItemsLinks, NavBar } from '@/components/NavBar.ts';
import { FlightsPage } from '@/page/FlightsPage.ts';
import { LoginPage } from '@/page/LoginPage.ts';

let loginPage: LoginPage;
let flightPage: FlightsPage;
let navBar: NavBar;
const EMAIL = 'user@phptravels.com';
const PASSWORD = 'demouser';
const BASE_URL = new URL('https://phptravels.net');
const URL_LOGIN = new URL('/login', BASE_URL);
const URL_DASHBOARD = new URL('/dashboard', BASE_URL);
const URL_FLIGHTS = new URL('/flights', BASE_URL);
const TIMEOUT_JEST = 600000;

jest.setTimeout(TIMEOUT_JEST);

describe('Book flight', () => {
	beforeAll(() => {
		loginPage = new LoginPage();
		flightPage = new FlightsPage();
		navBar = new NavBar();
	});

	test('Should go to login page', async () => {
		await loginPage.visit();

		const URL = page.url();

		expect(URL).toBe(URL_LOGIN.href);
	});

	test('Should fill out inputs', async () => {
		await loginPage.login(EMAIL, PASSWORD);
	});

	test('Should be into dashboard', async () => {
		await loginPage.validateLogin();

		const URL = page.url();

		expect(URL).toBe(URL_DASHBOARD.href);
	});

	test('Should go to flight page', async () => {
		await navBar.validateNavBarIsPresent();
		await navBar.selectMenuItem(MenuItemsLinks.FLIGHTS);
		await page.waitForSelector('#one-way');

		const URL = page.url();

		expect(URL).toBe(URL_FLIGHTS.href);
	});

	// No pasa la prueba ya que la página es muuuuuy lenta.
	test('Should fill out search flight', async () => {
		await flightPage.selectFlight();
		await flightPage.validateFlightSearchPage();
	});
});
