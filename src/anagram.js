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