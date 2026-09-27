var longestCommonPrefix = function(strs) {
    if (strs.length === 1) return strs[0];
    strs.sort();
    const first = strs[0];
    const last = strs[strs.length - 1];
    for (let i=0; i<first.length; i++) {
        if (first[i] !== last[i]) return first.slice(0,i);
    }
    return first;
};