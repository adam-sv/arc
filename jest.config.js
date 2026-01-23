/** @type {import('jest').Config} */
export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  rootDir: './src',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // Shortcut our Library
    '@adam-sv/arc': '<rootDir>/lib/index.ts',
    // Handle worker syntax
    '\\?worker.*$': '<rootDir>/test-helpers/workerMock.ts',
    // Ignore CSS/SASS
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
};
