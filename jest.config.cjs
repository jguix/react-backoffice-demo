module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper:{
    "\\.(css|less|scss|sass)$": "identity-obj-proxy" 
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@bundled-es-modules|axios)',
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
