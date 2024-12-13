class KMPSearch {
    // Search frequency of pattern within a given string, returns the frequency of pattern
    static kmpSearch(pattern, toSearch) {
        if (pattern === "" || toSearch === "") return 0; 
        // if (!pattern.includes(toSearch)) return 0;


        let ret_val = 0;
        let piTable = [].concat(['x'],this.kmpTable(pattern));
        let patternArray = [].concat(['x'],[...pattern]);
        let toSearchArray = [...toSearch];

        // piTable search index
        let j = 0;
        // toSearch search index
        let i = 0

        while ((i < toSearchArray.length) ) {
            let currentChar = toSearchArray[i];
            let piTableChar = patternArray[j + 1];

            if (currentChar === piTableChar) {
                j++;
                i++;
                if (j >= (piTable.length  - 1)) {
                    ret_val++;
                    j = 0;
                }
            } else {
                if (j !== 0) {
                    j = piTable[j];
                }
                i++;
            } 
        }
        return ret_val;
    }

    // Generate Pi table from string; A table that recognizes patterns within substrings (e.x abcabcba = [0,0,0,1,2,3,0,1])
    static kmpTable(pattern) {
        let table = new Array(pattern.length).fill(0);
        let i = 1;
        let j = 0;

        while (i < pattern.length) {
            if (pattern[i] === pattern[j]) {
                table[i] = j + 1;
                i++;
                j++;
            } else {
                if (j !== 0) {
                    j = table[j - 1];
                } else {
                    table[i] = 0;
                    i++;
                }
            }
        }

        return table;
    }
}

export default KMPSearch