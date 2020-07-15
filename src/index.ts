
import { orient2d } from 'big-float-ts';
import { getSmallestIndxYThenX } from './get-smallest-indx-y-then-x';
import { swap } from './swap';


/** 
 * Finds the convex hull of the given set of 2d points using the   
 * Graham Scan algorithm and returns the hull as an array of points.
 * See https://en.wikipedia.org/wiki/Graham_scan
 * 
 * Robust: This algorithm is robust via adaptive infinite precision floating
 * point arithmetic.
 * @param ps A set of points
 * @param includeAllBoundaryPoints Set this to true to if all boundary points
 * should be returned, even redundant ones - defaults to false
 */
function grahamScan(
		ps: number[][], 
		includeAllBoundaryPoints: boolean = false): number[][] | undefined {
		
	if (!ps.length) { return undefined; }

	function fail(p1: number[], p2: number[], p3: number[]) {
		let res = orient2d(p1, p2, p3);
		return includeAllBoundaryPoints
			? res < 0
			: res <= 0;
	}

	let ps_ = ps.slice();
	let n = ps_.length;

	let idx = getSmallestIndxYThenX(ps_)!;

	let [p] = ps_.splice(idx, 1);

	ps_.sort((a,b) => {
		let res = -orient2d(p, a , b);
		if (res !== 0) { return res; }
		res = a[1] - b[1];
		if (res !== 0) { return res; }
		
		return a[0] - b[0];
	});

	ps_.unshift(p);

	let m = 1;
	for (let i=2; i<n; i++) {
		while (fail(ps_[m-1], ps_[m], ps_[i])) {
			if (m > 1) {
				m -= 1
				continue;
			} else if (i === n-1) {
				m -= 1
				break;
			} else {
				i += 1;
			}
		}
		
		m += 1;
		swap(ps_, m, i);
	}

	return ps_.slice(0, m+1);
}


export { grahamScan }
