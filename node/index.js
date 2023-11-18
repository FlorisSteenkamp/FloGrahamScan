import { orient2d } from 'big-float-ts';
import { getSmallestIdxYThenX } from './get-smallest-idx-y-then-x.js';
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
function grahamScan(ps) {
    const n = ps.length;
    if (n === 0) {
        return undefined;
    }
    const ps_ = ps.slice();
    const idx = getSmallestIdxYThenX(ps_);
    const [p] = ps_.splice(idx, 1);
    ps_.sort((a, b) => {
        let res = -orient2d(p, a, b);
        if (res !== 0) {
            return res;
        }
        res = a[1] - b[1];
        if (res !== 0) {
            return res;
        }
        return a[0] - b[0];
    });
    ps_.unshift(p);
    let stack = [];
    for (const p of ps_) {
        while (stack.length > 1) {
            const r = orient2d(stack[stack.length - 2], stack[stack.length - 1], p) <= 0;
            if (!r) {
                break;
            }
            stack.pop();
        }
        stack.push(p);
    }
    const len = stack.length;
    const stack_ = [stack[0]];
    for (let i = 1; i < len; i++) {
        const pS = stack[(i - 1) % len];
        const pM = stack[(i) % len];
        const pE = stack[(i + 1) % len];
        if (orient2d(pS, pM, pE) !== 0 || dot(pS, pM, pE) < 0) {
            stack_.push(pM);
        }
    }
    return stack_;
}
/**
 * No need to be accurate
 */
function dot(p1, p2, p3) {
    const v1x = p2[0] - p1[0];
    const v1y = p2[1] - p1[1];
    const v2x = p3[0] - p2[0];
    const v2y = p3[1] - p2[1];
    return v1x * v2x + v1y * v2y;
}
export { grahamScan };
//# sourceMappingURL=index.js.map