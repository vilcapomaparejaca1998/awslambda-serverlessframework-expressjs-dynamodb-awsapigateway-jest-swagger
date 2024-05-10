module.exports = {
  testEnvironment: 'node',  
  transform: {
    '^.+\\.ts$': 'ts-jest', 
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  testTimeout: 30000 
};
