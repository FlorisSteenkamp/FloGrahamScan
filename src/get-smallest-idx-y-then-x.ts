
/**
 * @internal
 */
function getSmallestIdxYThenX(ps: number[][]): number | undefined {
	let smallest = [
		Number.POSITIVE_INFINITY, 
		Number.POSITIVE_INFINITY
	];
	let smallestI: number | undefined = undefined;
	for (let i=0; i<ps.length; i++) {
		const y = ps[i][1];
		if ((y < smallest[1]) || 
		    (y === smallest[1] && ps[i][0] < smallest[0])) {

			smallestI = i;
			smallest = ps[i];
		}
	}	
	
	return smallestI;
}


export { getSmallestIdxYThenX }
