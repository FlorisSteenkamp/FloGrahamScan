/**
 * Finds the convex hull of the given set of 2d points using the
 * Graham Scan algorithm and returns the hull as an array of points.
 * See https://en.wikipedia.org/wiki/Graham_scan
 *
 * Robust: This algorithm is robust via adaptive infinite precision floating
 * point arithmetic.
 *
 * @param ps A set of points
 * @param includeAllBoundaryPoints Set this to true to if all boundary points
 * should be returned, even redundant ones - defaults to `false`
 */
declare function grahamScan(ps: number[][], includeAllBoundaryPoints?: boolean): number[][] | undefined;
export { grahamScan };
