export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/', // ← allow these packages to be transformed
  ],
  setupFiles: ['./jest.setup.js'],
};
