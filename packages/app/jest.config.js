/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
// jest.config.js
const base = require('../../jest.config')
const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig')

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  ...base,
  testEnvironment: 'jsdom',

  displayName: {
    name: 'app',
    color: 'blue',
  },

  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': '@vue/vue2-jest',
  },

  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue',
  ],

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),

  setupFiles: ['<rootDir>/src/jest.setup.ts'],
}