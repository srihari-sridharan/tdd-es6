# Test Driven Development in ES6

## Introduction

This chapter covers the basics of test driven development using ES6. We will implement a simple letter counter that counts the number of letters in a string and returns us the result. Let us implement this using test driven development approach.

## What is TDD?

Writing test for production code before writing actual production code.

### Things to keep in mind

1. The goal of TDD is code quality.
2. There are good and bad tests.
3. There are many different opinions about the right way to do TDD.

### Advantages

1. TDD forces us to clarify our thinking - also improves the understanding of the problem.
2. TDD improves communication between developers.
3. TDD improves the structure of the production code. "Code that is easier to test is better structured!"
4. Allow developers to make worry-free changes.

### Disadvantages

1. TDD takes longer at first - that said, write tests now or track bugs later.
2. TDD isn't always a favorite with management.
3. Beware of writing bad tests (poor return on investment in terms of time spent and effort involved.)

It is certain that the advantages are greater than the so called disadvantages!

## Red - Green - Refactor

We will quickly touch upon the Red - Green - Refactor cycle.

1. **Red:** Write a failing test
2. **Green:** Write production code to make the test pass. This might involve two steps:

   a. Passing the build by adding the necessary code, but test still fails.

   b. Passing the test by writing just enough code to pass the test.

3. **Refactor:** Refactor and cleanup the code. Run tests after every change to ensure that it passes. This is the step to find optimal solution and fine tune the use of algorithms.

## Writing good / effective tests

Good tests have four important qualities represented by the mnemonic RITE!

- **R**eadable: Good tests should be more readable than their production code.
- **I**solated: Code in one test cannot affect the other test. Means, tests can get executed in any order, there should not be any dependency in execution order.
- **T**horough: Test cases should be thorough in the sense, all edge cases and inputs (valid/invalid) should be tested.
- **E**xplicit: All information is accessible to those looking at tests and tests should have no shared-state.

Remember the code quality standards/checks for tests should be the same or even one level above production code. The moment code quality for tests reduces, developers stop writing/updating tests, and rest is history!

## Environment Setup

Now that we have seen enough of concepts, let us jump into doing test driven development. Before we write any code, let us spend sometime to setup the environment. We will be using Node.js as our environment for running ES6 code. To setup the environment please perform the following steps:

1. Create a new folder named tdd-es6 anywhere in your machine.
2. Open this folder using Visual Studio Code. Note: VS Code is my IDE of choice.
3. Open the terminal, ensure that you are in the folder tdd-es6
4. Execute the command: `npm init -y` - this command initializes the package.json inside the tdd-es6 folder.
5. Execute the command: `npm i --saved-dev mocha chai` - this downloads the mocha and chai libraries and updates the list of development dependencies in package.json.
6. Execute the command: `npm i --save-dev @babel/core @babel/preset-env @babel/register` - this downloads the babel transpiler to be used for transpiling ES6 to JavaScript.
7. Create a new folder named `src` inside `tdd-es6` folder and add two files named `letter-count.js` and `letter-count.test.js`, these files will contain the source code and the tests respectively.
8. Add a `.babelrc` file inside `src` and add the following contents.

   Contents of `.babelrc`

   ```JavaScript
   {
       "presets": [
           "@babel/preset-env"
       ]
   }
   ```

9. Update the `test` command in `package.json` as shown below, to run tests using mocha: **`npx mocha "src/**/_.test.js" --recursive --require @babel/register`**. This command runs all the files ending with`_.test.js`.

   Contents of `package.json`

   ```JavaScript
   {
       "name": "tdd-es6",
       "version": "1.0.0",
       "description": "",
       "main": "index.js",
       "scripts": {
           "test": "npx mocha \"src/**/*.test.js\" --recursive --require @babel/register"
       },
       "keywords": [],
       "author": "",
       "license": "ISC",
       "dependencies": {
           "chai": "^4.2.0",
           "mocha": "^7.1.1"
       },
       "devDependencies": {
           "@babel/core": "^7.8.7",
           "@babel/preset-env": "^7.8.7",
           "@babel/register": "^7.8.6"
       }
   }
   ```

At this point you are all set to start your test driven development journey!

## Requirements

Our letter counter program will return the number of letters in a given string as an object.

1. If the input is an empty string `''` it will return an empty `{}`.
2. If the input is `'bat'` it returns an object `{ b: 1, a: 1, t:1 }`.
3. If the input is `'commit'` it returns an object `{c: 1, o: 1, m: 2, i: 1, t: 1}`.

The program should consider other edge cases if any.

## Writing your first test (before writing actual code)

Write the tests in `letter-count.test.js`. Let us assume our function is going to be named `getLetterCount` and it is present in `'./letter-count.js'`. The `import` statement will look as shown below:

```JavaScript
import { getLetterCount } from './letter-count';
```

Of course this is a clear deviation from what you might be used to, here we try to _'program by intention'_ as explained by _Allan Shalloway_ et. al. in their book **'Essential Skills for the Agile Developer: A Guide to Better Programming and Design'**.

Let us write our first test using the `describe()` hook. The `describe()` hook is a function that takes in a string description and a callback function.

```JavaScript
describe('<SOME_DESCRIPTION>', () => {
    //This is a callback function
});
```

We can use describe to group individual test cases. Write a `describe()` hook as shown below:

```JavaScript
describe('Testing the basic functionality of "getLetterCount":', () => {

});
```

Let us write a `it()` hook. This represents an individual test case. The syntax is similar to that of `describe()` hook.

```JavaScript
it('<SOME_DESCRIPTION>', () => {
    //This is a callback function
});
```

## RED

Let us write our first test case as an `it()` hook, inside the `describe()` hook. Our first requirement is to return an empty object `{}` incase of empty string `''` input. However, to compare the expected and actual results we need to import the assertion function `expect` from chai.

So add an import statement at the top of the file, and implement the test as shown below. Let us use `expect` to do a deep compare between expected result and actual result.

```JavaScript
import { getLetterCount } from './letter-count';
import { expect } from 'chai';

describe('Testing the basic functionality of "getLetterCount":', () => {
    it('returns an empty object when passed an empty string', () => {
        const expected = {};
        const actual = getLetterCount('');
        expect(actual).to.deep.equal(expected);
    });
});
```

Note the line `expect(actual).to.deep.equal(expected);` we perform a `deep.equal`, if we ignore the `deep` call, we might end up comparing the object references and it will fail at all times.

At this point, we have completed the '**RED**' step discussed earlier.

Running the test using command `npm run test` will result in the following error:

```
PS C:\tdd-es6> npm run test

> tdd-es6@1.0.0 test C:\tdd-es6
> npx mocha "src/**/*.test.js" --recursive --require @babel/register



  Testing the basic functionality of "getLetterCount":
    1) returns an empty object when passed an empty string


  0 passing (17ms)
  1 failing

  1) Testing the basic functionality of "getLetterCount":
       returns an empty object when passed an empty string:
     TypeError: (0 , _letterCount.getLetterCount) is not a function
      at Context.<anonymous> (src/letter-count.test.js:7:24)
      at processImmediate (internal/timers.js:439:21)
```

## GREEN

Let us write the 'minimal' production code required to pass this test. The first step is to resolve the build error. The `letter-count.js` contains the production code.

```JavaScript
export const getLetterCount = (input) => {

};
```

Running the test using `npm run test` produces the following result:

```
PS C:\tdd-es6> npm run test

> tdd-es6@1.0.0 test C:\tdd-es6
> npx mocha "src/**/*.test.js" --recursive --require @babel/register



  Testing the basic functionality of "getLetterCount":
    1) returns an empty object when passed an empty string


  0 passing (12ms)
  1 failing

  1) Testing the basic functionality of "getLetterCount":
       returns an empty object when passed an empty string:
     AssertionError: expected undefined to deeply equal {}
      at Context.<anonymous> (src/letter-count.test.js:8:32)
      at processImmediate (internal/timers.js:439:21)
```

Now the function `getLetterCount` is present, i.e. the interpreter error is resolved and it fails the test.

Let us implement the code to pass the test.

```JavaScript
export const getLetterCount = (input) => {
    if (!input) {
        return {};
    }
};
```

Running the test using `npm run test` passes the test.

```
PS C:\tdd-es6> npm run test

> tdd-es6@1.0.0 test C:\tdd-es6
> npx mocha "src/**/*.test.js" --recursive --require @babel/register



  Testing the basic functionality of "getLetterCount":
    √ returns an empty object when passed an empty string


  1 passing (17ms)
```

Kudos, you have written the minimal production code required to pass the test.

### RED -> GREEN -> REFACTOR

At this point you can continue to '**REFACTOR**' if needed else you can proceed with writing the next failing test to implement other requirements.

As such we have written very little code that demands refactoring. Let us proceed with writing the next failing test.

## RED #2

The next requirement is, if the input is `'bat'` it returns an object `{ b: 1, a: 1, t:1 }`.

The test looks as shown below, as in the case of previous test write this test inside the `describe`'s callback.

If you had followed all along, the content of `letter-count.test.js` looks like:

```JavaScript
import { getLetterCount } from './letter-count';
import { expect } from 'chai';

describe('Testing the basic functionality of "getLetterCount":', () => {
    it('returns an empty object when passed an empty string', () => {
        const expected = {};
        const actual = getLetterCount('');
        expect(actual).to.deep.equal(expected);
    });

    it('return an object with letter count for a string with non repeating characters', () => {
        const expected = { b: 1, a: 1, t: 1 };
        const actual = getLetterCount('bat');
        expect(actual).to.deep.equal(expected);
    });
});
```

Now, running this test using `npm run test` fails the test as shown below:

```
PS C:\tdd-es6> npm run test

> tdd-es6@1.0.0 test C:\tdd-es6
> npx mocha "src/**/*.test.js" --recursive --require @babel/register



  Testing the basic functionality of "getLetterCount":
    √ returns an empty object when passed an empty string
    1) return an object with letter count for a string with non repeating characters


  1 passing (17ms)
  1 failing

  1) Testing the basic functionality of "getLetterCount":
       return an object with letter count for a string with non repeating characters:
     AssertionError: expected undefined to deeply equal { b: 1, a: 1, t: 1 }
      at Context.<anonymous> (src/letter-count.test.js:14:32)
      at processImmediate (internal/timers.js:439:21)
```

Note that first test passed while the new test failed. Let us write the minimal production code required to pass this test.

## GREEN #2

Let us loop through the letters in the string and construct a map of characters with count set to 1.

The code in `letter-count.js` looks as shown below:

```JavaScript
export const getLetterCount = (input) => {
    if (!input) {
        return {};
    }

    const result = {};
    const letters = input.split('');
    letters.forEach(letter => {
        result[letter] = 1;
    });

    return result;
};
```

Run the tests and verify the result `npm run test`:

```
PS C:\tdd-es6> npm run test

> tdd-es6@1.0.0 test C:\tdd-es6
> npx mocha "src/**/*.test.js" --recursive --require @babel/register



  Testing the basic functionality of "getLetterCount":
    √ returns an empty object when passed an empty string
    √ return an object with letter count for a string with non repeating characters


  2 passing (10ms)
```

## RED #3

Now, let us implement the final requirement, if the input is `'commit'` it returns an object `{c: 1, o: 1, m: 2, i: 1, t: 1}`.

The test case for this requirement looks as shown below, if you were following the steps all along, your `letter-count.test.js` file looks like:

```JavaScript
import { getLetterCount } from './letter-count';
import { expect } from 'chai';

describe('Testing the basic functionality of "getLetterCount":', () => {
    it('returns an empty object when passed an empty string', () => {
        const expected = {};
        const actual = getLetterCount('');
        expect(actual).to.deep.equal(expected);
    });

    it('return an object with letter count for a string with non repeating characters', () => {
        const expected = { b: 1, a: 1, t: 1 };
        const actual = getLetterCount('bat');
        expect(actual).to.deep.equal(expected);
    });

    it('return the correct letter count for a word with multiple letters', () => {
        const expected = { c: 1, o: 1, m: 2, i: 1, t: 1 };
        const actual = getLetterCount('commit');
        expect(actual).to.deep.equal(expected);
    });
});
```

Running `npm run test` gives the result below. The two tests that we wrote earlier pass and the new test fails.

```
PS C:\tdd-es6> npm run test

> tdd-es6@1.0.0 test C:\tdd-es6
> npx mocha "src/**/*.test.js" --recursive --require @babel/register



  Testing the basic functionality of "getLetterCount":
    √ returns an empty object when passed an empty string
    √ return an object with letter count for a string with non repeating characters
    1) return the correct letter count for a word with multiple letters


  2 passing (31ms)
  1 failing

  1) Testing the basic functionality of "getLetterCount":
       return the correct letter count for a word with multiple letters:

      AssertionError: expected { c: 1, o: 1, m: 1, i: 1, t: 1 } to deeply equal { c: 1, o: 1, m: 2, i: 1, t: 1 }
      + expected - actual

       {
         "c": 1
         "i": 1
      -  "m": 1
      +  "m": 2
         "o": 1
         "t": 1
       }

      at Context.<anonymous> (src/letter-count.test.js:20:32)
      at processImmediate (internal/timers.js:439:21)
```

## GREEN #3

Let us fix our implementation to handle repeated characters. The logic is to initialize the count when the letter is not in the result and increment it when it is present. The implementation looks like:

```JavaScript
export const getLetterCount = (input) => {
    if (!input) {
        return {};
    }

    const result = {};
    const letters = input.split('');
    letters.forEach(letter => {
        if (!result[letter]) {
            result[letter] = 1;
        }
        else {
            result[letter]++;
        }
    });

    return result;
};
```

Now, let us run the tests using `npm run test` and all tests pass.

```
PS C:\tdd-es6> npm run test

> tdd-es6@1.0.0 test C:\tdd-es6
> npx mocha "src/**/*.test.js" --recursive --require @babel/register



  Testing the basic functionality of "getLetterCount":
    √ returns an empty object when passed an empty string
    √ return an object with letter count for a string with non repeating characters
    √ return the correct letter count for a word with multiple letters


  3 passing (9ms)
```

## REFACTOR

Now that we have implemented the letter counter, let us considering refactoring our implementation.

Looks like we move the declaration for `result` and use it in the first if condition to return the empty object.

```JavaScript
export const getLetterCount = (input) => {
    const result = {};
    if (!input) {
        return result;
    }

    const letters = input.split('');
    // Rest of the implementation...
    return result;
};
```

Ensure that you run the unit tests after every incremental change and verify that all the tests pass. After this change all tests pass.

Next, let us refactor the `foreach`'s callback!

```JavaScript
letters.forEach(letter => {
    if (!result[letter]) {
        result[letter] = 1;
    }
    else {
        result[letter]++;
    }
});
```

We can use the JavaScript's logical OR `||` operator and get rid of the `if-else` construct. The change looks like.

```JavaScript
letters.forEach(letter => {
    result[letter] = result[letter] || 0;
    result[letter]++;
});
```

We initialize the value for a letter to 0 if it is not present, if it is present, we increment that by 1. Simple, isn't it?

Now after the change the code looks like,

```JavaScript
export const getLetterCount = (input) => {
    const result = {};
    if (!input) {
        return result;
    }

    const letters = input.split('');
    letters.forEach(letter => {
        result[letter] = result[letter] || 0;
        result[letter]++;
    });

    return result;
};
```

Running the tests using `npm run test` gives the following result:

```
PS C:\tdd-es6> npm run test

> tdd-es6@1.0.0 test C:\tdd-es6
> npx mocha "src/**/*.test.js" --recursive --require @babel/register



  Testing the basic functionality of "getLetterCount":
    √ returns an empty object when passed an empty string
    √ return an object with letter count for a string with non repeating characters
    √ return the correct letter count for a word with multiple letters


  3 passing (47ms)
```

## More tests to cover edge cases

We wrote the tests for empty string, string with unique letters and strings with repetitive letters. Let us add couple of tests to see if `null` and `undefined` are handled by our implementation.

After adding the additional tests, the code in `letter-count.tests.js` looks like

```JavaScript
import { getLetterCount } from './letter-count';
import { expect } from 'chai';

describe('Testing the basic functionality of "getLetterCount":', () => {
    it('returns an empty object when passed an empty string', () => {
        const expected = {};
        const actual = getLetterCount('');
        expect(actual).to.deep.equal(expected);
    });

    it('return an object with letter count for a string with non repeating characters', () => {
        const expected = { b: 1, a: 1, t: 1 };
        const actual = getLetterCount('bat');
        expect(actual).to.deep.equal(expected);
    });

    it('return the correct letter count for a word with multiple letters', () => {
        const expected = { c: 1, o: 1, m: 2, i: 1, t: 1 };
        const actual = getLetterCount('commit');
        expect(actual).to.deep.equal(expected);
    });

    it('returns an empty object when passed in null', () => {
        const expected = {};
        const actual = getLetterCount(null);
        expect(actual).to.deep.equal(expected);
    });

    it('returns an empty object when passed in undefined', () => {
        const expected = {};
        const actual = getLetterCount(null);
        expect(actual).to.deep.equal(expected);
    });
});
```

Once we run the tests using `npm run test`, all the tests pass and our code elegantly handles the edge cases that we identified outside of the listed requirements.

```
PS C:\tdd-es6> npm run test

> tdd-es6@1.0.0 test C:\tdd-es6
> npx mocha "src/**/*.test.js" --recursive --require @babel/register



  Testing the basic functionality of "getLetterCount":
    √ returns an empty object when passed an empty string
    √ return an object with letter count for a string with non repeating characters
    √ return the correct letter count for a word with multiple letters
    √ returns an empty object when passed in null
    √ returns an empty object when passed in undefined


  5 passing (21ms)
```

## Exploring further using TDD

Let us attempt to solve another problem using TDD. The problem statement is given below:

Use the test-driven development approach to write a program to determine if two strings are anagrams. Consider the following test cases:

- Two strings are anagrams if they have letters the same count of letters, in a different order.
- Two strings aren't anagrams if they have a different count of letters.
- Anagrams are case insensitive and ignore spaces.

Try attempting this problem using TDD, as a clue consider using the `getLetterCount` function to solve this. The tests, code, and results are listed below. Kindly attempt this on your own.

Tests for checking anagrams.

```JavaScript
// anagram.test.js
import { areAnagrams } from './anagram';
import { expect } from 'chai';

describe('Testing to check if two strings are anagrams:', () => {
    it('Two strings are anagrams if they have the same set of letters', () => {
        const expected = true;
        const actual = areAnagrams('listen', 'silent');
        expect(actual).to.equal(expected);
    });

    it('Two strings are not anagrams if they don\'t have the same set of letters', () => {
        const expected = false;
        const actual = areAnagrams('listens', 'silent');
        expect(actual).to.equal(expected);
    });

    it('Anagrams are case insensitive', () => {
        const expected = true;
        const actual = areAnagrams('LISTEN', 'Silent');
        expect(actual).to.equal(expected);
    });

    it('Anagrams should not consider spaces in between', () => {
        const expected = true;
        const actual = areAnagrams('Conversation', 'Voices rant on');
        expect(actual).to.equal(expected);
    });
});
```

The code below lists the implementation.

```JavaScript
// anagram.js
import _ from 'underscore';
import { getLetterCount } from './letter-count';

export const areAnagrams = (string1, string2) => {
    // Case insensitive - convert to lowercase
    const letterCount1 = getLetterCount(string1.toLowerCase());
    const letterCount2 = getLetterCount(string2.toLowerCase());

    // Ignore spaces
    delete letterCount1[' '];
    delete letterCount2[' '];
    return _.isEqual(letterCount1, letterCount2);

};
```

Running `npm run test` gives the following result.

```
PS C:\tdd-es6> npm run test

> tdd-es6@1.0.0 test C:\tdd-es6
> npx mocha "src/**/*.test.js" --recursive --require @babel/register



  Testing to check if two strings are anagrams:
    √ Two strings are anagrams if they have the same set of letters
    √ Two strings are not anagrams if they don't have the same set of letters
    √ Anagrams are case insensitive
    √ Anagrams should not consider spaces in between

  Testing the basic functionality of "getLetterCount":
    √ returns an empty object when passed an empty string
    √ return an object with letter count for a string with non repeating characters
    √ return the correct letter count for a word with multiple letters
    √ returns an empty object when passed in null
    √ returns an empty object when passed in undefined
    √ return the correct letter count for a word with multiple letters


  10 passing (37ms)
```

Hope the above content served as gentle introduction to the TDD approach. Thanks for reading.

## Integration Tests

Integration tests ensure that all the units work correctly when integrated. Example: consider the pipelines to transfer water or oil, the individual pipes are tested to be leak free (unit tests) however while building a long pipeline, we need to ensure that the individual pipes are connected such that, there are no leaks! Working in isolation (unit tests) will not guarantee that our code will work when assembled.

In TDD integration tests guide us in the development of more complex systems. The integration tests have the same red - green - refactor cycle as unit tests, that said, it encompasses smaller unit testing cycles for red - green - refactor.

Test doubles are used in integration testing to make the tests faster when we interact with I/O boundaries (e.g. database). If tests are not faster, we will spend time running tests. Test doubles are fake version of operations or services, that execute much quickly. Our code will make calls to these test doubles. We can make test doubles of our own software. Simple rule of thumbb - 'Don't mock what you don't own!'

There are two categories of integration tests.

1. **Single Service Integration Tests** - Tests single piece, or 'service' of your application end to end, independent of other pieces. Note that these types of integration tests are suceptible to outside change. There is a possiblity that the external dependency changes and the tests still pass, but will fail in production when integrated.
2. **Boundary Integration Tests** - These tests, test the communication between different pieces of your application. We should not use test doubles for bounday integration tests. This ensures that the integration works as expected in real circumstances. Bounday tests are slower, but they are going to be fewer in number than the 'single service integration tests'.

## JavaScript Libraries for Integration Testing

- Mocha
- Chai
- Sinon
- Supertest
- Regenerator-Runtime - This is required for mocha to support async and await.
- Chai-Exclude - helps us exlude the \_id property returned by mongo (in data that is fetched from database.)
- npm install -g win-node-env

## Refactoring integration tests

- Use test helpers to simplify the tests.
- Use afterEach() to reset the database between tests.

## Code coverage

Use NYC for code coverage.
