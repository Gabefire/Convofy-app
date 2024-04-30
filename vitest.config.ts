/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",

  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webpw|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.ts",
    "\\.(css|less)$": "identity-obj-proxy",
    "\\.svg$": "<rootDir>/__mocks__/svgMock.ts",
  },
};
