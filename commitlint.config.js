/** @type {import('@commitlint/types').UserConfig}  */
const Configuration = {
	extends: ['@commitlint/config-conventional'],
	formatter: '@commitlint/format',
};

module.exports = Configuration;
