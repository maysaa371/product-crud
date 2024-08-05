// jest.config.js

// jest.config.js
module.exports = {
    moduleFileExtensions: [
      'js',
      'json',
      'vue'
    ],
    transform: {
      '^.+\\.vue$': 'vue-jest',
      '^.+\\.js$': 'babel-jest'
    },
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.css$': 'identity-obj-proxy'
    },
    // Remove or comment out this line if you don’t need it
    // setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  };
  