
/**
 * In-place swap two elements in the given array.
 * 
 * @internal
 */
function swap<T>(arr: T[], a: number, b: number): void {
	if (a === b) { return; }
	
	const temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;	
}


export { swap }
