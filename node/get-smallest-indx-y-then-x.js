/**
 * @internal
 */
function getSmallestIndxYThenX(ps) {
    let smallest = [
        Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY
    ];
    let smallestI = undefined;
    for (let i = 0; i < ps.length; i++) {
        const y = ps[i][1];
        if ((y < smallest[1]) ||
            (y === smallest[1] && ps[i][0] < smallest[0])) {
            smallestI = i;
            smallest = ps[i];
        }
    }
    return smallestI;
}
export { getSmallestIndxYThenX };
//# sourceMappingURL=get-smallest-indx-y-then-x.js.map