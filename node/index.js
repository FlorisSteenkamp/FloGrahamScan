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
 * @param ps a set of points
 * @param includeRedundantPoints set to `true` if all boundary points
 * should be returned, even redundant ones (except coincident points)
 */
function grahamScan(ps, includeRedundantPoints) {
    const n = ps.length;
    if (n === 0) {
        return undefined;
    }
    const _ps = ps.slice();
    const idx = getSmallestIdxYThenX(_ps);
    const [p] = _ps.splice(idx, 1);
    //-------------------------------------------------------------------------
    // Sort by orientation of `p` with the x-axis, then by Manhattan distance.
    //-------------------------------------------------------------------------
    _ps.sort((a, b) => {
        let res = -orient2d(p, a, b); // res: +tive if ⟳ => a > b
        if (res !== 0) {
            return res;
        }
        res = a[1] - b[1];
        if (res !== 0) {
            return res;
        }
        return a[0] - b[0]; // points are coincident
    });
    _ps.unshift(p);
    const ps_ = filterEqualPoints(_ps);
    //---------------------------------------
    // The core of the Graham scan algorithm
    //---------------------------------------
    const stack = [];
    for (const p of ps_) {
        while (stack.length >= 2) {
            const orientation = orient2d(stack[stack.length - 2], stack[stack.length - 1], p);
            const clockwise = orientation < 0;
            if (clockwise) {
                stack.pop();
            }
            else {
                break;
            }
        }
        stack.push(p);
    }
    if (includeRedundantPoints || stack.length < 3) {
        return stack;
    }
    const stack_ = [];
    {
        const len = stack.length;
        for (let i = 0; i < len; i++) {
            const _i = (i + len - 1) % len;
            const i_ = (i + 1) % len;
            const pS = stack[_i];
            const pM = stack[i];
            const pE = stack[i_];
            // The `dot` is to take care of lines back-overlapping themselves
            if (orient2d(pS, pM, pE) !== 0 || dot(pS, pM, pE) < 0) {
                stack_.push(pM);
            }
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
/**
 * * ps must be sorted
 *
 * @param ps
 */
function filterEqualPoints(ps) {
    const _ps = [ps[0]];
    const len = ps.length;
    for (let i = 1; i < ps.length; i++) {
        const _i = (i + len - 1) % len;
        const _p = ps[_i];
        const p = ps[i];
        if (_p[0] === p[0] && _p[1] === p[1]) {
            continue;
        }
        _ps.push(p);
    }
    return _ps;
}
export { grahamScan };
//# sourceMappingURL=index.js.map