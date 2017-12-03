
import Vector from 'flo-vector2d';

const DELTA = 1e-10;


/**
 * Performs a functional stable sort on the given array and 
 * returns the newly sorted array.
 * @ignore
 */
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


/**
 * In-place swap two elements in the given array.
 * @ignore
 */
function swap<T>(arr: T[], a: number, b: number): T[] {
	if (a === b) { return; }
	
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;	
}


/**
 * @private
 */
function getSmallestIndxYThenX(ps: number[][]): number {
	let smallest = [
		Number.POSITIVE_INFINITY, 
		Number.POSITIVE_INFINITY
	];
	let smallestI;
	for (let i=0; i<ps.length; i++) {
		let y = ps[i][1];
		if ((y < smallest[1]) || 
		    (y === smallest[1] && ps[i][0] < smallest[0])) {
			smallestI = i;
			smallest = ps[i];
		}
	}	
	
	return smallestI;
}


/** 
 * <p>
 * Finds the convex hull of the given set of 2d points using the   
 * Graham Scan algorithm and returns the hull as an array of points. 
 * </p>
 * <p>
 * See https://en.wikipedia.org/wiki/Graham_scan
 * </p>
 * @param ps_ - A set of points
 * @param includeAllBoundaryPoints - Set this to true to if all boundary points
 * should be returned, even redundant ones - defaults to false
 * @param delta - Tolerance at which three points are considered collinear -
 * defaults to 1e-10
 */
function grahamScan(
        ps_: number[][], 
        includeAllBoundaryPoints: boolean = false, 
        delta: number = DELTA): number[][] {
            
   	includeAllBoundaryPoints = !!includeAllBoundaryPoints;

	function fail(p1: number[], p2: number[], p3: number[]) {
		let res = Vector.ccw(p1, p2, p3, delta); 
		if (includeAllBoundaryPoints) {
			return res < 0;
		}
		return res <= 0;
	}
	
	let ps = ps_.slice();
	let n = ps.length;
	
	let idx = getSmallestIndxYThenX(ps);
	
	let [p] = ps.splice(idx, 1);
	ps = stableSort(ps, function(a,b) {
		let res = Vector.cross(
				Vector.fromTo(p, b),
				Vector.fromTo(p, a)
		); 
		res = Math.abs(res) < delta ? 0 : res;
		if (res !== 0) { 
			return res; 
		}
		
		res = a[1] - b[1];
		res = Math.abs(res) < delta ? 0 : res;
		if (res !== 0) { 
			return res; 
		}
		
		return a[0] - b[0];
	});
	
	ps.unshift(p);

	let m = 1;
	for (let i=2; i<n; i++) {
	    while (fail(ps[m-1], ps[m], ps[i])) {
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
	    swap(ps, m, i);
	}
	
	return ps.slice(0, m+1);
}


export default grahamScan;