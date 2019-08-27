
// As of 2018-10-16, Chrome release 70, all major browsers has stable-sort so
// we can just use the built-in sort. Also, the ECMAScript 2019 now requires
// a stable sort when using Array.sort.

/**
 * Returns a stable sorted array from the given array.
 * @ignore
 *//*
function stableSort<T>(arr: T[], f: (a: T, b: T) => number): T[] {
	let indxArray = [];
	for (let i=0; i<arr.length; i++) {
		indxArray.push(i);
	}
	
	indxArray.sort(function(a: number, b: number): number {
		let res = f(arr[a], arr[b]);
		
		if (res !== 0) {
			return res; 
		}
		
		return a-b;
	});
	
	let sorted: T[] = [];
	for (let i=0; i<arr.length; i++) {
		sorted.push(arr[indxArray[i]]);
	}
	
	return sorted;
}


export { stableSort }*/
