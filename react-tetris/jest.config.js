module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '\\.(test|spec)\\.ts?x$',

  //   modulePathIgnorePatterns: ['src/spec', 'dist'],
  modulePathIgnorePatterns: ['dist'],
  coverageReporters: ['html', 'json-summary'],
  name: 'lint',
  displayName: 'lint',
  maxConcurrency: 10,
  maxWorkers: '70%',

  moduleFileExtensions: ['js', 'ts', 'jsx', 'tsx'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  //   setupFiles: ['<rootDir>/configs/jest/setEnvVars.ts', '<rootDir>/jest.polyfills.js'],

  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
};
