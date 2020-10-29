module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testMatch: ["<rootDir>/src/**/*.test.tsx"],
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/styleMock.js",
  },
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!<rootDir>/src/**/*.d.ts",
    "!<rootDir>/src/common/test-utils/**"
  ]
};
