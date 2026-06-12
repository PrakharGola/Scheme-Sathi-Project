module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/../tests/backend"],
  testMatch: ["<rootDir>/../tests/backend/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js", "json"]
};
