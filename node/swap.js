"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swap = void 0;
/**
 * In-place swap two elements in the given array.
 * @ignore
 */
function swap(arr, a, b) {
    if (a === b) {
        return;
    }
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}
exports.swap = swap;
//# sourceMappingURL=swap.js.map