module.exports = {
    clearMocks: true,
    collectCoverage: false,
    collectCoverageFrom: ["src/modules/**"],
    coverageDirectory: "coverage",
    modulePaths: ["<rootDir>/src/"],
    testEnvironment: "node",
    testMatch: ["**/test/**/*.test.ts?(x)"],
    moduleFileExtensions: [
      "ts",
      "tsx",
      "js"
    ],
    coverageThreshold: {
      global: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
    preset: "ts-jest",
    globals: {
      "ts-jest": {
        tsConfig: "tsconfig.json",
        diagnostics: false,
      },
    },
    coveragePathIgnorePatterns: [
       "/node_modules/"
    ]
  };