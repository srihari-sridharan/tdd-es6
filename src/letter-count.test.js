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

    it('return the correct letter count for a word with multiple letters', () => {
        const expected = { m: 1, i: 4, s: 4, p: 2 };
        const actual = getLetterCount('mississippi');
        expect(actual).to.deep.equal(expected);
    });
});