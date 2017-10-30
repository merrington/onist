const regexScore = [/[\-0-9]/, /[a-zA-OQ-Z]/, /P/];

function sort(items) {
    return items.sort((i1, i2) => {
        const firstChar1 = i1.charAt(0);
        const firstChar2 = i2.charAt(0);

        const firstScore1 = regexScore.findIndex(regex => regex.test(firstChar1));
        const firstScore2 = regexScore.findIndex(regex => regex.test(firstChar2));

        const diff = firstScore1 - firstScore2;
        if (diff !== 0) {
            return diff;
        }
        switch (firstScore1) {
            case 0:
            case 2:
                return i2.localeCompare(i1);
                break;
            case 1:
                return i1.localeCompare(i2);
                break;
        }
    });
}

module.exports = sort;