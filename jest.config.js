export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@mswjs|msw|until-async)/)', // ← allow these packages to be transformed
  ],
  setupFiles: ['./jest.setup.js'],
};
