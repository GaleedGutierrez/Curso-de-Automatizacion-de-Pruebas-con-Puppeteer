import { LoginPage } from '@/page/LoginPage.ts';

const EMAIL = 'user@phptravels.com';
const PASSWORD = 'demouser';
const URL_DASHBOARD = 'https://phptravels.net/dashboard';
const URL_LOGIN = 'https://phptravels.net/login';
const TIMEOUT_JEST = 60000;
let loginPage: LoginPage;

jest.setTimeout(TIMEOUT_JEST);

describe('Login into PHP Travels', () => {
	beforeAll(() => {
		loginPage = new LoginPage();
	});

	test('Should go to the page', async () => {
		await loginPage.visit();

		const URL = page.url();

		expect(URL).toBe(URL_LOGIN);
	});

	test('Should fill out inputs', async () => {
		await loginPage.login(EMAIL, PASSWORD);
	});

	test('Should be into dashboard', async () => {
		await loginPage.validateLogin();

		const URL = page.url();

		expect(URL).toBe(URL_DASHBOARD);
	});
});
