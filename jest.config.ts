import type { Config } from 'jest';

const config: Config = {
    transform: { '^.+\\.ts?$': 'ts-jest', '\\.jsx?$': 'babel-jest' },
    testEnvironment: 'node',
    testRegex: '/src/.*\\.(test|spec)?\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    preset: 'ts-jest',
    moduleNameMapper: {
        '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    },
};

export default config;
