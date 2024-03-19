import { BasePage } from './BasePage.ts';

export class LoginPage extends BasePage {
	url: string;
	navBar: string;
	inputEmail: string;
	inputPassword: string;
	loginButton: string;
	profileLink: string;

	constructor() {
		super();
		this.url = 'https://phptravels.net/login';
		this.navBar = 'header';
		this.inputEmail = '#email';
		this.inputPassword = '#password';
		this.loginButton = '#submitBTN';
		this.profileLink = 'a[href="https://phptravels.net/profile"]';
	}

	async visit(): Promise<void> {
		const { url, navBar } = this;

		// page.setDefaultTimeout(10000000);
		await page.setViewport({
			width: 1280,
			height: 720,
			deviceScaleFactor: 1,
		});

		await page.goto(url);
		await page.waitForSelector(navBar);
	}

	async login(email: string, password: string): Promise<void> {
		const { inputEmail, inputPassword, loginButton } = this;

		await this.type(inputEmail, email);
		await this.type(inputPassword, password);
		await this.click(loginButton);
	}

	async validateLogin(): Promise<void> {
		const { navBar, profileLink } = this;

		await page.waitForSelector(navBar);
		await page.waitForSelector(profileLink);
	}
}
