
/**
 * In-place swap two elements in the given array.
 * @ignore
 */
function swap<T>(arr: T[], a: number, b: number): void {
	if (a === b) { return; }
	
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;	
}


export { swap }
