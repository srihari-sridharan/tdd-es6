// Mocha allows us to define regerator runtime
// and refer it. We can be sure that it is loaded
// and available while running tests.

// Tell mocha about this file so that it loads
// it before any other file.
import "regenerator-runtime/runtime";

// Modify the npm test command in package.json to be shown as below:
// "test": "npx mocha \"src/**/*.test.js\" --recursive --require @babel/register --file src/mocha-setup.js"

import chai from "chai";
import chaiExclude from "chai-exclude";
chai.use(chaiExclude);
