/**
 * In-place swap two elements in the given array.
 *
 * @internal
 */
function swap(arr, a, b) {
    if (a === b) {
        return;
    }
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}
export { swap };
//# sourceMappingURL=swap.js.map