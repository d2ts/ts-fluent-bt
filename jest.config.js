module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@test/(.*)': '<rootDir>/tests/$1',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.spec.json',
    },
  },
}
