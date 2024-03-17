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
	// clearMocks: true,
	// collectCoverage: true,
	// coverageDirectory: 'coverage',
	// coverageProvider: 'v8',
};

export default config;
