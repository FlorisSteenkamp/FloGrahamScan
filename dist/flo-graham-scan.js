(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.FloGrahamScan = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Vector = require('flo-vector2d');

var DELTA = 1e-10;

/**
 * Performs a functional stable sort on the given array and 
 * returns the newly sorted array.
 * @ignore
 */
function stableSort(arr, f) {
	var indxArray = [];
	for (var i = 0; i < arr.length; i++) {
		indxArray.push(i);
	}

	indxArray.sort(function (a, b) {
		var res = f(arr[a], arr[b]);

		if (res !== 0) {
			return res;
		}

		return a - b;
	});

	var sorted = [];
	for (var _i = 0; _i < arr.length; _i++) {
		sorted.push(arr[indxArray[_i]]);
	}

	return sorted;
}

/**
 * In-place swap two elements in the given array.
 * @ignore
 */
function swap(arr, a, b) {
	if (a === b) {
		return;
	}

	var temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
}

/**
 * @ignore
 */
function getSmallestIndxYThenX(ps) {
	var smallest = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY];
	var smallestI = void 0;
	for (var i = 0; i < ps.length; i++) {
		var y = ps[i][1];
		if (y < smallest[1] || y === smallest[1] && ps[i][0] < smallest[0]) {
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
 * @param {number[][]} ps_ - A set of points
 * @param {boolean} includeAllBoundaryPoints - Set this to true to if all boundary points
 * should be returned, even redundant ones
 * @param {number} delta - Tolerance at which three points are considered collinear -
 * defaults to 1e-10
 * @returns {number[][]}
 */
function grahamScan(ps_, includeAllBoundaryPoints, delta) {

	delta = delta === undefined ? DELTA : delta;

	function fail(p1, p2, p3) {
		var res = Vector.ccw(p1, p2, p3, delta);
		if (includeAllBoundaryPoints) {
			return res < 0;
		}
		return res <= 0;
	}

	var ps = ps_.slice();
	var n = ps.length;

	var idx = getSmallestIndxYThenX(ps);

	var _ps$splice = ps.splice(idx, 1),
	    _ps$splice2 = _slicedToArray(_ps$splice, 1),
	    p = _ps$splice2[0];

	ps = stableSort(ps, function (a, b) {
		var res = Vector.cross(Vector.fromTo(p, b), Vector.fromTo(p, a));
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

	var m = 1;
	for (var i = 2; i < n; i++) {
		while (fail(ps[m - 1], ps[m], ps[i])) {
			if (m > 1) {
				m -= 1;
				continue;
			} else if (i === n - 1) {
				m -= 1;
				break;
			} else {
				i += 1;
			}
		}

		m += 1;
		swap(ps, m, i);
	}

	return ps.slice(0, m + 1);
}

module.exports = grahamScan;

},{"flo-vector2d":2}],2:[function(require,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.FloVector2d = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var DELTA = 1e-10;

/*
 * Purely functional 2d vector utilities.
 */
var Vector = {
	dot: dot,
	cross: cross,
	ccw: ccw,
	segSegIntersection: segSegIntersection,
	doesSegSegIntersect: doesSegSegIntersect,
	squaredDistanceBetween: squaredDistanceBetween,
	scale: scale,
	reverse: reverse,
	toUnitVector: toUnitVector,
	toLength: toLength,
	fromTo: fromTo,
	interpolate: interpolate,
	mean: mean,
	distanceBetween: distanceBetween,
	length: length,
	lengthSquared: lengthSquared,
	manhattanDistanceBetween: manhattanDistanceBetween,
	manhattanLength: manhattanLength,
	distanceBetweenPointAndLine: distanceBetweenPointAndLine,
	squaredDistanceBetweenPointAndLineSegment: squaredDistanceBetweenPointAndLineSegment,
	circumCenter: circumCenter,
	inCenter: inCenter,
	centroid: centroid,
	equal: equal,
	rotate: rotate,
	reverseRotate: reverseRotate,
	rotateBy90Degrees: rotateBy90Degrees,
	rotateByNeg90Degrees: rotateByNeg90Degrees,
	transform: transform,
	getClosestTo: getClosestTo,
	translatePoints: translatePoints,
	rotatePoints: rotatePoints,
	translateThenRotatePoints: translateThenRotatePoints,
	rotateThenTranslatePoints: rotateThenTranslatePoints

	/** 
  * Returns the dot (inner) product between two 2-vectors. 
  * @param {number} a - The first vector
  * @param {number} b - The second vector
  * @returns {number}
  */
};function dot(a, b) {
	return a[0] * b[0] + a[1] * b[1];
}

/** 
 * Returns the cross product signed magnitude between two 2-vectors.
 * @param {number} a - The first vector
 * @param {number} b - The second vector
 * @returns {number}
 */
function cross(a, b) {
	return a[0] * b[1] - a[1] * b[0];
}

/**
 * Three 2d points are a counter-clockwise turn if ccw > 0, 
 * clockwise if ccw < 0, and colinear if ccw = 0 because ccw is a 
 * determinant that gives twice the signed area of the triangle formed 
 * by p1, p2 and p3.
 * @param {number[]} p1 - The first point
 * @param {number[]} p2 - The second point
 * @param {number[]} p3 - The third point
 * @param {number} delta - The tolerance at which the three points are 
 * considered colinear - defaults to 1e-10
 * @returns {number}
 */
function ccw(p1, p2, p3, delta) {
	delta = delta === undefined ? DELTA : delta;

	var res = (p2[0] - p1[0]) * (p3[1] - p1[1]) - (p2[1] - p1[1]) * (p3[0] - p1[0]);

	return Math.abs(res) <= delta ? 0 : res;
}

/**
 * <p>
 * Finds the point where two 2d line segments intersect.
 * </p>
 * <p>
 * See <a href="http://algs4.cs.princeton.edu/91primitives">Geometric primitves</a>
 * </p> 
 * @param {number[][]} ab - The first line 
 * @param {number[][]} cd - The second line
 * @param {number} delta - The tolerance at which the lines are considered 
 * parallel - defaults to 1e-10
 * @returns {number[]} The point where the two line segments intersect  
 * or undefined if they don't intersect or a line if they intersect at 
 * infinitely many points. 
 */
function segSegIntersection(ab, cd, delta) {
	delta = delta === undefined ? DELTA : delta;

	var _ab = _slicedToArray(ab, 2),
	    a = _ab[0],
	    b = _ab[1];

	var _cd = _slicedToArray(cd, 2),
	    c = _cd[0],
	    d = _cd[1];

	var denom = (b[0] - a[0]) * (d[1] - c[1]) - (b[1] - a[1]) * (d[0] - c[0]);
	var rNumer = (a[1] - c[1]) * (d[0] - c[0]) - (a[0] - c[0]) * (d[1] - c[1]);
	var sNumer = (a[1] - c[1]) * (b[0] - a[0]) - (a[0] - c[0]) * (b[1] - a[1]);

	if (Math.abs(denom) <= delta) {
		// parallel
		if (Math.abs(rNumer) <= delta) {
			// colinear
			// TODO Check if x-projections and y-projections intersect
			// and return the line of intersection if they do.
			return undefined;
		}
		return undefined;
	}

	var r = rNumer / denom;
	var s = sNumer / denom;

	if (0 <= r && r <= 1 && 0 <= s && s <= 1) {
		return [a[0] + r * (b[0] - a[0]), a[1] + r * (b[1] - a[1])];
	}

	return undefined;
}

/**
 * Returns true if the two given 2d line segments intersect, false otherwise.
 * @param {number[][]} a - A line segment
 * @param {number[][]} b - Another line segment
 * @returns {boolean}
 */
function doesSegSegIntersect(a, b) {
	if (ccw(a[0], a[1], b[0]) * ccw(a[0], a[1], b[1]) > 0) {
		return false;
	}
	if (ccw(b[0], b[1], a[0]) * ccw(b[0], b[1], a[1]) > 0) {
		return false;
	}

	return true;
}

/** 
 * Returns the squared distance between two 2d points.
 * @param {number[]} p1 - A point
 * @param {number[]} p2 - Another point
 * @returns {number}
 */
function squaredDistanceBetween(p1, p2) {
	var x = p2[0] - p1[0];
	var y = p2[1] - p1[1];

	return x * x + y * y;
}

/**
 * Returns a scaled version of the given 2-vector.
 * @param {number[]} p - A vector
 * @param {number} factor - A scale factor
 * @returns {number[]}
 */
function scale(p, factor) {
	return [p[0] * factor, p[1] * factor];
}

/**
 * Returns the 2-vector reversed.
 * @param {number[]} p 
 * @returns {number[]}
 */
function reverse(p) {
	return [-p[0], -p[1]];
}

/**
 * Returns the given 2-vector scaled to a length of one.
 * @param {number[]} p
 * @returns {number[]}
 */
function toUnitVector(p) {
	var scaleFactor = 1 / length(p);

	return [p[0] * scaleFactor, p[1] * scaleFactor];
}

/**
 * Returns the given 2-vector scaled to the given length.
 * @param {number[]} p 
 * @param {number} length 
 * @returns {number[]}
 */
function toLength(p, length) {
	var scaleFactor = length / length(p);

	return [p[0] * scaleFactor, p[1] * scaleFactor];
}

/** 
 * Returns the second 2-vector minus the first.
 * @param {number[]} p1 - The first vector
 * @param {number[]} p2 - The second vector
 * @returns {number[]}
 */
function fromTo(p1, p2) {
	return [p2[0] - p1[0], p2[1] - p1[1]];
}

/**
 * Performs linear interpolation between two 2d points and returns the resultant point.
 * @param {number[]} p1 - The first point.
 * @param {number[]} p2 - The second point.
 * @param {number} t - The interpolation fraction (usually in [0,1]).  
 * @returns {number[]}
 */
function interpolate(p1, p2, t) {
	return [p1[0] + (p2[0] - p1[0]) * t, p1[1] + (p2[1] - p1[1]) * t];
}

/**
 * Returns the mean point value of the provided array of two 2d points. 
 * @param {number[][]} ps - The two points
 * @returns {number[]}
 */
function mean(ps) {
	var p1 = ps[0];
	var p2 = ps[1];

	return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
}

/** 
 * Returns the distance between two 2d points.
 * @param {number[]} p1 - A point.
 * @param {number[]} p2 - Another point.
 * @returns {number}
 */
function distanceBetween(p1, p2) {
	return Math.sqrt(squaredDistanceBetween(p1, p2));
}

/** 
 * Returns the length of the given 2-vector.
 * @param {number[]} p - A vector
 * @returns {number}
 */
function length(p) {
	return Math.sqrt(p[0] * p[0] + p[1] * p[1]);
}

/**
 * Returns the squared length of the given 2-vector.
 * @param {number[]} p - A vector
 * @returns {number}
 */
function lengthSquared(v) {
	return v[0] * v[0] + v[1] * v[1];
}

/** 
 * Returns the Manhattan distance between two 2d points.
 * @param {number[]} p1 - A point.
 * @param {number[]} p2 - Another point.
 * @returns {number}
 */
function manhattanDistanceBetween(p1, p2) {
	return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
}

/** 
 * Returns the Manhattan length of the given 2-vector.
 * @param {number[]} p - A vector
 * @returns {number}
 */
function manhattanLength(p) {
	return Math.abs(p[0]) + Math.abs(p[1]);
}

/**
 * <p>
 * Returns the distance between the given point and line. 
 * </p>
 * <p>
 * See https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line#Line_defined_by_two_points 
 * </p>
 * @param {number[]} p - A point
 * @param {number[][]} l - A line
 * @returns {number}
 */
function distanceBetweenPointAndLine(p, l) {
	var x0 = p[0];
	var y0 = p[1];
	var x1 = l[0][0];
	var y1 = l[0][1];
	var x2 = l[1][0];
	var y2 = l[1][1];

	var y2_y1 = y2 - y1;
	var x2_x1 = x2 - x1;

	var numerator = y2_y1 * x0 - x2_x1 * y0 + x2 * y1 - y2 * x1;
	var denominator = Math.sqrt(y2_y1 * y2_y1 + x2_x1 * x2_x1);

	return Math.abs(numerator / denominator);
}

/**
 * Return the squared distance between the given point and line segment. 
 * @param {number[]} p - A point
 * @param {number[][]} l - A line
 * @returns {number}
 */
function squaredDistanceBetweenPointAndLineSegment(p, l) {
	var v = l[0];
	var w = l[1];

	var l2 = squaredDistanceBetween(v, w);
	if (l2 == 0) {
		return squaredDistanceBetween(p, v);
	}

	var t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
	t = Math.max(0, Math.min(1, t));

	var d2 = squaredDistanceBetween(p, [v[0] + t * (w[0] - v[0]), v[1] + t * (w[1] - v[1])]);

	return d2;
}

/**
 * Returns the circumcenter of the given 2d triangle (given as three 2d points).
 * @param {number[][]} triangle 
 * @returns {number[]}
 */
function circumCenter(triangle) {
	// See wikipedia
	var p1 = triangle[0];
	var p2 = triangle[1];
	var p3 = triangle[2];

	var Sx = 0.5 * det3([squaredNorm(p1), p1[1], 1], [squaredNorm(p2), p2[1], 1], [squaredNorm(p3), p3[1], 1]);

	var Sy = 0.5 * det3([p1[0], squaredNorm(p1), 1], [p2[0], squaredNorm(p2), 1], [p3[0], squaredNorm(p3), 1]);

	var a = det3([p1[0], p1[1], 1], [p2[0], p2[1], 1], [p3[0], p3[1], 1]);

	var b = det3([p1[0], p1[1], squaredNorm(p1)], [p2[0], p2[1], squaredNorm(p2)], [p3[0], p3[1], squaredNorm(p3)]);

	return [Sx / a, Sy / a];
}

/** 
 * <p>
 * Returns the incenter of the given triangle.
 * </p>
 * <p>
 * See Wikipedia - https://en.wikipedia.org/wiki/Incenter 
 * </p>
 * @param {number[][]} triangle 
 * @returns {number[]}
 */
function inCenter(triangle) {
	var p1 = triangle[0];
	var p2 = triangle[1];
	var p3 = triangle[2];

	var l1 = distanceBetween(p2, p3);
	var l2 = distanceBetween(p1, p3);
	var l3 = distanceBetween(p1, p2);
	var lengthSum = l1 + l2 + l3;
	return [(l1 * p1[0] + l2 * p2[0] + l3 * p3[0]) / lengthSum, (l1 * p1[1] + l2 * p2[1] + l3 * p3[1]) / lengthSum];
}

/**
 * Returns the centroid of the given polygon, e.g. triangle. The polygon
 * must be simple, i.e. not self-intersecting.
 * @param {number[][]} polygon 
 * @returns {number[]}
 */
function centroid(polygon) {
	if (polygon.length === 3) {
		var p1 = polygon[0];
		var p2 = polygon[1];
		var p3 = polygon[2];

		var x = p1[0] + p2[0] + p3[0];
		var y = p1[1] + p2[1] + p3[1];

		return [x / 3, y / 3];
	}

	// polygon.length assumed > 3 and assumed to be non-self-intersecting
	// See wikipedia

	// First calculate the area, A, of the polygon
	var A = 0;
	for (var i = 0; i < polygon.length; i++) {
		var p0 = polygon[i];
		var _p = i === polygon.length - 1 ? polygon[0] : polygon[i + 1];

		A = A + (p0[0] * _p[1] - _p[0] * p0[1]);
	}
	A = A / 2;

	var C = [0, 0];
	for (var _i = 0; _i < polygon.length; _i++) {
		var _p2 = polygon[_i];
		var _p3 = _i === polygon.length - 1 ? polygon[0] : polygon[_i + 1];

		C[0] = C[0] + (_p2[0] + _p3[0]) * (_p2[0] * _p3[1] - _p3[0] * _p2[1]);
		C[1] = C[1] + (_p2[1] + _p3[1]) * (_p2[0] * _p3[1] - _p3[0] * _p2[1]);
	}

	return [C[0] / (6 * A), C[1] / (6 * A)];
}

/**
 * Calculate the determinant of three 3-vectors, i.e. 3x3 matrix
 * @param {number[]} x 
 * @param {number[]} y
 * @param {number[]} z
 * @returns {number}
 */
function det3(x, y, z) {
	return x[0] * (y[1] * z[2] - y[2] * z[1]) - x[1] * (y[0] * z[2] - y[2] * z[0]) + x[2] * (y[0] * z[1] - y[1] * z[0]);
}

/**
 * Returns the result of adding two 2-vectors.
 * @param {number[]} a - A vector
 * @param {number[]} b - Another vector
 * @param {number[]}
 */
function add(a, b) {
	return [a[0] + b[0], a[1] + b[1]];
}

/**
 * Returns true if two 2-vectors are identical, false otherwise.
 * @param {number[]} a
 * @param {number[]} b
 * @returns {boolean}
 */
function equal(a, b) {
	return a[0] === b[0] && a[1] === b[1];
}

/**
 * Returns a rotated version of the given 2-vector given the sine and cosine of the angle.
 * @param {number[]} p 
 * @param {number} sinAngle 
 * @param {number} cosAngle 
 * @returns {number[]}
 */
function rotate(p, sinAngle, cosAngle) {
	return [p[0] * cosAngle - p[1] * sinAngle, p[0] * sinAngle + p[1] * cosAngle];
}

/**
 * Returns a anti-clockwise rotated version of the given 2-vector given the sine and cosine of the angle.
 * @param {number[]} p 
 * @param {number} sinθ
 * @param {number} cosθ
 * @returns {number[]}
 */
function reverseRotate(p, sinθ, cosθ) {
	return [+p[0] * cosθ + p[1] * sinθ, -p[0] * sinθ + p[1] * cosθ];
}

/**
 * Returns a 90 degrees rotated version of the given 2-vector.
 * @param {number[]} p 
 * @returns {number[]}
 */
function rotateBy90Degrees(p) {
	return [-p[1], p[0]];
}

/**
 * Returns a negative 90 degrees rotated version of the given 2-vector.
 * @param {number[]} p 
 * @returns {number[]}
 */
function rotateByNeg90Degrees(p) {
	return [p[1], -p[0]];
}

/**
 * Transforms the given 2-vector by applying the given function to each coordinate.
 * @param {number[]} p 
 * @param {function} f 
 * @returns {*[]}
 */
function transform(p, f) {
	return [f(p[0]), f(p[1])];
}

/**
 * Returns the closest point to the array of 2d points, optionally providing a distance function.
 * @param {number[]} p
 * @param {number[][]} ps
 * @param {function} f - Distance function - if undefined uses squaredDistanceBetween
 */
function getClosestTo(p, ps, f) {
	f = f === undefined ? squaredDistanceBetween : f;

	var cp = undefined; // Closest Point
	var bestd = Number.POSITIVE_INFINITY;
	for (var i = 0; i < ps.length; i++) {
		var p_ = ps[i];

		var d = f(p, p_);
		if (d < bestd) {
			cp = p_;
			bestd = d;
		}
	}

	return cp;
}

/**
 * Return the given 2d points translated by the given 2d vector.
 * @param {number[][]} ps 
 * @param {number[]} v 
 * @returns {number[][]}
 */
function translatePoints(ps, v) {
	// SLOW!
	/*return ps.map(function(p) {
 	//return add(p, v);
 	return [p[0]+v[0], p[1]+v[1]]; 
 });*/

	// FAST! (at least on V8, BUT WHY?!)
	var result = [];
	for (var i = 0; i < ps.length; i++) {
		result.push([ps[i][0] + v[0], ps[i][1] + v[1]]);
	}

	return result;
}

/**
 * Returns the given points rotated by a given angle given as the sine and cosine of the angle.
 * @param {number[][]} ps 
 * @param {number} sinθ 
 * @param {number} cosθ
 * @returns {number[][]}
 */
function rotatePoints(ps, sinθ, cosθ) {
	return ps.map(function (p) {
		return rotate(p, sinθ, cosθ);
	});
}

/** 
 * Returns an array of points by applying a translation and then rotation to the given points.
 * @param {number[][]} ps - The input points
 * @param {number[]} t - The translation vector
 * @param {number} sinθ 
 * @param {number} cosθ
 * @returns {number[][]}
 **/
function translateThenRotatePoints(ps, t, sinθ, cosθ) {
	return ps.map(function (p) {
		return rotate(add(p, t), sinθ, cosθ);
	});
}

/** 
 * Returns an array of points by applying a rotation and then translation to the given points.
 * @param {number[][]} ps - The input points
 * @param {number[]} t - The translation vector
 * @param {number} sinθ 
 * @param {number} cosθ
 * @returns {number[][]}
 **/
function rotateThenTranslatePoints(ps, t, sinθ, cosθ) {
	return ps.map(function (p) {
		return add(rotate(p, sinθ, cosθ), t);
	});
}

module.exports = Vector;

},{}]},{},[1])(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});