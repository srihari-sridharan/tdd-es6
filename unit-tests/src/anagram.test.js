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
