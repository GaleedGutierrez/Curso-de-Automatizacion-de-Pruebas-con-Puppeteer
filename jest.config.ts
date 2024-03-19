/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
	preset: 'jest-puppeteer',
	// testEnvironment: 'node',
	setupFilesAfterEnv: ['expect-puppeteer'],
	globalSetup: 'jest-environment-puppeteer/setup',
	globalTeardown: 'jest-environment-puppeteer/teardown',
	testEnvironment: 'jest-environment-puppeteer',
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.json',
		},
	},
	bail: 5,
	moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
	reporters: [
		'default',
		[
			'./node_modules/jest-html-reporter',
			{
				pageTitle: 'Test Report',
			},
		],
	],
	// reporters: ['default', ['jest-junit', { suiteName: 'jest tests' }]],
	// reporters: [
	// 	[
	// 		'jest-silent-reporter',
	// 		{ useDots: true, showPaths: true, showWarnings: true },
	// 	],
	// ],
	// clearMocks: true,
	// collectCoverage: true,
	// coverageDirectory: 'coverage',
	// coverageProvider: 'v8',
};

export default config;
