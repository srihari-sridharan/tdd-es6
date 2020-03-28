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