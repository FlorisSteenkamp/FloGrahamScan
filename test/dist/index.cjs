/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../src/get-smallest-idx-y-then-x.ts":
/*!*******************************************!*\
  !*** ../src/get-smallest-idx-y-then-x.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSmallestIdxYThenX = void 0;
/**
 * @internal
 */
function getSmallestIdxYThenX(ps) {
    let smallest = [
        Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY
    ];
    let smallestI = undefined;
    for (let i = 0; i < ps.length; i++) {
        const y = ps[i][1];
        if ((y < smallest[1]) ||
            (y === smallest[1] && ps[i][0] < smallest[0])) {
            smallestI = i;
            smallest = ps[i];
        }
    }
    return smallestI;
}
exports.getSmallestIdxYThenX = getSmallestIdxYThenX;


/***/ }),

/***/ "../src/index.ts":
/*!***********************!*\
  !*** ../src/index.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.grahamScan = void 0;
const big_float_ts_1 = __webpack_require__(/*! big-float-ts */ "../node_modules/big-float-ts/node/index.js");
const get_smallest_idx_y_then_x_js_1 = __webpack_require__(/*! ./get-smallest-idx-y-then-x.js */ "../src/get-smallest-idx-y-then-x.ts");
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
    const idx = (0, get_smallest_idx_y_then_x_js_1.getSmallestIdxYThenX)(ps_);
    const [p] = ps_.splice(idx, 1);
    ps_.sort((a, b) => {
        let res = -(0, big_float_ts_1.orient2d)(p, a, b);
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
            const r = (0, big_float_ts_1.orient2d)(stack[stack.length - 2], stack[stack.length - 1], p) <= 0;
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
        if ((0, big_float_ts_1.orient2d)(pS, pM, pE) !== 0 || dot(pS, pM, pE) < 0) {
            stack_.push(pM);
        }
    }
    return stack_;
}
exports.grahamScan = grahamScan;
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


/***/ }),

/***/ "../node_modules/big-float-ts/node/basic/fast-two-diff.js":
/*!****************************************************************!*\
  !*** ../node_modules/big-float-ts/node/basic/fast-two-diff.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fastTwoDiff: () => (/* binding */ fastTwoDiff)
/* harmony export */ });
/**
 * Returns the difference and exact error of subtracting two floating point
 * numbers.
 * Uses an EFT (error-free transformation), i.e. a-b === x+y exactly.
 * The returned result is a non-overlapping expansion (smallest value first!).
 *
 * Precondition: abs(a) >= abs(b) - A fast test that can be used is
 * (a > b) === (a > -b)
 *
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 */
function fastTwoDiff(a, b) {
    const x = a - b;
    const y = (a - x) - b;
    return [y, x];
}

//# sourceMappingURL=fast-two-diff.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/basic/fast-two-sum.js":
/*!***************************************************************!*\
  !*** ../node_modules/big-float-ts/node/basic/fast-two-sum.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fastTwoSum: () => (/* binding */ fastTwoSum)
/* harmony export */ });
/**
 * Returns the sum and exact error of adding two floating point numbers.
 * Uses an EFT (error-free transformation), i.e. a+b === x+y exactly.
 * The returned sum is a non-overlapping expansion (smallest value first!).
 *
 * Precondition: abs(a) >= abs(b) - A fast test that can be used is
 * (a > b) === (a > -b)
 *
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 */
function fastTwoSum(a, b) {
    const x = a + b;
    return [b - (x - a), x];
}
// inlined
//const R = a + b; const r = b - (R - a); return [r, R];

//# sourceMappingURL=fast-two-sum.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/basic/reduce-significand.js":
/*!*********************************************************************!*\
  !*** ../node_modules/big-float-ts/node/basic/reduce-significand.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reduceSignificand: () => (/* binding */ reduceSignificand)
/* harmony export */ });
/**
 * Truncates a floating point value's significand and returns the result.
 * Similar to split, but with the ability to specify the number of bits to keep.
 *
 * Theorem 17 (Veltkamp-Dekker): Let a be a p-bit floating-point number, where
 * p >= 3. Choose a splitting point s such that p/2 <= s <= p-1. Then the
 * following algorithm will produce a (p-s)-bit value a_hi and a
 * nonoverlapping (s-1)-bit value a_lo such that abs(a_hi) >= abs(a_lo) and
 * a = a_hi + a_lo.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param a a double
 * @param bits the number of significand bits to leave intact
 */
function reduceSignificand(a, bits) {
    const s = 53 - bits;
    const f = 2 ** s + 1;
    const c = f * a;
    const r = c - (c - a);
    return r;
}

//# sourceMappingURL=reduce-significand.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/basic/split.js":
/*!********************************************************!*\
  !*** ../node_modules/big-float-ts/node/basic/split.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   split: () => (/* binding */ split)
/* harmony export */ });
/**
 * === Math.ceil(p/2) where p is the # of significand bits in a double === 53.
 */
const f = 134217729; // 2**27 + 1;
/**
 * Returns the result of splitting a double into 2 26-bit doubles.
 *
 * Theorem 17 (Veltkamp-Dekker): Let a be a p-bit floating-point number, where
 * p >= 3. Choose a splitting point s such that p/2 <= s <= p-1. Then the
 * following algorithm will produce a (p-s)-bit value a_hi and a
 * nonoverlapping (s-1)-bit value a_lo such that abs(a_hi) >= abs(a_lo) and
 * a = a_hi + a_lo.
 *
 * see e.g. [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * @param a A double floating point number
 */
function split(a) {
    const c = f * a;
    const a_h = c - (c - a);
    const a_l = a - a_h;
    return [a_h, a_l];
}
// inlined - input a, output a_h, a_l
// const c = f * a; const a_h = c - (c - a); const a_l = a - a_h; return [a_h, a_l];

//# sourceMappingURL=split.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/basic/two-diff.js":
/*!***********************************************************!*\
  !*** ../node_modules/big-float-ts/node/basic/two-diff.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   twoDiff: () => (/* binding */ twoDiff)
/* harmony export */ });
/**
 * Returns the exact result of subtracting b from a (as a floating point
 * expansion).
 * @param a
 * @param b
 */
function twoDiff(a, b) {
    const x = a - b;
    const bvirt = a - x;
    const y = (a - (x + bvirt)) + (bvirt - b);
    return [y, x];
}

//# sourceMappingURL=two-diff.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/basic/two-product.js":
/*!**************************************************************!*\
  !*** ../node_modules/big-float-ts/node/basic/two-product.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   twoProduct: () => (/* binding */ twoProduct)
/* harmony export */ });
const f = 134217729; // 2**27 + 1;
/**
 * Returns the exact result of multiplying two doubles.
 *
 * * the resulting array is the reverse of the standard twoSum in the literature.
 *
 * Theorem 18 (Shewchuk): Let a and b be p-bit floating-point numbers, where
 * p >= 6. Then the following algorithm will produce a nonoverlapping expansion
 * x + y such that ab = x + y, where x is an approximation to ab and y
 * represents the roundoff error in the calculation of x. Furthermore, if
 * round-to-even tiebreaking is used, x and y are non-adjacent.
 *
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 * @param a A double
 * @param b Another double
 */
function twoProduct(a, b) {
    const x = a * b;
    //const [ah, al] = split(a);
    const c = f * a;
    const ah = c - (c - a);
    const al = a - ah;
    //const [bh, bl] = split(b);
    const d = f * b;
    const bh = d - (d - b);
    const bl = b - bh;
    const y = (al * bl) - ((x - (ah * bh)) - (al * bh) - (ah * bl));
    //const err1 = x - (ah * bh);
    //const err2 = err1 - (al * bh);
    //const err3 = err2 - (ah * bl);
    //const y = (al * bl) - err3;
    return [y, x];
}

//# sourceMappingURL=two-product.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/basic/two-sum.js":
/*!**********************************************************!*\
  !*** ../node_modules/big-float-ts/node/basic/two-sum.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   twoSum: () => (/* binding */ twoSum)
/* harmony export */ });
/**
 * Returns the exact result of adding two doubles.
 *
 * * the resulting array is the reverse of the standard twoSum in the literature.
 *
 * Theorem 7 (Knuth): Let a and b be p-bit floating-point numbers. Then the
 * following algorithm will produce a nonoverlapping expansion x + y such that
 * a + b = x + y, where x is an approximation to a + b and y is the roundoff
 * error in the calculation of x.
 *
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 */
function twoSum(a, b) {
    const x = a + b;
    const bv = x - a;
    return [(a - (x - bv)) + (b - bv), x];
}
// inlined
//const R = a + b; const _ = R - a; const r = (a - (R - _)) + (b - _); return [r,R]

//# sourceMappingURL=two-sum.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/e-abs.js":
/*!*******************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/e-abs.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eAbs: () => (/* binding */ eAbs)
/* harmony export */ });
/* harmony import */ var _e_sign_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./e-sign.js */ "../node_modules/big-float-ts/node/double-expansion/e-sign.js");
/* harmony import */ var _e_negative_of_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./e-negative-of.js */ "../node_modules/big-float-ts/node/double-expansion/e-negative-of.js");


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const sign = _e_sign_js__WEBPACK_IMPORTED_MODULE_0__.eSign;
const negativeOf = _e_negative_of_js__WEBPACK_IMPORTED_MODULE_1__.eNegativeOf;
/**
 * Returns the absolute value of the given floating point expansion.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 */
function eAbs(e) {
    if (e[e.length - 1] < 0) {
        return negativeOf(e);
    }
    return e;
}

//# sourceMappingURL=e-abs.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/e-calculate.js":
/*!*************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/e-calculate.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eCalculate: () => (/* binding */ eCalculate)
/* harmony export */ });
/* harmony import */ var _expansion_product_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./expansion-product.js */ "../node_modules/big-float-ts/node/double-expansion/expansion-product.js");
/* harmony import */ var _basic_two_product_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../basic/two-product.js */ "../node_modules/big-float-ts/node/basic/two-product.js");
/* harmony import */ var _scale_expansion_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scale-expansion.js */ "../node_modules/big-float-ts/node/double-expansion/scale-expansion.js");
/* harmony import */ var _basic_two_sum_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../basic/two-sum.js */ "../node_modules/big-float-ts/node/basic/two-sum.js");
/* harmony import */ var _grow_expansion_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./grow-expansion.js */ "../node_modules/big-float-ts/node/double-expansion/grow-expansion.js");
/* harmony import */ var _fast_expansion_sum_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./fast-expansion-sum.js */ "../node_modules/big-float-ts/node/double-expansion/fast-expansion-sum.js");
/* harmony import */ var _e_compress_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./e-compress.js */ "../node_modules/big-float-ts/node/double-expansion/e-compress.js");







// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const mult = _expansion_product_js__WEBPACK_IMPORTED_MODULE_0__.expansionProduct;
const tp = _basic_two_product_js__WEBPACK_IMPORTED_MODULE_1__.twoProduct;
const multByDouble = _scale_expansion_js__WEBPACK_IMPORTED_MODULE_2__.scaleExpansion;
const ts = _basic_two_sum_js__WEBPACK_IMPORTED_MODULE_3__.twoSum;
const addDouble = _grow_expansion_js__WEBPACK_IMPORTED_MODULE_4__.growExpansion;
const add = _fast_expansion_sum_js__WEBPACK_IMPORTED_MODULE_5__.fastExpansionSum;
const compress = _e_compress_js__WEBPACK_IMPORTED_MODULE_6__.eCompress;
/**
 * Return the result of summing an array of terms, each term being an array of
 * floating point expansions to be multiplied together.
 *
 * * The result is exact in the form of a non-overlapping floating point
 * expansion.
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param terms An array of terms to be summed; A term consists of an
 * array of floating point expansions to be multiplied together.
 */
// The terms parameter were chosen to always be expansions in order to keep the 
// function monomorhic, but whether it's really worth it I am not sure.
function eCalculate(terms) {
    let total = [0];
    for (let i = 0; i < terms.length; i++) {
        const term = terms[i];
        let product = term[0];
        for (let j = 1; j < term.length; j++) {
            const multiplicant = term[j];
            if (multiplicant.length == 1) {
                if (product.length === 1) {
                    product = tp(product[0], multiplicant[0]);
                }
                else {
                    product = multByDouble(product, multiplicant[0]);
                }
            }
            else if (product.length === 1) {
                product = multByDouble(multiplicant, product[0]);
            }
            else {
                product = mult(multiplicant, product);
            }
        }
        // add
        if (product.length === 1) {
            if (total.length === 1) {
                total = ts(total[0], product[0]);
            }
            else {
                total = addDouble(total, product[0]);
            }
        }
        else {
            if (total.length === 1) {
                total = addDouble(product, total[0]);
            }
            else {
                total = add(total, product);
            }
        }
    }
    //return compress(total);
    return total;
}

//# sourceMappingURL=e-calculate.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/e-compare.js":
/*!***********************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/e-compare.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eCompare: () => (/* binding */ eCompare)
/* harmony export */ });
/* harmony import */ var _e_diff_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./e-diff.js */ "../node_modules/big-float-ts/node/double-expansion/e-diff.js");
/* harmony import */ var _e_sign_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./e-sign.js */ "../node_modules/big-float-ts/node/double-expansion/e-sign.js");


/**
 * Returns 0 if a === b, a +tive value if a > b or a negative value if a < b.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * "The easiest way to compare two expansions is to subtract one from the other,
 * and test the sign of the result. An expansion’s sign can be easily tested
 * because of the nonoverlapping property; simply check the sign of the
 * expansion's most significant nonzero component..."
 *
 * @param a a floating point expansion
 * @param b another floating point expansion
 */
function eCompare(a, b) {
    return (0,_e_sign_js__WEBPACK_IMPORTED_MODULE_0__.eSign)((0,_e_diff_js__WEBPACK_IMPORTED_MODULE_1__.eDiff)(a, b));
}

//# sourceMappingURL=e-compare.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/e-compress.js":
/*!************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/e-compress.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eCompress: () => (/* binding */ eCompress)
/* harmony export */ });
/**
 * Returns the result of compressing the given floating point expansion.
 *
 * * primarily for internal library use
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * Theorem 23 (Shewchuck): Let e = sum_(i=1)^m(e_i) be a nonoverlapping
 * expansion of m p-bit components, where m >= 3. Suppose that the components of
 * e are sorted in order of increasing magnitude, except that any of the e_i may
 * be zero. Then the following algorithm will produce a nonoverlapping expansion
 * (nonadjacent if round-to even tiebreaking is used) such that
 * h = sum_(i=1)^n(h_i) = e, where the components h_i are in order of increasing
 * magnitude. If h != 0, none of the h_i will be zero. Furthermore, the largest
 * component h_n approximates h with an error smaller than ulp(h_n).
 */
function eCompress(e) {
    //return e;
    const e_ = e.slice();
    const m = e_.length;
    if (m === 1) {
        return e_;
    }
    let Q = e_[m - 1];
    let bottom = m;
    for (let i = m - 2; i >= 0; --i) {
        const a = Q;
        const b = e_[i];
        Q = a + b;
        const bv = Q - a;
        const q = b - bv;
        if (q) {
            e_[--bottom] = Q;
            Q = q;
        }
    }
    let top = 0;
    for (let i = bottom; i < m; ++i) {
        const a = e_[i];
        const b = Q;
        Q = a + b;
        const bv = Q - a;
        const q = b - bv;
        if (q) {
            e_[top++] = q;
        }
    }
    e_[top++] = Q;
    e_.length = top;
    return e_;
}

//# sourceMappingURL=e-compress.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/e-diff.js":
/*!********************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/e-diff.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eDiff: () => (/* binding */ eDiff)
/* harmony export */ });
/* harmony import */ var _fast_expansion_sum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fast-expansion-sum.js */ "../node_modules/big-float-ts/node/double-expansion/fast-expansion-sum.js");
/* harmony import */ var _e_negative_of_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./e-negative-of.js */ "../node_modules/big-float-ts/node/double-expansion/e-negative-of.js");


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const negativeOf = _e_negative_of_js__WEBPACK_IMPORTED_MODULE_0__.eNegativeOf;
const add = _fast_expansion_sum_js__WEBPACK_IMPORTED_MODULE_1__.fastExpansionSum;
/**
 * Returns the difference between two floating point expansions, i.e. e - f.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 * @param f another floating point expansion
 */
function eDiff(e, f) {
    const g = negativeOf(f);
    return add(e, g);
}

//# sourceMappingURL=e-diff.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/e-div-by-2.js":
/*!************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/e-div-by-2.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eDivBy2: () => (/* binding */ eDivBy2)
/* harmony export */ });
/**
 * Returns the result of dividing a floating point expansion by 2.
 * * **error free**
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 */
function eDivBy2(e) {
    const e_ = [];
    for (let i = 0; i < e.length; i++) {
        e_.push(0.5 * e[i]);
    }
    return e_;
}

//# sourceMappingURL=e-div-by-2.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/e-div.js":
/*!*******************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/e-div.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eDiv: () => (/* binding */ eDiv)
/* harmony export */ });
/* harmony import */ var _e_estimate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./e-estimate.js */ "../node_modules/big-float-ts/node/double-expansion/e-estimate.js");
/* harmony import */ var _expansion_product_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./expansion-product.js */ "../node_modules/big-float-ts/node/double-expansion/expansion-product.js");
/* harmony import */ var _e_diff_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./e-diff.js */ "../node_modules/big-float-ts/node/double-expansion/e-diff.js");
/* harmony import */ var _e_to_bitlength_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./e-to-bitlength.js */ "../node_modules/big-float-ts/node/double-expansion/e-to-bitlength.js");
/* harmony import */ var _double_representation_bit_length_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../double-representation/bit-length.js */ "../node_modules/big-float-ts/node/double-representation/bit-length.js");





// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const mult = _expansion_product_js__WEBPACK_IMPORTED_MODULE_0__.expansionProduct;
const toBitlength = _e_to_bitlength_js__WEBPACK_IMPORTED_MODULE_1__.eToBitlength;
const bitLength = _double_representation_bit_length_js__WEBPACK_IMPORTED_MODULE_2__.expBitLength;
const diff = _e_diff_js__WEBPACK_IMPORTED_MODULE_3__.eDiff;
const estimate = _e_estimate_js__WEBPACK_IMPORTED_MODULE_4__.eEstimate;
/**
 * Returns the result of a/b using Goldschmidt division.
 *
 * The result will only be exact if b|a, i.e. if b divides a exactly, else the
 * result will be rounded to the longest bitlength between a and b.
 *
 * @param a the numerator
 * @param b the denominator
 *
 * @param expansionLength the bitlength/53 of the final result, e.g. 1 means
 * standard double precision, 2 means double-double, etc up to a max of about 20 at
 * which point underflow cease precision improvement. If the division is known
 * to be exact beforehand (such as in the pseudo remainder sequence algorithm)
 * then set expansionLength === 0 and an exact division will be done.
 */
// TODO - test this function properly or replace with a better one
function eDiv(N, D, expansionLength) {
    let D_ = D;
    let N_ = N;
    let exact = false;
    let resultBitlengthUpperBound = 0;
    if (!expansionLength) {
        const bitlengthN = bitLength(N_);
        const bitlengthD = bitLength(D_);
        // resultBitlengthUpperBound is only valid if the division is known
        // to be exact
        resultBitlengthUpperBound = bitlengthN - bitlengthD + 1;
        expansionLength = (resultBitlengthUpperBound / 53) + 1;
        exact = true;
    }
    let F = [1 / estimate(D_)]; // Initial guess - out by 1/2 upls
    let i = 1;
    while (true) {
        N_ = mult(N_, F);
        // The precision bitlength doubles on each iteration
        if (i > expansionLength) {
            // we now have roughly double the needed precision - we actually 
            // only require about the precision and then round properly - this
            // could be implemented in the future.
            if (exact) {
                // We must throw away bits known to be zero. 
                // Any bits > expansionLength * 53 must be thrown away as they
                // are wrong - all other bits are exact.
                N_ = toBitlength(N_, resultBitlengthUpperBound);
                // TODO - below is just for testing - remove later
                //if (compare(mult(D, N_), N) !== 0) {
                //    console.log(mult(D, N_))
                //    throw new Error(`division in-exact - probably due to underflow, N: ${N}, D: ${D}, Result: ${N_}, product: ${mult(D, N_)}`); 
                //} 
                return N_;
            }
            // Returning only significant bits helps with sign determination later on.
            return N_.slice(N_.length - expansionLength, N_.length);
        }
        D_ = mult(D_, F);
        F = diff([2], D_);
        i *= 2;
    }
}

//# sourceMappingURL=e-div.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/e-estimate.js":
/*!************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/e-estimate.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eEstimate: () => (/* binding */ eEstimate)
/* harmony export */ });
/**
 * Returns the result of the given floating point expansion rounded to a double
 * floating point number.
 *
 * The result is within 1 ulps of the actual value, e.g. imagine the worst case
 * situation where we add (in 4dot4) 1111.1000 + 0.000011111111... The result
 * will be 1111.1000 whereas as the correct result should be 1111.1001 and we
 * thus lost 1 ulp of accuracy. It does not matter that the expansion contain
 * several floats since none is overlapping.
 *
 * See Shewchuk https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 *
 * @param e a floating point expansion
 */
function eEstimate(e) {
    let Q = e[0];
    for (let i = 1; i < e.length; i++) {
        Q += e[i];
    }
    return Q;
}

//# sourceMappingURL=e-estimate.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/e-int-div.js":
/*!***********************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/e-int-div.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eIntDiv: () => (/* binding */ eIntDiv)
/* harmony export */ });
/* harmony import */ var _e_long_divide_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./e-long-divide.js */ "../node_modules/big-float-ts/node/double-expansion/e-long-divide.js");

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const eLongDivide = _e_long_divide_js__WEBPACK_IMPORTED_MODULE_0__.eLongDivide;
/**
 * Returns the result of the integer division a/b.
 *
 * * **precondition:** a and b must be integers, b !== 0
 */
function eIntDiv(a, b) {
    return eLongDivide(a, b).div;
}

//# sourceMappingURL=e-int-div.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/e-int-pow.js":
/*!***********************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/e-int-pow.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eIntPow: () => (/* binding */ eIntPow)
/* harmony export */ });
/* harmony import */ var _e_product_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./e-product.js */ "../node_modules/big-float-ts/node/double-expansion/e-product.js");
/* harmony import */ var _expansion_product_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./expansion-product.js */ "../node_modules/big-float-ts/node/double-expansion/expansion-product.js");


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const mult = _expansion_product_js__WEBPACK_IMPORTED_MODULE_0__.expansionProduct;
const prod = _e_product_js__WEBPACK_IMPORTED_MODULE_1__.eProduct;
/**
 * Returns a**i, where i is a non-negative integer.
 * @param a a floating point expansion
 */
// TODO - this algorithm's speed can easily be improved significantly using 'repeated squaring'
function eIntPow(a, p) {
    // a^0 === 1
    if (p === 0) {
        return [1];
    }
    // a^1 === a
    if (p === 1) {
        return a;
    }
    if (p === 2) {
        return mult(a, a);
    }
    const as = [];
    for (let i = 0; i < p; i++) {
        as.push(a);
    }
    return prod(as);
}

//# sourceMappingURL=e-int-pow.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/e-is-integer.js":
/*!**************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/e-is-integer.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eIsInteger: () => (/* binding */ eIsInteger)
/* harmony export */ });
/* harmony import */ var _e_compress_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./e-compress.js */ "../node_modules/big-float-ts/node/double-expansion/e-compress.js");

function eIsInteger(a) {
    a = (0,_e_compress_js__WEBPACK_IMPORTED_MODULE_0__.eCompress)(a);
    for (let i = 0; i < a.length; i++) {
        if (a[i] % 1 !== 0) {
            return false;
        }
    }
    return true;
}

//# sourceMappingURL=e-is-integer.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/e-long-divide.js":
/*!***************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/e-long-divide.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eLongDivide: () => (/* binding */ eLongDivide)
/* harmony export */ });
/* harmony import */ var _e_negative_of_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./e-negative-of.js */ "../node_modules/big-float-ts/node/double-expansion/e-negative-of.js");
/* harmony import */ var _fast_expansion_sum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fast-expansion-sum.js */ "../node_modules/big-float-ts/node/double-expansion/fast-expansion-sum.js");
/* harmony import */ var _e_compress_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./e-compress.js */ "../node_modules/big-float-ts/node/double-expansion/e-compress.js");
/* harmony import */ var _grow_expansion_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./grow-expansion.js */ "../node_modules/big-float-ts/node/double-expansion/grow-expansion.js");
/* harmony import */ var _e_sum_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./e-sum.js */ "../node_modules/big-float-ts/node/double-expansion/e-sum.js");
/* harmony import */ var _scale_expansion_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scale-expansion.js */ "../node_modules/big-float-ts/node/double-expansion/scale-expansion.js");
/* harmony import */ var _e_diff_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./e-diff.js */ "../node_modules/big-float-ts/node/double-expansion/e-diff.js");







// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const eNegativeOf = _e_negative_of_js__WEBPACK_IMPORTED_MODULE_0__.eNegativeOf;
const fastExpansionSum = _fast_expansion_sum_js__WEBPACK_IMPORTED_MODULE_1__.fastExpansionSum;
const eCompress = _e_compress_js__WEBPACK_IMPORTED_MODULE_2__.eCompress;
const growExpansion = _grow_expansion_js__WEBPACK_IMPORTED_MODULE_3__.growExpansion;
const eSum = _e_sum_js__WEBPACK_IMPORTED_MODULE_4__.eSum;
const scaleExpansion = _scale_expansion_js__WEBPACK_IMPORTED_MODULE_5__.scaleExpansion;
const eDiff = _e_diff_js__WEBPACK_IMPORTED_MODULE_6__.eDiff;
const sign = Math.sign;
function eLongDivide(N, D) {
    N = eCompress(N);
    D = eCompress(D);
    // get the most significant double
    // out by at most 1 ulp, exact if d < MAX_SAFE_INT
    const d = D[D.length - 1];
    // trivial cases
    if (D.length === 1) {
        if (d === 0) {
            throw new Error('division by zero');
        }
        if (d === 1) {
            return { div: N, rem: [0] };
        }
        if (d === -1) {
            return { div: eNegativeOf(N), rem: [0] };
        }
    }
    const signN = sign(N[N.length - 1]);
    if (signN === 0) {
        return { div: [0], rem: [0] };
    }
    const signD = sign(d);
    const divs = [];
    let oldLen = 0;
    while (true) {
        const rems = [];
        // loop from big `n[i]` to small `n[i]`
        for (let i = N.length - 1; i >= 0; i--) {
            const n = N[i];
            // `n % d` is the exact rem (for rem < MAX_SAFE_INTEGER) but is preliminary 
            // as it is subject to round-off for rem > MAX_SAFE_INTEGER; thus out by at 
            // most 1/2 ulp
            // Due to roundoff (and the fact we'e using `d` and not `D`!), `_div` does 
            // not necessarily represent the exact quotient.
            const div = Math.round((n - (n % d)) / d);
            // get the remainder by calculating `rem = n - d*div`
            rems.push(scaleExpansion(D, div)); // exact
            if (div === 0) {
                break;
            }
            divs.push(div);
        }
        N = eCompress(eDiff(N, eSum(rems)));
        if (oldLen === divs.length) {
            break;
        }
        oldLen = divs.length;
    }
    let rem = N;
    let div = [0];
    for (let i = 0; i < divs.length; i++) {
        div = growExpansion(div, divs[i]);
    }
    div = eCompress(div);
    //----------------------
    // fix signs (possibly)
    //----------------------
    //const signDiv = sign(div[div.length-1]);
    const signRem = sign(rem[rem.length - 1]);
    //const signND = signN * signD;
    // We must have:
    // sign(div) === sign(n) * sign(d)
    // sign(rem) === sign(n)
    // At this point: `signN !== 0` and `signD !== 0`
    if (signRem !== 0 && signRem !== signN) {
        if (signN > 0) {
            if (signD > 0) {
                // div = div - 1  (div is positive)
                // rem = rem + D
                div = growExpansion(div, -1);
                rem = fastExpansionSum(rem, D);
            }
            else {
                // div = div + 1  (div is positive)
                // rem = rem - D
                div = growExpansion(div, +1);
                rem = fastExpansionSum(rem, eNegativeOf(D));
            }
        }
        else if (signN < 0) {
            if (signD > 0) {
                // div = div + 1 (div is negative)
                // rem = rem - D
                div = growExpansion(div, +1);
                rem = fastExpansionSum(rem, eNegativeOf(D));
            }
            else {
                // div = div - 1  (div is positive)
                // rem = rem + D
                div = growExpansion(div, -1);
                rem = fastExpansionSum(rem, D);
            }
        }
    }
    return { div, rem };
}

//# sourceMappingURL=e-long-divide.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/e-mult-by-2.js":
/*!*************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/e-mult-by-2.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eMultBy2: () => (/* binding */ eMultBy2)
/* harmony export */ });
/**
 * Returns the result of multiplying a floating point expansion by 2.
 * * **error free**
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 */
function eMultBy2(e) {
    const e_ = [];
    for (let i = 0; i < e.length; i++) {
        e_.push(2 * e[i]);
    }
    return e_;
}

//# sourceMappingURL=e-mult-by-2.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/e-mult-by-neg-2.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/e-mult-by-neg-2.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eMultByNeg2: () => (/* binding */ eMultByNeg2)
/* harmony export */ });
/**
 * Multiply a floating point expansion by -2.
 * * **error free**
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 */
function eMultByNeg2(e) {
    const e_ = [];
    for (let i = 0; i < e.length; i++) {
        e_.push(-2 * e[i]);
    }
    return e_;
}

//# sourceMappingURL=e-mult-by-neg-2.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/e-negative-of.js":
/*!***************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/e-negative-of.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eNegativeOf: () => (/* binding */ eNegativeOf)
/* harmony export */ });
/**
 * Returns the negative of the given floating point expansion.
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 */
function eNegativeOf(e) {
    const m = e.length;
    const h = new Array(m);
    for (let i = 0; i < m; i++) {
        h[i] = -e[i];
    }
    return h;
}

//# sourceMappingURL=e-negative-of.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/e-product.js":
/*!***********************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/e-product.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eProduct: () => (/* binding */ eProduct)
/* harmony export */ });
/* harmony import */ var _expansion_product_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./expansion-product.js */ "../node_modules/big-float-ts/node/double-expansion/expansion-product.js");
/* harmony import */ var _basic_two_product_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../basic/two-product.js */ "../node_modules/big-float-ts/node/basic/two-product.js");
/* harmony import */ var _scale_expansion_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scale-expansion.js */ "../node_modules/big-float-ts/node/double-expansion/scale-expansion.js");
/* harmony import */ var _e_compress_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./e-compress.js */ "../node_modules/big-float-ts/node/double-expansion/e-compress.js");




// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const mult = _expansion_product_js__WEBPACK_IMPORTED_MODULE_0__.expansionProduct;
const tp = _basic_two_product_js__WEBPACK_IMPORTED_MODULE_1__.twoProduct;
const multByDouble = _scale_expansion_js__WEBPACK_IMPORTED_MODULE_2__.scaleExpansion;
const compress = _e_compress_js__WEBPACK_IMPORTED_MODULE_3__.eCompress;
/**
 * Return the result of multiplying together an array of floating point
 * expansions.
 *
 * * The result is exact in the form of a non-overlapping floating point
 * expansion.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param terms an array of multiplicands
 */
function eProduct(term) {
    let product = term[0];
    for (let j = 1; j < term.length; j++) {
        const multiplicant = term[j];
        if (multiplicant.length == 1) {
            if (product.length === 1) {
                product = tp(product[0], multiplicant[0]);
            }
            else {
                product = multByDouble(product, multiplicant[0]);
            }
        }
        else if (product.length === 1) {
            product = multByDouble(multiplicant, product[0]);
        }
        else {
            product = mult(multiplicant, product);
        }
    }
    return compress(product);
    //return product;
}

//# sourceMappingURL=e-product.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/e-rem.js":
/*!*******************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/e-rem.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eRem: () => (/* binding */ eRem)
/* harmony export */ });
/* harmony import */ var _e_long_divide_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./e-long-divide.js */ "../node_modules/big-float-ts/node/double-expansion/e-long-divide.js");

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const eLongDivide = _e_long_divide_js__WEBPACK_IMPORTED_MODULE_0__.eLongDivide;
/**
 * Returns a % b
 *
 * * **precondition:** a and b must be integers, b !== 0
 */
function eRem(a, b) {
    return eLongDivide(a, b).rem;
}

//# sourceMappingURL=e-rem.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/e-sign.js":
/*!********************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/e-sign.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eSign: () => (/* binding */ eSign)
/* harmony export */ });
/**
 * Returns the sign of the given expansion.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * From Shewchuk: "A nonoverlapping expansion is desirable because it is easy to
 * determine its sign (take the sign of the largest component) ... "
 *
 * @param e A floating point expansion with zeroes eliminated.
 */
function eSign(e) {
    return e[e.length - 1];
}

//# sourceMappingURL=e-sign.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/e-sum.js":
/*!*******************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/e-sum.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eSum: () => (/* binding */ eSum)
/* harmony export */ });
/* harmony import */ var _basic_two_sum_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../basic/two-sum.js */ "../node_modules/big-float-ts/node/basic/two-sum.js");
/* harmony import */ var _grow_expansion_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./grow-expansion.js */ "../node_modules/big-float-ts/node/double-expansion/grow-expansion.js");
/* harmony import */ var _fast_expansion_sum_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fast-expansion-sum.js */ "../node_modules/big-float-ts/node/double-expansion/fast-expansion-sum.js");



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const ts = _basic_two_sum_js__WEBPACK_IMPORTED_MODULE_0__.twoSum;
const addDouble = _grow_expansion_js__WEBPACK_IMPORTED_MODULE_1__.growExpansion;
const add = _fast_expansion_sum_js__WEBPACK_IMPORTED_MODULE_2__.fastExpansionSum;
/**
 * Returns the result of summing an array of floating point expansions.
 *
 * * The result is exact in the form of a non-overlapping floating point
 * expansion.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param terms An array of numbers to be summed; A term is represented by a
 * floating point expansion.
 */
// The terms parameter were chosen to always be expansions in order to keep the 
// function monomorhic, but whether it's really worth it I am not sure.
function eSum(terms) {
    let total = [0];
    for (let i = 0; i < terms.length; i++) {
        const term = terms[i];
        // add
        if (term.length === 1) {
            if (total.length === 1) {
                total = ts(total[0], term[0]);
            }
            else {
                total = addDouble(total, term[0]);
            }
        }
        else {
            if (total.length === 1) {
                total = addDouble(term, total[0]);
            }
            else {
                total = add(total, term);
            }
        }
    }
    return total;
}

//# sourceMappingURL=e-sum.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/e-to-bitlength.js":
/*!****************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/e-to-bitlength.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eToBitlength: () => (/* binding */ eToBitlength)
/* harmony export */ });
/* harmony import */ var _e_sign_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./e-sign.js */ "../node_modules/big-float-ts/node/double-expansion/e-sign.js");
/* harmony import */ var _double_representation_msb_exponent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../double-representation/msb-exponent.js */ "../node_modules/big-float-ts/node/double-representation/msb-exponent.js");
/* harmony import */ var _e_compress_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./e-compress.js */ "../node_modules/big-float-ts/node/double-expansion/e-compress.js");
/* harmony import */ var _basic_reduce_significand_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../basic/reduce-significand.js */ "../node_modules/big-float-ts/node/basic/reduce-significand.js");




// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const sign = _e_sign_js__WEBPACK_IMPORTED_MODULE_0__.eSign;
const compress = _e_compress_js__WEBPACK_IMPORTED_MODULE_1__.eCompress;
/**
 * Returns a floating point expansion accurate to the given number of bits.
 * Extraneous bits are discarded.
 * @param a a floating point expansion
 * @param l the number of accurate bits to keep
 */
// TODO - make faster
function eToBitlength(a, l) {
    a = compress(a);
    if (sign(a) === 0) {
        return [0];
    }
    const maxMsb = (0,_double_representation_msb_exponent_js__WEBPACK_IMPORTED_MODULE_2__.msbExponent)(a[a.length - 1]);
    let msb = maxMsb;
    let i = a.length - 1; // start at most significant byte
    while (i > 0) {
        const msb_ = (0,_double_representation_msb_exponent_js__WEBPACK_IMPORTED_MODULE_2__.msbExponent)(a[i - 1]);
        if (maxMsb - msb_ > l) {
            break;
        }
        msb = msb_;
        i--;
    }
    const keepBits = Math.min(l - (maxMsb - msb), 53);
    let b = a[i];
    b = (0,_basic_reduce_significand_js__WEBPACK_IMPORTED_MODULE_3__.reduceSignificand)(b, keepBits);
    const result = a.slice(i);
    result[0] = b;
    return result;
}

//# sourceMappingURL=e-to-bitlength.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/e-to-double-double.js":
/*!********************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/e-to-double-double.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eToDd: () => (/* binding */ eToDd)
/* harmony export */ });
/* harmony import */ var _e_compress_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./e-compress.js */ "../node_modules/big-float-ts/node/double-expansion/e-compress.js");

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const compress = _e_compress_js__WEBPACK_IMPORTED_MODULE_0__.eCompress;
/**
 * Returns the result of converting a floating point expansion to a
 * double-double precision floating point number.
 */
function eToDd(e) {
    e = compress(e);
    const len = e.length;
    if (len === 2) {
        return e; // already a double-double
    }
    else if (len === 1) {
        return [0, e[0]]; // double-doubles have a fixed length of 2
    }
    return [e[len - 2], e[len - 1]]; // return only most significant parts
}

//# sourceMappingURL=e-to-double-double.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/expansion-product.js":
/*!*******************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/expansion-product.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   expansionProduct: () => (/* binding */ expansionProduct)
/* harmony export */ });
/* harmony import */ var _fast_expansion_sum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fast-expansion-sum.js */ "../node_modules/big-float-ts/node/double-expansion/fast-expansion-sum.js");
/* harmony import */ var _scale_expansion_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scale-expansion.js */ "../node_modules/big-float-ts/node/double-expansion/scale-expansion.js");
/* harmony import */ var _e_compress_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./e-compress.js */ "../node_modules/big-float-ts/node/double-expansion/e-compress.js");



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const multByDouble = _scale_expansion_js__WEBPACK_IMPORTED_MODULE_0__.scaleExpansion;
const add = _fast_expansion_sum_js__WEBPACK_IMPORTED_MODULE_1__.fastExpansionSum;
const compress = _e_compress_js__WEBPACK_IMPORTED_MODULE_2__.eCompress;
/**
 * Returns the product of two double floating point expansions.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * As per Shewchuk in the above paper: "To find the product of two expansions
 * e and f, use SCALE-EXPANSION (with zero elimination) to form the expansions
 * ef_1, ef_2, ..., then sum these using a distillation tree."
 *
 * A distillation tree used with fastExpansionSum will give O(k*log k) vs O(k^2)
 * operations.
 *
 * Implemented naively and not as described by Shewchuk (i.e. the algorithm
 * takes O(k^2) operations).
 * @param e a double floating point expansion
 * @param f another double floating point expansion
 */
function expansionProduct(e, f) {
    let sum = [0];
    for (let i = 0; i < e.length; i++) {
        sum = add(sum, multByDouble(f, e[i]));
    }
    //return compress(sum);
    return sum;
}

//# sourceMappingURL=expansion-product.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/fast-expansion-sum.js":
/*!********************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/fast-expansion-sum.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fastExpansionSum: () => (/* binding */ fastExpansionSum)
/* harmony export */ });
/* harmony import */ var _e_compress_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./e-compress.js */ "../node_modules/big-float-ts/node/double-expansion/e-compress.js");

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const compress = _e_compress_js__WEBPACK_IMPORTED_MODULE_0__.eCompress;
/**
 * Returns the result of adding two expansions.
 *
 * Theorem 13: Let e = sum_(i=1)^m(e_i) and f = sum_(i=1)^n(f_i) be strongly
 * nonoverlapping expansions of m and n p-bit components, respectively, where
 * p >= 4. Suppose that the components of both e and f are sorted in order of
 * increasing magnitude, except that any of the e_i or f_i may be zero. On a
 * machine whose arithmetic uses the round-to-even rule, the following algorithm
 * will produce a strongly nonoverlapping expansion h such that
 * sum_(i=1)^(m+n)(e_i + f_i) = e + f, where the components of h are also in
 * order of increasing magnitude, except that any of the h_i may be zero.
 *
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 */
function fastExpansionSum(e, f) {
    //const g = merge(e,f);
    // inlined (above line)
    const lenE = e.length;
    const lenF = f.length;
    let i = 0;
    let j = 0;
    const g = [];
    while (i < lenE && j < lenF) {
        if (e[i] === 0) {
            i++;
            continue;
        }
        if (f[j] === 0) {
            j++;
            continue;
        }
        if (Math.abs(e[i]) <= Math.abs(f[j])) {
            g.push(e[i]);
            i++;
        }
        else {
            g.push(f[j]);
            j++;
        }
    }
    while (i < lenE) {
        g.push(e[i]);
        i++;
    }
    while (j < lenF) {
        g.push(f[j]);
        j++;
    }
    if (g.length === 0) {
        return [0];
    }
    // end inlined
    const len = g.length;
    if (len === 1) {
        return g;
    }
    //const h: number[] = new Array(len);
    const h = [];
    //const q: number;
    //[h[0], q] = fastTwoSum(g[1], g[0]);
    // inlined (above line)
    const a = g[1];
    const b = g[0];
    let q = a + b;
    //h[0] = b - (q - a);
    const hh = b - (q - a);
    if (hh !== 0) {
        h.push(hh);
    }
    //let j = 0;
    j = 0;
    for (let i = 2; i < len; i++) {
        //[h[i-1], q] = twoSum(q, g[i]);
        // inlined (above line)
        const b = g[i];
        const R = q + b;
        const _ = R - q;
        //h[i-1] = (q - (R - _)) + (b - _);
        const hh = (q - (R - _)) + (b - _);
        if (hh !== 0) {
            h.push(hh);
        }
        q = R;
    }
    //h[len-1] = q;
    //h.push(q);
    if (q !== 0 || h.length === 0) {
        h.push(q);
    }
    //return compress(h);
    return h;
}
/**
 * Returns the result of merging an expansion e and f into a single expansion,
 * in order of nondecreasing magnitude (possibly with interspersed zeros).
 * (This function is zero-eliminating)
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 * @param f another floating point expansion
 */
function merge(e, f) {
    const lenE = e.length;
    const lenF = f.length;
    let i = 0;
    let j = 0;
    const merged = [];
    while (i < lenE && j < lenF) {
        if (e[i] === 0) {
            i++;
            continue;
        }
        if (f[j] === 0) {
            j++;
            continue;
        }
        if (Math.abs(e[i]) <= Math.abs(f[j])) {
            merged.push(e[i]);
            i++;
        }
        else {
            merged.push(f[j]);
            j++;
        }
    }
    while (i < lenE) {
        merged.push(e[i]);
        i++;
    }
    while (j < lenF) {
        merged.push(f[j]);
        j++;
    }
    if (merged.length === 0) {
        return [0];
    }
    return merged;
}

//# sourceMappingURL=fast-expansion-sum.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/grow-expansion.js":
/*!****************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/grow-expansion.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   growExpansion: () => (/* binding */ growExpansion)
/* harmony export */ });
/* harmony import */ var _e_compress_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./e-compress.js */ "../node_modules/big-float-ts/node/double-expansion/e-compress.js");

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const compress = _e_compress_js__WEBPACK_IMPORTED_MODULE_0__.eCompress;
/**
 * Returns the result of adding a double to an expansion.
 *
 * Let e be a nonoverlapping expansion of m p-bit components, and let b be a
 * p-bit value where p >= 3. Suppose that the components e_1, ..., e_m are
 * sorted in order of *increasing* magnitude, except that any of the ei may be
 * zero.
 * Then the following algorithm will produce a nonoverlapping expansion such
 * that h = sum_i(h_i) = e + b, where the components h_1, ..., h_(m+1) are also
 * in order of increasing magnitude, except that any of the h_i may be zero.
 * Furthermore, if e is nonadjacent and round-to-even tiebreaking is used, then
 * h is nonadjacent.
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 * @param e A floating point expansion
 * @param b Another floating point expansion
 */
function growExpansion(e, b) {
    const m = e.length;
    let q = b;
    //const h: number[] = new Array(m+1);
    const h = [];
    //let j = 0;
    for (let i = 0; i < m; i++) {
        // Note the use of twoSum and not fastTwoSum.
        //[h[i], q] = ts(q, e[i]);
        const ee = e[i];
        const x = q + ee;
        const bv = x - q;
        const hh = (q - (x - bv)) + (ee - bv);
        if (hh !== 0) {
            h.push(hh);
        }
        q = x;
    }
    //h[j] = q;
    if (q !== 0 || h.length === 0) {
        h.push(q);
    }
    //return compress(h);
    return h;
}

//# sourceMappingURL=grow-expansion.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/is-adjacent.js":
/*!*************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/is-adjacent.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isAdjacent: () => (/* binding */ isAdjacent)
/* harmony export */ });
/* harmony import */ var _is_overlapping_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-overlapping.js */ "../node_modules/big-float-ts/node/double-expansion/is-overlapping.js");

/**
 * Returns true if x and y are adjacent, false otherwise.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * for details
 *
 * @param x a double floating point number
 * @param y another double floating point number
 */
function isAdjacent(x, y) {
    return (0,_is_overlapping_js__WEBPACK_IMPORTED_MODULE_0__.isOverlapping)(x, y) ||
        (0,_is_overlapping_js__WEBPACK_IMPORTED_MODULE_0__.isOverlapping)(x, 2 * y) ||
        (0,_is_overlapping_js__WEBPACK_IMPORTED_MODULE_0__.isOverlapping)(2 * x, y);
}

//# sourceMappingURL=is-adjacent.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/is-overlapping.js":
/*!****************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/is-overlapping.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNonOverlapping: () => (/* binding */ isNonOverlapping),
/* harmony export */   isNonOverlappingAll: () => (/* binding */ isNonOverlappingAll),
/* harmony export */   isOverlapping: () => (/* binding */ isOverlapping)
/* harmony export */ });
/* harmony import */ var _double_representation_get_max_set_bit_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../double-representation/get-max-set-bit.js */ "../node_modules/big-float-ts/node/double-representation/get-max-set-bit.js");
/* harmony import */ var _double_representation_exponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../double-representation/exponent.js */ "../node_modules/big-float-ts/node/double-representation/exponent.js");


/**
 * Returns true if a and b overlaps, false otherwise.
 *
 * Two floating-point values x and y are nonoverlapping if the least significant
 * nonzero bit of x is more significant than the most significant nonzero bit of
 * y.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * Implemented for testing purposes.
 * @param a a double
 * @param b another double
 */
function isOverlapping(a, b) {
    return !isNonOverlapping(a, b);
}
/**
 * Returns true if a and b does not overlap, false otherwise.
 *
 * Two floating-point values x and y are nonoverlapping if the least significant
 * nonzero bit of x is more significant than the most significant nonzero bit of
 * y.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * Implemented for testing purposes.
 *
 * @param a A double
 * @param b Another double
 */
function isNonOverlapping(a, b) {
    if (a === 0 || b === 0) {
        return true;
    }
    if (Math.abs(b) > Math.abs(a)) {
        [a, b] = [b, a];
    }
    // At this point abs(a) > abs(b)
    const l = (0,_double_representation_get_max_set_bit_js__WEBPACK_IMPORTED_MODULE_0__.getLowestSetBit)(a);
    const h = (0,_double_representation_get_max_set_bit_js__WEBPACK_IMPORTED_MODULE_0__.getHighestSetBit)(b);
    const shift = (0,_double_representation_exponent_js__WEBPACK_IMPORTED_MODULE_1__.exponent)(a) - (0,_double_representation_exponent_js__WEBPACK_IMPORTED_MODULE_1__.exponent)(b);
    return (l + shift) > h;
}
/**
 * Returns true if all components of the given floating point expansion is
 * non-overlapping, false otherwise.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a double floating point expansion
 */
function isNonOverlappingAll(e) {
    for (let i = 1; i < e.length; i++) {
        if (isOverlapping(e[i - 1], e[i])) {
            return false;
        }
    }
    return true;
}

//# sourceMappingURL=is-overlapping.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-expansion/scale-expansion.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-expansion/scale-expansion.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scaleExpansion: () => (/* binding */ scaleExpansion),
/* harmony export */   scaleExpansion2: () => (/* binding */ scaleExpansion2)
/* harmony export */ });
/* harmony import */ var _basic_two_product_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../basic/two-product.js */ "../node_modules/big-float-ts/node/basic/two-product.js");
/* harmony import */ var _basic_two_sum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../basic/two-sum.js */ "../node_modules/big-float-ts/node/basic/two-sum.js");
/* harmony import */ var _basic_fast_two_sum_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../basic/fast-two-sum.js */ "../node_modules/big-float-ts/node/basic/fast-two-sum.js");
/* harmony import */ var _e_compress_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./e-compress.js */ "../node_modules/big-float-ts/node/double-expansion/e-compress.js");




const f = 134217729; // 2**27 + 1;
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const tp = _basic_two_product_js__WEBPACK_IMPORTED_MODULE_0__.twoProduct;
const ts = _basic_two_sum_js__WEBPACK_IMPORTED_MODULE_1__.twoSum;
const fts = _basic_fast_two_sum_js__WEBPACK_IMPORTED_MODULE_2__.fastTwoSum;
const compress = _e_compress_js__WEBPACK_IMPORTED_MODULE_3__.eCompress;
/**
 * Returns the result of multiplying an expansion by a double.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * Theorem 19 (Shwechuk): Let e = sum_(i=1)^m(e_i) be a nonoverlapping expansion
 * of m p-bit components, and const b be a p-bit value where p >= 4. Suppose that
 * the components of e are sorted in order of increasing magnitude, except that
 * any of the e_i may be zero. Then the following algorithm will produce a
 * nonoverlapping expansion h such that h = sum_(i=1)^(2m)(h_i) = be, where the
 * components of h are also in order of increasing magnitude, except that any of
 * the h_i may be zero. Furthermore, if e is nonadjacent and round-to-even
 * tiebreaking is used, then h is non-adjacent.
 *
 * @param e a double floating point expansion
 * @param b a double
 */
function scaleExpansion(e, b) {
    const m = e.length;
    //const h: number[] = new Array(2*m);
    let q_;
    //[h[0], q] = tp(e[0], b);
    // inlined (above line)
    const a = e[0];
    let q = a * b;
    const c = f * a;
    const ah = c - (c - a);
    const al = a - ah;
    const d = f * b;
    const bh = d - (d - b);
    const bl = b - bh;
    const h = [];
    //h[0] = (al*bl) - ((q - (ah*bh)) - (al*bh) - (ah*bl));
    const hh = (al * bl) - ((q - (ah * bh)) - (al * bh) - (ah * bl));
    if (hh !== 0) {
        h.push(hh);
    }
    for (let i = 1; i < m; i++) {
        //const [t, T] = tp(e[i], b);
        // inlined (above line)
        const a = e[i];
        const T = a * b;
        const c = f * a;
        const ah = c - (c - a);
        const al = a - ah;
        const d = f * b;
        const bh = d - (d - b);
        const bl = b - bh;
        const t = (al * bl) - ((T - (ah * bh)) - (al * bh) - (ah * bl));
        //[h[2*i-1], q_] = ts(q, t);
        // inlined (above line)
        const x = q + t;
        const bv = x - q;
        //h[2*i-1] = (q - (x - bv)) + (t - bv);
        //h.push((q - (x - bv)) + (t - bv));
        const hh = (q - (x - bv)) + (t - bv);
        if (hh !== 0) {
            h.push(hh);
        }
        q_ = x;
        //[h[2*i], q] = fts(T, q_);
        // inlined (above line)
        const xx = T + q_;
        //h[2*i] = q_ - (xx - T);
        //h.push(q_ - (xx - T));
        const hhh = q_ - (xx - T);
        if (hhh !== 0) {
            h.push(hhh);
        }
        q = xx;
    }
    //h[2*m - 1] = q;
    //h.push(q);
    if (q !== 0 || h.length === 0) {
        h.push(q);
    }
    //return eCompress(h);
    return h;
}
/**
 * Returns the result of multiplying an expansion by a double.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * Theorem 19 (Shwechuk): Let e = sum_(i=1)^m(e_i) be a nonoverlapping expansion
 * of m p-bit components, and const b be a p-bit value where p >= 4. Suppose that
 * the components of e are sorted in order of increasing magnitude, except that
 * any of the e_i may be zero. Then the following algorithm will produce a
 * nonoverlapping expansion h such that h = sum_(i=1)^(2m)(h_i) = be, where the
 * components of h are also in order of increasing magnitude, except that any of
 * the h_i may be zero. Furthermore, if e is nonadjacent and round-to-even
 * tiebreaking is used, then h is non-adjacent.
 *
 * @param e a double floating point expansion
 * @param b a double
 */
function scaleExpansion2(b, e) {
    const m = e.length;
    //const h: number[] = new Array(2*m);
    let q_;
    //[h[0], q] = tp(e[0], b);
    // inlined (above line)
    const a = e[0];
    let q = a * b;
    const c = f * a;
    const ah = c - (c - a);
    const al = a - ah;
    const d = f * b;
    const bh = d - (d - b);
    const bl = b - bh;
    const h = [];
    //h[0] = (al*bl) - ((q - (ah*bh)) - (al*bh) - (ah*bl));
    const hh = (al * bl) - ((q - (ah * bh)) - (al * bh) - (ah * bl));
    if (hh !== 0) {
        h.push(hh);
    }
    for (let i = 1; i < m; i++) {
        //const [t, T] = tp(e[i], b);
        // inlined (above line)
        const a = e[i];
        const T = a * b;
        const c = f * a;
        const ah = c - (c - a);
        const al = a - ah;
        const d = f * b;
        const bh = d - (d - b);
        const bl = b - bh;
        const t = (al * bl) - ((T - (ah * bh)) - (al * bh) - (ah * bl));
        //[h[2*i-1], q_] = ts(q, t);
        // inlined (above line)
        const x = q + t;
        const bv = x - q;
        //h[2*i-1] = (q - (x - bv)) + (t - bv);
        //h.push((q - (x - bv)) + (t - bv));
        const hh = (q - (x - bv)) + (t - bv);
        if (hh !== 0) {
            h.push(hh);
        }
        q_ = x;
        //[h[2*i], q] = fts(T, q_);
        // inlined (above line)
        const xx = T + q_;
        //h[2*i] = q_ - (xx - T);
        //h.push(q_ - (xx - T));
        const hhh = q_ - (xx - T);
        if (hhh !== 0) {
            h.push(hhh);
        }
        q = xx;
    }
    //h[2*m - 1] = q;
    //h.push(q);
    if (q !== 0 || h.length === 0) {
        h.push(q);
    }
    //return eCompress(h);
    return h;
}

//# sourceMappingURL=scale-expansion.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-representation/bit-length.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-representation/bit-length.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bitLength: () => (/* binding */ bitLength),
/* harmony export */   expBitLength: () => (/* binding */ expBitLength)
/* harmony export */ });
/* harmony import */ var _get_max_set_bit_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-max-set-bit.js */ "../node_modules/big-float-ts/node/double-representation/get-max-set-bit.js");
/* harmony import */ var _double_expansion_e_compress_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../double-expansion/e-compress.js */ "../node_modules/big-float-ts/node/double-expansion/e-compress.js");
/* harmony import */ var _exponent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./exponent.js */ "../node_modules/big-float-ts/node/double-representation/exponent.js");
/* harmony import */ var _double_expansion_e_sign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../double-expansion/e-sign.js */ "../node_modules/big-float-ts/node/double-expansion/e-sign.js");




/**
 * Returns the bit-length of the significand of the given number in such a way
 * that trailing zeros are not counted.
 * @param a A double precision floating point number
 */
function bitLength(a) {
    if (a === 0) {
        return 0;
    }
    return (0,_get_max_set_bit_js__WEBPACK_IMPORTED_MODULE_0__.getHighestSetBit)(a) - (0,_get_max_set_bit_js__WEBPACK_IMPORTED_MODULE_0__.getLowestSetBit)(a) + 1;
}
/**
 * Returns the bit-length of the significand of the given floating point
 * expansion in such a way that trailing zeros are not counted.
 * * precondition: subnormals not currently supported
 * @param a A double precision floating point expansion
 */
function expBitLength(a) {
    const a_ = (0,_double_expansion_e_compress_js__WEBPACK_IMPORTED_MODULE_1__.eCompress)(a);
    if ((0,_double_expansion_e_sign_js__WEBPACK_IMPORTED_MODULE_2__.eSign)(a_) === 0) {
        return 0;
    }
    const msbyte = a_[a_.length - 1];
    const lsbyte = a_[0];
    return (0,_exponent_js__WEBPACK_IMPORTED_MODULE_3__.exponent)(msbyte) - (0,_exponent_js__WEBPACK_IMPORTED_MODULE_3__.exponent)(lsbyte) + (53 - (0,_get_max_set_bit_js__WEBPACK_IMPORTED_MODULE_0__.getLowestSetBit)(lsbyte));
}

//# sourceMappingURL=bit-length.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-representation/double-to-binary-string.js":
/*!******************************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-representation/double-to-binary-string.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   doubleToBinaryString: () => (/* binding */ doubleToBinaryString)
/* harmony export */ });
/* harmony import */ var _double_to_octets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./double-to-octets.js */ "../node_modules/big-float-ts/node/double-representation/double-to-octets.js");
// Modified from https://github.com/bartaz/ieee754-visualization/
// under the MIT license
// Copyright 2013 Bartek Szopka (original author)

function doubleToBinaryString(number) {
    return octetsToBinaryString((0,_double_to_octets_js__WEBPACK_IMPORTED_MODULE_0__.doubleToOctets)(number));
}
/**
 * @param octets The 8 bytes composing a double (msb first)
 */
function octetsToBinaryString(octets) {
    return octets
        .map(int8ToBinaryString)
        .join('');
}
/**
 * intToBinaryString(8) -> "00001000"
 */
function int8ToBinaryString(i) {
    let iStr = i.toString(2);
    for (; iStr.length < 8; iStr = "0" + iStr)
        ;
    return iStr;
}

//# sourceMappingURL=double-to-binary-string.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-representation/double-to-octets.js":
/*!***********************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-representation/double-to-octets.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   doubleToOctets: () => (/* binding */ doubleToOctets)
/* harmony export */ });
// Modified from https://github.com/bartaz/ieee754-visualization/
// under the MIT license
// Copyright 2013 Bartek Szopka (original author)
/**
 * Returns the ieee-574 8 bytes composing the given double, starting from the
 * sign bit and ending in the lsb of the significand.
 * e.g. 123.456 -> [64, 94, 221, 47, 26, 159, 190, 119]
 */
function doubleToOctets(number) {
    const buffer = new ArrayBuffer(8);
    new DataView(buffer).setFloat64(0, number, false);
    return Array.from(new Uint8Array(buffer));
}

//# sourceMappingURL=double-to-octets.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-representation/exponent.js":
/*!***************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-representation/exponent.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   exponent: () => (/* binding */ exponent)
/* harmony export */ });
/* harmony import */ var _parse_double_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parse-double.js */ "../node_modules/big-float-ts/node/double-representation/parse-double.js");

/**
 * Returns the normalized exponent of the given number.
 * @param a A double
 */
function exponent(a) {
    return (0,_parse_double_js__WEBPACK_IMPORTED_MODULE_0__.parseDouble)(a).exponent;
}

//# sourceMappingURL=exponent.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-representation/get-max-set-bit.js":
/*!**********************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-representation/get-max-set-bit.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getHighestSetBit: () => (/* binding */ getHighestSetBit),
/* harmony export */   getLowestSetBit: () => (/* binding */ getLowestSetBit)
/* harmony export */ });
/* harmony import */ var _significand_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./significand.js */ "../node_modules/big-float-ts/node/double-representation/significand.js");

/**
 * Returns the lowest set bit of the given value in [1, (2**31)-1],
 * i.e. from 1 up to 2147483647 else if no bit is set (input === 0) returns
 * NaN, otherwise if the number is out of range returns a non-finite
 * number.
 * See https://stackoverflow.com/a/35190288/2010061
 */
function getLowestSetBit_(a) {
    return Math.log2(a & -a);
}
/**
 * Returns the lowest set bit of the given number's significand (where the lsb
 * is bit 0 and the msb is bit 52). If no bit is set (input === 0 or +-inf or
 * NaN) returns NaN.
 * See https://stackoverflow.com/a/35190288/2010061
 */
function getLowestSetBit(a) {
    if (a === 0 || !Number.isFinite(a)) {
        // There is no lowest set bit
        return NaN;
    }
    // Note: the significand includes the hidden bit!
    const s = (0,_significand_js__WEBPACK_IMPORTED_MODULE_0__.significand)(a);
    const len = s.length;
    for (let i = len - 1; i >= 0; i--) {
        if (s[i] === 0) {
            continue;
        }
        const l = getLowestSetBit_(s[i]);
        if (Number.isFinite(l)) {
            return (8 * (len - i - 1)) + l;
        }
    }
    return NaN;
}
/**
 * Returns the highest set bit of the given value in [1, 255], i.e. from 1 up
 * to 255. If the input number === 0 returns NaN.
 * See https://stackoverflow.com/a/35190288/2010061
 */
function getHighestSetBit_(a) {
    return a >= 128 ? 7
        : a >= 64 ? 6
            : a >= 32 ? 5
                : a >= 16 ? 4
                    : a >= 8 ? 3
                        : a >= 4 ? 2
                            : a >= 2 ? 1
                                : a >= 1 ? 0
                                    : NaN;
}
/**
 * Returns the highest set bit of the given double. If no bit is set (input
 * === 0 or +/-inf or NaN) returns NaN.
 * See https://stackoverflow.com/a/35190288/2010061
 */
function getHighestSetBit(a) {
    if (a === 0 || !Number.isFinite(a)) {
        // There is no lowest set bit
        return NaN;
    }
    // At this point there must be a highest set bit (always === 52 if the 
    // number is not a subnormal.
    const s = (0,_significand_js__WEBPACK_IMPORTED_MODULE_0__.significand)(a);
    const len = s.length;
    for (let i = 0; i < len; i++) {
        const l = getHighestSetBit_(s[i]);
        if (Number.isFinite(l)) {
            return (8 * (len - i - 1)) + l;
        }
    }
    return NaN;
}

//# sourceMappingURL=get-max-set-bit.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-representation/is-bit-aligned.js":
/*!*********************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-representation/is-bit-aligned.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isBitAligned: () => (/* binding */ isBitAligned)
/* harmony export */ });
/* harmony import */ var _get_max_set_bit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-max-set-bit.js */ "../node_modules/big-float-ts/node/double-representation/get-max-set-bit.js");
/* harmony import */ var _exponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exponent.js */ "../node_modules/big-float-ts/node/double-representation/exponent.js");


/**
 * Returns true if the given number is bit-aligned in the sense that its a
 * multiple of a given power of 2, say e, and such that the number, say a,
 * conforms to: a/2^e < 2^(l-e), where l is the max allowed bit length.
 * This essentially means the numbers act somewhat like fixed-point numbers
 * which can drastically speed up some geometric algorithms and also reduce
 * their complexity.
 *
 * Visually:
 * These numbers (a,b and c) are bit aligned with e === 3 and max
 * bitlength === 6:
 *    a -> 00|101100|000
 *    b -> 00|000100|000
 *    c -> 00|110111|000
 * These are not
 *    a -> 01|101100|000
 *    b -> 00|000100|000
 * These are not
 *    a -> 00|101100|000
 *    b -> 00|000100|100
 * These are not
 *    a -> 00|101100|100
 *    b -> 00|000100|100
 * @param as An array of numbers to check
 * @param maxBitLength The max allowed bitlength
 * @param gridSpacingExponent The grid spacing === 1^gridSpacingExponent
 */
function isBitAligned(a, maxBitLength, gridSpacingExponent) {
    if (a === 0) {
        return true;
    }
    const e = (0,_exponent_js__WEBPACK_IMPORTED_MODULE_0__.exponent)(a);
    const maxSetBit = (0,_get_max_set_bit_js__WEBPACK_IMPORTED_MODULE_1__.getHighestSetBit)(a) - 52 + e;
    const minSetBit = (0,_get_max_set_bit_js__WEBPACK_IMPORTED_MODULE_1__.getLowestSetBit)(a) - 52 + e;
    const minBitBigEnough = minSetBit >= gridSpacingExponent;
    const maxBitSmallEnough = maxSetBit <= maxBitLength - 1 + gridSpacingExponent;
    return minBitBigEnough && maxBitSmallEnough;
}

//# sourceMappingURL=is-bit-aligned.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-representation/lsb-exponent.js":
/*!*******************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-representation/lsb-exponent.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   lsbExponent: () => (/* binding */ lsbExponent)
/* harmony export */ });
/* harmony import */ var _get_max_set_bit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-max-set-bit.js */ "../node_modules/big-float-ts/node/double-representation/get-max-set-bit.js");
/* harmony import */ var _exponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exponent.js */ "../node_modules/big-float-ts/node/double-representation/exponent.js");


/**
 * Returns the true exponent of the lsb that is set of the given number or
 * NaN if a === 0 or +-inf or NaN.
 * @param a An array of numbers to check
 */
function lsbExponent(a) {
    if (a === 0 || !Number.isFinite(a)) {
        return NaN;
    }
    const e = (0,_exponent_js__WEBPACK_IMPORTED_MODULE_0__.exponent)(a);
    return (0,_get_max_set_bit_js__WEBPACK_IMPORTED_MODULE_1__.getLowestSetBit)(a) - 52 + e;
}

//# sourceMappingURL=lsb-exponent.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-representation/msb-exponent.js":
/*!*******************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-representation/msb-exponent.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   msbExponent: () => (/* binding */ msbExponent)
/* harmony export */ });
/* harmony import */ var _get_max_set_bit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-max-set-bit.js */ "../node_modules/big-float-ts/node/double-representation/get-max-set-bit.js");
/* harmony import */ var _exponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exponent.js */ "../node_modules/big-float-ts/node/double-representation/exponent.js");


/**
 * Returns the true exponent of the msb that is set of the given number or
 * NaN if a === 0 or +-inf or NaN.
 * @param a An array of numbers to check
 */
function msbExponent(a) {
    if (a === 0 || !Number.isFinite(a)) {
        return NaN;
    }
    const e = (0,_exponent_js__WEBPACK_IMPORTED_MODULE_0__.exponent)(a);
    // Will return e for all but subnormal numbers
    return (0,_get_max_set_bit_js__WEBPACK_IMPORTED_MODULE_1__.getHighestSetBit)(a) - 52 + e;
}

//# sourceMappingURL=msb-exponent.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-representation/parse-double.js":
/*!*******************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-representation/parse-double.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseDouble: () => (/* binding */ parseDouble),
/* harmony export */   parseDoubleDetailed: () => (/* binding */ parseDoubleDetailed)
/* harmony export */ });
/* harmony import */ var _double_to_binary_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./double-to-binary-string.js */ "../node_modules/big-float-ts/node/double-representation/double-to-binary-string.js");
/* harmony import */ var _double_to_octets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./double-to-octets.js */ "../node_modules/big-float-ts/node/double-representation/double-to-octets.js");
// Modified from https://github.com/bartaz/ieee754-visualization/
// under the MIT license
// Copyright 2013 Bartek Szopka (original author)


/**
 * Returns the relevant parts of the given IEEE-754 double. The returned
 * exponent has been normalized (i.e. 1023 ha been subtracted) and the
 * significand has the hidden bit added if appropriate.
 * See https://github.com/bartaz/ieee754-visualization
 */
function parseDouble(x) {
    const parts = (0,_double_to_octets_js__WEBPACK_IMPORTED_MODULE_0__.doubleToOctets)(x);
    const p0 = parts[0];
    const p1 = parts[1];
    const sign = p0 >> 7;
    const exponent_ = ((p0 & 127) << 4) + ((p1 & 0b11110000) >> 4);
    //---- Check for negative / positive zero / denormalized numbers.
    const hiddenMsb = exponent_ === 0 ? 0 : 16;
    // Note: exponent === 0 => 0 or denormalized number (a.k.a. subnormal number).
    const exponent = exponent_ === 0
        ? exponent_ - 1022 // Subnormals use a biased exponent of 1 (not 0!)
        : exponent_ - 1023;
    //---- Break up the significand into bytes
    const significand = parts.slice(1);
    significand[0] = (p1 & 15) + hiddenMsb;
    return {
        sign,
        exponent,
        significand
    };
}
/**
 * Returns the relevant parts of the given IEEE-754 double.
 * See https://github.com/bartaz/ieee754-visualization.
 * This is a slower version of parseDouble that gives binary string
 * representations of the components.
 */
function parseDoubleDetailed(x) {
    const str = (0,_double_to_binary_string_js__WEBPACK_IMPORTED_MODULE_1__.doubleToBinaryString)(x);
    // sign{1} exponent{11} fraction{52} === 64 bits (+1 hidden!)
    const [, sign, exponent, significand] = str.match(/^(.)(.{11})(.{52})$/);
    const exponent_ = parseInt(exponent, 2);
    const hidden = exponent_ === 0 ? "0" : "1";
    return {
        full: sign + exponent + hidden + significand,
        sign,
        exponent,
        hidden,
        significand
    };
}

//# sourceMappingURL=parse-double.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/double-representation/significand.js":
/*!******************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/double-representation/significand.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   significand: () => (/* binding */ significand)
/* harmony export */ });
/* harmony import */ var _parse_double_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parse-double.js */ "../node_modules/big-float-ts/node/double-representation/parse-double.js");

/**
 * Return the significand of the given double with the hidden bit added (in case
 * a is not subnormal or 0, etc.)
 * @param a A double
 */
function significand(a) {
    return (0,_parse_double_js__WEBPACK_IMPORTED_MODULE_0__.parseDouble)(a).significand;
}

//# sourceMappingURL=significand.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/geometric-primitives/orient2d.js":
/*!**************************************************************************!*\
  !*** ../node_modules/big-float-ts/node/geometric-primitives/orient2d.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   orient2d: () => (/* binding */ orient2d)
/* harmony export */ });
/* harmony import */ var _basic_two_product_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../basic/two-product.js */ "../node_modules/big-float-ts/node/basic/two-product.js");
/* harmony import */ var _double_expansion_e_diff_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../double-expansion/e-diff.js */ "../node_modules/big-float-ts/node/double-expansion/e-diff.js");
/* harmony import */ var _double_expansion_e_estimate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../double-expansion/e-estimate.js */ "../node_modules/big-float-ts/node/double-expansion/e-estimate.js");
/* harmony import */ var _basic_two_diff_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../basic/two-diff.js */ "../node_modules/big-float-ts/node/basic/two-diff.js");
/* harmony import */ var _double_expansion_fast_expansion_sum_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../double-expansion/fast-expansion-sum.js */ "../node_modules/big-float-ts/node/double-expansion/fast-expansion-sum.js");
/* harmony import */ var _double_expansion_e_compress_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../double-expansion/e-compress.js */ "../node_modules/big-float-ts/node/double-expansion/e-compress.js");






const ccwerrboundA = 3.330669073875472e-16;
const ccwerrboundB = 2.220446049250315e-16;
const ccwerrboundC = 1.109335647967049e-31;
const resulterrbound = 3.330669073875471e-16;
/**
 * * Ported from [Shewchuk](http://docs.ros.org/kinetic/api/asr_approx_mvbb/html/Predicates_8cpp_source.html)
 * * see also https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 *
 * * Adaptive exact 2d orientation test.
 *
 * * Robust.
 *
 * Return a positive value if the points pa, pb, and pc occur in
 * counterclockwise order; a negative value if they occur in clockwise order;
 * and zero if they are collinear.  The result is also a rough approximation of
 * twice the signed area of the triangle defined by the three points.
 *
 * The result returned is the determinant of a matrix. This determinant is
 * computed adaptively, in the sense that exact arithmetic is used only to the
 * degree it is needed to ensure that the returned value has the correct sign.
 * Hence, orient2d() is usually quite fast, but will run more slowly when the
 * input points are collinear or nearly so.
 */
function orient2d(A, B, C) {
    const detleft = (A[0] - C[0]) * (B[1] - C[1]);
    const detright = (A[1] - C[1]) * (B[0] - C[0]);
    const det = detleft - detright;
    let detsum;
    if (detleft > 0) {
        if (detright <= 0) {
            // Anti-clockwise
            return det;
        }
        else {
            detsum = detleft + detright;
        }
    }
    else if (detleft < 0) {
        if (detright >= 0) {
            // Clockwise
            return det;
        }
        else {
            detsum = -detleft - detright;
        }
    }
    else {
        // Anti-clockwise, clockwise or straight
        return det;
    }
    if (Math.abs(det) >= ccwerrboundA * detsum) {
        // Anti-clockwise or clockwise
        return det;
    }
    return orient2dAdapt(A, B, C, detsum);
}
function orient2dAdapt(A, B, C, detsum) {
    const acx = A[0] - C[0];
    const bcx = B[0] - C[0];
    const acy = A[1] - C[1];
    const bcy = B[1] - C[1];
    const b = (0,_double_expansion_e_diff_js__WEBPACK_IMPORTED_MODULE_0__.eDiff)((0,_basic_two_product_js__WEBPACK_IMPORTED_MODULE_1__.twoProduct)(acx, bcy), (0,_basic_two_product_js__WEBPACK_IMPORTED_MODULE_1__.twoProduct)(acy, bcx));
    let det = (0,_double_expansion_e_estimate_js__WEBPACK_IMPORTED_MODULE_2__.eEstimate)(b);
    if (Math.abs(det) >= ccwerrboundB * detsum) {
        // Anti-clockwise or clockwise
        return det;
    }
    const acxtail = (0,_basic_two_diff_js__WEBPACK_IMPORTED_MODULE_3__.twoDiff)(A[0], C[0])[0];
    const bcxtail = (0,_basic_two_diff_js__WEBPACK_IMPORTED_MODULE_3__.twoDiff)(B[0], C[0])[0];
    const acytail = (0,_basic_two_diff_js__WEBPACK_IMPORTED_MODULE_3__.twoDiff)(A[1], C[1])[0];
    const bcytail = (0,_basic_two_diff_js__WEBPACK_IMPORTED_MODULE_3__.twoDiff)(B[1], C[1])[0];
    if (acxtail === 0 && acytail === 0 &&
        bcxtail === 0 && bcytail === 0) {
        // Straight
        return det;
    }
    const errbound = ccwerrboundC * detsum + resulterrbound * Math.abs(det);
    det += (acx * bcytail + bcy * acxtail) - (acy * bcxtail + bcx * acytail);
    if (Math.abs(det) >= errbound) {
        return det;
    }
    const a = (0,_double_expansion_e_diff_js__WEBPACK_IMPORTED_MODULE_0__.eDiff)((0,_basic_two_product_js__WEBPACK_IMPORTED_MODULE_1__.twoProduct)(acxtail, bcy), (0,_basic_two_product_js__WEBPACK_IMPORTED_MODULE_1__.twoProduct)(acytail, bcx));
    const c = (0,_double_expansion_fast_expansion_sum_js__WEBPACK_IMPORTED_MODULE_4__.fastExpansionSum)(b, a);
    const d = (0,_double_expansion_e_diff_js__WEBPACK_IMPORTED_MODULE_0__.eDiff)((0,_basic_two_product_js__WEBPACK_IMPORTED_MODULE_1__.twoProduct)(acx, bcytail), (0,_basic_two_product_js__WEBPACK_IMPORTED_MODULE_1__.twoProduct)(acy, bcxtail));
    const e = (0,_double_expansion_fast_expansion_sum_js__WEBPACK_IMPORTED_MODULE_4__.fastExpansionSum)(c, d);
    const f = (0,_double_expansion_e_diff_js__WEBPACK_IMPORTED_MODULE_0__.eDiff)((0,_basic_two_product_js__WEBPACK_IMPORTED_MODULE_1__.twoProduct)(acxtail, bcytail), (0,_basic_two_product_js__WEBPACK_IMPORTED_MODULE_1__.twoProduct)(acytail, bcxtail));
    let D = (0,_double_expansion_fast_expansion_sum_js__WEBPACK_IMPORTED_MODULE_4__.fastExpansionSum)(e, f);
    D = (0,_double_expansion_e_compress_js__WEBPACK_IMPORTED_MODULE_5__.eCompress)(D);
    return D[D.length - 1];
}

//# sourceMappingURL=orient2d.js.map

/***/ }),

/***/ "../node_modules/big-float-ts/node/index.js":
/*!**************************************************!*\
  !*** ../node_modules/big-float-ts/node/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bitLength: () => (/* reexport safe */ _double_representation_bit_length_js__WEBPACK_IMPORTED_MODULE_35__.bitLength),
/* harmony export */   doubleToBinaryString: () => (/* reexport safe */ _double_representation_double_to_binary_string_js__WEBPACK_IMPORTED_MODULE_36__.doubleToBinaryString),
/* harmony export */   doubleToOctets: () => (/* reexport safe */ _double_representation_double_to_octets_js__WEBPACK_IMPORTED_MODULE_37__.doubleToOctets),
/* harmony export */   eAbs: () => (/* reexport safe */ _double_expansion_e_abs_js__WEBPACK_IMPORTED_MODULE_24__.eAbs),
/* harmony export */   eAdd: () => (/* binding */ eAdd),
/* harmony export */   eAddDouble: () => (/* binding */ eAddDouble),
/* harmony export */   eCalculate: () => (/* reexport safe */ _double_expansion_e_calculate_js__WEBPACK_IMPORTED_MODULE_27__.eCalculate),
/* harmony export */   eCompare: () => (/* reexport safe */ _double_expansion_e_compare_js__WEBPACK_IMPORTED_MODULE_23__.eCompare),
/* harmony export */   eCompress: () => (/* reexport safe */ _double_expansion_e_compress_js__WEBPACK_IMPORTED_MODULE_15__.eCompress),
/* harmony export */   eDiff: () => (/* reexport safe */ _double_expansion_e_diff_js__WEBPACK_IMPORTED_MODULE_17__.eDiff),
/* harmony export */   eDiv: () => (/* reexport safe */ _double_expansion_e_div_js__WEBPACK_IMPORTED_MODULE_11__.eDiv),
/* harmony export */   eDivBy2: () => (/* reexport safe */ _double_expansion_e_div_by_2_js__WEBPACK_IMPORTED_MODULE_21__.eDivBy2),
/* harmony export */   eEstimate: () => (/* reexport safe */ _double_expansion_e_estimate_js__WEBPACK_IMPORTED_MODULE_16__.eEstimate),
/* harmony export */   eIntDiv: () => (/* reexport safe */ _double_expansion_e_int_div_js__WEBPACK_IMPORTED_MODULE_13__.eIntDiv),
/* harmony export */   eIntPow: () => (/* reexport safe */ _double_expansion_e_int_pow_js__WEBPACK_IMPORTED_MODULE_26__.eIntPow),
/* harmony export */   eIsInteger: () => (/* reexport safe */ _double_expansion_e_is_integer_js__WEBPACK_IMPORTED_MODULE_44__.eIsInteger),
/* harmony export */   eLongDivide: () => (/* reexport safe */ _double_expansion_e_long_divide_js__WEBPACK_IMPORTED_MODULE_12__.eLongDivide),
/* harmony export */   eMult: () => (/* binding */ eMult),
/* harmony export */   eMultBy2: () => (/* reexport safe */ _double_expansion_e_mult_by_2_js__WEBPACK_IMPORTED_MODULE_19__.eMultBy2),
/* harmony export */   eMultByNeg2: () => (/* reexport safe */ _double_expansion_e_mult_by_neg_2_js__WEBPACK_IMPORTED_MODULE_20__.eMultByNeg2),
/* harmony export */   eMultDouble1: () => (/* binding */ eMultDouble1),
/* harmony export */   eMultDouble2: () => (/* binding */ eMultDouble2),
/* harmony export */   eNegativeOf: () => (/* reexport safe */ _double_expansion_e_negative_of_js__WEBPACK_IMPORTED_MODULE_18__.eNegativeOf),
/* harmony export */   eProduct: () => (/* reexport safe */ _double_expansion_e_product_js__WEBPACK_IMPORTED_MODULE_29__.eProduct),
/* harmony export */   eRem: () => (/* reexport safe */ _double_expansion_e_rem_js__WEBPACK_IMPORTED_MODULE_14__.eRem),
/* harmony export */   eSign: () => (/* reexport safe */ _double_expansion_e_sign_js__WEBPACK_IMPORTED_MODULE_22__.eSign),
/* harmony export */   eSum: () => (/* reexport safe */ _double_expansion_e_sum_js__WEBPACK_IMPORTED_MODULE_28__.eSum),
/* harmony export */   eToBitlength: () => (/* reexport safe */ _double_expansion_e_to_bitlength_js__WEBPACK_IMPORTED_MODULE_25__.eToBitlength),
/* harmony export */   eToDd: () => (/* reexport safe */ _double_expansion_e_to_double_double_js__WEBPACK_IMPORTED_MODULE_30__.eToDd),
/* harmony export */   expBitLength: () => (/* reexport safe */ _double_representation_bit_length_js__WEBPACK_IMPORTED_MODULE_35__.expBitLength),
/* harmony export */   expansionProduct: () => (/* reexport safe */ _double_expansion_expansion_product_js__WEBPACK_IMPORTED_MODULE_2__.expansionProduct),
/* harmony export */   exponent: () => (/* reexport safe */ _double_representation_exponent_js__WEBPACK_IMPORTED_MODULE_39__.exponent),
/* harmony export */   fastExpansionSum: () => (/* reexport safe */ _double_expansion_fast_expansion_sum_js__WEBPACK_IMPORTED_MODULE_0__.fastExpansionSum),
/* harmony export */   fastTwoDiff: () => (/* reexport safe */ _basic_fast_two_diff_js__WEBPACK_IMPORTED_MODULE_4__.fastTwoDiff),
/* harmony export */   fastTwoSum: () => (/* reexport safe */ _basic_fast_two_sum_js__WEBPACK_IMPORTED_MODULE_5__.fastTwoSum),
/* harmony export */   getHighestSetBit: () => (/* reexport safe */ _double_representation_get_max_set_bit_js__WEBPACK_IMPORTED_MODULE_38__.getHighestSetBit),
/* harmony export */   getLowestSetBit: () => (/* reexport safe */ _double_representation_get_max_set_bit_js__WEBPACK_IMPORTED_MODULE_38__.getLowestSetBit),
/* harmony export */   growExpansion: () => (/* reexport safe */ _double_expansion_grow_expansion_js__WEBPACK_IMPORTED_MODULE_1__.growExpansion),
/* harmony export */   isAdjacent: () => (/* reexport safe */ _double_expansion_is_adjacent_js__WEBPACK_IMPORTED_MODULE_42__.isAdjacent),
/* harmony export */   isBitAligned: () => (/* reexport safe */ _double_representation_is_bit_aligned_js__WEBPACK_IMPORTED_MODULE_32__.isBitAligned),
/* harmony export */   isNonOverlappingAll: () => (/* reexport safe */ _double_expansion_is_overlapping_js__WEBPACK_IMPORTED_MODULE_43__.isNonOverlappingAll),
/* harmony export */   lsbExponent: () => (/* reexport safe */ _double_representation_lsb_exponent_js__WEBPACK_IMPORTED_MODULE_34__.lsbExponent),
/* harmony export */   msbExponent: () => (/* reexport safe */ _double_representation_msb_exponent_js__WEBPACK_IMPORTED_MODULE_33__.msbExponent),
/* harmony export */   operators: () => (/* binding */ operators),
/* harmony export */   orient2d: () => (/* reexport safe */ _geometric_primitives_orient2d_js__WEBPACK_IMPORTED_MODULE_41__.orient2d),
/* harmony export */   parseDouble: () => (/* reexport safe */ _double_representation_parse_double_js__WEBPACK_IMPORTED_MODULE_31__.parseDouble),
/* harmony export */   parseDoubleDetailed: () => (/* reexport safe */ _double_representation_parse_double_js__WEBPACK_IMPORTED_MODULE_31__.parseDoubleDetailed),
/* harmony export */   reduceSignificand: () => (/* reexport safe */ _basic_reduce_significand_js__WEBPACK_IMPORTED_MODULE_10__.reduceSignificand),
/* harmony export */   scaleExpansion: () => (/* reexport safe */ _double_expansion_scale_expansion_js__WEBPACK_IMPORTED_MODULE_3__.scaleExpansion),
/* harmony export */   scaleExpansion2: () => (/* reexport safe */ _double_expansion_scale_expansion_js__WEBPACK_IMPORTED_MODULE_3__.scaleExpansion2),
/* harmony export */   significand: () => (/* reexport safe */ _double_representation_significand_js__WEBPACK_IMPORTED_MODULE_40__.significand),
/* harmony export */   split: () => (/* reexport safe */ _basic_split_js__WEBPACK_IMPORTED_MODULE_6__.split),
/* harmony export */   twoDiff: () => (/* reexport safe */ _basic_two_diff_js__WEBPACK_IMPORTED_MODULE_7__.twoDiff),
/* harmony export */   twoProduct: () => (/* reexport safe */ _basic_two_product_js__WEBPACK_IMPORTED_MODULE_8__.twoProduct),
/* harmony export */   twoSum: () => (/* reexport safe */ _basic_two_sum_js__WEBPACK_IMPORTED_MODULE_9__.twoSum)
/* harmony export */ });
/* harmony import */ var _double_expansion_e_to_bitlength_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./double-expansion/e-to-bitlength.js */ "../node_modules/big-float-ts/node/double-expansion/e-to-bitlength.js");
/* harmony import */ var _double_expansion_e_div_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./double-expansion/e-div.js */ "../node_modules/big-float-ts/node/double-expansion/e-div.js");
/* harmony import */ var _double_expansion_e_long_divide_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./double-expansion/e-long-divide.js */ "../node_modules/big-float-ts/node/double-expansion/e-long-divide.js");
/* harmony import */ var _double_expansion_e_int_div_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./double-expansion/e-int-div.js */ "../node_modules/big-float-ts/node/double-expansion/e-int-div.js");
/* harmony import */ var _double_expansion_e_rem_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./double-expansion/e-rem.js */ "../node_modules/big-float-ts/node/double-expansion/e-rem.js");
/* harmony import */ var _double_expansion_e_compress_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./double-expansion/e-compress.js */ "../node_modules/big-float-ts/node/double-expansion/e-compress.js");
/* harmony import */ var _double_expansion_e_compare_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./double-expansion/e-compare.js */ "../node_modules/big-float-ts/node/double-expansion/e-compare.js");
/* harmony import */ var _double_expansion_e_abs_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./double-expansion/e-abs.js */ "../node_modules/big-float-ts/node/double-expansion/e-abs.js");
/* harmony import */ var _double_expansion_e_estimate_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./double-expansion/e-estimate.js */ "../node_modules/big-float-ts/node/double-expansion/e-estimate.js");
/* harmony import */ var _double_expansion_e_diff_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./double-expansion/e-diff.js */ "../node_modules/big-float-ts/node/double-expansion/e-diff.js");
/* harmony import */ var _double_expansion_fast_expansion_sum_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./double-expansion/fast-expansion-sum.js */ "../node_modules/big-float-ts/node/double-expansion/fast-expansion-sum.js");
/* harmony import */ var _basic_fast_two_diff_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./basic/fast-two-diff.js */ "../node_modules/big-float-ts/node/basic/fast-two-diff.js");
/* harmony import */ var _basic_fast_two_sum_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./basic/fast-two-sum.js */ "../node_modules/big-float-ts/node/basic/fast-two-sum.js");
/* harmony import */ var _double_expansion_grow_expansion_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./double-expansion/grow-expansion.js */ "../node_modules/big-float-ts/node/double-expansion/grow-expansion.js");
/* harmony import */ var _double_expansion_e_negative_of_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./double-expansion/e-negative-of.js */ "../node_modules/big-float-ts/node/double-expansion/e-negative-of.js");
/* harmony import */ var _double_expansion_scale_expansion_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./double-expansion/scale-expansion.js */ "../node_modules/big-float-ts/node/double-expansion/scale-expansion.js");
/* harmony import */ var _double_expansion_e_mult_by_2_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./double-expansion/e-mult-by-2.js */ "../node_modules/big-float-ts/node/double-expansion/e-mult-by-2.js");
/* harmony import */ var _double_expansion_e_mult_by_neg_2_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./double-expansion/e-mult-by-neg-2.js */ "../node_modules/big-float-ts/node/double-expansion/e-mult-by-neg-2.js");
/* harmony import */ var _double_expansion_e_div_by_2_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./double-expansion/e-div-by-2.js */ "../node_modules/big-float-ts/node/double-expansion/e-div-by-2.js");
/* harmony import */ var _basic_split_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./basic/split.js */ "../node_modules/big-float-ts/node/basic/split.js");
/* harmony import */ var _basic_two_diff_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./basic/two-diff.js */ "../node_modules/big-float-ts/node/basic/two-diff.js");
/* harmony import */ var _basic_two_product_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./basic/two-product.js */ "../node_modules/big-float-ts/node/basic/two-product.js");
/* harmony import */ var _basic_two_sum_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./basic/two-sum.js */ "../node_modules/big-float-ts/node/basic/two-sum.js");
/* harmony import */ var _basic_reduce_significand_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./basic/reduce-significand.js */ "../node_modules/big-float-ts/node/basic/reduce-significand.js");
/* harmony import */ var _double_expansion_expansion_product_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./double-expansion/expansion-product.js */ "../node_modules/big-float-ts/node/double-expansion/expansion-product.js");
/* harmony import */ var _double_representation_parse_double_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./double-representation/parse-double.js */ "../node_modules/big-float-ts/node/double-representation/parse-double.js");
/* harmony import */ var _double_representation_is_bit_aligned_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./double-representation/is-bit-aligned.js */ "../node_modules/big-float-ts/node/double-representation/is-bit-aligned.js");
/* harmony import */ var _double_representation_msb_exponent_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./double-representation/msb-exponent.js */ "../node_modules/big-float-ts/node/double-representation/msb-exponent.js");
/* harmony import */ var _double_representation_lsb_exponent_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./double-representation/lsb-exponent.js */ "../node_modules/big-float-ts/node/double-representation/lsb-exponent.js");
/* harmony import */ var _double_expansion_e_sign_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./double-expansion/e-sign.js */ "../node_modules/big-float-ts/node/double-expansion/e-sign.js");
/* harmony import */ var _double_representation_bit_length_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./double-representation/bit-length.js */ "../node_modules/big-float-ts/node/double-representation/bit-length.js");
/* harmony import */ var _double_expansion_e_calculate_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./double-expansion/e-calculate.js */ "../node_modules/big-float-ts/node/double-expansion/e-calculate.js");
/* harmony import */ var _double_expansion_e_sum_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./double-expansion/e-sum.js */ "../node_modules/big-float-ts/node/double-expansion/e-sum.js");
/* harmony import */ var _double_expansion_e_product_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./double-expansion/e-product.js */ "../node_modules/big-float-ts/node/double-expansion/e-product.js");
/* harmony import */ var _double_representation_exponent_js__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./double-representation/exponent.js */ "../node_modules/big-float-ts/node/double-representation/exponent.js");
/* harmony import */ var _double_representation_significand_js__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./double-representation/significand.js */ "../node_modules/big-float-ts/node/double-representation/significand.js");
/* harmony import */ var _double_representation_double_to_binary_string_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./double-representation/double-to-binary-string.js */ "../node_modules/big-float-ts/node/double-representation/double-to-binary-string.js");
/* harmony import */ var _double_representation_double_to_octets_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./double-representation/double-to-octets.js */ "../node_modules/big-float-ts/node/double-representation/double-to-octets.js");
/* harmony import */ var _double_representation_get_max_set_bit_js__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./double-representation/get-max-set-bit.js */ "../node_modules/big-float-ts/node/double-representation/get-max-set-bit.js");
/* harmony import */ var _double_expansion_e_int_pow_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./double-expansion/e-int-pow.js */ "../node_modules/big-float-ts/node/double-expansion/e-int-pow.js");
/* harmony import */ var _double_expansion_e_to_double_double_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./double-expansion/e-to-double-double.js */ "../node_modules/big-float-ts/node/double-expansion/e-to-double-double.js");
/* harmony import */ var _geometric_primitives_orient2d_js__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./geometric-primitives/orient2d.js */ "../node_modules/big-float-ts/node/geometric-primitives/orient2d.js");
/* harmony import */ var _double_expansion_is_adjacent_js__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./double-expansion/is-adjacent.js */ "../node_modules/big-float-ts/node/double-expansion/is-adjacent.js");
/* harmony import */ var _double_expansion_is_overlapping_js__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./double-expansion/is-overlapping.js */ "../node_modules/big-float-ts/node/double-expansion/is-overlapping.js");
/* harmony import */ var _double_expansion_e_is_integer_js__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./double-expansion/e-is-integer.js */ "../node_modules/big-float-ts/node/double-expansion/e-is-integer.js");














































// Aliases for some functions which names were not changed due to them being
// used extensively in the literature with a particular recognizable name
const eAdd = _double_expansion_fast_expansion_sum_js__WEBPACK_IMPORTED_MODULE_0__.fastExpansionSum;
const eAddDouble = _double_expansion_grow_expansion_js__WEBPACK_IMPORTED_MODULE_1__.growExpansion;
const eMult = _double_expansion_expansion_product_js__WEBPACK_IMPORTED_MODULE_2__.expansionProduct;
const eMultDouble1 = _double_expansion_scale_expansion_js__WEBPACK_IMPORTED_MODULE_3__.scaleExpansion;
const eMultDouble2 = _double_expansion_scale_expansion_js__WEBPACK_IMPORTED_MODULE_3__.scaleExpansion2;
const operators = {
    //---- basic ----//
    fastTwoDiff: _basic_fast_two_diff_js__WEBPACK_IMPORTED_MODULE_4__.fastTwoDiff,
    fastTwoSum: _basic_fast_two_sum_js__WEBPACK_IMPORTED_MODULE_5__.fastTwoSum,
    split: _basic_split_js__WEBPACK_IMPORTED_MODULE_6__.split,
    twoDiff: _basic_two_diff_js__WEBPACK_IMPORTED_MODULE_7__.twoDiff,
    twoProduct: _basic_two_product_js__WEBPACK_IMPORTED_MODULE_8__.twoProduct,
    twoSum: _basic_two_sum_js__WEBPACK_IMPORTED_MODULE_9__.twoSum,
    reduceSignificand: _basic_reduce_significand_js__WEBPACK_IMPORTED_MODULE_10__.reduceSignificand,
    //---- double floating point expansions ----//
    fastExpansionSum: _double_expansion_fast_expansion_sum_js__WEBPACK_IMPORTED_MODULE_0__.fastExpansionSum, eAdd,
    growExpansion: _double_expansion_grow_expansion_js__WEBPACK_IMPORTED_MODULE_1__.growExpansion, eAddDouble,
    expansionProduct: _double_expansion_expansion_product_js__WEBPACK_IMPORTED_MODULE_2__.expansionProduct, eMult,
    scaleExpansion: _double_expansion_scale_expansion_js__WEBPACK_IMPORTED_MODULE_3__.scaleExpansion, eMultDouble1,
    scaleExpansion2: _double_expansion_scale_expansion_js__WEBPACK_IMPORTED_MODULE_3__.scaleExpansion2, eMultDouble2,
    eDiv: _double_expansion_e_div_js__WEBPACK_IMPORTED_MODULE_11__.eDiv,
    eLongDivide: _double_expansion_e_long_divide_js__WEBPACK_IMPORTED_MODULE_12__.eLongDivide,
    eIntDiv: _double_expansion_e_int_div_js__WEBPACK_IMPORTED_MODULE_13__.eIntDiv,
    eRem: _double_expansion_e_rem_js__WEBPACK_IMPORTED_MODULE_14__.eRem,
    eCompress: _double_expansion_e_compress_js__WEBPACK_IMPORTED_MODULE_15__.eCompress,
    eEstimate: _double_expansion_e_estimate_js__WEBPACK_IMPORTED_MODULE_16__.eEstimate,
    eDiff: _double_expansion_e_diff_js__WEBPACK_IMPORTED_MODULE_17__.eDiff,
    eNegativeOf: _double_expansion_e_negative_of_js__WEBPACK_IMPORTED_MODULE_18__.eNegativeOf,
    eMultBy2: _double_expansion_e_mult_by_2_js__WEBPACK_IMPORTED_MODULE_19__.eMultBy2,
    eMultByNeg2: _double_expansion_e_mult_by_neg_2_js__WEBPACK_IMPORTED_MODULE_20__.eMultByNeg2,
    eDivBy2: _double_expansion_e_div_by_2_js__WEBPACK_IMPORTED_MODULE_21__.eDivBy2,
    eSign: _double_expansion_e_sign_js__WEBPACK_IMPORTED_MODULE_22__.eSign,
    eCompare: _double_expansion_e_compare_js__WEBPACK_IMPORTED_MODULE_23__.eCompare,
    eAbs: _double_expansion_e_abs_js__WEBPACK_IMPORTED_MODULE_24__.eAbs,
    eToBitlength: _double_expansion_e_to_bitlength_js__WEBPACK_IMPORTED_MODULE_25__.eToBitlength,
    eIntPow: _double_expansion_e_int_pow_js__WEBPACK_IMPORTED_MODULE_26__.eIntPow,
    eCalculate: _double_expansion_e_calculate_js__WEBPACK_IMPORTED_MODULE_27__.eCalculate,
    eSum: _double_expansion_e_sum_js__WEBPACK_IMPORTED_MODULE_28__.eSum,
    eProduct: _double_expansion_e_product_js__WEBPACK_IMPORTED_MODULE_29__.eProduct,
    eToDd: _double_expansion_e_to_double_double_js__WEBPACK_IMPORTED_MODULE_30__.eToDd,
    //---- double floating point representation ----//
    parseDouble: _double_representation_parse_double_js__WEBPACK_IMPORTED_MODULE_31__.parseDouble,
    parseDoubleDetailed: _double_representation_parse_double_js__WEBPACK_IMPORTED_MODULE_31__.parseDoubleDetailed,
    isBitAligned: _double_representation_is_bit_aligned_js__WEBPACK_IMPORTED_MODULE_32__.isBitAligned,
    msbExponent: _double_representation_msb_exponent_js__WEBPACK_IMPORTED_MODULE_33__.msbExponent,
    lsbExponent: _double_representation_lsb_exponent_js__WEBPACK_IMPORTED_MODULE_34__.lsbExponent,
    bitLength: _double_representation_bit_length_js__WEBPACK_IMPORTED_MODULE_35__.bitLength,
    expBitLength: _double_representation_bit_length_js__WEBPACK_IMPORTED_MODULE_35__.expBitLength,
    doubleToBinaryString: _double_representation_double_to_binary_string_js__WEBPACK_IMPORTED_MODULE_36__.doubleToBinaryString,
    doubleToOctets: _double_representation_double_to_octets_js__WEBPACK_IMPORTED_MODULE_37__.doubleToOctets,
    getHighestSetBit: _double_representation_get_max_set_bit_js__WEBPACK_IMPORTED_MODULE_38__.getHighestSetBit,
    getLowestSetBit: _double_representation_get_max_set_bit_js__WEBPACK_IMPORTED_MODULE_38__.getLowestSetBit,
    exponent: _double_representation_exponent_js__WEBPACK_IMPORTED_MODULE_39__.exponent,
    significand: _double_representation_significand_js__WEBPACK_IMPORTED_MODULE_40__.significand,
    //---- geometric primitives
    orient2d: _geometric_primitives_orient2d_js__WEBPACK_IMPORTED_MODULE_41__.orient2d,
    //---- others
    isAdjacent: _double_expansion_is_adjacent_js__WEBPACK_IMPORTED_MODULE_42__.isAdjacent,
    isNonOverlappingAll: _double_expansion_is_overlapping_js__WEBPACK_IMPORTED_MODULE_43__.isNonOverlappingAll,
    eIsInteger: _double_expansion_e_is_integer_js__WEBPACK_IMPORTED_MODULE_44__.eIsInteger
};


//# sourceMappingURL=index.js.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const index_js_1 = __webpack_require__(/*! ../../src/index.js */ "../src/index.ts");
function test() {
    // const bez = [[585,558], [586,559], [589,562], [590,565]];
    // console.log(JSON.stringify(grahamScan(bez, true)));
    // console.log(JSON.stringify(grahamScan(bez, false)));
    // const bez = [[0,0], [1,0], [1,1], [0,1], [0,0.5]];
    const bez = [[0, 0], [0.5], [1, 0], [1, 1], [0, 1]];
    console.log(JSON.stringify((0, index_js_1.grahamScan)(bez)));
}
test();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUM0QjtBQUM1Qjs7Ozs7Ozs7Ozs7Ozs7O0FDL0k0QztBQUM1QztBQUNBLGlCQUFpQixxREFBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUN5QjtBQUN6Qjs7Ozs7Ozs7Ozs7Ozs7O0FDN0NvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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RUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTkEsb0ZBQWdEO0FBR2hELFNBQVMsSUFBSTtJQUNULDREQUE0RDtJQUU1RCxzREFBc0Q7SUFDdEQsdURBQXVEO0lBRXZELHFEQUFxRDtJQUNyRCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMseUJBQVUsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUdELElBQUksRUFBRSxDQUFDIiwic291cmNlcyI6WyJDOlxccHJvamVjdHMtc3RhYmxlXFxncmFoYW0tc2Nhblxcc3JjXFxnZXQtc21hbGxlc3QtaWR4LXktdGhlbi14LnRzIiwiQzpcXHByb2plY3RzLXN0YWJsZVxcZ3JhaGFtLXNjYW5cXHNyY1xcaW5kZXgudHMiLCJDOlxccHJvamVjdHMtc3RhYmxlXFxncmFoYW0tc2Nhblxcbm9kZV9tb2R1bGVzXFxiaWctZmxvYXQtdHNcXG5vZGVcXGJhc2ljXFxmYXN0LXR3by1kaWZmLmpzIiwiQzpcXHByb2plY3RzLXN0YWJsZVxcZ3JhaGFtLXNjYW5cXG5vZGVfbW9kdWxlc1xcYmlnLWZsb2F0LXRzXFxub2RlXFxiYXNpY1xcZmFzdC10d28tc3VtLmpzIiwiQzpcXHByb2plY3RzLXN0YWJsZVxcZ3JhaGFtLXNjYW5cXG5vZGVfbW9kdWxlc1xcYmlnLWZsb2F0LXRzXFxub2RlXFxiYXNpY1xccmVkdWNlLXNpZ25pZmljYW5kLmpzIiwiQzpcXHByb2plY3RzLXN0YWJsZVxcZ3JhaGFtLXNjYW5cXG5vZGVfbW9kdWxlc1xcYmlnLWZsb2F0LXRzXFxub2RlXFxiYXNpY1xcc3BsaXQuanMiLCJDOlxccHJvamVjdHMtc3RhYmxlXFxncmFoYW0tc2Nhblxcbm9kZV9tb2R1bGVzXFxiaWctZmxvYXQtdHNcXG5vZGVcXGJhc2ljXFx0d28tZGlmZi5qcyIsIkM6XFxwcm9qZWN0cy1zdGFibGVcXGdyYWhhbS1zY2FuXFxub2RlX21vZHVsZXNcXGJpZy1mbG9hdC10c1xcbm9kZVxcYmFzaWNcXHR3by1wcm9kdWN0LmpzIiwiQzpcXHByb2plY3RzLXN0YWJsZVxcZ3JhaGFtLXNjYW5cXG5vZGVfbW9kdWxlc1xcYmlnLWZsb2F0LXRzXFxub2RlXFxiYXNpY1xcdHdvLXN1bS5qcyIsIkM6XFxwcm9qZWN0cy1zdGFibGVcXGdyYWhhbS1zY2FuXFxub2RlX21vZHVsZXNcXGJpZy1mbG9hdC10c1xcbm9kZVxcZG91YmxlLWV4cGFuc2lvblxcZS1hYnMuanMiLCJDOlxccHJvamVjdHMtc3RhYmxlXFxncmFoYW0tc2Nhblxcbm9kZV9tb2R1bGVzXFxiaWctZmxvYXQtdHNcXG5vZGVcXGRvdWJsZS1leHBhbnNpb25cXGUtY2FsY3VsYXRlLmpzIiwiQzpcXHByb2plY3RzLXN0YWJsZVxcZ3JhaGFtLXNjYW5cXG5vZGVfbW9kdWxlc1xcYmlnLWZsb2F0LXRzXFxub2RlXFxkb3VibGUtZXhwYW5zaW9uXFxlLWNvbXBhcmUuanMiLCJDOlxccHJvamVjdHMtc3RhYmxlXFxncmFoYW0tc2Nhblxcbm9kZV9tb2R1bGVzXFxiaWctZmxvYXQtdHNcXG5vZGVcXGRvdWJsZS1leHBhbnNpb25cXGUtY29tcHJlc3MuanMiLCJDOlxccHJvamVjdHMtc3RhYmxlXFxncmFoYW0tc2Nhblxcbm9kZV9tb2R1bGVzXFxiaWctZmxvYXQtdHNcXG5vZGVcXGRvdWJsZS1leHBhbnNpb25cXGUtZGlmZi5qcyIsIkM6XFxwcm9qZWN0cy1zdGFibGVcXGdyYWhhbS1zY2FuXFxub2RlX21vZHVsZXNcXGJpZy1mbG9hdC10c1xcbm9kZVxcZG91YmxlLWV4cGFuc2lvblxcZS1kaXYtYnktMi5qcyIsIkM6XFxwcm9qZWN0cy1zdGFibGVcXGdyYWhhbS1zY2FuXFxub2RlX21vZHVsZXNcXGJpZy1mbG9hdC10c1xcbm9kZVxcZG91YmxlLWV4cGFuc2lvblxcZS1kaXYuanMiLCJDOlxccHJvamVjdHMtc3RhYmxlXFxncmFoYW0tc2Nhblxcbm9kZV9tb2R1bGVzXFxiaWctZmxvYXQtdHNcXG5vZGVcXGRvdWJsZS1leHBhbnNpb25cXGUtZXN0aW1hdGUuanMiLCJDOlxccHJvamVjdHMtc3RhYmxlXFxncmFoYW0tc2Nhblxcbm9kZV9tb2R1bGVzXFxiaWctZmxvYXQtdHNcXG5vZGVcXGRvdWJsZS1leHBhbnNpb25cXGUtaW50LWRpdi5qcyIsIkM6XFxwcm9qZWN0cy1zdGFibGVcXGdyYWhhbS1zY2FuXFxub2RlX21vZHVsZXNcXGJpZy1mbG9hdC10c1xcbm9kZVxcZG91YmxlLWV4cGFuc2lvblxcZS1pbnQtcG93LmpzIiwiQzpcXHByb2plY3RzLXN0YWJsZVxcZ3JhaGFtLXNjYW5cXG5vZGVfbW9kdWxlc1xcYmlnLWZsb2F0LXRzXFxub2RlXFxkb3VibGUtZXhwYW5zaW9uXFxlLWlzLWludGVnZXIuanMiLCJDOlxccHJvamVjdHMtc3RhYmxlXFxncmFoYW0tc2Nhblxcbm9kZV9tb2R1bGVzXFxiaWctZmxvYXQtdHNcXG5vZGVcXGRvdWJsZS1leHBhbnNpb25cXGUtbG9uZy1kaXZpZGUuanMiLCJDOlxccHJvamVjdHMtc3RhYmxlXFxncmFoYW0tc2Nhblxcbm9kZV9tb2R1bGVzXFxiaWctZmxvYXQtdHNcXG5vZGVcXGRvdWJsZS1leHBhbnNpb25cXGUtbXVsdC1ieS0yLmpzIiwiQzpcXHByb2plY3RzLXN0YWJsZVxcZ3JhaGFtLXNjYW5cXG5vZGVfbW9kdWxlc1xcYmlnLWZsb2F0LXRzXFxub2RlXFxkb3VibGUtZXhwYW5zaW9uXFxlLW11bHQtYnktbmVnLTIuanMiLCJDOlxccHJvamVjdHMtc3RhYmxlXFxncmFoYW0tc2Nhblxcbm9kZV9tb2R1bGVzXFxiaWctZmxvYXQtdHNcXG5vZGVcXGRvdWJsZS1leHBhbnNpb25cXGUtbmVnYXRpdmUtb2YuanMiLCJDOlxccHJvamVjdHMtc3RhYmxlXFxncmFoYW0tc2Nhblxcbm9kZV9tb2R1bGVzXFxiaWctZmxvYXQtdHNcXG5vZGVcXGRvdWJsZS1leHBhbnNpb25cXGUtcHJvZHVjdC5qcyIsIkM6XFxwcm9qZWN0cy1zdGFibGVcXGdyYWhhbS1zY2FuXFxub2RlX21vZHVsZXNcXGJpZy1mbG9hdC10c1xcbm9kZVxcZG91YmxlLWV4cGFuc2lvblxcZS1yZW0uanMiLCJDOlxccHJvamVjdHMtc3RhYmxlXFxncmFoYW0tc2Nhblxcbm9kZV9tb2R1bGVzXFxiaWctZmxvYXQtdHNcXG5vZGVcXGRvdWJsZS1leHBhbnNpb25cXGUtc2lnbi5qcyIsIkM6XFxwcm9qZWN0cy1zdGFibGVcXGdyYWhhbS1zY2FuXFxub2RlX21vZHVsZXNcXGJpZy1mbG9hdC10c1xcbm9kZVxcZG91YmxlLWV4cGFuc2lvblxcZS1zdW0uanMiLCJDOlxccHJvamVjdHMtc3RhYmxlXFxncmFoYW0tc2Nhblxcbm9kZV9tb2R1bGVzXFxiaWctZmxvYXQtdHNcXG5vZGVcXGRvdWJsZS1leHBhbnNpb25cXGUtdG8tYml0bGVuZ3RoLmpzIiwiQzpcXHByb2plY3RzLXN0YWJsZVxcZ3JhaGFtLXNjYW5cXG5vZGVfbW9kdWxlc1xcYmlnLWZsb2F0LXRzXFxub2RlXFxkb3VibGUtZXhwYW5zaW9uXFxlLXRvLWRvdWJsZS1kb3VibGUuanMiLCJDOlxccHJvamVjdHMtc3RhYmxlXFxncmFoYW0tc2Nhblxcbm9kZV9tb2R1bGVzXFxiaWctZmxvYXQtdHNcXG5vZGVcXGRvdWJsZS1leHBhbnNpb25cXGV4cGFuc2lvbi1wcm9kdWN0LmpzIiwiQzpcXHByb2plY3RzLXN0YWJsZVxcZ3JhaGFtLXNjYW5cXG5vZGVfbW9kdWxlc1xcYmlnLWZsb2F0LXRzXFxub2RlXFxkb3VibGUtZXhwYW5zaW9uXFxmYXN0LWV4cGFuc2lvbi1zdW0uanMiLCJDOlxccHJvamVjdHMtc3RhYmxlXFxncmFoYW0tc2Nhblxcbm9kZV9tb2R1bGVzXFxiaWctZmxvYXQtdHNcXG5vZGVcXGRvdWJsZS1leHBhbnNpb25cXGdyb3ctZXhwYW5zaW9uLmpzIiwiQzpcXHByb2plY3RzLXN0YWJsZVxcZ3JhaGFtLXNjYW5cXG5vZGVfbW9kdWxlc1xcYmlnLWZsb2F0LXRzXFxub2RlXFxkb3VibGUtZXhwYW5zaW9uXFxpcy1hZGphY2VudC5qcyIsIkM6XFxwcm9qZWN0cy1zdGFibGVcXGdyYWhhbS1zY2FuXFxub2RlX21vZHVsZXNcXGJpZy1mbG9hdC10c1xcbm9kZVxcZG91YmxlLWV4cGFuc2lvblxcaXMtb3ZlcmxhcHBpbmcuanMiLCJDOlxccHJvamVjdHMtc3RhYmxlXFxncmFoYW0tc2Nhblxcbm9kZV9tb2R1bGVzXFxiaWctZmxvYXQtdHNcXG5vZGVcXGRvdWJsZS1leHBhbnNpb25cXHNjYWxlLWV4cGFuc2lvbi5qcyIsIkM6XFxwcm9qZWN0cy1zdGFibGVcXGdyYWhhbS1zY2FuXFxub2RlX21vZHVsZXNcXGJpZy1mbG9hdC10c1xcbm9kZVxcZG91YmxlLXJlcHJlc2VudGF0aW9uXFxiaXQtbGVuZ3RoLmpzIiwiQzpcXHByb2plY3RzLXN0YWJsZVxcZ3JhaGFtLXNjYW5cXG5vZGVfbW9kdWxlc1xcYmlnLWZsb2F0LXRzXFxub2RlXFxkb3VibGUtcmVwcmVzZW50YXRpb25cXGRvdWJsZS10by1iaW5hcnktc3RyaW5nLmpzIiwiQzpcXHByb2plY3RzLXN0YWJsZVxcZ3JhaGFtLXNjYW5cXG5vZGVfbW9kdWxlc1xcYmlnLWZsb2F0LXRzXFxub2RlXFxkb3VibGUtcmVwcmVzZW50YXRpb25cXGRvdWJsZS10by1vY3RldHMuanMiLCJDOlxccHJvamVjdHMtc3RhYmxlXFxncmFoYW0tc2Nhblxcbm9kZV9tb2R1bGVzXFxiaWctZmxvYXQtdHNcXG5vZGVcXGRvdWJsZS1yZXByZXNlbnRhdGlvblxcZXhwb25lbnQuanMiLCJDOlxccHJvamVjdHMtc3RhYmxlXFxncmFoYW0tc2Nhblxcbm9kZV9tb2R1bGVzXFxiaWctZmxvYXQtdHNcXG5vZGVcXGRvdWJsZS1yZXByZXNlbnRhdGlvblxcZ2V0LW1heC1zZXQtYml0LmpzIiwiQzpcXHByb2plY3RzLXN0YWJsZVxcZ3JhaGFtLXNjYW5cXG5vZGVfbW9kdWxlc1xcYmlnLWZsb2F0LXRzXFxub2RlXFxkb3VibGUtcmVwcmVzZW50YXRpb25cXGlzLWJpdC1hbGlnbmVkLmpzIiwiQzpcXHByb2plY3RzLXN0YWJsZVxcZ3JhaGFtLXNjYW5cXG5vZGVfbW9kdWxlc1xcYmlnLWZsb2F0LXRzXFxub2RlXFxkb3VibGUtcmVwcmVzZW50YXRpb25cXGxzYi1leHBvbmVudC5qcyIsIkM6XFxwcm9qZWN0cy1zdGFibGVcXGdyYWhhbS1zY2FuXFxub2RlX21vZHVsZXNcXGJpZy1mbG9hdC10c1xcbm9kZVxcZG91YmxlLXJlcHJlc2VudGF0aW9uXFxtc2ItZXhwb25lbnQuanMiLCJDOlxccHJvamVjdHMtc3RhYmxlXFxncmFoYW0tc2Nhblxcbm9kZV9tb2R1bGVzXFxiaWctZmxvYXQtdHNcXG5vZGVcXGRvdWJsZS1yZXByZXNlbnRhdGlvblxccGFyc2UtZG91YmxlLmpzIiwiQzpcXHByb2plY3RzLXN0YWJsZVxcZ3JhaGFtLXNjYW5cXG5vZGVfbW9kdWxlc1xcYmlnLWZsb2F0LXRzXFxub2RlXFxkb3VibGUtcmVwcmVzZW50YXRpb25cXHNpZ25pZmljYW5kLmpzIiwiQzpcXHByb2plY3RzLXN0YWJsZVxcZ3JhaGFtLXNjYW5cXG5vZGVfbW9kdWxlc1xcYmlnLWZsb2F0LXRzXFxub2RlXFxnZW9tZXRyaWMtcHJpbWl0aXZlc1xcb3JpZW50MmQuanMiLCJDOlxccHJvamVjdHMtc3RhYmxlXFxncmFoYW0tc2Nhblxcbm9kZV9tb2R1bGVzXFxiaWctZmxvYXQtdHNcXG5vZGVcXGluZGV4LmpzIiwid2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIkM6XFxwcm9qZWN0cy1zdGFibGVcXGdyYWhhbS1zY2FuXFx0ZXN0XFxzcmNcXGluZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRTbWFsbGVzdElkeFlUaGVuWChwczogbnVtYmVyW11bXSk6IG51bWJlciB8IHVuZGVmaW5lZCB7XHJcblx0bGV0IHNtYWxsZXN0ID0gW1xyXG5cdFx0TnVtYmVyLlBPU0lUSVZFX0lORklOSVRZLCBcclxuXHRcdE51bWJlci5QT1NJVElWRV9JTkZJTklUWVxyXG5cdF07XHJcblx0bGV0IHNtYWxsZXN0STogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG5cdGZvciAobGV0IGk9MDsgaTxwcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0Y29uc3QgeSA9IHBzW2ldWzFdO1xyXG5cdFx0aWYgKCh5IDwgc21hbGxlc3RbMV0pIHx8IFxyXG5cdFx0ICAgICh5ID09PSBzbWFsbGVzdFsxXSAmJiBwc1tpXVswXSA8IHNtYWxsZXN0WzBdKSkge1xyXG5cclxuXHRcdFx0c21hbGxlc3RJID0gaTtcclxuXHRcdFx0c21hbGxlc3QgPSBwc1tpXTtcclxuXHRcdH1cclxuXHR9XHRcclxuXHRcclxuXHRyZXR1cm4gc21hbGxlc3RJO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgZ2V0U21hbGxlc3RJZHhZVGhlblggfVxyXG4iLCJpbXBvcnQgeyBvcmllbnQyZCB9IGZyb20gJ2JpZy1mbG9hdC10cyc7XHJcbmltcG9ydCB7IGdldFNtYWxsZXN0SWR4WVRoZW5YIH0gZnJvbSAnLi9nZXQtc21hbGxlc3QtaWR4LXktdGhlbi14LmpzJztcclxuaW1wb3J0IHsgc3dhcCB9IGZyb20gJy4vc3dhcC5qcyc7XHJcblxyXG5cclxuLyoqIFxyXG4gKiBGaW5kcyB0aGUgY29udmV4IGh1bGwgb2YgdGhlIGdpdmVuIHNldCBvZiAyZCBwb2ludHMgdXNpbmcgdGhlICAgXHJcbiAqIEdyYWhhbSBTY2FuIGFsZ29yaXRobSBhbmQgcmV0dXJucyB0aGUgaHVsbCBhcyBhbiBhcnJheSBvZiBwb2ludHMuXHJcbiAqIFNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9HcmFoYW1fc2NhblxyXG4gKiBcclxuICogUm9idXN0OiBUaGlzIGFsZ29yaXRobSBpcyByb2J1c3QgdmlhIGFkYXB0aXZlIGluZmluaXRlIHByZWNpc2lvbiBmbG9hdGluZ1xyXG4gKiBwb2ludCBhcml0aG1ldGljLlxyXG4gKiBcclxuICogQHBhcmFtIHBzIEEgc2V0IG9mIHBvaW50c1xyXG4gKiBAcGFyYW0gaW5jbHVkZUFsbEJvdW5kYXJ5UG9pbnRzIFNldCB0aGlzIHRvIHRydWUgdG8gaWYgYWxsIGJvdW5kYXJ5IHBvaW50c1xyXG4gKiBzaG91bGQgYmUgcmV0dXJuZWQsIGV2ZW4gcmVkdW5kYW50IG9uZXMgLSBkZWZhdWx0cyB0byBgZmFsc2VgXHJcbiAqL1xyXG5mdW5jdGlvbiBncmFoYW1TY2FuKFxyXG5cdFx0cHM6IG51bWJlcltdW10pOiBudW1iZXJbXVtdIHwgdW5kZWZpbmVkIHtcclxuXHRcdFxyXG5cdGNvbnN0IG4gPSBwcy5sZW5ndGg7XHJcblxyXG5cdGlmIChuID09PSAwKSB7IHJldHVybiB1bmRlZmluZWQ7IH1cclxuXHJcblx0Y29uc3QgcHNfID0gcHMuc2xpY2UoKTtcclxuXHJcblx0Y29uc3QgaWR4ID0gZ2V0U21hbGxlc3RJZHhZVGhlblgocHNfKSE7XHJcblxyXG5cdGNvbnN0IFtwXSA9IHBzXy5zcGxpY2UoaWR4LCAxKTtcclxuXHJcblx0cHNfLnNvcnQoKGEsYikgPT4ge1xyXG5cdFx0bGV0IHJlcyA9IC1vcmllbnQyZChwLCBhLCBiKTtcclxuXHRcdGlmIChyZXMgIT09IDApIHsgcmV0dXJuIHJlczsgfVxyXG5cdFx0cmVzID0gYVsxXSAtIGJbMV07XHJcblx0XHRpZiAocmVzICE9PSAwKSB7IHJldHVybiByZXM7IH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIGFbMF0gLSBiWzBdO1xyXG5cdH0pO1xyXG5cclxuXHRwc18udW5zaGlmdChwKTtcclxuXHJcblx0bGV0IHN0YWNrOiBudW1iZXJbXVtdID0gW107XHJcblx0Zm9yIChjb25zdCBwIG9mIHBzXykge1xyXG5cdFx0d2hpbGUgKHN0YWNrLmxlbmd0aCA+IDEpIHtcclxuXHRcdFx0Y29uc3QgciA9IG9yaWVudDJkKFxyXG5cdFx0XHRcdHN0YWNrW3N0YWNrLmxlbmd0aC0yXSxcclxuXHRcdFx0XHRzdGFja1tzdGFjay5sZW5ndGgtMV0sXHJcblx0XHRcdFx0cFxyXG5cdFx0XHQpIDw9IDA7XHJcblxyXG5cdFx0XHRpZiAoIXIpIHsgYnJlYWs7IH1cclxuXHJcblx0XHRcdHN0YWNrLnBvcCgpO1xyXG5cdFx0fVxyXG5cdFx0c3RhY2sucHVzaChwKTtcclxuXHR9XHJcblxyXG5cdGNvbnN0IGxlbiA9IHN0YWNrLmxlbmd0aDtcclxuXHRjb25zdCBzdGFja18gPSBbc3RhY2tbMF1dO1xyXG5cdGZvciAobGV0IGk9MTsgaTxsZW47IGkrKykge1xyXG5cdFx0Y29uc3QgcFMgPSBzdGFja1soaSAtIDEpJWxlbl07XHJcblx0XHRjb25zdCBwTSA9IHN0YWNrWyhpICAgICklbGVuXTtcclxuXHRcdGNvbnN0IHBFID0gc3RhY2tbKGkgKyAxKSVsZW5dO1xyXG5cclxuXHRcdGlmIChvcmllbnQyZChwUyxwTSxwRSkgIT09IDAgfHwgZG90KHBTLHBNLHBFKSA8IDApIHtcclxuXHRcdFx0c3RhY2tfLnB1c2gocE0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHN0YWNrXztcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBObyBuZWVkIHRvIGJlIGFjY3VyYXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBkb3QoXHJcblx0XHRwMTogbnVtYmVyW10sXHJcblx0XHRwMjogbnVtYmVyW10sXHJcblx0XHRwMzogbnVtYmVyW10pIHtcclxuXHJcblx0Y29uc3QgdjF4ID0gcDJbMF0gLSBwMVswXVxyXG5cdGNvbnN0IHYxeSA9IHAyWzFdIC0gcDFbMV07XHJcblxyXG5cdGNvbnN0IHYyeCA9IHAzWzBdIC0gcDJbMF07XHJcblx0Y29uc3QgdjJ5ID0gcDNbMV0gLSBwMlsxXTtcclxuXHJcblx0cmV0dXJuIHYxeCp2MnggKyB2MXkqdjJ5O1xyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgZ3JhaGFtU2NhbiB9XHJcbiIsIi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBkaWZmZXJlbmNlIGFuZCBleGFjdCBlcnJvciBvZiBzdWJ0cmFjdGluZyB0d28gZmxvYXRpbmcgcG9pbnRcclxuICogbnVtYmVycy5cclxuICogVXNlcyBhbiBFRlQgKGVycm9yLWZyZWUgdHJhbnNmb3JtYXRpb24pLCBpLmUuIGEtYiA9PT0geCt5IGV4YWN0bHkuXHJcbiAqIFRoZSByZXR1cm5lZCByZXN1bHQgaXMgYSBub24tb3ZlcmxhcHBpbmcgZXhwYW5zaW9uIChzbWFsbGVzdCB2YWx1ZSBmaXJzdCEpLlxyXG4gKlxyXG4gKiBQcmVjb25kaXRpb246IGFicyhhKSA+PSBhYnMoYikgLSBBIGZhc3QgdGVzdCB0aGF0IGNhbiBiZSB1c2VkIGlzXHJcbiAqIChhID4gYikgPT09IChhID4gLWIpXHJcbiAqXHJcbiAqIFNlZSBodHRwczovL3Blb3BsZS5lZWNzLmJlcmtlbGV5LmVkdS9+anJzL3BhcGVycy9yb2J1c3RyLnBkZlxyXG4gKi9cclxuZnVuY3Rpb24gZmFzdFR3b0RpZmYoYSwgYikge1xyXG4gICAgY29uc3QgeCA9IGEgLSBiO1xyXG4gICAgY29uc3QgeSA9IChhIC0geCkgLSBiO1xyXG4gICAgcmV0dXJuIFt5LCB4XTtcclxufVxyXG5leHBvcnQgeyBmYXN0VHdvRGlmZiB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1mYXN0LXR3by1kaWZmLmpzLm1hcCIsIi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBzdW0gYW5kIGV4YWN0IGVycm9yIG9mIGFkZGluZyB0d28gZmxvYXRpbmcgcG9pbnQgbnVtYmVycy5cclxuICogVXNlcyBhbiBFRlQgKGVycm9yLWZyZWUgdHJhbnNmb3JtYXRpb24pLCBpLmUuIGErYiA9PT0geCt5IGV4YWN0bHkuXHJcbiAqIFRoZSByZXR1cm5lZCBzdW0gaXMgYSBub24tb3ZlcmxhcHBpbmcgZXhwYW5zaW9uIChzbWFsbGVzdCB2YWx1ZSBmaXJzdCEpLlxyXG4gKlxyXG4gKiBQcmVjb25kaXRpb246IGFicyhhKSA+PSBhYnMoYikgLSBBIGZhc3QgdGVzdCB0aGF0IGNhbiBiZSB1c2VkIGlzXHJcbiAqIChhID4gYikgPT09IChhID4gLWIpXHJcbiAqXHJcbiAqIFNlZSBodHRwczovL3Blb3BsZS5lZWNzLmJlcmtlbGV5LmVkdS9+anJzL3BhcGVycy9yb2J1c3RyLnBkZlxyXG4gKi9cclxuZnVuY3Rpb24gZmFzdFR3b1N1bShhLCBiKSB7XHJcbiAgICBjb25zdCB4ID0gYSArIGI7XHJcbiAgICByZXR1cm4gW2IgLSAoeCAtIGEpLCB4XTtcclxufVxyXG4vLyBpbmxpbmVkXHJcbi8vY29uc3QgUiA9IGEgKyBiOyBjb25zdCByID0gYiAtIChSIC0gYSk7IHJldHVybiBbciwgUl07XHJcbmV4cG9ydCB7IGZhc3RUd29TdW0gfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmFzdC10d28tc3VtLmpzLm1hcCIsIi8qKlxyXG4gKiBUcnVuY2F0ZXMgYSBmbG9hdGluZyBwb2ludCB2YWx1ZSdzIHNpZ25pZmljYW5kIGFuZCByZXR1cm5zIHRoZSByZXN1bHQuXHJcbiAqIFNpbWlsYXIgdG8gc3BsaXQsIGJ1dCB3aXRoIHRoZSBhYmlsaXR5IHRvIHNwZWNpZnkgdGhlIG51bWJlciBvZiBiaXRzIHRvIGtlZXAuXHJcbiAqXHJcbiAqIFRoZW9yZW0gMTcgKFZlbHRrYW1wLURla2tlcik6IExldCBhIGJlIGEgcC1iaXQgZmxvYXRpbmctcG9pbnQgbnVtYmVyLCB3aGVyZVxyXG4gKiBwID49IDMuIENob29zZSBhIHNwbGl0dGluZyBwb2ludCBzIHN1Y2ggdGhhdCBwLzIgPD0gcyA8PSBwLTEuIFRoZW4gdGhlXHJcbiAqIGZvbGxvd2luZyBhbGdvcml0aG0gd2lsbCBwcm9kdWNlIGEgKHAtcyktYml0IHZhbHVlIGFfaGkgYW5kIGFcclxuICogbm9ub3ZlcmxhcHBpbmcgKHMtMSktYml0IHZhbHVlIGFfbG8gc3VjaCB0aGF0IGFicyhhX2hpKSA+PSBhYnMoYV9sbykgYW5kXHJcbiAqIGEgPSBhX2hpICsgYV9sby5cclxuICpcclxuICogKiBzZWUgW1NoZXdjaHVrXShodHRwczovL3Blb3BsZS5lZWNzLmJlcmtlbGV5LmVkdS9+anJzL3BhcGVycy9yb2J1c3RyLnBkZilcclxuICpcclxuICogQHBhcmFtIGEgYSBkb3VibGVcclxuICogQHBhcmFtIGJpdHMgdGhlIG51bWJlciBvZiBzaWduaWZpY2FuZCBiaXRzIHRvIGxlYXZlIGludGFjdFxyXG4gKi9cclxuZnVuY3Rpb24gcmVkdWNlU2lnbmlmaWNhbmQoYSwgYml0cykge1xyXG4gICAgY29uc3QgcyA9IDUzIC0gYml0cztcclxuICAgIGNvbnN0IGYgPSAyICoqIHMgKyAxO1xyXG4gICAgY29uc3QgYyA9IGYgKiBhO1xyXG4gICAgY29uc3QgciA9IGMgLSAoYyAtIGEpO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuZXhwb3J0IHsgcmVkdWNlU2lnbmlmaWNhbmQgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVkdWNlLXNpZ25pZmljYW5kLmpzLm1hcCIsIi8qKlxyXG4gKiA9PT0gTWF0aC5jZWlsKHAvMikgd2hlcmUgcCBpcyB0aGUgIyBvZiBzaWduaWZpY2FuZCBiaXRzIGluIGEgZG91YmxlID09PSA1My5cclxuICovXHJcbmNvbnN0IGYgPSAxMzQyMTc3Mjk7IC8vIDIqKjI3ICsgMTtcclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHJlc3VsdCBvZiBzcGxpdHRpbmcgYSBkb3VibGUgaW50byAyIDI2LWJpdCBkb3VibGVzLlxyXG4gKlxyXG4gKiBUaGVvcmVtIDE3IChWZWx0a2FtcC1EZWtrZXIpOiBMZXQgYSBiZSBhIHAtYml0IGZsb2F0aW5nLXBvaW50IG51bWJlciwgd2hlcmVcclxuICogcCA+PSAzLiBDaG9vc2UgYSBzcGxpdHRpbmcgcG9pbnQgcyBzdWNoIHRoYXQgcC8yIDw9IHMgPD0gcC0xLiBUaGVuIHRoZVxyXG4gKiBmb2xsb3dpbmcgYWxnb3JpdGhtIHdpbGwgcHJvZHVjZSBhIChwLXMpLWJpdCB2YWx1ZSBhX2hpIGFuZCBhXHJcbiAqIG5vbm92ZXJsYXBwaW5nIChzLTEpLWJpdCB2YWx1ZSBhX2xvIHN1Y2ggdGhhdCBhYnMoYV9oaSkgPj0gYWJzKGFfbG8pIGFuZFxyXG4gKiBhID0gYV9oaSArIGFfbG8uXHJcbiAqXHJcbiAqIHNlZSBlLmcuIFtTaGV3Y2h1a10oaHR0cHM6Ly9wZW9wbGUuZWVjcy5iZXJrZWxleS5lZHUvfmpycy9wYXBlcnMvcm9idXN0ci5wZGYpXHJcbiAqIEBwYXJhbSBhIEEgZG91YmxlIGZsb2F0aW5nIHBvaW50IG51bWJlclxyXG4gKi9cclxuZnVuY3Rpb24gc3BsaXQoYSkge1xyXG4gICAgY29uc3QgYyA9IGYgKiBhO1xyXG4gICAgY29uc3QgYV9oID0gYyAtIChjIC0gYSk7XHJcbiAgICBjb25zdCBhX2wgPSBhIC0gYV9oO1xyXG4gICAgcmV0dXJuIFthX2gsIGFfbF07XHJcbn1cclxuLy8gaW5saW5lZCAtIGlucHV0IGEsIG91dHB1dCBhX2gsIGFfbFxyXG4vLyBjb25zdCBjID0gZiAqIGE7IGNvbnN0IGFfaCA9IGMgLSAoYyAtIGEpOyBjb25zdCBhX2wgPSBhIC0gYV9oOyByZXR1cm4gW2FfaCwgYV9sXTtcclxuZXhwb3J0IHsgc3BsaXQgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3BsaXQuanMubWFwIiwiLyoqXHJcbiAqIFJldHVybnMgdGhlIGV4YWN0IHJlc3VsdCBvZiBzdWJ0cmFjdGluZyBiIGZyb20gYSAoYXMgYSBmbG9hdGluZyBwb2ludFxyXG4gKiBleHBhbnNpb24pLlxyXG4gKiBAcGFyYW0gYVxyXG4gKiBAcGFyYW0gYlxyXG4gKi9cclxuZnVuY3Rpb24gdHdvRGlmZihhLCBiKSB7XHJcbiAgICBjb25zdCB4ID0gYSAtIGI7XHJcbiAgICBjb25zdCBidmlydCA9IGEgLSB4O1xyXG4gICAgY29uc3QgeSA9IChhIC0gKHggKyBidmlydCkpICsgKGJ2aXJ0IC0gYik7XHJcbiAgICByZXR1cm4gW3ksIHhdO1xyXG59XHJcbmV4cG9ydCB7IHR3b0RpZmYgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHdvLWRpZmYuanMubWFwIiwiY29uc3QgZiA9IDEzNDIxNzcyOTsgLy8gMioqMjcgKyAxO1xyXG4vKipcclxuICogUmV0dXJucyB0aGUgZXhhY3QgcmVzdWx0IG9mIG11bHRpcGx5aW5nIHR3byBkb3VibGVzLlxyXG4gKlxyXG4gKiAqIHRoZSByZXN1bHRpbmcgYXJyYXkgaXMgdGhlIHJldmVyc2Ugb2YgdGhlIHN0YW5kYXJkIHR3b1N1bSBpbiB0aGUgbGl0ZXJhdHVyZS5cclxuICpcclxuICogVGhlb3JlbSAxOCAoU2hld2NodWspOiBMZXQgYSBhbmQgYiBiZSBwLWJpdCBmbG9hdGluZy1wb2ludCBudW1iZXJzLCB3aGVyZVxyXG4gKiBwID49IDYuIFRoZW4gdGhlIGZvbGxvd2luZyBhbGdvcml0aG0gd2lsbCBwcm9kdWNlIGEgbm9ub3ZlcmxhcHBpbmcgZXhwYW5zaW9uXHJcbiAqIHggKyB5IHN1Y2ggdGhhdCBhYiA9IHggKyB5LCB3aGVyZSB4IGlzIGFuIGFwcHJveGltYXRpb24gdG8gYWIgYW5kIHlcclxuICogcmVwcmVzZW50cyB0aGUgcm91bmRvZmYgZXJyb3IgaW4gdGhlIGNhbGN1bGF0aW9uIG9mIHguIEZ1cnRoZXJtb3JlLCBpZlxyXG4gKiByb3VuZC10by1ldmVuIHRpZWJyZWFraW5nIGlzIHVzZWQsIHggYW5kIHkgYXJlIG5vbi1hZGphY2VudC5cclxuICpcclxuICogU2VlIGh0dHBzOi8vcGVvcGxlLmVlY3MuYmVya2VsZXkuZWR1L35qcnMvcGFwZXJzL3JvYnVzdHIucGRmXHJcbiAqIEBwYXJhbSBhIEEgZG91YmxlXHJcbiAqIEBwYXJhbSBiIEFub3RoZXIgZG91YmxlXHJcbiAqL1xyXG5mdW5jdGlvbiB0d29Qcm9kdWN0KGEsIGIpIHtcclxuICAgIGNvbnN0IHggPSBhICogYjtcclxuICAgIC8vY29uc3QgW2FoLCBhbF0gPSBzcGxpdChhKTtcclxuICAgIGNvbnN0IGMgPSBmICogYTtcclxuICAgIGNvbnN0IGFoID0gYyAtIChjIC0gYSk7XHJcbiAgICBjb25zdCBhbCA9IGEgLSBhaDtcclxuICAgIC8vY29uc3QgW2JoLCBibF0gPSBzcGxpdChiKTtcclxuICAgIGNvbnN0IGQgPSBmICogYjtcclxuICAgIGNvbnN0IGJoID0gZCAtIChkIC0gYik7XHJcbiAgICBjb25zdCBibCA9IGIgLSBiaDtcclxuICAgIGNvbnN0IHkgPSAoYWwgKiBibCkgLSAoKHggLSAoYWggKiBiaCkpIC0gKGFsICogYmgpIC0gKGFoICogYmwpKTtcclxuICAgIC8vY29uc3QgZXJyMSA9IHggLSAoYWggKiBiaCk7XHJcbiAgICAvL2NvbnN0IGVycjIgPSBlcnIxIC0gKGFsICogYmgpO1xyXG4gICAgLy9jb25zdCBlcnIzID0gZXJyMiAtIChhaCAqIGJsKTtcclxuICAgIC8vY29uc3QgeSA9IChhbCAqIGJsKSAtIGVycjM7XHJcbiAgICByZXR1cm4gW3ksIHhdO1xyXG59XHJcbmV4cG9ydCB7IHR3b1Byb2R1Y3QgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHdvLXByb2R1Y3QuanMubWFwIiwiLyoqXHJcbiAqIFJldHVybnMgdGhlIGV4YWN0IHJlc3VsdCBvZiBhZGRpbmcgdHdvIGRvdWJsZXMuXHJcbiAqXHJcbiAqICogdGhlIHJlc3VsdGluZyBhcnJheSBpcyB0aGUgcmV2ZXJzZSBvZiB0aGUgc3RhbmRhcmQgdHdvU3VtIGluIHRoZSBsaXRlcmF0dXJlLlxyXG4gKlxyXG4gKiBUaGVvcmVtIDcgKEtudXRoKTogTGV0IGEgYW5kIGIgYmUgcC1iaXQgZmxvYXRpbmctcG9pbnQgbnVtYmVycy4gVGhlbiB0aGVcclxuICogZm9sbG93aW5nIGFsZ29yaXRobSB3aWxsIHByb2R1Y2UgYSBub25vdmVybGFwcGluZyBleHBhbnNpb24geCArIHkgc3VjaCB0aGF0XHJcbiAqIGEgKyBiID0geCArIHksIHdoZXJlIHggaXMgYW4gYXBwcm94aW1hdGlvbiB0byBhICsgYiBhbmQgeSBpcyB0aGUgcm91bmRvZmZcclxuICogZXJyb3IgaW4gdGhlIGNhbGN1bGF0aW9uIG9mIHguXHJcbiAqXHJcbiAqIFNlZSBodHRwczovL3Blb3BsZS5lZWNzLmJlcmtlbGV5LmVkdS9+anJzL3BhcGVycy9yb2J1c3RyLnBkZlxyXG4gKi9cclxuZnVuY3Rpb24gdHdvU3VtKGEsIGIpIHtcclxuICAgIGNvbnN0IHggPSBhICsgYjtcclxuICAgIGNvbnN0IGJ2ID0geCAtIGE7XHJcbiAgICByZXR1cm4gWyhhIC0gKHggLSBidikpICsgKGIgLSBidiksIHhdO1xyXG59XHJcbi8vIGlubGluZWRcclxuLy9jb25zdCBSID0gYSArIGI7IGNvbnN0IF8gPSBSIC0gYTsgY29uc3QgciA9IChhIC0gKFIgLSBfKSkgKyAoYiAtIF8pOyByZXR1cm4gW3IsUl1cclxuZXhwb3J0IHsgdHdvU3VtIH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXR3by1zdW0uanMubWFwIiwiaW1wb3J0IHsgZVNpZ24gfSBmcm9tIFwiLi9lLXNpZ24uanNcIjtcclxuaW1wb3J0IHsgZU5lZ2F0aXZlT2YgfSBmcm9tIFwiLi9lLW5lZ2F0aXZlLW9mLmpzXCI7XHJcbi8vIFdlICpoYXZlKiB0byBkbyB0aGUgYmVsb3finZcgVGhlIGFzc2lnbmVlIGlzIGEgZ2V0dGVy4p2XIFRoZSBhc3NpZ25lZCBpcyBhIHB1cmUgZnVuY3Rpb27inZdcclxuY29uc3Qgc2lnbiA9IGVTaWduO1xyXG5jb25zdCBuZWdhdGl2ZU9mID0gZU5lZ2F0aXZlT2Y7XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBhYnNvbHV0ZSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gZmxvYXRpbmcgcG9pbnQgZXhwYW5zaW9uLlxyXG4gKlxyXG4gKiAqIHNlZSBbU2hld2NodWtdKGh0dHBzOi8vcGVvcGxlLmVlY3MuYmVya2VsZXkuZWR1L35qcnMvcGFwZXJzL3JvYnVzdHIucGRmKVxyXG4gKlxyXG4gKiBAcGFyYW0gZSBhIGZsb2F0aW5nIHBvaW50IGV4cGFuc2lvblxyXG4gKi9cclxuZnVuY3Rpb24gZUFicyhlKSB7XHJcbiAgICBpZiAoZVtlLmxlbmd0aCAtIDFdIDwgMCkge1xyXG4gICAgICAgIHJldHVybiBuZWdhdGl2ZU9mKGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGU7XHJcbn1cclxuZXhwb3J0IHsgZUFicyB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1lLWFicy5qcy5tYXAiLCJpbXBvcnQgeyBleHBhbnNpb25Qcm9kdWN0IH0gZnJvbSBcIi4vZXhwYW5zaW9uLXByb2R1Y3QuanNcIjtcclxuaW1wb3J0IHsgdHdvUHJvZHVjdCB9IGZyb20gXCIuLi9iYXNpYy90d28tcHJvZHVjdC5qc1wiO1xyXG5pbXBvcnQgeyBzY2FsZUV4cGFuc2lvbiB9IGZyb20gXCIuL3NjYWxlLWV4cGFuc2lvbi5qc1wiO1xyXG5pbXBvcnQgeyB0d29TdW0gfSBmcm9tIFwiLi4vYmFzaWMvdHdvLXN1bS5qc1wiO1xyXG5pbXBvcnQgeyBncm93RXhwYW5zaW9uIH0gZnJvbSBcIi4vZ3Jvdy1leHBhbnNpb24uanNcIjtcclxuaW1wb3J0IHsgZmFzdEV4cGFuc2lvblN1bSB9IGZyb20gXCIuL2Zhc3QtZXhwYW5zaW9uLXN1bS5qc1wiO1xyXG5pbXBvcnQgeyBlQ29tcHJlc3MgfSBmcm9tIFwiLi9lLWNvbXByZXNzLmpzXCI7XHJcbi8vIFdlICpoYXZlKiB0byBkbyB0aGUgYmVsb3finZcgVGhlIGFzc2lnbmVlIGlzIGEgZ2V0dGVy4p2XIFRoZSBhc3NpZ25lZCBpcyBhIHB1cmUgZnVuY3Rpb27inZdcclxuY29uc3QgbXVsdCA9IGV4cGFuc2lvblByb2R1Y3Q7XHJcbmNvbnN0IHRwID0gdHdvUHJvZHVjdDtcclxuY29uc3QgbXVsdEJ5RG91YmxlID0gc2NhbGVFeHBhbnNpb247XHJcbmNvbnN0IHRzID0gdHdvU3VtO1xyXG5jb25zdCBhZGREb3VibGUgPSBncm93RXhwYW5zaW9uO1xyXG5jb25zdCBhZGQgPSBmYXN0RXhwYW5zaW9uU3VtO1xyXG5jb25zdCBjb21wcmVzcyA9IGVDb21wcmVzcztcclxuLyoqXHJcbiAqIFJldHVybiB0aGUgcmVzdWx0IG9mIHN1bW1pbmcgYW4gYXJyYXkgb2YgdGVybXMsIGVhY2ggdGVybSBiZWluZyBhbiBhcnJheSBvZlxyXG4gKiBmbG9hdGluZyBwb2ludCBleHBhbnNpb25zIHRvIGJlIG11bHRpcGxpZWQgdG9nZXRoZXIuXHJcbiAqXHJcbiAqICogVGhlIHJlc3VsdCBpcyBleGFjdCBpbiB0aGUgZm9ybSBvZiBhIG5vbi1vdmVybGFwcGluZyBmbG9hdGluZyBwb2ludFxyXG4gKiBleHBhbnNpb24uXHJcbiAqICogc2VlIFtTaGV3Y2h1a10oaHR0cHM6Ly9wZW9wbGUuZWVjcy5iZXJrZWxleS5lZHUvfmpycy9wYXBlcnMvcm9idXN0ci5wZGYpXHJcbiAqXHJcbiAqIEBwYXJhbSB0ZXJtcyBBbiBhcnJheSBvZiB0ZXJtcyB0byBiZSBzdW1tZWQ7IEEgdGVybSBjb25zaXN0cyBvZiBhblxyXG4gKiBhcnJheSBvZiBmbG9hdGluZyBwb2ludCBleHBhbnNpb25zIHRvIGJlIG11bHRpcGxpZWQgdG9nZXRoZXIuXHJcbiAqL1xyXG4vLyBUaGUgdGVybXMgcGFyYW1ldGVyIHdlcmUgY2hvc2VuIHRvIGFsd2F5cyBiZSBleHBhbnNpb25zIGluIG9yZGVyIHRvIGtlZXAgdGhlIFxyXG4vLyBmdW5jdGlvbiBtb25vbW9yaGljLCBidXQgd2hldGhlciBpdCdzIHJlYWxseSB3b3J0aCBpdCBJIGFtIG5vdCBzdXJlLlxyXG5mdW5jdGlvbiBlQ2FsY3VsYXRlKHRlcm1zKSB7XHJcbiAgICBsZXQgdG90YWwgPSBbMF07XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRlcm1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgdGVybSA9IHRlcm1zW2ldO1xyXG4gICAgICAgIGxldCBwcm9kdWN0ID0gdGVybVswXTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IHRlcm0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgY29uc3QgbXVsdGlwbGljYW50ID0gdGVybVtqXTtcclxuICAgICAgICAgICAgaWYgKG11bHRpcGxpY2FudC5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb2R1Y3QubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdCA9IHRwKHByb2R1Y3RbMF0sIG11bHRpcGxpY2FudFswXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0ID0gbXVsdEJ5RG91YmxlKHByb2R1Y3QsIG11bHRpcGxpY2FudFswXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAocHJvZHVjdC5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3QgPSBtdWx0QnlEb3VibGUobXVsdGlwbGljYW50LCBwcm9kdWN0WzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3QgPSBtdWx0KG11bHRpcGxpY2FudCwgcHJvZHVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYWRkXHJcbiAgICAgICAgaWYgKHByb2R1Y3QubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIGlmICh0b3RhbC5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRvdGFsID0gdHModG90YWxbMF0sIHByb2R1Y3RbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdG90YWwgPSBhZGREb3VibGUodG90YWwsIHByb2R1Y3RbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodG90YWwubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0b3RhbCA9IGFkZERvdWJsZShwcm9kdWN0LCB0b3RhbFswXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0b3RhbCA9IGFkZCh0b3RhbCwgcHJvZHVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL3JldHVybiBjb21wcmVzcyh0b3RhbCk7XHJcbiAgICByZXR1cm4gdG90YWw7XHJcbn1cclxuZXhwb3J0IHsgZUNhbGN1bGF0ZSB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1lLWNhbGN1bGF0ZS5qcy5tYXAiLCJpbXBvcnQgeyBlRGlmZiB9IGZyb20gXCIuL2UtZGlmZi5qc1wiO1xyXG5pbXBvcnQgeyBlU2lnbiB9IGZyb20gXCIuL2Utc2lnbi5qc1wiO1xyXG4vKipcclxuICogUmV0dXJucyAwIGlmIGEgPT09IGIsIGEgK3RpdmUgdmFsdWUgaWYgYSA+IGIgb3IgYSBuZWdhdGl2ZSB2YWx1ZSBpZiBhIDwgYi5cclxuICpcclxuICogKiBzZWUgW1NoZXdjaHVrXShodHRwczovL3Blb3BsZS5lZWNzLmJlcmtlbGV5LmVkdS9+anJzL3BhcGVycy9yb2J1c3RyLnBkZilcclxuICpcclxuICogXCJUaGUgZWFzaWVzdCB3YXkgdG8gY29tcGFyZSB0d28gZXhwYW5zaW9ucyBpcyB0byBzdWJ0cmFjdCBvbmUgZnJvbSB0aGUgb3RoZXIsXHJcbiAqIGFuZCB0ZXN0IHRoZSBzaWduIG9mIHRoZSByZXN1bHQuIEFuIGV4cGFuc2lvbuKAmXMgc2lnbiBjYW4gYmUgZWFzaWx5IHRlc3RlZFxyXG4gKiBiZWNhdXNlIG9mIHRoZSBub25vdmVybGFwcGluZyBwcm9wZXJ0eTsgc2ltcGx5IGNoZWNrIHRoZSBzaWduIG9mIHRoZVxyXG4gKiBleHBhbnNpb24ncyBtb3N0IHNpZ25pZmljYW50IG5vbnplcm8gY29tcG9uZW50Li4uXCJcclxuICpcclxuICogQHBhcmFtIGEgYSBmbG9hdGluZyBwb2ludCBleHBhbnNpb25cclxuICogQHBhcmFtIGIgYW5vdGhlciBmbG9hdGluZyBwb2ludCBleHBhbnNpb25cclxuICovXHJcbmZ1bmN0aW9uIGVDb21wYXJlKGEsIGIpIHtcclxuICAgIHJldHVybiBlU2lnbihlRGlmZihhLCBiKSk7XHJcbn1cclxuZXhwb3J0IHsgZUNvbXBhcmUgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZS1jb21wYXJlLmpzLm1hcCIsIi8qKlxyXG4gKiBSZXR1cm5zIHRoZSByZXN1bHQgb2YgY29tcHJlc3NpbmcgdGhlIGdpdmVuIGZsb2F0aW5nIHBvaW50IGV4cGFuc2lvbi5cclxuICpcclxuICogKiBwcmltYXJpbHkgZm9yIGludGVybmFsIGxpYnJhcnkgdXNlXHJcbiAqXHJcbiAqICogc2VlIFtTaGV3Y2h1a10oaHR0cHM6Ly9wZW9wbGUuZWVjcy5iZXJrZWxleS5lZHUvfmpycy9wYXBlcnMvcm9idXN0ci5wZGYpXHJcbiAqXHJcbiAqIFRoZW9yZW0gMjMgKFNoZXdjaHVjayk6IExldCBlID0gc3VtXyhpPTEpXm0oZV9pKSBiZSBhIG5vbm92ZXJsYXBwaW5nXHJcbiAqIGV4cGFuc2lvbiBvZiBtIHAtYml0IGNvbXBvbmVudHMsIHdoZXJlIG0gPj0gMy4gU3VwcG9zZSB0aGF0IHRoZSBjb21wb25lbnRzIG9mXHJcbiAqIGUgYXJlIHNvcnRlZCBpbiBvcmRlciBvZiBpbmNyZWFzaW5nIG1hZ25pdHVkZSwgZXhjZXB0IHRoYXQgYW55IG9mIHRoZSBlX2kgbWF5XHJcbiAqIGJlIHplcm8uIFRoZW4gdGhlIGZvbGxvd2luZyBhbGdvcml0aG0gd2lsbCBwcm9kdWNlIGEgbm9ub3ZlcmxhcHBpbmcgZXhwYW5zaW9uXHJcbiAqIChub25hZGphY2VudCBpZiByb3VuZC10byBldmVuIHRpZWJyZWFraW5nIGlzIHVzZWQpIHN1Y2ggdGhhdFxyXG4gKiBoID0gc3VtXyhpPTEpXm4oaF9pKSA9IGUsIHdoZXJlIHRoZSBjb21wb25lbnRzIGhfaSBhcmUgaW4gb3JkZXIgb2YgaW5jcmVhc2luZ1xyXG4gKiBtYWduaXR1ZGUuIElmIGggIT0gMCwgbm9uZSBvZiB0aGUgaF9pIHdpbGwgYmUgemVyby4gRnVydGhlcm1vcmUsIHRoZSBsYXJnZXN0XHJcbiAqIGNvbXBvbmVudCBoX24gYXBwcm94aW1hdGVzIGggd2l0aCBhbiBlcnJvciBzbWFsbGVyIHRoYW4gdWxwKGhfbikuXHJcbiAqL1xyXG5mdW5jdGlvbiBlQ29tcHJlc3MoZSkge1xyXG4gICAgLy9yZXR1cm4gZTtcclxuICAgIGNvbnN0IGVfID0gZS5zbGljZSgpO1xyXG4gICAgY29uc3QgbSA9IGVfLmxlbmd0aDtcclxuICAgIGlmIChtID09PSAxKSB7XHJcbiAgICAgICAgcmV0dXJuIGVfO1xyXG4gICAgfVxyXG4gICAgbGV0IFEgPSBlX1ttIC0gMV07XHJcbiAgICBsZXQgYm90dG9tID0gbTtcclxuICAgIGZvciAobGV0IGkgPSBtIC0gMjsgaSA+PSAwOyAtLWkpIHtcclxuICAgICAgICBjb25zdCBhID0gUTtcclxuICAgICAgICBjb25zdCBiID0gZV9baV07XHJcbiAgICAgICAgUSA9IGEgKyBiO1xyXG4gICAgICAgIGNvbnN0IGJ2ID0gUSAtIGE7XHJcbiAgICAgICAgY29uc3QgcSA9IGIgLSBidjtcclxuICAgICAgICBpZiAocSkge1xyXG4gICAgICAgICAgICBlX1stLWJvdHRvbV0gPSBRO1xyXG4gICAgICAgICAgICBRID0gcTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgdG9wID0gMDtcclxuICAgIGZvciAobGV0IGkgPSBib3R0b207IGkgPCBtOyArK2kpIHtcclxuICAgICAgICBjb25zdCBhID0gZV9baV07XHJcbiAgICAgICAgY29uc3QgYiA9IFE7XHJcbiAgICAgICAgUSA9IGEgKyBiO1xyXG4gICAgICAgIGNvbnN0IGJ2ID0gUSAtIGE7XHJcbiAgICAgICAgY29uc3QgcSA9IGIgLSBidjtcclxuICAgICAgICBpZiAocSkge1xyXG4gICAgICAgICAgICBlX1t0b3ArK10gPSBxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVfW3RvcCsrXSA9IFE7XHJcbiAgICBlXy5sZW5ndGggPSB0b3A7XHJcbiAgICByZXR1cm4gZV87XHJcbn1cclxuZXhwb3J0IHsgZUNvbXByZXNzIH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWUtY29tcHJlc3MuanMubWFwIiwiaW1wb3J0IHsgZmFzdEV4cGFuc2lvblN1bSB9IGZyb20gXCIuL2Zhc3QtZXhwYW5zaW9uLXN1bS5qc1wiO1xyXG5pbXBvcnQgeyBlTmVnYXRpdmVPZiB9IGZyb20gXCIuL2UtbmVnYXRpdmUtb2YuanNcIjtcclxuLy8gV2UgKmhhdmUqIHRvIGRvIHRoZSBiZWxvd+KdlyBUaGUgYXNzaWduZWUgaXMgYSBnZXR0ZXLinZcgVGhlIGFzc2lnbmVkIGlzIGEgcHVyZSBmdW5jdGlvbuKdl1xyXG5jb25zdCBuZWdhdGl2ZU9mID0gZU5lZ2F0aXZlT2Y7XHJcbmNvbnN0IGFkZCA9IGZhc3RFeHBhbnNpb25TdW07XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdHdvIGZsb2F0aW5nIHBvaW50IGV4cGFuc2lvbnMsIGkuZS4gZSAtIGYuXHJcbiAqXHJcbiAqICogc2VlIFtTaGV3Y2h1a10oaHR0cHM6Ly9wZW9wbGUuZWVjcy5iZXJrZWxleS5lZHUvfmpycy9wYXBlcnMvcm9idXN0ci5wZGYpXHJcbiAqXHJcbiAqIEBwYXJhbSBlIGEgZmxvYXRpbmcgcG9pbnQgZXhwYW5zaW9uXHJcbiAqIEBwYXJhbSBmIGFub3RoZXIgZmxvYXRpbmcgcG9pbnQgZXhwYW5zaW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBlRGlmZihlLCBmKSB7XHJcbiAgICBjb25zdCBnID0gbmVnYXRpdmVPZihmKTtcclxuICAgIHJldHVybiBhZGQoZSwgZyk7XHJcbn1cclxuZXhwb3J0IHsgZURpZmYgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZS1kaWZmLmpzLm1hcCIsIi8qKlxyXG4gKiBSZXR1cm5zIHRoZSByZXN1bHQgb2YgZGl2aWRpbmcgYSBmbG9hdGluZyBwb2ludCBleHBhbnNpb24gYnkgMi5cclxuICogKiAqKmVycm9yIGZyZWUqKlxyXG4gKlxyXG4gKiAqIHNlZSBbU2hld2NodWtdKGh0dHBzOi8vcGVvcGxlLmVlY3MuYmVya2VsZXkuZWR1L35qcnMvcGFwZXJzL3JvYnVzdHIucGRmKVxyXG4gKlxyXG4gKiBAcGFyYW0gZSBhIGZsb2F0aW5nIHBvaW50IGV4cGFuc2lvblxyXG4gKi9cclxuZnVuY3Rpb24gZURpdkJ5MihlKSB7XHJcbiAgICBjb25zdCBlXyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZV8ucHVzaCgwLjUgKiBlW2ldKTtcclxuICAgIH1cclxuICAgIHJldHVybiBlXztcclxufVxyXG5leHBvcnQgeyBlRGl2QnkyIH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWUtZGl2LWJ5LTIuanMubWFwIiwiaW1wb3J0IHsgZUVzdGltYXRlIH0gZnJvbSBcIi4vZS1lc3RpbWF0ZS5qc1wiO1xyXG5pbXBvcnQgeyBleHBhbnNpb25Qcm9kdWN0IH0gZnJvbSBcIi4vZXhwYW5zaW9uLXByb2R1Y3QuanNcIjtcclxuaW1wb3J0IHsgZURpZmYgfSBmcm9tIFwiLi9lLWRpZmYuanNcIjtcclxuaW1wb3J0IHsgZVRvQml0bGVuZ3RoIH0gZnJvbSBcIi4vZS10by1iaXRsZW5ndGguanNcIjtcclxuaW1wb3J0IHsgZXhwQml0TGVuZ3RoIH0gZnJvbSBcIi4uL2RvdWJsZS1yZXByZXNlbnRhdGlvbi9iaXQtbGVuZ3RoLmpzXCI7XHJcbi8vIFdlICpoYXZlKiB0byBkbyB0aGUgYmVsb3finZcgVGhlIGFzc2lnbmVlIGlzIGEgZ2V0dGVy4p2XIFRoZSBhc3NpZ25lZCBpcyBhIHB1cmUgZnVuY3Rpb27inZdcclxuY29uc3QgbXVsdCA9IGV4cGFuc2lvblByb2R1Y3Q7XHJcbmNvbnN0IHRvQml0bGVuZ3RoID0gZVRvQml0bGVuZ3RoO1xyXG5jb25zdCBiaXRMZW5ndGggPSBleHBCaXRMZW5ndGg7XHJcbmNvbnN0IGRpZmYgPSBlRGlmZjtcclxuY29uc3QgZXN0aW1hdGUgPSBlRXN0aW1hdGU7XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSByZXN1bHQgb2YgYS9iIHVzaW5nIEdvbGRzY2htaWR0IGRpdmlzaW9uLlxyXG4gKlxyXG4gKiBUaGUgcmVzdWx0IHdpbGwgb25seSBiZSBleGFjdCBpZiBifGEsIGkuZS4gaWYgYiBkaXZpZGVzIGEgZXhhY3RseSwgZWxzZSB0aGVcclxuICogcmVzdWx0IHdpbGwgYmUgcm91bmRlZCB0byB0aGUgbG9uZ2VzdCBiaXRsZW5ndGggYmV0d2VlbiBhIGFuZCBiLlxyXG4gKlxyXG4gKiBAcGFyYW0gYSB0aGUgbnVtZXJhdG9yXHJcbiAqIEBwYXJhbSBiIHRoZSBkZW5vbWluYXRvclxyXG4gKlxyXG4gKiBAcGFyYW0gZXhwYW5zaW9uTGVuZ3RoIHRoZSBiaXRsZW5ndGgvNTMgb2YgdGhlIGZpbmFsIHJlc3VsdCwgZS5nLiAxIG1lYW5zXHJcbiAqIHN0YW5kYXJkIGRvdWJsZSBwcmVjaXNpb24sIDIgbWVhbnMgZG91YmxlLWRvdWJsZSwgZXRjIHVwIHRvIGEgbWF4IG9mIGFib3V0IDIwIGF0XHJcbiAqIHdoaWNoIHBvaW50IHVuZGVyZmxvdyBjZWFzZSBwcmVjaXNpb24gaW1wcm92ZW1lbnQuIElmIHRoZSBkaXZpc2lvbiBpcyBrbm93blxyXG4gKiB0byBiZSBleGFjdCBiZWZvcmVoYW5kIChzdWNoIGFzIGluIHRoZSBwc2V1ZG8gcmVtYWluZGVyIHNlcXVlbmNlIGFsZ29yaXRobSlcclxuICogdGhlbiBzZXQgZXhwYW5zaW9uTGVuZ3RoID09PSAwIGFuZCBhbiBleGFjdCBkaXZpc2lvbiB3aWxsIGJlIGRvbmUuXHJcbiAqL1xyXG4vLyBUT0RPIC0gdGVzdCB0aGlzIGZ1bmN0aW9uIHByb3Blcmx5IG9yIHJlcGxhY2Ugd2l0aCBhIGJldHRlciBvbmVcclxuZnVuY3Rpb24gZURpdihOLCBELCBleHBhbnNpb25MZW5ndGgpIHtcclxuICAgIGxldCBEXyA9IEQ7XHJcbiAgICBsZXQgTl8gPSBOO1xyXG4gICAgbGV0IGV4YWN0ID0gZmFsc2U7XHJcbiAgICBsZXQgcmVzdWx0Qml0bGVuZ3RoVXBwZXJCb3VuZCA9IDA7XHJcbiAgICBpZiAoIWV4cGFuc2lvbkxlbmd0aCkge1xyXG4gICAgICAgIGNvbnN0IGJpdGxlbmd0aE4gPSBiaXRMZW5ndGgoTl8pO1xyXG4gICAgICAgIGNvbnN0IGJpdGxlbmd0aEQgPSBiaXRMZW5ndGgoRF8pO1xyXG4gICAgICAgIC8vIHJlc3VsdEJpdGxlbmd0aFVwcGVyQm91bmQgaXMgb25seSB2YWxpZCBpZiB0aGUgZGl2aXNpb24gaXMga25vd25cclxuICAgICAgICAvLyB0byBiZSBleGFjdFxyXG4gICAgICAgIHJlc3VsdEJpdGxlbmd0aFVwcGVyQm91bmQgPSBiaXRsZW5ndGhOIC0gYml0bGVuZ3RoRCArIDE7XHJcbiAgICAgICAgZXhwYW5zaW9uTGVuZ3RoID0gKHJlc3VsdEJpdGxlbmd0aFVwcGVyQm91bmQgLyA1MykgKyAxO1xyXG4gICAgICAgIGV4YWN0ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGxldCBGID0gWzEgLyBlc3RpbWF0ZShEXyldOyAvLyBJbml0aWFsIGd1ZXNzIC0gb3V0IGJ5IDEvMiB1cGxzXHJcbiAgICBsZXQgaSA9IDE7XHJcbiAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgIE5fID0gbXVsdChOXywgRik7XHJcbiAgICAgICAgLy8gVGhlIHByZWNpc2lvbiBiaXRsZW5ndGggZG91YmxlcyBvbiBlYWNoIGl0ZXJhdGlvblxyXG4gICAgICAgIGlmIChpID4gZXhwYW5zaW9uTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIC8vIHdlIG5vdyBoYXZlIHJvdWdobHkgZG91YmxlIHRoZSBuZWVkZWQgcHJlY2lzaW9uIC0gd2UgYWN0dWFsbHkgXHJcbiAgICAgICAgICAgIC8vIG9ubHkgcmVxdWlyZSBhYm91dCB0aGUgcHJlY2lzaW9uIGFuZCB0aGVuIHJvdW5kIHByb3Blcmx5IC0gdGhpc1xyXG4gICAgICAgICAgICAvLyBjb3VsZCBiZSBpbXBsZW1lbnRlZCBpbiB0aGUgZnV0dXJlLlxyXG4gICAgICAgICAgICBpZiAoZXhhY3QpIHtcclxuICAgICAgICAgICAgICAgIC8vIFdlIG11c3QgdGhyb3cgYXdheSBiaXRzIGtub3duIHRvIGJlIHplcm8uIFxyXG4gICAgICAgICAgICAgICAgLy8gQW55IGJpdHMgPiBleHBhbnNpb25MZW5ndGggKiA1MyBtdXN0IGJlIHRocm93biBhd2F5IGFzIHRoZXlcclxuICAgICAgICAgICAgICAgIC8vIGFyZSB3cm9uZyAtIGFsbCBvdGhlciBiaXRzIGFyZSBleGFjdC5cclxuICAgICAgICAgICAgICAgIE5fID0gdG9CaXRsZW5ndGgoTl8sIHJlc3VsdEJpdGxlbmd0aFVwcGVyQm91bmQpO1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETyAtIGJlbG93IGlzIGp1c3QgZm9yIHRlc3RpbmcgLSByZW1vdmUgbGF0ZXJcclxuICAgICAgICAgICAgICAgIC8vaWYgKGNvbXBhcmUobXVsdChELCBOXyksIE4pICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhtdWx0KEQsIE5fKSlcclxuICAgICAgICAgICAgICAgIC8vICAgIHRocm93IG5ldyBFcnJvcihgZGl2aXNpb24gaW4tZXhhY3QgLSBwcm9iYWJseSBkdWUgdG8gdW5kZXJmbG93LCBOOiAke059LCBEOiAke0R9LCBSZXN1bHQ6ICR7Tl99LCBwcm9kdWN0OiAke211bHQoRCwgTl8pfWApOyBcclxuICAgICAgICAgICAgICAgIC8vfSBcclxuICAgICAgICAgICAgICAgIHJldHVybiBOXztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBSZXR1cm5pbmcgb25seSBzaWduaWZpY2FudCBiaXRzIGhlbHBzIHdpdGggc2lnbiBkZXRlcm1pbmF0aW9uIGxhdGVyIG9uLlxyXG4gICAgICAgICAgICByZXR1cm4gTl8uc2xpY2UoTl8ubGVuZ3RoIC0gZXhwYW5zaW9uTGVuZ3RoLCBOXy5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBEXyA9IG11bHQoRF8sIEYpO1xyXG4gICAgICAgIEYgPSBkaWZmKFsyXSwgRF8pO1xyXG4gICAgICAgIGkgKj0gMjtcclxuICAgIH1cclxufVxyXG5leHBvcnQgeyBlRGl2IH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWUtZGl2LmpzLm1hcCIsIi8qKlxyXG4gKiBSZXR1cm5zIHRoZSByZXN1bHQgb2YgdGhlIGdpdmVuIGZsb2F0aW5nIHBvaW50IGV4cGFuc2lvbiByb3VuZGVkIHRvIGEgZG91YmxlXHJcbiAqIGZsb2F0aW5nIHBvaW50IG51bWJlci5cclxuICpcclxuICogVGhlIHJlc3VsdCBpcyB3aXRoaW4gMSB1bHBzIG9mIHRoZSBhY3R1YWwgdmFsdWUsIGUuZy4gaW1hZ2luZSB0aGUgd29yc3QgY2FzZVxyXG4gKiBzaXR1YXRpb24gd2hlcmUgd2UgYWRkIChpbiA0ZG90NCkgMTExMS4xMDAwICsgMC4wMDAwMTExMTExMTEuLi4gVGhlIHJlc3VsdFxyXG4gKiB3aWxsIGJlIDExMTEuMTAwMCB3aGVyZWFzIGFzIHRoZSBjb3JyZWN0IHJlc3VsdCBzaG91bGQgYmUgMTExMS4xMDAxIGFuZCB3ZVxyXG4gKiB0aHVzIGxvc3QgMSB1bHAgb2YgYWNjdXJhY3kuIEl0IGRvZXMgbm90IG1hdHRlciB0aGF0IHRoZSBleHBhbnNpb24gY29udGFpblxyXG4gKiBzZXZlcmFsIGZsb2F0cyBzaW5jZSBub25lIGlzIG92ZXJsYXBwaW5nLlxyXG4gKlxyXG4gKiBTZWUgU2hld2NodWsgaHR0cHM6Ly9wZW9wbGUuZWVjcy5iZXJrZWxleS5lZHUvfmpycy9wYXBlcnMvcm9idXN0ci5wZGZcclxuICpcclxuICogQHBhcmFtIGUgYSBmbG9hdGluZyBwb2ludCBleHBhbnNpb25cclxuICovXHJcbmZ1bmN0aW9uIGVFc3RpbWF0ZShlKSB7XHJcbiAgICBsZXQgUSA9IGVbMF07XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBRICs9IGVbaV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUTtcclxufVxyXG5leHBvcnQgeyBlRXN0aW1hdGUgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZS1lc3RpbWF0ZS5qcy5tYXAiLCJpbXBvcnQgeyBlTG9uZ0RpdmlkZSBhcyBlTG9uZ0RpdmlkZV8gfSBmcm9tIFwiLi9lLWxvbmctZGl2aWRlLmpzXCI7XHJcbi8vIFdlICpoYXZlKiB0byBkbyB0aGUgYmVsb3finZcgVGhlIGFzc2lnbmVlIGlzIGEgZ2V0dGVy4p2XIFRoZSBhc3NpZ25lZCBpcyBhIHB1cmUgZnVuY3Rpb27inZdcclxuY29uc3QgZUxvbmdEaXZpZGUgPSBlTG9uZ0RpdmlkZV87XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSByZXN1bHQgb2YgdGhlIGludGVnZXIgZGl2aXNpb24gYS9iLlxyXG4gKlxyXG4gKiAqICoqcHJlY29uZGl0aW9uOioqIGEgYW5kIGIgbXVzdCBiZSBpbnRlZ2VycywgYiAhPT0gMFxyXG4gKi9cclxuZnVuY3Rpb24gZUludERpdihhLCBiKSB7XHJcbiAgICByZXR1cm4gZUxvbmdEaXZpZGUoYSwgYikuZGl2O1xyXG59XHJcbmV4cG9ydCB7IGVJbnREaXYgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZS1pbnQtZGl2LmpzLm1hcCIsImltcG9ydCB7IGVQcm9kdWN0IH0gZnJvbSBcIi4vZS1wcm9kdWN0LmpzXCI7XHJcbmltcG9ydCB7IGV4cGFuc2lvblByb2R1Y3QgfSBmcm9tIFwiLi9leHBhbnNpb24tcHJvZHVjdC5qc1wiO1xyXG4vLyBXZSAqaGF2ZSogdG8gZG8gdGhlIGJlbG934p2XIFRoZSBhc3NpZ25lZSBpcyBhIGdldHRlcuKdlyBUaGUgYXNzaWduZWQgaXMgYSBwdXJlIGZ1bmN0aW9u4p2XXHJcbmNvbnN0IG11bHQgPSBleHBhbnNpb25Qcm9kdWN0O1xyXG5jb25zdCBwcm9kID0gZVByb2R1Y3Q7XHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEqKmksIHdoZXJlIGkgaXMgYSBub24tbmVnYXRpdmUgaW50ZWdlci5cclxuICogQHBhcmFtIGEgYSBmbG9hdGluZyBwb2ludCBleHBhbnNpb25cclxuICovXHJcbi8vIFRPRE8gLSB0aGlzIGFsZ29yaXRobSdzIHNwZWVkIGNhbiBlYXNpbHkgYmUgaW1wcm92ZWQgc2lnbmlmaWNhbnRseSB1c2luZyAncmVwZWF0ZWQgc3F1YXJpbmcnXHJcbmZ1bmN0aW9uIGVJbnRQb3coYSwgcCkge1xyXG4gICAgLy8gYV4wID09PSAxXHJcbiAgICBpZiAocCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiBbMV07XHJcbiAgICB9XHJcbiAgICAvLyBhXjEgPT09IGFcclxuICAgIGlmIChwID09PSAxKSB7XHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9XHJcbiAgICBpZiAocCA9PT0gMikge1xyXG4gICAgICAgIHJldHVybiBtdWx0KGEsIGEpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgYXMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcDsgaSsrKSB7XHJcbiAgICAgICAgYXMucHVzaChhKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcm9kKGFzKTtcclxufVxyXG5leHBvcnQgeyBlSW50UG93IH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWUtaW50LXBvdy5qcy5tYXAiLCJpbXBvcnQgeyBlQ29tcHJlc3MgfSBmcm9tIFwiLi9lLWNvbXByZXNzLmpzXCI7XHJcbmZ1bmN0aW9uIGVJc0ludGVnZXIoYSkge1xyXG4gICAgYSA9IGVDb21wcmVzcyhhKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChhW2ldICUgMSAhPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuZXhwb3J0IHsgZUlzSW50ZWdlciB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1lLWlzLWludGVnZXIuanMubWFwIiwiaW1wb3J0IHsgZU5lZ2F0aXZlT2YgYXMgZU5lZ2F0aXZlT2ZfIH0gZnJvbSAnLi9lLW5lZ2F0aXZlLW9mLmpzJztcclxuaW1wb3J0IHsgZmFzdEV4cGFuc2lvblN1bSBhcyBmYXN0RXhwYW5zaW9uU3VtXyB9IGZyb20gJy4vZmFzdC1leHBhbnNpb24tc3VtLmpzJztcclxuaW1wb3J0IHsgZUNvbXByZXNzIGFzIGVDb21wcmVzc18gfSBmcm9tICcuL2UtY29tcHJlc3MuanMnO1xyXG5pbXBvcnQgeyBncm93RXhwYW5zaW9uIGFzIGdyb3dFeHBhbnNpb25fIH0gZnJvbSAnLi9ncm93LWV4cGFuc2lvbi5qcyc7XHJcbmltcG9ydCB7IGVTdW0gYXMgZVN1bV8gfSBmcm9tICcuL2Utc3VtLmpzJztcclxuaW1wb3J0IHsgc2NhbGVFeHBhbnNpb24gYXMgc2NhbGVFeHBhbnNpb25fIH0gZnJvbSAnLi9zY2FsZS1leHBhbnNpb24uanMnO1xyXG5pbXBvcnQgeyBlRGlmZiBhcyBlRGlmZl8gfSBmcm9tICcuL2UtZGlmZi5qcyc7XHJcbi8vIFdlICpoYXZlKiB0byBkbyB0aGUgYmVsb3finZcgVGhlIGFzc2lnbmVlIGlzIGEgZ2V0dGVy4p2XIFRoZSBhc3NpZ25lZCBpcyBhIHB1cmUgZnVuY3Rpb27inZdcclxuY29uc3QgZU5lZ2F0aXZlT2YgPSBlTmVnYXRpdmVPZl87XHJcbmNvbnN0IGZhc3RFeHBhbnNpb25TdW0gPSBmYXN0RXhwYW5zaW9uU3VtXztcclxuY29uc3QgZUNvbXByZXNzID0gZUNvbXByZXNzXztcclxuY29uc3QgZ3Jvd0V4cGFuc2lvbiA9IGdyb3dFeHBhbnNpb25fO1xyXG5jb25zdCBlU3VtID0gZVN1bV87XHJcbmNvbnN0IHNjYWxlRXhwYW5zaW9uID0gc2NhbGVFeHBhbnNpb25fO1xyXG5jb25zdCBlRGlmZiA9IGVEaWZmXztcclxuY29uc3Qgc2lnbiA9IE1hdGguc2lnbjtcclxuZnVuY3Rpb24gZUxvbmdEaXZpZGUoTiwgRCkge1xyXG4gICAgTiA9IGVDb21wcmVzcyhOKTtcclxuICAgIEQgPSBlQ29tcHJlc3MoRCk7XHJcbiAgICAvLyBnZXQgdGhlIG1vc3Qgc2lnbmlmaWNhbnQgZG91YmxlXHJcbiAgICAvLyBvdXQgYnkgYXQgbW9zdCAxIHVscCwgZXhhY3QgaWYgZCA8IE1BWF9TQUZFX0lOVFxyXG4gICAgY29uc3QgZCA9IERbRC5sZW5ndGggLSAxXTtcclxuICAgIC8vIHRyaXZpYWwgY2FzZXNcclxuICAgIGlmIChELmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIGlmIChkID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZGl2aXNpb24gYnkgemVybycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZCA9PT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4geyBkaXY6IE4sIHJlbTogWzBdIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkID09PSAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4geyBkaXY6IGVOZWdhdGl2ZU9mKE4pLCByZW06IFswXSB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IHNpZ25OID0gc2lnbihOW04ubGVuZ3RoIC0gMV0pO1xyXG4gICAgaWYgKHNpZ25OID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHsgZGl2OiBbMF0sIHJlbTogWzBdIH07XHJcbiAgICB9XHJcbiAgICBjb25zdCBzaWduRCA9IHNpZ24oZCk7XHJcbiAgICBjb25zdCBkaXZzID0gW107XHJcbiAgICBsZXQgb2xkTGVuID0gMDtcclxuICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgY29uc3QgcmVtcyA9IFtdO1xyXG4gICAgICAgIC8vIGxvb3AgZnJvbSBiaWcgYG5baV1gIHRvIHNtYWxsIGBuW2ldYFxyXG4gICAgICAgIGZvciAobGV0IGkgPSBOLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG4gPSBOW2ldO1xyXG4gICAgICAgICAgICAvLyBgbiAlIGRgIGlzIHRoZSBleGFjdCByZW0gKGZvciByZW0gPCBNQVhfU0FGRV9JTlRFR0VSKSBidXQgaXMgcHJlbGltaW5hcnkgXHJcbiAgICAgICAgICAgIC8vIGFzIGl0IGlzIHN1YmplY3QgdG8gcm91bmQtb2ZmIGZvciByZW0gPiBNQVhfU0FGRV9JTlRFR0VSOyB0aHVzIG91dCBieSBhdCBcclxuICAgICAgICAgICAgLy8gbW9zdCAxLzIgdWxwXHJcbiAgICAgICAgICAgIC8vIER1ZSB0byByb3VuZG9mZiAoYW5kIHRoZSBmYWN0IHdlJ2UgdXNpbmcgYGRgIGFuZCBub3QgYERgISksIGBfZGl2YCBkb2VzIFxyXG4gICAgICAgICAgICAvLyBub3QgbmVjZXNzYXJpbHkgcmVwcmVzZW50IHRoZSBleGFjdCBxdW90aWVudC5cclxuICAgICAgICAgICAgY29uc3QgZGl2ID0gTWF0aC5yb3VuZCgobiAtIChuICUgZCkpIC8gZCk7XHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgcmVtYWluZGVyIGJ5IGNhbGN1bGF0aW5nIGByZW0gPSBuIC0gZCpkaXZgXHJcbiAgICAgICAgICAgIHJlbXMucHVzaChzY2FsZUV4cGFuc2lvbihELCBkaXYpKTsgLy8gZXhhY3RcclxuICAgICAgICAgICAgaWYgKGRpdiA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGl2cy5wdXNoKGRpdik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE4gPSBlQ29tcHJlc3MoZURpZmYoTiwgZVN1bShyZW1zKSkpO1xyXG4gICAgICAgIGlmIChvbGRMZW4gPT09IGRpdnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvbGRMZW4gPSBkaXZzLmxlbmd0aDtcclxuICAgIH1cclxuICAgIGxldCByZW0gPSBOO1xyXG4gICAgbGV0IGRpdiA9IFswXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGl2cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGRpdiA9IGdyb3dFeHBhbnNpb24oZGl2LCBkaXZzW2ldKTtcclxuICAgIH1cclxuICAgIGRpdiA9IGVDb21wcmVzcyhkaXYpO1xyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBmaXggc2lnbnMgKHBvc3NpYmx5KVxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvL2NvbnN0IHNpZ25EaXYgPSBzaWduKGRpdltkaXYubGVuZ3RoLTFdKTtcclxuICAgIGNvbnN0IHNpZ25SZW0gPSBzaWduKHJlbVtyZW0ubGVuZ3RoIC0gMV0pO1xyXG4gICAgLy9jb25zdCBzaWduTkQgPSBzaWduTiAqIHNpZ25EO1xyXG4gICAgLy8gV2UgbXVzdCBoYXZlOlxyXG4gICAgLy8gc2lnbihkaXYpID09PSBzaWduKG4pICogc2lnbihkKVxyXG4gICAgLy8gc2lnbihyZW0pID09PSBzaWduKG4pXHJcbiAgICAvLyBBdCB0aGlzIHBvaW50OiBgc2lnbk4gIT09IDBgIGFuZCBgc2lnbkQgIT09IDBgXHJcbiAgICBpZiAoc2lnblJlbSAhPT0gMCAmJiBzaWduUmVtICE9PSBzaWduTikge1xyXG4gICAgICAgIGlmIChzaWduTiA+IDApIHtcclxuICAgICAgICAgICAgaWYgKHNpZ25EID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gZGl2ID0gZGl2IC0gMSAgKGRpdiBpcyBwb3NpdGl2ZSlcclxuICAgICAgICAgICAgICAgIC8vIHJlbSA9IHJlbSArIERcclxuICAgICAgICAgICAgICAgIGRpdiA9IGdyb3dFeHBhbnNpb24oZGl2LCAtMSk7XHJcbiAgICAgICAgICAgICAgICByZW0gPSBmYXN0RXhwYW5zaW9uU3VtKHJlbSwgRCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBkaXYgPSBkaXYgKyAxICAoZGl2IGlzIHBvc2l0aXZlKVxyXG4gICAgICAgICAgICAgICAgLy8gcmVtID0gcmVtIC0gRFxyXG4gICAgICAgICAgICAgICAgZGl2ID0gZ3Jvd0V4cGFuc2lvbihkaXYsICsxKTtcclxuICAgICAgICAgICAgICAgIHJlbSA9IGZhc3RFeHBhbnNpb25TdW0ocmVtLCBlTmVnYXRpdmVPZihEKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc2lnbk4gPCAwKSB7XHJcbiAgICAgICAgICAgIGlmIChzaWduRCA+IDApIHtcclxuICAgICAgICAgICAgICAgIC8vIGRpdiA9IGRpdiArIDEgKGRpdiBpcyBuZWdhdGl2ZSlcclxuICAgICAgICAgICAgICAgIC8vIHJlbSA9IHJlbSAtIERcclxuICAgICAgICAgICAgICAgIGRpdiA9IGdyb3dFeHBhbnNpb24oZGl2LCArMSk7XHJcbiAgICAgICAgICAgICAgICByZW0gPSBmYXN0RXhwYW5zaW9uU3VtKHJlbSwgZU5lZ2F0aXZlT2YoRCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gZGl2ID0gZGl2IC0gMSAgKGRpdiBpcyBwb3NpdGl2ZSlcclxuICAgICAgICAgICAgICAgIC8vIHJlbSA9IHJlbSArIERcclxuICAgICAgICAgICAgICAgIGRpdiA9IGdyb3dFeHBhbnNpb24oZGl2LCAtMSk7XHJcbiAgICAgICAgICAgICAgICByZW0gPSBmYXN0RXhwYW5zaW9uU3VtKHJlbSwgRCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4geyBkaXYsIHJlbSB9O1xyXG59XHJcbmV4cG9ydCB7IGVMb25nRGl2aWRlIH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWUtbG9uZy1kaXZpZGUuanMubWFwIiwiLyoqXHJcbiAqIFJldHVybnMgdGhlIHJlc3VsdCBvZiBtdWx0aXBseWluZyBhIGZsb2F0aW5nIHBvaW50IGV4cGFuc2lvbiBieSAyLlxyXG4gKiAqICoqZXJyb3IgZnJlZSoqXHJcbiAqICogc2VlIFtTaGV3Y2h1a10oaHR0cHM6Ly9wZW9wbGUuZWVjcy5iZXJrZWxleS5lZHUvfmpycy9wYXBlcnMvcm9idXN0ci5wZGYpXHJcbiAqXHJcbiAqIEBwYXJhbSBlIGEgZmxvYXRpbmcgcG9pbnQgZXhwYW5zaW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBlTXVsdEJ5MihlKSB7XHJcbiAgICBjb25zdCBlXyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZV8ucHVzaCgyICogZVtpXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZV87XHJcbn1cclxuZXhwb3J0IHsgZU11bHRCeTIgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZS1tdWx0LWJ5LTIuanMubWFwIiwiLyoqXHJcbiAqIE11bHRpcGx5IGEgZmxvYXRpbmcgcG9pbnQgZXhwYW5zaW9uIGJ5IC0yLlxyXG4gKiAqICoqZXJyb3IgZnJlZSoqXHJcbiAqICogc2VlIFtTaGV3Y2h1a10oaHR0cHM6Ly9wZW9wbGUuZWVjcy5iZXJrZWxleS5lZHUvfmpycy9wYXBlcnMvcm9idXN0ci5wZGYpXHJcbiAqXHJcbiAqIEBwYXJhbSBlIGEgZmxvYXRpbmcgcG9pbnQgZXhwYW5zaW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBlTXVsdEJ5TmVnMihlKSB7XHJcbiAgICBjb25zdCBlXyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZV8ucHVzaCgtMiAqIGVbaV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVfO1xyXG59XHJcbmV4cG9ydCB7IGVNdWx0QnlOZWcyIH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWUtbXVsdC1ieS1uZWctMi5qcy5tYXAiLCIvKipcclxuICogUmV0dXJucyB0aGUgbmVnYXRpdmUgb2YgdGhlIGdpdmVuIGZsb2F0aW5nIHBvaW50IGV4cGFuc2lvbi5cclxuICogKiBzZWUgW1NoZXdjaHVrXShodHRwczovL3Blb3BsZS5lZWNzLmJlcmtlbGV5LmVkdS9+anJzL3BhcGVycy9yb2J1c3RyLnBkZilcclxuICpcclxuICogQHBhcmFtIGUgYSBmbG9hdGluZyBwb2ludCBleHBhbnNpb25cclxuICovXHJcbmZ1bmN0aW9uIGVOZWdhdGl2ZU9mKGUpIHtcclxuICAgIGNvbnN0IG0gPSBlLmxlbmd0aDtcclxuICAgIGNvbnN0IGggPSBuZXcgQXJyYXkobSk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG07IGkrKykge1xyXG4gICAgICAgIGhbaV0gPSAtZVtpXTtcclxuICAgIH1cclxuICAgIHJldHVybiBoO1xyXG59XHJcbmV4cG9ydCB7IGVOZWdhdGl2ZU9mIH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWUtbmVnYXRpdmUtb2YuanMubWFwIiwiaW1wb3J0IHsgZXhwYW5zaW9uUHJvZHVjdCB9IGZyb20gXCIuL2V4cGFuc2lvbi1wcm9kdWN0LmpzXCI7XHJcbmltcG9ydCB7IHR3b1Byb2R1Y3QgfSBmcm9tIFwiLi4vYmFzaWMvdHdvLXByb2R1Y3QuanNcIjtcclxuaW1wb3J0IHsgc2NhbGVFeHBhbnNpb24gfSBmcm9tIFwiLi9zY2FsZS1leHBhbnNpb24uanNcIjtcclxuaW1wb3J0IHsgZUNvbXByZXNzIH0gZnJvbSBcIi4vZS1jb21wcmVzcy5qc1wiO1xyXG4vLyBXZSAqaGF2ZSogdG8gZG8gdGhlIGJlbG934p2XIFRoZSBhc3NpZ25lZSBpcyBhIGdldHRlcuKdlyBUaGUgYXNzaWduZWQgaXMgYSBwdXJlIGZ1bmN0aW9u4p2XXHJcbmNvbnN0IG11bHQgPSBleHBhbnNpb25Qcm9kdWN0O1xyXG5jb25zdCB0cCA9IHR3b1Byb2R1Y3Q7XHJcbmNvbnN0IG11bHRCeURvdWJsZSA9IHNjYWxlRXhwYW5zaW9uO1xyXG5jb25zdCBjb21wcmVzcyA9IGVDb21wcmVzcztcclxuLyoqXHJcbiAqIFJldHVybiB0aGUgcmVzdWx0IG9mIG11bHRpcGx5aW5nIHRvZ2V0aGVyIGFuIGFycmF5IG9mIGZsb2F0aW5nIHBvaW50XHJcbiAqIGV4cGFuc2lvbnMuXHJcbiAqXHJcbiAqICogVGhlIHJlc3VsdCBpcyBleGFjdCBpbiB0aGUgZm9ybSBvZiBhIG5vbi1vdmVybGFwcGluZyBmbG9hdGluZyBwb2ludFxyXG4gKiBleHBhbnNpb24uXHJcbiAqXHJcbiAqICogc2VlIFtTaGV3Y2h1a10oaHR0cHM6Ly9wZW9wbGUuZWVjcy5iZXJrZWxleS5lZHUvfmpycy9wYXBlcnMvcm9idXN0ci5wZGYpXHJcbiAqXHJcbiAqIEBwYXJhbSB0ZXJtcyBhbiBhcnJheSBvZiBtdWx0aXBsaWNhbmRzXHJcbiAqL1xyXG5mdW5jdGlvbiBlUHJvZHVjdCh0ZXJtKSB7XHJcbiAgICBsZXQgcHJvZHVjdCA9IHRlcm1bMF07XHJcbiAgICBmb3IgKGxldCBqID0gMTsgaiA8IHRlcm0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICBjb25zdCBtdWx0aXBsaWNhbnQgPSB0ZXJtW2pdO1xyXG4gICAgICAgIGlmIChtdWx0aXBsaWNhbnQubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgaWYgKHByb2R1Y3QubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0ID0gdHAocHJvZHVjdFswXSwgbXVsdGlwbGljYW50WzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3QgPSBtdWx0QnlEb3VibGUocHJvZHVjdCwgbXVsdGlwbGljYW50WzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChwcm9kdWN0Lmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICBwcm9kdWN0ID0gbXVsdEJ5RG91YmxlKG11bHRpcGxpY2FudCwgcHJvZHVjdFswXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwcm9kdWN0ID0gbXVsdChtdWx0aXBsaWNhbnQsIHByb2R1Y3QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjb21wcmVzcyhwcm9kdWN0KTtcclxuICAgIC8vcmV0dXJuIHByb2R1Y3Q7XHJcbn1cclxuZXhwb3J0IHsgZVByb2R1Y3QgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZS1wcm9kdWN0LmpzLm1hcCIsImltcG9ydCB7IGVMb25nRGl2aWRlIGFzIGVMb25nRGl2aWRlXyB9IGZyb20gXCIuL2UtbG9uZy1kaXZpZGUuanNcIjtcclxuLy8gV2UgKmhhdmUqIHRvIGRvIHRoZSBiZWxvd+KdlyBUaGUgYXNzaWduZWUgaXMgYSBnZXR0ZXLinZcgVGhlIGFzc2lnbmVkIGlzIGEgcHVyZSBmdW5jdGlvbuKdl1xyXG5jb25zdCBlTG9uZ0RpdmlkZSA9IGVMb25nRGl2aWRlXztcclxuLyoqXHJcbiAqIFJldHVybnMgYSAlIGJcclxuICpcclxuICogKiAqKnByZWNvbmRpdGlvbjoqKiBhIGFuZCBiIG11c3QgYmUgaW50ZWdlcnMsIGIgIT09IDBcclxuICovXHJcbmZ1bmN0aW9uIGVSZW0oYSwgYikge1xyXG4gICAgcmV0dXJuIGVMb25nRGl2aWRlKGEsIGIpLnJlbTtcclxufVxyXG5leHBvcnQgeyBlUmVtIH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWUtcmVtLmpzLm1hcCIsIi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBzaWduIG9mIHRoZSBnaXZlbiBleHBhbnNpb24uXHJcbiAqXHJcbiAqICogc2VlIFtTaGV3Y2h1a10oaHR0cHM6Ly9wZW9wbGUuZWVjcy5iZXJrZWxleS5lZHUvfmpycy9wYXBlcnMvcm9idXN0ci5wZGYpXHJcbiAqXHJcbiAqIEZyb20gU2hld2NodWs6IFwiQSBub25vdmVybGFwcGluZyBleHBhbnNpb24gaXMgZGVzaXJhYmxlIGJlY2F1c2UgaXQgaXMgZWFzeSB0b1xyXG4gKiBkZXRlcm1pbmUgaXRzIHNpZ24gKHRha2UgdGhlIHNpZ24gb2YgdGhlIGxhcmdlc3QgY29tcG9uZW50KSAuLi4gXCJcclxuICpcclxuICogQHBhcmFtIGUgQSBmbG9hdGluZyBwb2ludCBleHBhbnNpb24gd2l0aCB6ZXJvZXMgZWxpbWluYXRlZC5cclxuICovXHJcbmZ1bmN0aW9uIGVTaWduKGUpIHtcclxuICAgIHJldHVybiBlW2UubGVuZ3RoIC0gMV07XHJcbn1cclxuZXhwb3J0IHsgZVNpZ24gfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZS1zaWduLmpzLm1hcCIsImltcG9ydCB7IHR3b1N1bSB9IGZyb20gXCIuLi9iYXNpYy90d28tc3VtLmpzXCI7XHJcbmltcG9ydCB7IGdyb3dFeHBhbnNpb24gfSBmcm9tIFwiLi9ncm93LWV4cGFuc2lvbi5qc1wiO1xyXG5pbXBvcnQgeyBmYXN0RXhwYW5zaW9uU3VtIH0gZnJvbSBcIi4vZmFzdC1leHBhbnNpb24tc3VtLmpzXCI7XHJcbi8vIFdlICpoYXZlKiB0byBkbyB0aGUgYmVsb3finZcgVGhlIGFzc2lnbmVlIGlzIGEgZ2V0dGVy4p2XIFRoZSBhc3NpZ25lZCBpcyBhIHB1cmUgZnVuY3Rpb27inZdcclxuY29uc3QgdHMgPSB0d29TdW07XHJcbmNvbnN0IGFkZERvdWJsZSA9IGdyb3dFeHBhbnNpb247XHJcbmNvbnN0IGFkZCA9IGZhc3RFeHBhbnNpb25TdW07XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSByZXN1bHQgb2Ygc3VtbWluZyBhbiBhcnJheSBvZiBmbG9hdGluZyBwb2ludCBleHBhbnNpb25zLlxyXG4gKlxyXG4gKiAqIFRoZSByZXN1bHQgaXMgZXhhY3QgaW4gdGhlIGZvcm0gb2YgYSBub24tb3ZlcmxhcHBpbmcgZmxvYXRpbmcgcG9pbnRcclxuICogZXhwYW5zaW9uLlxyXG4gKlxyXG4gKiAqIHNlZSBbU2hld2NodWtdKGh0dHBzOi8vcGVvcGxlLmVlY3MuYmVya2VsZXkuZWR1L35qcnMvcGFwZXJzL3JvYnVzdHIucGRmKVxyXG4gKlxyXG4gKiBAcGFyYW0gdGVybXMgQW4gYXJyYXkgb2YgbnVtYmVycyB0byBiZSBzdW1tZWQ7IEEgdGVybSBpcyByZXByZXNlbnRlZCBieSBhXHJcbiAqIGZsb2F0aW5nIHBvaW50IGV4cGFuc2lvbi5cclxuICovXHJcbi8vIFRoZSB0ZXJtcyBwYXJhbWV0ZXIgd2VyZSBjaG9zZW4gdG8gYWx3YXlzIGJlIGV4cGFuc2lvbnMgaW4gb3JkZXIgdG8ga2VlcCB0aGUgXHJcbi8vIGZ1bmN0aW9uIG1vbm9tb3JoaWMsIGJ1dCB3aGV0aGVyIGl0J3MgcmVhbGx5IHdvcnRoIGl0IEkgYW0gbm90IHN1cmUuXHJcbmZ1bmN0aW9uIGVTdW0odGVybXMpIHtcclxuICAgIGxldCB0b3RhbCA9IFswXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGVybXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCB0ZXJtID0gdGVybXNbaV07XHJcbiAgICAgICAgLy8gYWRkXHJcbiAgICAgICAgaWYgKHRlcm0ubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIGlmICh0b3RhbC5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRvdGFsID0gdHModG90YWxbMF0sIHRlcm1bMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdG90YWwgPSBhZGREb3VibGUodG90YWwsIHRlcm1bMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodG90YWwubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0b3RhbCA9IGFkZERvdWJsZSh0ZXJtLCB0b3RhbFswXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0b3RhbCA9IGFkZCh0b3RhbCwgdGVybSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG90YWw7XHJcbn1cclxuZXhwb3J0IHsgZVN1bSB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1lLXN1bS5qcy5tYXAiLCJpbXBvcnQgeyBlU2lnbiB9IGZyb20gXCIuL2Utc2lnbi5qc1wiO1xyXG5pbXBvcnQgeyBtc2JFeHBvbmVudCB9IGZyb20gXCIuLi9kb3VibGUtcmVwcmVzZW50YXRpb24vbXNiLWV4cG9uZW50LmpzXCI7XHJcbmltcG9ydCB7IGVDb21wcmVzcyB9IGZyb20gXCIuL2UtY29tcHJlc3MuanNcIjtcclxuaW1wb3J0IHsgcmVkdWNlU2lnbmlmaWNhbmQgfSBmcm9tIFwiLi4vYmFzaWMvcmVkdWNlLXNpZ25pZmljYW5kLmpzXCI7XHJcbi8vIFdlICpoYXZlKiB0byBkbyB0aGUgYmVsb3finZcgVGhlIGFzc2lnbmVlIGlzIGEgZ2V0dGVy4p2XIFRoZSBhc3NpZ25lZCBpcyBhIHB1cmUgZnVuY3Rpb27inZdcclxuY29uc3Qgc2lnbiA9IGVTaWduO1xyXG5jb25zdCBjb21wcmVzcyA9IGVDb21wcmVzcztcclxuLyoqXHJcbiAqIFJldHVybnMgYSBmbG9hdGluZyBwb2ludCBleHBhbnNpb24gYWNjdXJhdGUgdG8gdGhlIGdpdmVuIG51bWJlciBvZiBiaXRzLlxyXG4gKiBFeHRyYW5lb3VzIGJpdHMgYXJlIGRpc2NhcmRlZC5cclxuICogQHBhcmFtIGEgYSBmbG9hdGluZyBwb2ludCBleHBhbnNpb25cclxuICogQHBhcmFtIGwgdGhlIG51bWJlciBvZiBhY2N1cmF0ZSBiaXRzIHRvIGtlZXBcclxuICovXHJcbi8vIFRPRE8gLSBtYWtlIGZhc3RlclxyXG5mdW5jdGlvbiBlVG9CaXRsZW5ndGgoYSwgbCkge1xyXG4gICAgYSA9IGNvbXByZXNzKGEpO1xyXG4gICAgaWYgKHNpZ24oYSkgPT09IDApIHtcclxuICAgICAgICByZXR1cm4gWzBdO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbWF4TXNiID0gbXNiRXhwb25lbnQoYVthLmxlbmd0aCAtIDFdKTtcclxuICAgIGxldCBtc2IgPSBtYXhNc2I7XHJcbiAgICBsZXQgaSA9IGEubGVuZ3RoIC0gMTsgLy8gc3RhcnQgYXQgbW9zdCBzaWduaWZpY2FudCBieXRlXHJcbiAgICB3aGlsZSAoaSA+IDApIHtcclxuICAgICAgICBjb25zdCBtc2JfID0gbXNiRXhwb25lbnQoYVtpIC0gMV0pO1xyXG4gICAgICAgIGlmIChtYXhNc2IgLSBtc2JfID4gbCkge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbXNiID0gbXNiXztcclxuICAgICAgICBpLS07XHJcbiAgICB9XHJcbiAgICBjb25zdCBrZWVwQml0cyA9IE1hdGgubWluKGwgLSAobWF4TXNiIC0gbXNiKSwgNTMpO1xyXG4gICAgbGV0IGIgPSBhW2ldO1xyXG4gICAgYiA9IHJlZHVjZVNpZ25pZmljYW5kKGIsIGtlZXBCaXRzKTtcclxuICAgIGNvbnN0IHJlc3VsdCA9IGEuc2xpY2UoaSk7XHJcbiAgICByZXN1bHRbMF0gPSBiO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5leHBvcnQgeyBlVG9CaXRsZW5ndGggfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZS10by1iaXRsZW5ndGguanMubWFwIiwiaW1wb3J0IHsgZUNvbXByZXNzIH0gZnJvbSBcIi4vZS1jb21wcmVzcy5qc1wiO1xyXG4vLyBXZSAqaGF2ZSogdG8gZG8gdGhlIGJlbG934p2XIFRoZSBhc3NpZ25lZSBpcyBhIGdldHRlcuKdlyBUaGUgYXNzaWduZWQgaXMgYSBwdXJlIGZ1bmN0aW9u4p2XXHJcbmNvbnN0IGNvbXByZXNzID0gZUNvbXByZXNzO1xyXG4vKipcclxuICogUmV0dXJucyB0aGUgcmVzdWx0IG9mIGNvbnZlcnRpbmcgYSBmbG9hdGluZyBwb2ludCBleHBhbnNpb24gdG8gYVxyXG4gKiBkb3VibGUtZG91YmxlIHByZWNpc2lvbiBmbG9hdGluZyBwb2ludCBudW1iZXIuXHJcbiAqL1xyXG5mdW5jdGlvbiBlVG9EZChlKSB7XHJcbiAgICBlID0gY29tcHJlc3MoZSk7XHJcbiAgICBjb25zdCBsZW4gPSBlLmxlbmd0aDtcclxuICAgIGlmIChsZW4gPT09IDIpIHtcclxuICAgICAgICByZXR1cm4gZTsgLy8gYWxyZWFkeSBhIGRvdWJsZS1kb3VibGVcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGxlbiA9PT0gMSkge1xyXG4gICAgICAgIHJldHVybiBbMCwgZVswXV07IC8vIGRvdWJsZS1kb3VibGVzIGhhdmUgYSBmaXhlZCBsZW5ndGggb2YgMlxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtlW2xlbiAtIDJdLCBlW2xlbiAtIDFdXTsgLy8gcmV0dXJuIG9ubHkgbW9zdCBzaWduaWZpY2FudCBwYXJ0c1xyXG59XHJcbmV4cG9ydCB7IGVUb0RkIH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWUtdG8tZG91YmxlLWRvdWJsZS5qcy5tYXAiLCJpbXBvcnQgeyBmYXN0RXhwYW5zaW9uU3VtIH0gZnJvbSBcIi4vZmFzdC1leHBhbnNpb24tc3VtLmpzXCI7XHJcbmltcG9ydCB7IHNjYWxlRXhwYW5zaW9uIH0gZnJvbSBcIi4vc2NhbGUtZXhwYW5zaW9uLmpzXCI7XHJcbmltcG9ydCB7IGVDb21wcmVzcyB9IGZyb20gXCIuL2UtY29tcHJlc3MuanNcIjtcclxuLy8gV2UgKmhhdmUqIHRvIGRvIHRoZSBiZWxvd+KdlyBUaGUgYXNzaWduZWUgaXMgYSBnZXR0ZXLinZcgVGhlIGFzc2lnbmVkIGlzIGEgcHVyZSBmdW5jdGlvbuKdl1xyXG5jb25zdCBtdWx0QnlEb3VibGUgPSBzY2FsZUV4cGFuc2lvbjtcclxuY29uc3QgYWRkID0gZmFzdEV4cGFuc2lvblN1bTtcclxuY29uc3QgY29tcHJlc3MgPSBlQ29tcHJlc3M7XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBwcm9kdWN0IG9mIHR3byBkb3VibGUgZmxvYXRpbmcgcG9pbnQgZXhwYW5zaW9ucy5cclxuICpcclxuICogKiBzZWUgW1NoZXdjaHVrXShodHRwczovL3Blb3BsZS5lZWNzLmJlcmtlbGV5LmVkdS9+anJzL3BhcGVycy9yb2J1c3RyLnBkZilcclxuICpcclxuICogQXMgcGVyIFNoZXdjaHVrIGluIHRoZSBhYm92ZSBwYXBlcjogXCJUbyBmaW5kIHRoZSBwcm9kdWN0IG9mIHR3byBleHBhbnNpb25zXHJcbiAqIGUgYW5kIGYsIHVzZSBTQ0FMRS1FWFBBTlNJT04gKHdpdGggemVybyBlbGltaW5hdGlvbikgdG8gZm9ybSB0aGUgZXhwYW5zaW9uc1xyXG4gKiBlZl8xLCBlZl8yLCAuLi4sIHRoZW4gc3VtIHRoZXNlIHVzaW5nIGEgZGlzdGlsbGF0aW9uIHRyZWUuXCJcclxuICpcclxuICogQSBkaXN0aWxsYXRpb24gdHJlZSB1c2VkIHdpdGggZmFzdEV4cGFuc2lvblN1bSB3aWxsIGdpdmUgTyhrKmxvZyBrKSB2cyBPKGteMilcclxuICogb3BlcmF0aW9ucy5cclxuICpcclxuICogSW1wbGVtZW50ZWQgbmFpdmVseSBhbmQgbm90IGFzIGRlc2NyaWJlZCBieSBTaGV3Y2h1ayAoaS5lLiB0aGUgYWxnb3JpdGhtXHJcbiAqIHRha2VzIE8oa14yKSBvcGVyYXRpb25zKS5cclxuICogQHBhcmFtIGUgYSBkb3VibGUgZmxvYXRpbmcgcG9pbnQgZXhwYW5zaW9uXHJcbiAqIEBwYXJhbSBmIGFub3RoZXIgZG91YmxlIGZsb2F0aW5nIHBvaW50IGV4cGFuc2lvblxyXG4gKi9cclxuZnVuY3Rpb24gZXhwYW5zaW9uUHJvZHVjdChlLCBmKSB7XHJcbiAgICBsZXQgc3VtID0gWzBdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgc3VtID0gYWRkKHN1bSwgbXVsdEJ5RG91YmxlKGYsIGVbaV0pKTtcclxuICAgIH1cclxuICAgIC8vcmV0dXJuIGNvbXByZXNzKHN1bSk7XHJcbiAgICByZXR1cm4gc3VtO1xyXG59XHJcbmV4cG9ydCB7IGV4cGFuc2lvblByb2R1Y3QgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXhwYW5zaW9uLXByb2R1Y3QuanMubWFwIiwiaW1wb3J0IHsgZUNvbXByZXNzIH0gZnJvbSBcIi4vZS1jb21wcmVzcy5qc1wiO1xyXG4vLyBXZSAqaGF2ZSogdG8gZG8gdGhlIGJlbG934p2XIFRoZSBhc3NpZ25lZSBpcyBhIGdldHRlcuKdlyBUaGUgYXNzaWduZWQgaXMgYSBwdXJlIGZ1bmN0aW9u4p2XXHJcbmNvbnN0IGNvbXByZXNzID0gZUNvbXByZXNzO1xyXG4vKipcclxuICogUmV0dXJucyB0aGUgcmVzdWx0IG9mIGFkZGluZyB0d28gZXhwYW5zaW9ucy5cclxuICpcclxuICogVGhlb3JlbSAxMzogTGV0IGUgPSBzdW1fKGk9MSlebShlX2kpIGFuZCBmID0gc3VtXyhpPTEpXm4oZl9pKSBiZSBzdHJvbmdseVxyXG4gKiBub25vdmVybGFwcGluZyBleHBhbnNpb25zIG9mIG0gYW5kIG4gcC1iaXQgY29tcG9uZW50cywgcmVzcGVjdGl2ZWx5LCB3aGVyZVxyXG4gKiBwID49IDQuIFN1cHBvc2UgdGhhdCB0aGUgY29tcG9uZW50cyBvZiBib3RoIGUgYW5kIGYgYXJlIHNvcnRlZCBpbiBvcmRlciBvZlxyXG4gKiBpbmNyZWFzaW5nIG1hZ25pdHVkZSwgZXhjZXB0IHRoYXQgYW55IG9mIHRoZSBlX2kgb3IgZl9pIG1heSBiZSB6ZXJvLiBPbiBhXHJcbiAqIG1hY2hpbmUgd2hvc2UgYXJpdGhtZXRpYyB1c2VzIHRoZSByb3VuZC10by1ldmVuIHJ1bGUsIHRoZSBmb2xsb3dpbmcgYWxnb3JpdGhtXHJcbiAqIHdpbGwgcHJvZHVjZSBhIHN0cm9uZ2x5IG5vbm92ZXJsYXBwaW5nIGV4cGFuc2lvbiBoIHN1Y2ggdGhhdFxyXG4gKiBzdW1fKGk9MSleKG0rbikoZV9pICsgZl9pKSA9IGUgKyBmLCB3aGVyZSB0aGUgY29tcG9uZW50cyBvZiBoIGFyZSBhbHNvIGluXHJcbiAqIG9yZGVyIG9mIGluY3JlYXNpbmcgbWFnbml0dWRlLCBleGNlcHQgdGhhdCBhbnkgb2YgdGhlIGhfaSBtYXkgYmUgemVyby5cclxuICpcclxuICogU2VlIGh0dHBzOi8vcGVvcGxlLmVlY3MuYmVya2VsZXkuZWR1L35qcnMvcGFwZXJzL3JvYnVzdHIucGRmXHJcbiAqL1xyXG5mdW5jdGlvbiBmYXN0RXhwYW5zaW9uU3VtKGUsIGYpIHtcclxuICAgIC8vY29uc3QgZyA9IG1lcmdlKGUsZik7XHJcbiAgICAvLyBpbmxpbmVkIChhYm92ZSBsaW5lKVxyXG4gICAgY29uc3QgbGVuRSA9IGUubGVuZ3RoO1xyXG4gICAgY29uc3QgbGVuRiA9IGYubGVuZ3RoO1xyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgbGV0IGogPSAwO1xyXG4gICAgY29uc3QgZyA9IFtdO1xyXG4gICAgd2hpbGUgKGkgPCBsZW5FICYmIGogPCBsZW5GKSB7XHJcbiAgICAgICAgaWYgKGVbaV0gPT09IDApIHtcclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGZbal0gPT09IDApIHtcclxuICAgICAgICAgICAgaisrO1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE1hdGguYWJzKGVbaV0pIDw9IE1hdGguYWJzKGZbal0pKSB7XHJcbiAgICAgICAgICAgIGcucHVzaChlW2ldKTtcclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZy5wdXNoKGZbal0pO1xyXG4gICAgICAgICAgICBqKys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgd2hpbGUgKGkgPCBsZW5FKSB7XHJcbiAgICAgICAgZy5wdXNoKGVbaV0pO1xyXG4gICAgICAgIGkrKztcclxuICAgIH1cclxuICAgIHdoaWxlIChqIDwgbGVuRikge1xyXG4gICAgICAgIGcucHVzaChmW2pdKTtcclxuICAgICAgICBqKys7XHJcbiAgICB9XHJcbiAgICBpZiAoZy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4gWzBdO1xyXG4gICAgfVxyXG4gICAgLy8gZW5kIGlubGluZWRcclxuICAgIGNvbnN0IGxlbiA9IGcubGVuZ3RoO1xyXG4gICAgaWYgKGxlbiA9PT0gMSkge1xyXG4gICAgICAgIHJldHVybiBnO1xyXG4gICAgfVxyXG4gICAgLy9jb25zdCBoOiBudW1iZXJbXSA9IG5ldyBBcnJheShsZW4pO1xyXG4gICAgY29uc3QgaCA9IFtdO1xyXG4gICAgLy9jb25zdCBxOiBudW1iZXI7XHJcbiAgICAvL1toWzBdLCBxXSA9IGZhc3RUd29TdW0oZ1sxXSwgZ1swXSk7XHJcbiAgICAvLyBpbmxpbmVkIChhYm92ZSBsaW5lKVxyXG4gICAgY29uc3QgYSA9IGdbMV07XHJcbiAgICBjb25zdCBiID0gZ1swXTtcclxuICAgIGxldCBxID0gYSArIGI7XHJcbiAgICAvL2hbMF0gPSBiIC0gKHEgLSBhKTtcclxuICAgIGNvbnN0IGhoID0gYiAtIChxIC0gYSk7XHJcbiAgICBpZiAoaGggIT09IDApIHtcclxuICAgICAgICBoLnB1c2goaGgpO1xyXG4gICAgfVxyXG4gICAgLy9sZXQgaiA9IDA7XHJcbiAgICBqID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAyOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAvL1toW2ktMV0sIHFdID0gdHdvU3VtKHEsIGdbaV0pO1xyXG4gICAgICAgIC8vIGlubGluZWQgKGFib3ZlIGxpbmUpXHJcbiAgICAgICAgY29uc3QgYiA9IGdbaV07XHJcbiAgICAgICAgY29uc3QgUiA9IHEgKyBiO1xyXG4gICAgICAgIGNvbnN0IF8gPSBSIC0gcTtcclxuICAgICAgICAvL2hbaS0xXSA9IChxIC0gKFIgLSBfKSkgKyAoYiAtIF8pO1xyXG4gICAgICAgIGNvbnN0IGhoID0gKHEgLSAoUiAtIF8pKSArIChiIC0gXyk7XHJcbiAgICAgICAgaWYgKGhoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGgucHVzaChoaCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHEgPSBSO1xyXG4gICAgfVxyXG4gICAgLy9oW2xlbi0xXSA9IHE7XHJcbiAgICAvL2gucHVzaChxKTtcclxuICAgIGlmIChxICE9PSAwIHx8IGgubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgaC5wdXNoKHEpO1xyXG4gICAgfVxyXG4gICAgLy9yZXR1cm4gY29tcHJlc3MoaCk7XHJcbiAgICByZXR1cm4gaDtcclxufVxyXG4vKipcclxuICogUmV0dXJucyB0aGUgcmVzdWx0IG9mIG1lcmdpbmcgYW4gZXhwYW5zaW9uIGUgYW5kIGYgaW50byBhIHNpbmdsZSBleHBhbnNpb24sXHJcbiAqIGluIG9yZGVyIG9mIG5vbmRlY3JlYXNpbmcgbWFnbml0dWRlIChwb3NzaWJseSB3aXRoIGludGVyc3BlcnNlZCB6ZXJvcykuXHJcbiAqIChUaGlzIGZ1bmN0aW9uIGlzIHplcm8tZWxpbWluYXRpbmcpXHJcbiAqXHJcbiAqICogc2VlIFtTaGV3Y2h1a10oaHR0cHM6Ly9wZW9wbGUuZWVjcy5iZXJrZWxleS5lZHUvfmpycy9wYXBlcnMvcm9idXN0ci5wZGYpXHJcbiAqXHJcbiAqIEBwYXJhbSBlIGEgZmxvYXRpbmcgcG9pbnQgZXhwYW5zaW9uXHJcbiAqIEBwYXJhbSBmIGFub3RoZXIgZmxvYXRpbmcgcG9pbnQgZXhwYW5zaW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBtZXJnZShlLCBmKSB7XHJcbiAgICBjb25zdCBsZW5FID0gZS5sZW5ndGg7XHJcbiAgICBjb25zdCBsZW5GID0gZi5sZW5ndGg7XHJcbiAgICBsZXQgaSA9IDA7XHJcbiAgICBsZXQgaiA9IDA7XHJcbiAgICBjb25zdCBtZXJnZWQgPSBbXTtcclxuICAgIHdoaWxlIChpIDwgbGVuRSAmJiBqIDwgbGVuRikge1xyXG4gICAgICAgIGlmIChlW2ldID09PSAwKSB7XHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmW2pdID09PSAwKSB7XHJcbiAgICAgICAgICAgIGorKztcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChNYXRoLmFicyhlW2ldKSA8PSBNYXRoLmFicyhmW2pdKSkge1xyXG4gICAgICAgICAgICBtZXJnZWQucHVzaChlW2ldKTtcclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbWVyZ2VkLnB1c2goZltqXSk7XHJcbiAgICAgICAgICAgIGorKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB3aGlsZSAoaSA8IGxlbkUpIHtcclxuICAgICAgICBtZXJnZWQucHVzaChlW2ldKTtcclxuICAgICAgICBpKys7XHJcbiAgICB9XHJcbiAgICB3aGlsZSAoaiA8IGxlbkYpIHtcclxuICAgICAgICBtZXJnZWQucHVzaChmW2pdKTtcclxuICAgICAgICBqKys7XHJcbiAgICB9XHJcbiAgICBpZiAobWVyZ2VkLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiBbMF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWVyZ2VkO1xyXG59XHJcbmV4cG9ydCB7IGZhc3RFeHBhbnNpb25TdW0gfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmFzdC1leHBhbnNpb24tc3VtLmpzLm1hcCIsImltcG9ydCB7IGVDb21wcmVzcyB9IGZyb20gXCIuL2UtY29tcHJlc3MuanNcIjtcclxuLy8gV2UgKmhhdmUqIHRvIGRvIHRoZSBiZWxvd+KdlyBUaGUgYXNzaWduZWUgaXMgYSBnZXR0ZXLinZcgVGhlIGFzc2lnbmVkIGlzIGEgcHVyZSBmdW5jdGlvbuKdl1xyXG5jb25zdCBjb21wcmVzcyA9IGVDb21wcmVzcztcclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHJlc3VsdCBvZiBhZGRpbmcgYSBkb3VibGUgdG8gYW4gZXhwYW5zaW9uLlxyXG4gKlxyXG4gKiBMZXQgZSBiZSBhIG5vbm92ZXJsYXBwaW5nIGV4cGFuc2lvbiBvZiBtIHAtYml0IGNvbXBvbmVudHMsIGFuZCBsZXQgYiBiZSBhXHJcbiAqIHAtYml0IHZhbHVlIHdoZXJlIHAgPj0gMy4gU3VwcG9zZSB0aGF0IHRoZSBjb21wb25lbnRzIGVfMSwgLi4uLCBlX20gYXJlXHJcbiAqIHNvcnRlZCBpbiBvcmRlciBvZiAqaW5jcmVhc2luZyogbWFnbml0dWRlLCBleGNlcHQgdGhhdCBhbnkgb2YgdGhlIGVpIG1heSBiZVxyXG4gKiB6ZXJvLlxyXG4gKiBUaGVuIHRoZSBmb2xsb3dpbmcgYWxnb3JpdGhtIHdpbGwgcHJvZHVjZSBhIG5vbm92ZXJsYXBwaW5nIGV4cGFuc2lvbiBzdWNoXHJcbiAqIHRoYXQgaCA9IHN1bV9pKGhfaSkgPSBlICsgYiwgd2hlcmUgdGhlIGNvbXBvbmVudHMgaF8xLCAuLi4sIGhfKG0rMSkgYXJlIGFsc29cclxuICogaW4gb3JkZXIgb2YgaW5jcmVhc2luZyBtYWduaXR1ZGUsIGV4Y2VwdCB0aGF0IGFueSBvZiB0aGUgaF9pIG1heSBiZSB6ZXJvLlxyXG4gKiBGdXJ0aGVybW9yZSwgaWYgZSBpcyBub25hZGphY2VudCBhbmQgcm91bmQtdG8tZXZlbiB0aWVicmVha2luZyBpcyB1c2VkLCB0aGVuXHJcbiAqIGggaXMgbm9uYWRqYWNlbnQuXHJcbiAqIFNlZSBodHRwczovL3Blb3BsZS5lZWNzLmJlcmtlbGV5LmVkdS9+anJzL3BhcGVycy9yb2J1c3RyLnBkZlxyXG4gKiBAcGFyYW0gZSBBIGZsb2F0aW5nIHBvaW50IGV4cGFuc2lvblxyXG4gKiBAcGFyYW0gYiBBbm90aGVyIGZsb2F0aW5nIHBvaW50IGV4cGFuc2lvblxyXG4gKi9cclxuZnVuY3Rpb24gZ3Jvd0V4cGFuc2lvbihlLCBiKSB7XHJcbiAgICBjb25zdCBtID0gZS5sZW5ndGg7XHJcbiAgICBsZXQgcSA9IGI7XHJcbiAgICAvL2NvbnN0IGg6IG51bWJlcltdID0gbmV3IEFycmF5KG0rMSk7XHJcbiAgICBjb25zdCBoID0gW107XHJcbiAgICAvL2xldCBqID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbTsgaSsrKSB7XHJcbiAgICAgICAgLy8gTm90ZSB0aGUgdXNlIG9mIHR3b1N1bSBhbmQgbm90IGZhc3RUd29TdW0uXHJcbiAgICAgICAgLy9baFtpXSwgcV0gPSB0cyhxLCBlW2ldKTtcclxuICAgICAgICBjb25zdCBlZSA9IGVbaV07XHJcbiAgICAgICAgY29uc3QgeCA9IHEgKyBlZTtcclxuICAgICAgICBjb25zdCBidiA9IHggLSBxO1xyXG4gICAgICAgIGNvbnN0IGhoID0gKHEgLSAoeCAtIGJ2KSkgKyAoZWUgLSBidik7XHJcbiAgICAgICAgaWYgKGhoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGgucHVzaChoaCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHEgPSB4O1xyXG4gICAgfVxyXG4gICAgLy9oW2pdID0gcTtcclxuICAgIGlmIChxICE9PSAwIHx8IGgubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgaC5wdXNoKHEpO1xyXG4gICAgfVxyXG4gICAgLy9yZXR1cm4gY29tcHJlc3MoaCk7XHJcbiAgICByZXR1cm4gaDtcclxufVxyXG5leHBvcnQgeyBncm93RXhwYW5zaW9uIH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdyb3ctZXhwYW5zaW9uLmpzLm1hcCIsImltcG9ydCB7IGlzT3ZlcmxhcHBpbmcgfSBmcm9tIFwiLi9pcy1vdmVybGFwcGluZy5qc1wiO1xyXG4vKipcclxuICogUmV0dXJucyB0cnVlIGlmIHggYW5kIHkgYXJlIGFkamFjZW50LCBmYWxzZSBvdGhlcndpc2UuXHJcbiAqXHJcbiAqICogc2VlIFtTaGV3Y2h1a10oaHR0cHM6Ly9wZW9wbGUuZWVjcy5iZXJrZWxleS5lZHUvfmpycy9wYXBlcnMvcm9idXN0ci5wZGYpXHJcbiAqIGZvciBkZXRhaWxzXHJcbiAqXHJcbiAqIEBwYXJhbSB4IGEgZG91YmxlIGZsb2F0aW5nIHBvaW50IG51bWJlclxyXG4gKiBAcGFyYW0geSBhbm90aGVyIGRvdWJsZSBmbG9hdGluZyBwb2ludCBudW1iZXJcclxuICovXHJcbmZ1bmN0aW9uIGlzQWRqYWNlbnQoeCwgeSkge1xyXG4gICAgcmV0dXJuIGlzT3ZlcmxhcHBpbmcoeCwgeSkgfHxcclxuICAgICAgICBpc092ZXJsYXBwaW5nKHgsIDIgKiB5KSB8fFxyXG4gICAgICAgIGlzT3ZlcmxhcHBpbmcoMiAqIHgsIHkpO1xyXG59XHJcbmV4cG9ydCB7IGlzQWRqYWNlbnQgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXMtYWRqYWNlbnQuanMubWFwIiwiaW1wb3J0IHsgZ2V0TG93ZXN0U2V0Qml0LCBnZXRIaWdoZXN0U2V0Qml0IH0gZnJvbSBcIi4uL2RvdWJsZS1yZXByZXNlbnRhdGlvbi9nZXQtbWF4LXNldC1iaXQuanNcIjtcclxuaW1wb3J0IHsgZXhwb25lbnQgfSBmcm9tIFwiLi4vZG91YmxlLXJlcHJlc2VudGF0aW9uL2V4cG9uZW50LmpzXCI7XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgYSBhbmQgYiBvdmVybGFwcywgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gKlxyXG4gKiBUd28gZmxvYXRpbmctcG9pbnQgdmFsdWVzIHggYW5kIHkgYXJlIG5vbm92ZXJsYXBwaW5nIGlmIHRoZSBsZWFzdCBzaWduaWZpY2FudFxyXG4gKiBub256ZXJvIGJpdCBvZiB4IGlzIG1vcmUgc2lnbmlmaWNhbnQgdGhhbiB0aGUgbW9zdCBzaWduaWZpY2FudCBub256ZXJvIGJpdCBvZlxyXG4gKiB5LlxyXG4gKlxyXG4gKiAqIHNlZSBbU2hld2NodWtdKGh0dHBzOi8vcGVvcGxlLmVlY3MuYmVya2VsZXkuZWR1L35qcnMvcGFwZXJzL3JvYnVzdHIucGRmKVxyXG4gKlxyXG4gKiBJbXBsZW1lbnRlZCBmb3IgdGVzdGluZyBwdXJwb3Nlcy5cclxuICogQHBhcmFtIGEgYSBkb3VibGVcclxuICogQHBhcmFtIGIgYW5vdGhlciBkb3VibGVcclxuICovXHJcbmZ1bmN0aW9uIGlzT3ZlcmxhcHBpbmcoYSwgYikge1xyXG4gICAgcmV0dXJuICFpc05vbk92ZXJsYXBwaW5nKGEsIGIpO1xyXG59XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgYSBhbmQgYiBkb2VzIG5vdCBvdmVybGFwLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAqXHJcbiAqIFR3byBmbG9hdGluZy1wb2ludCB2YWx1ZXMgeCBhbmQgeSBhcmUgbm9ub3ZlcmxhcHBpbmcgaWYgdGhlIGxlYXN0IHNpZ25pZmljYW50XHJcbiAqIG5vbnplcm8gYml0IG9mIHggaXMgbW9yZSBzaWduaWZpY2FudCB0aGFuIHRoZSBtb3N0IHNpZ25pZmljYW50IG5vbnplcm8gYml0IG9mXHJcbiAqIHkuXHJcbiAqXHJcbiAqICogc2VlIFtTaGV3Y2h1a10oaHR0cHM6Ly9wZW9wbGUuZWVjcy5iZXJrZWxleS5lZHUvfmpycy9wYXBlcnMvcm9idXN0ci5wZGYpXHJcbiAqXHJcbiAqIEltcGxlbWVudGVkIGZvciB0ZXN0aW5nIHB1cnBvc2VzLlxyXG4gKlxyXG4gKiBAcGFyYW0gYSBBIGRvdWJsZVxyXG4gKiBAcGFyYW0gYiBBbm90aGVyIGRvdWJsZVxyXG4gKi9cclxuZnVuY3Rpb24gaXNOb25PdmVybGFwcGluZyhhLCBiKSB7XHJcbiAgICBpZiAoYSA9PT0gMCB8fCBiID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAoTWF0aC5hYnMoYikgPiBNYXRoLmFicyhhKSkge1xyXG4gICAgICAgIFthLCBiXSA9IFtiLCBhXTtcclxuICAgIH1cclxuICAgIC8vIEF0IHRoaXMgcG9pbnQgYWJzKGEpID4gYWJzKGIpXHJcbiAgICBjb25zdCBsID0gZ2V0TG93ZXN0U2V0Qml0KGEpO1xyXG4gICAgY29uc3QgaCA9IGdldEhpZ2hlc3RTZXRCaXQoYik7XHJcbiAgICBjb25zdCBzaGlmdCA9IGV4cG9uZW50KGEpIC0gZXhwb25lbnQoYik7XHJcbiAgICByZXR1cm4gKGwgKyBzaGlmdCkgPiBoO1xyXG59XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgYWxsIGNvbXBvbmVudHMgb2YgdGhlIGdpdmVuIGZsb2F0aW5nIHBvaW50IGV4cGFuc2lvbiBpc1xyXG4gKiBub24tb3ZlcmxhcHBpbmcsIGZhbHNlIG90aGVyd2lzZS5cclxuICpcclxuICogKiBzZWUgW1NoZXdjaHVrXShodHRwczovL3Blb3BsZS5lZWNzLmJlcmtlbGV5LmVkdS9+anJzL3BhcGVycy9yb2J1c3RyLnBkZilcclxuICpcclxuICogQHBhcmFtIGUgYSBkb3VibGUgZmxvYXRpbmcgcG9pbnQgZXhwYW5zaW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBpc05vbk92ZXJsYXBwaW5nQWxsKGUpIHtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChpc092ZXJsYXBwaW5nKGVbaSAtIDFdLCBlW2ldKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuZXhwb3J0IHsgaXNPdmVybGFwcGluZywgaXNOb25PdmVybGFwcGluZywgaXNOb25PdmVybGFwcGluZ0FsbCB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pcy1vdmVybGFwcGluZy5qcy5tYXAiLCJpbXBvcnQgeyB0d29Qcm9kdWN0IH0gZnJvbSAnLi4vYmFzaWMvdHdvLXByb2R1Y3QuanMnO1xyXG5pbXBvcnQgeyB0d29TdW0gfSBmcm9tICcuLi9iYXNpYy90d28tc3VtLmpzJztcclxuaW1wb3J0IHsgZmFzdFR3b1N1bSB9IGZyb20gJy4uL2Jhc2ljL2Zhc3QtdHdvLXN1bS5qcyc7XHJcbmltcG9ydCB7IGVDb21wcmVzcyB9IGZyb20gJy4vZS1jb21wcmVzcy5qcyc7XHJcbmNvbnN0IGYgPSAxMzQyMTc3Mjk7IC8vIDIqKjI3ICsgMTtcclxuLy8gV2UgKmhhdmUqIHRvIGRvIHRoZSBiZWxvd+KdlyBUaGUgYXNzaWduZWUgaXMgYSBnZXR0ZXLinZcgVGhlIGFzc2lnbmVkIGlzIGEgcHVyZSBmdW5jdGlvbuKdl1xyXG5jb25zdCB0cCA9IHR3b1Byb2R1Y3Q7XHJcbmNvbnN0IHRzID0gdHdvU3VtO1xyXG5jb25zdCBmdHMgPSBmYXN0VHdvU3VtO1xyXG5jb25zdCBjb21wcmVzcyA9IGVDb21wcmVzcztcclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHJlc3VsdCBvZiBtdWx0aXBseWluZyBhbiBleHBhbnNpb24gYnkgYSBkb3VibGUuXHJcbiAqXHJcbiAqICogc2VlIFtTaGV3Y2h1a10oaHR0cHM6Ly9wZW9wbGUuZWVjcy5iZXJrZWxleS5lZHUvfmpycy9wYXBlcnMvcm9idXN0ci5wZGYpXHJcbiAqXHJcbiAqIFRoZW9yZW0gMTkgKFNod2VjaHVrKTogTGV0IGUgPSBzdW1fKGk9MSlebShlX2kpIGJlIGEgbm9ub3ZlcmxhcHBpbmcgZXhwYW5zaW9uXHJcbiAqIG9mIG0gcC1iaXQgY29tcG9uZW50cywgYW5kIGNvbnN0IGIgYmUgYSBwLWJpdCB2YWx1ZSB3aGVyZSBwID49IDQuIFN1cHBvc2UgdGhhdFxyXG4gKiB0aGUgY29tcG9uZW50cyBvZiBlIGFyZSBzb3J0ZWQgaW4gb3JkZXIgb2YgaW5jcmVhc2luZyBtYWduaXR1ZGUsIGV4Y2VwdCB0aGF0XHJcbiAqIGFueSBvZiB0aGUgZV9pIG1heSBiZSB6ZXJvLiBUaGVuIHRoZSBmb2xsb3dpbmcgYWxnb3JpdGhtIHdpbGwgcHJvZHVjZSBhXHJcbiAqIG5vbm92ZXJsYXBwaW5nIGV4cGFuc2lvbiBoIHN1Y2ggdGhhdCBoID0gc3VtXyhpPTEpXigybSkoaF9pKSA9IGJlLCB3aGVyZSB0aGVcclxuICogY29tcG9uZW50cyBvZiBoIGFyZSBhbHNvIGluIG9yZGVyIG9mIGluY3JlYXNpbmcgbWFnbml0dWRlLCBleGNlcHQgdGhhdCBhbnkgb2ZcclxuICogdGhlIGhfaSBtYXkgYmUgemVyby4gRnVydGhlcm1vcmUsIGlmIGUgaXMgbm9uYWRqYWNlbnQgYW5kIHJvdW5kLXRvLWV2ZW5cclxuICogdGllYnJlYWtpbmcgaXMgdXNlZCwgdGhlbiBoIGlzIG5vbi1hZGphY2VudC5cclxuICpcclxuICogQHBhcmFtIGUgYSBkb3VibGUgZmxvYXRpbmcgcG9pbnQgZXhwYW5zaW9uXHJcbiAqIEBwYXJhbSBiIGEgZG91YmxlXHJcbiAqL1xyXG5mdW5jdGlvbiBzY2FsZUV4cGFuc2lvbihlLCBiKSB7XHJcbiAgICBjb25zdCBtID0gZS5sZW5ndGg7XHJcbiAgICAvL2NvbnN0IGg6IG51bWJlcltdID0gbmV3IEFycmF5KDIqbSk7XHJcbiAgICBsZXQgcV87XHJcbiAgICAvL1toWzBdLCBxXSA9IHRwKGVbMF0sIGIpO1xyXG4gICAgLy8gaW5saW5lZCAoYWJvdmUgbGluZSlcclxuICAgIGNvbnN0IGEgPSBlWzBdO1xyXG4gICAgbGV0IHEgPSBhICogYjtcclxuICAgIGNvbnN0IGMgPSBmICogYTtcclxuICAgIGNvbnN0IGFoID0gYyAtIChjIC0gYSk7XHJcbiAgICBjb25zdCBhbCA9IGEgLSBhaDtcclxuICAgIGNvbnN0IGQgPSBmICogYjtcclxuICAgIGNvbnN0IGJoID0gZCAtIChkIC0gYik7XHJcbiAgICBjb25zdCBibCA9IGIgLSBiaDtcclxuICAgIGNvbnN0IGggPSBbXTtcclxuICAgIC8vaFswXSA9IChhbCpibCkgLSAoKHEgLSAoYWgqYmgpKSAtIChhbCpiaCkgLSAoYWgqYmwpKTtcclxuICAgIGNvbnN0IGhoID0gKGFsICogYmwpIC0gKChxIC0gKGFoICogYmgpKSAtIChhbCAqIGJoKSAtIChhaCAqIGJsKSk7XHJcbiAgICBpZiAoaGggIT09IDApIHtcclxuICAgICAgICBoLnB1c2goaGgpO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBtOyBpKyspIHtcclxuICAgICAgICAvL2NvbnN0IFt0LCBUXSA9IHRwKGVbaV0sIGIpO1xyXG4gICAgICAgIC8vIGlubGluZWQgKGFib3ZlIGxpbmUpXHJcbiAgICAgICAgY29uc3QgYSA9IGVbaV07XHJcbiAgICAgICAgY29uc3QgVCA9IGEgKiBiO1xyXG4gICAgICAgIGNvbnN0IGMgPSBmICogYTtcclxuICAgICAgICBjb25zdCBhaCA9IGMgLSAoYyAtIGEpO1xyXG4gICAgICAgIGNvbnN0IGFsID0gYSAtIGFoO1xyXG4gICAgICAgIGNvbnN0IGQgPSBmICogYjtcclxuICAgICAgICBjb25zdCBiaCA9IGQgLSAoZCAtIGIpO1xyXG4gICAgICAgIGNvbnN0IGJsID0gYiAtIGJoO1xyXG4gICAgICAgIGNvbnN0IHQgPSAoYWwgKiBibCkgLSAoKFQgLSAoYWggKiBiaCkpIC0gKGFsICogYmgpIC0gKGFoICogYmwpKTtcclxuICAgICAgICAvL1toWzIqaS0xXSwgcV9dID0gdHMocSwgdCk7XHJcbiAgICAgICAgLy8gaW5saW5lZCAoYWJvdmUgbGluZSlcclxuICAgICAgICBjb25zdCB4ID0gcSArIHQ7XHJcbiAgICAgICAgY29uc3QgYnYgPSB4IC0gcTtcclxuICAgICAgICAvL2hbMippLTFdID0gKHEgLSAoeCAtIGJ2KSkgKyAodCAtIGJ2KTtcclxuICAgICAgICAvL2gucHVzaCgocSAtICh4IC0gYnYpKSArICh0IC0gYnYpKTtcclxuICAgICAgICBjb25zdCBoaCA9IChxIC0gKHggLSBidikpICsgKHQgLSBidik7XHJcbiAgICAgICAgaWYgKGhoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGgucHVzaChoaCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHFfID0geDtcclxuICAgICAgICAvL1toWzIqaV0sIHFdID0gZnRzKFQsIHFfKTtcclxuICAgICAgICAvLyBpbmxpbmVkIChhYm92ZSBsaW5lKVxyXG4gICAgICAgIGNvbnN0IHh4ID0gVCArIHFfO1xyXG4gICAgICAgIC8vaFsyKmldID0gcV8gLSAoeHggLSBUKTtcclxuICAgICAgICAvL2gucHVzaChxXyAtICh4eCAtIFQpKTtcclxuICAgICAgICBjb25zdCBoaGggPSBxXyAtICh4eCAtIFQpO1xyXG4gICAgICAgIGlmIChoaGggIT09IDApIHtcclxuICAgICAgICAgICAgaC5wdXNoKGhoaCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHEgPSB4eDtcclxuICAgIH1cclxuICAgIC8vaFsyKm0gLSAxXSA9IHE7XHJcbiAgICAvL2gucHVzaChxKTtcclxuICAgIGlmIChxICE9PSAwIHx8IGgubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgaC5wdXNoKHEpO1xyXG4gICAgfVxyXG4gICAgLy9yZXR1cm4gZUNvbXByZXNzKGgpO1xyXG4gICAgcmV0dXJuIGg7XHJcbn1cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHJlc3VsdCBvZiBtdWx0aXBseWluZyBhbiBleHBhbnNpb24gYnkgYSBkb3VibGUuXHJcbiAqXHJcbiAqICogc2VlIFtTaGV3Y2h1a10oaHR0cHM6Ly9wZW9wbGUuZWVjcy5iZXJrZWxleS5lZHUvfmpycy9wYXBlcnMvcm9idXN0ci5wZGYpXHJcbiAqXHJcbiAqIFRoZW9yZW0gMTkgKFNod2VjaHVrKTogTGV0IGUgPSBzdW1fKGk9MSlebShlX2kpIGJlIGEgbm9ub3ZlcmxhcHBpbmcgZXhwYW5zaW9uXHJcbiAqIG9mIG0gcC1iaXQgY29tcG9uZW50cywgYW5kIGNvbnN0IGIgYmUgYSBwLWJpdCB2YWx1ZSB3aGVyZSBwID49IDQuIFN1cHBvc2UgdGhhdFxyXG4gKiB0aGUgY29tcG9uZW50cyBvZiBlIGFyZSBzb3J0ZWQgaW4gb3JkZXIgb2YgaW5jcmVhc2luZyBtYWduaXR1ZGUsIGV4Y2VwdCB0aGF0XHJcbiAqIGFueSBvZiB0aGUgZV9pIG1heSBiZSB6ZXJvLiBUaGVuIHRoZSBmb2xsb3dpbmcgYWxnb3JpdGhtIHdpbGwgcHJvZHVjZSBhXHJcbiAqIG5vbm92ZXJsYXBwaW5nIGV4cGFuc2lvbiBoIHN1Y2ggdGhhdCBoID0gc3VtXyhpPTEpXigybSkoaF9pKSA9IGJlLCB3aGVyZSB0aGVcclxuICogY29tcG9uZW50cyBvZiBoIGFyZSBhbHNvIGluIG9yZGVyIG9mIGluY3JlYXNpbmcgbWFnbml0dWRlLCBleGNlcHQgdGhhdCBhbnkgb2ZcclxuICogdGhlIGhfaSBtYXkgYmUgemVyby4gRnVydGhlcm1vcmUsIGlmIGUgaXMgbm9uYWRqYWNlbnQgYW5kIHJvdW5kLXRvLWV2ZW5cclxuICogdGllYnJlYWtpbmcgaXMgdXNlZCwgdGhlbiBoIGlzIG5vbi1hZGphY2VudC5cclxuICpcclxuICogQHBhcmFtIGUgYSBkb3VibGUgZmxvYXRpbmcgcG9pbnQgZXhwYW5zaW9uXHJcbiAqIEBwYXJhbSBiIGEgZG91YmxlXHJcbiAqL1xyXG5mdW5jdGlvbiBzY2FsZUV4cGFuc2lvbjIoYiwgZSkge1xyXG4gICAgY29uc3QgbSA9IGUubGVuZ3RoO1xyXG4gICAgLy9jb25zdCBoOiBudW1iZXJbXSA9IG5ldyBBcnJheSgyKm0pO1xyXG4gICAgbGV0IHFfO1xyXG4gICAgLy9baFswXSwgcV0gPSB0cChlWzBdLCBiKTtcclxuICAgIC8vIGlubGluZWQgKGFib3ZlIGxpbmUpXHJcbiAgICBjb25zdCBhID0gZVswXTtcclxuICAgIGxldCBxID0gYSAqIGI7XHJcbiAgICBjb25zdCBjID0gZiAqIGE7XHJcbiAgICBjb25zdCBhaCA9IGMgLSAoYyAtIGEpO1xyXG4gICAgY29uc3QgYWwgPSBhIC0gYWg7XHJcbiAgICBjb25zdCBkID0gZiAqIGI7XHJcbiAgICBjb25zdCBiaCA9IGQgLSAoZCAtIGIpO1xyXG4gICAgY29uc3QgYmwgPSBiIC0gYmg7XHJcbiAgICBjb25zdCBoID0gW107XHJcbiAgICAvL2hbMF0gPSAoYWwqYmwpIC0gKChxIC0gKGFoKmJoKSkgLSAoYWwqYmgpIC0gKGFoKmJsKSk7XHJcbiAgICBjb25zdCBoaCA9IChhbCAqIGJsKSAtICgocSAtIChhaCAqIGJoKSkgLSAoYWwgKiBiaCkgLSAoYWggKiBibCkpO1xyXG4gICAgaWYgKGhoICE9PSAwKSB7XHJcbiAgICAgICAgaC5wdXNoKGhoKTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbTsgaSsrKSB7XHJcbiAgICAgICAgLy9jb25zdCBbdCwgVF0gPSB0cChlW2ldLCBiKTtcclxuICAgICAgICAvLyBpbmxpbmVkIChhYm92ZSBsaW5lKVxyXG4gICAgICAgIGNvbnN0IGEgPSBlW2ldO1xyXG4gICAgICAgIGNvbnN0IFQgPSBhICogYjtcclxuICAgICAgICBjb25zdCBjID0gZiAqIGE7XHJcbiAgICAgICAgY29uc3QgYWggPSBjIC0gKGMgLSBhKTtcclxuICAgICAgICBjb25zdCBhbCA9IGEgLSBhaDtcclxuICAgICAgICBjb25zdCBkID0gZiAqIGI7XHJcbiAgICAgICAgY29uc3QgYmggPSBkIC0gKGQgLSBiKTtcclxuICAgICAgICBjb25zdCBibCA9IGIgLSBiaDtcclxuICAgICAgICBjb25zdCB0ID0gKGFsICogYmwpIC0gKChUIC0gKGFoICogYmgpKSAtIChhbCAqIGJoKSAtIChhaCAqIGJsKSk7XHJcbiAgICAgICAgLy9baFsyKmktMV0sIHFfXSA9IHRzKHEsIHQpO1xyXG4gICAgICAgIC8vIGlubGluZWQgKGFib3ZlIGxpbmUpXHJcbiAgICAgICAgY29uc3QgeCA9IHEgKyB0O1xyXG4gICAgICAgIGNvbnN0IGJ2ID0geCAtIHE7XHJcbiAgICAgICAgLy9oWzIqaS0xXSA9IChxIC0gKHggLSBidikpICsgKHQgLSBidik7XHJcbiAgICAgICAgLy9oLnB1c2goKHEgLSAoeCAtIGJ2KSkgKyAodCAtIGJ2KSk7XHJcbiAgICAgICAgY29uc3QgaGggPSAocSAtICh4IC0gYnYpKSArICh0IC0gYnYpO1xyXG4gICAgICAgIGlmIChoaCAhPT0gMCkge1xyXG4gICAgICAgICAgICBoLnB1c2goaGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBxXyA9IHg7XHJcbiAgICAgICAgLy9baFsyKmldLCBxXSA9IGZ0cyhULCBxXyk7XHJcbiAgICAgICAgLy8gaW5saW5lZCAoYWJvdmUgbGluZSlcclxuICAgICAgICBjb25zdCB4eCA9IFQgKyBxXztcclxuICAgICAgICAvL2hbMippXSA9IHFfIC0gKHh4IC0gVCk7XHJcbiAgICAgICAgLy9oLnB1c2gocV8gLSAoeHggLSBUKSk7XHJcbiAgICAgICAgY29uc3QgaGhoID0gcV8gLSAoeHggLSBUKTtcclxuICAgICAgICBpZiAoaGhoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGgucHVzaChoaGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBxID0geHg7XHJcbiAgICB9XHJcbiAgICAvL2hbMiptIC0gMV0gPSBxO1xyXG4gICAgLy9oLnB1c2gocSk7XHJcbiAgICBpZiAocSAhPT0gMCB8fCBoLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGgucHVzaChxKTtcclxuICAgIH1cclxuICAgIC8vcmV0dXJuIGVDb21wcmVzcyhoKTtcclxuICAgIHJldHVybiBoO1xyXG59XHJcbmV4cG9ydCB7IHNjYWxlRXhwYW5zaW9uLCBzY2FsZUV4cGFuc2lvbjIgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NhbGUtZXhwYW5zaW9uLmpzLm1hcCIsImltcG9ydCB7IGdldExvd2VzdFNldEJpdCwgZ2V0SGlnaGVzdFNldEJpdCB9IGZyb20gXCIuL2dldC1tYXgtc2V0LWJpdC5qc1wiO1xyXG5pbXBvcnQgeyBlQ29tcHJlc3MgfSBmcm9tIFwiLi4vZG91YmxlLWV4cGFuc2lvbi9lLWNvbXByZXNzLmpzXCI7XHJcbmltcG9ydCB7IGV4cG9uZW50IH0gZnJvbSBcIi4vZXhwb25lbnQuanNcIjtcclxuaW1wb3J0IHsgZVNpZ24gfSBmcm9tIFwiLi4vZG91YmxlLWV4cGFuc2lvbi9lLXNpZ24uanNcIjtcclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGJpdC1sZW5ndGggb2YgdGhlIHNpZ25pZmljYW5kIG9mIHRoZSBnaXZlbiBudW1iZXIgaW4gc3VjaCBhIHdheVxyXG4gKiB0aGF0IHRyYWlsaW5nIHplcm9zIGFyZSBub3QgY291bnRlZC5cclxuICogQHBhcmFtIGEgQSBkb3VibGUgcHJlY2lzaW9uIGZsb2F0aW5nIHBvaW50IG51bWJlclxyXG4gKi9cclxuZnVuY3Rpb24gYml0TGVuZ3RoKGEpIHtcclxuICAgIGlmIChhID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ2V0SGlnaGVzdFNldEJpdChhKSAtIGdldExvd2VzdFNldEJpdChhKSArIDE7XHJcbn1cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGJpdC1sZW5ndGggb2YgdGhlIHNpZ25pZmljYW5kIG9mIHRoZSBnaXZlbiBmbG9hdGluZyBwb2ludFxyXG4gKiBleHBhbnNpb24gaW4gc3VjaCBhIHdheSB0aGF0IHRyYWlsaW5nIHplcm9zIGFyZSBub3QgY291bnRlZC5cclxuICogKiBwcmVjb25kaXRpb246IHN1Ym5vcm1hbHMgbm90IGN1cnJlbnRseSBzdXBwb3J0ZWRcclxuICogQHBhcmFtIGEgQSBkb3VibGUgcHJlY2lzaW9uIGZsb2F0aW5nIHBvaW50IGV4cGFuc2lvblxyXG4gKi9cclxuZnVuY3Rpb24gZXhwQml0TGVuZ3RoKGEpIHtcclxuICAgIGNvbnN0IGFfID0gZUNvbXByZXNzKGEpO1xyXG4gICAgaWYgKGVTaWduKGFfKSA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbXNieXRlID0gYV9bYV8ubGVuZ3RoIC0gMV07XHJcbiAgICBjb25zdCBsc2J5dGUgPSBhX1swXTtcclxuICAgIHJldHVybiBleHBvbmVudChtc2J5dGUpIC0gZXhwb25lbnQobHNieXRlKSArICg1MyAtIGdldExvd2VzdFNldEJpdChsc2J5dGUpKTtcclxufVxyXG5leHBvcnQgeyBiaXRMZW5ndGgsIGV4cEJpdExlbmd0aCB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1iaXQtbGVuZ3RoLmpzLm1hcCIsIi8vIE1vZGlmaWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2JhcnRhei9pZWVlNzU0LXZpc3VhbGl6YXRpb24vXHJcbi8vIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4vLyBDb3B5cmlnaHQgMjAxMyBCYXJ0ZWsgU3pvcGthIChvcmlnaW5hbCBhdXRob3IpXHJcbmltcG9ydCB7IGRvdWJsZVRvT2N0ZXRzIH0gZnJvbSBcIi4vZG91YmxlLXRvLW9jdGV0cy5qc1wiO1xyXG5mdW5jdGlvbiBkb3VibGVUb0JpbmFyeVN0cmluZyhudW1iZXIpIHtcclxuICAgIHJldHVybiBvY3RldHNUb0JpbmFyeVN0cmluZyhkb3VibGVUb09jdGV0cyhudW1iZXIpKTtcclxufVxyXG4vKipcclxuICogQHBhcmFtIG9jdGV0cyBUaGUgOCBieXRlcyBjb21wb3NpbmcgYSBkb3VibGUgKG1zYiBmaXJzdClcclxuICovXHJcbmZ1bmN0aW9uIG9jdGV0c1RvQmluYXJ5U3RyaW5nKG9jdGV0cykge1xyXG4gICAgcmV0dXJuIG9jdGV0c1xyXG4gICAgICAgIC5tYXAoaW50OFRvQmluYXJ5U3RyaW5nKVxyXG4gICAgICAgIC5qb2luKCcnKTtcclxufVxyXG4vKipcclxuICogaW50VG9CaW5hcnlTdHJpbmcoOCkgLT4gXCIwMDAwMTAwMFwiXHJcbiAqL1xyXG5mdW5jdGlvbiBpbnQ4VG9CaW5hcnlTdHJpbmcoaSkge1xyXG4gICAgbGV0IGlTdHIgPSBpLnRvU3RyaW5nKDIpO1xyXG4gICAgZm9yICg7IGlTdHIubGVuZ3RoIDwgODsgaVN0ciA9IFwiMFwiICsgaVN0cilcclxuICAgICAgICA7XHJcbiAgICByZXR1cm4gaVN0cjtcclxufVxyXG5leHBvcnQgeyBkb3VibGVUb0JpbmFyeVN0cmluZyB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kb3VibGUtdG8tYmluYXJ5LXN0cmluZy5qcy5tYXAiLCIvLyBNb2RpZmllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9iYXJ0YXovaWVlZTc1NC12aXN1YWxpemF0aW9uL1xyXG4vLyB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcclxuLy8gQ29weXJpZ2h0IDIwMTMgQmFydGVrIFN6b3BrYSAob3JpZ2luYWwgYXV0aG9yKVxyXG4vKipcclxuICogUmV0dXJucyB0aGUgaWVlZS01NzQgOCBieXRlcyBjb21wb3NpbmcgdGhlIGdpdmVuIGRvdWJsZSwgc3RhcnRpbmcgZnJvbSB0aGVcclxuICogc2lnbiBiaXQgYW5kIGVuZGluZyBpbiB0aGUgbHNiIG9mIHRoZSBzaWduaWZpY2FuZC5cclxuICogZS5nLiAxMjMuNDU2IC0+IFs2NCwgOTQsIDIyMSwgNDcsIDI2LCAxNTksIDE5MCwgMTE5XVxyXG4gKi9cclxuZnVuY3Rpb24gZG91YmxlVG9PY3RldHMobnVtYmVyKSB7XHJcbiAgICBjb25zdCBidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoOCk7XHJcbiAgICBuZXcgRGF0YVZpZXcoYnVmZmVyKS5zZXRGbG9hdDY0KDAsIG51bWJlciwgZmFsc2UpO1xyXG4gICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFVpbnQ4QXJyYXkoYnVmZmVyKSk7XHJcbn1cclxuZXhwb3J0IHsgZG91YmxlVG9PY3RldHMgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZG91YmxlLXRvLW9jdGV0cy5qcy5tYXAiLCJpbXBvcnQgeyBwYXJzZURvdWJsZSB9IGZyb20gJy4vcGFyc2UtZG91YmxlLmpzJztcclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIG5vcm1hbGl6ZWQgZXhwb25lbnQgb2YgdGhlIGdpdmVuIG51bWJlci5cclxuICogQHBhcmFtIGEgQSBkb3VibGVcclxuICovXHJcbmZ1bmN0aW9uIGV4cG9uZW50KGEpIHtcclxuICAgIHJldHVybiBwYXJzZURvdWJsZShhKS5leHBvbmVudDtcclxufVxyXG5leHBvcnQgeyBleHBvbmVudCB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1leHBvbmVudC5qcy5tYXAiLCJpbXBvcnQgeyBzaWduaWZpY2FuZCB9IGZyb20gXCIuL3NpZ25pZmljYW5kLmpzXCI7XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBsb3dlc3Qgc2V0IGJpdCBvZiB0aGUgZ2l2ZW4gdmFsdWUgaW4gWzEsICgyKiozMSktMV0sXHJcbiAqIGkuZS4gZnJvbSAxIHVwIHRvIDIxNDc0ODM2NDcgZWxzZSBpZiBubyBiaXQgaXMgc2V0IChpbnB1dCA9PT0gMCkgcmV0dXJuc1xyXG4gKiBOYU4sIG90aGVyd2lzZSBpZiB0aGUgbnVtYmVyIGlzIG91dCBvZiByYW5nZSByZXR1cm5zIGEgbm9uLWZpbml0ZVxyXG4gKiBudW1iZXIuXHJcbiAqIFNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzUxOTAyODgvMjAxMDA2MVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0TG93ZXN0U2V0Qml0XyhhKSB7XHJcbiAgICByZXR1cm4gTWF0aC5sb2cyKGEgJiAtYSk7XHJcbn1cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGxvd2VzdCBzZXQgYml0IG9mIHRoZSBnaXZlbiBudW1iZXIncyBzaWduaWZpY2FuZCAod2hlcmUgdGhlIGxzYlxyXG4gKiBpcyBiaXQgMCBhbmQgdGhlIG1zYiBpcyBiaXQgNTIpLiBJZiBubyBiaXQgaXMgc2V0IChpbnB1dCA9PT0gMCBvciArLWluZiBvclxyXG4gKiBOYU4pIHJldHVybnMgTmFOLlxyXG4gKiBTZWUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM1MTkwMjg4LzIwMTAwNjFcclxuICovXHJcbmZ1bmN0aW9uIGdldExvd2VzdFNldEJpdChhKSB7XHJcbiAgICBpZiAoYSA9PT0gMCB8fCAhTnVtYmVyLmlzRmluaXRlKGEpKSB7XHJcbiAgICAgICAgLy8gVGhlcmUgaXMgbm8gbG93ZXN0IHNldCBiaXRcclxuICAgICAgICByZXR1cm4gTmFOO1xyXG4gICAgfVxyXG4gICAgLy8gTm90ZTogdGhlIHNpZ25pZmljYW5kIGluY2x1ZGVzIHRoZSBoaWRkZW4gYml0IVxyXG4gICAgY29uc3QgcyA9IHNpZ25pZmljYW5kKGEpO1xyXG4gICAgY29uc3QgbGVuID0gcy5sZW5ndGg7XHJcbiAgICBmb3IgKGxldCBpID0gbGVuIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICBpZiAoc1tpXSA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbCA9IGdldExvd2VzdFNldEJpdF8oc1tpXSk7XHJcbiAgICAgICAgaWYgKE51bWJlci5pc0Zpbml0ZShsKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKDggKiAobGVuIC0gaSAtIDEpKSArIGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIE5hTjtcclxufVxyXG4vKipcclxuICogUmV0dXJucyB0aGUgaGlnaGVzdCBzZXQgYml0IG9mIHRoZSBnaXZlbiB2YWx1ZSBpbiBbMSwgMjU1XSwgaS5lLiBmcm9tIDEgdXBcclxuICogdG8gMjU1LiBJZiB0aGUgaW5wdXQgbnVtYmVyID09PSAwIHJldHVybnMgTmFOLlxyXG4gKiBTZWUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM1MTkwMjg4LzIwMTAwNjFcclxuICovXHJcbmZ1bmN0aW9uIGdldEhpZ2hlc3RTZXRCaXRfKGEpIHtcclxuICAgIHJldHVybiBhID49IDEyOCA/IDdcclxuICAgICAgICA6IGEgPj0gNjQgPyA2XHJcbiAgICAgICAgICAgIDogYSA+PSAzMiA/IDVcclxuICAgICAgICAgICAgICAgIDogYSA+PSAxNiA/IDRcclxuICAgICAgICAgICAgICAgICAgICA6IGEgPj0gOCA/IDNcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBhID49IDQgPyAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGEgPj0gMiA/IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGEgPj0gMSA/IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBOYU47XHJcbn1cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGhpZ2hlc3Qgc2V0IGJpdCBvZiB0aGUgZ2l2ZW4gZG91YmxlLiBJZiBubyBiaXQgaXMgc2V0IChpbnB1dFxyXG4gKiA9PT0gMCBvciArLy1pbmYgb3IgTmFOKSByZXR1cm5zIE5hTi5cclxuICogU2VlIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zNTE5MDI4OC8yMDEwMDYxXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRIaWdoZXN0U2V0Qml0KGEpIHtcclxuICAgIGlmIChhID09PSAwIHx8ICFOdW1iZXIuaXNGaW5pdGUoYSkpIHtcclxuICAgICAgICAvLyBUaGVyZSBpcyBubyBsb3dlc3Qgc2V0IGJpdFxyXG4gICAgICAgIHJldHVybiBOYU47XHJcbiAgICB9XHJcbiAgICAvLyBBdCB0aGlzIHBvaW50IHRoZXJlIG11c3QgYmUgYSBoaWdoZXN0IHNldCBiaXQgKGFsd2F5cyA9PT0gNTIgaWYgdGhlIFxyXG4gICAgLy8gbnVtYmVyIGlzIG5vdCBhIHN1Ym5vcm1hbC5cclxuICAgIGNvbnN0IHMgPSBzaWduaWZpY2FuZChhKTtcclxuICAgIGNvbnN0IGxlbiA9IHMubGVuZ3RoO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGwgPSBnZXRIaWdoZXN0U2V0Qml0XyhzW2ldKTtcclxuICAgICAgICBpZiAoTnVtYmVyLmlzRmluaXRlKGwpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoOCAqIChsZW4gLSBpIC0gMSkpICsgbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTmFOO1xyXG59XHJcbmV4cG9ydCB7IGdldExvd2VzdFNldEJpdCwgZ2V0SGlnaGVzdFNldEJpdCB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1nZXQtbWF4LXNldC1iaXQuanMubWFwIiwiaW1wb3J0IHsgZ2V0SGlnaGVzdFNldEJpdCwgZ2V0TG93ZXN0U2V0Qml0IH0gZnJvbSBcIi4vZ2V0LW1heC1zZXQtYml0LmpzXCI7XHJcbmltcG9ydCB7IGV4cG9uZW50IH0gZnJvbSBcIi4vZXhwb25lbnQuanNcIjtcclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gbnVtYmVyIGlzIGJpdC1hbGlnbmVkIGluIHRoZSBzZW5zZSB0aGF0IGl0cyBhXHJcbiAqIG11bHRpcGxlIG9mIGEgZ2l2ZW4gcG93ZXIgb2YgMiwgc2F5IGUsIGFuZCBzdWNoIHRoYXQgdGhlIG51bWJlciwgc2F5IGEsXHJcbiAqIGNvbmZvcm1zIHRvOiBhLzJeZSA8IDJeKGwtZSksIHdoZXJlIGwgaXMgdGhlIG1heCBhbGxvd2VkIGJpdCBsZW5ndGguXHJcbiAqIFRoaXMgZXNzZW50aWFsbHkgbWVhbnMgdGhlIG51bWJlcnMgYWN0IHNvbWV3aGF0IGxpa2UgZml4ZWQtcG9pbnQgbnVtYmVyc1xyXG4gKiB3aGljaCBjYW4gZHJhc3RpY2FsbHkgc3BlZWQgdXAgc29tZSBnZW9tZXRyaWMgYWxnb3JpdGhtcyBhbmQgYWxzbyByZWR1Y2VcclxuICogdGhlaXIgY29tcGxleGl0eS5cclxuICpcclxuICogVmlzdWFsbHk6XHJcbiAqIFRoZXNlIG51bWJlcnMgKGEsYiBhbmQgYykgYXJlIGJpdCBhbGlnbmVkIHdpdGggZSA9PT0gMyBhbmQgbWF4XHJcbiAqIGJpdGxlbmd0aCA9PT0gNjpcclxuICogICAgYSAtPiAwMHwxMDExMDB8MDAwXHJcbiAqICAgIGIgLT4gMDB8MDAwMTAwfDAwMFxyXG4gKiAgICBjIC0+IDAwfDExMDExMXwwMDBcclxuICogVGhlc2UgYXJlIG5vdFxyXG4gKiAgICBhIC0+IDAxfDEwMTEwMHwwMDBcclxuICogICAgYiAtPiAwMHwwMDAxMDB8MDAwXHJcbiAqIFRoZXNlIGFyZSBub3RcclxuICogICAgYSAtPiAwMHwxMDExMDB8MDAwXHJcbiAqICAgIGIgLT4gMDB8MDAwMTAwfDEwMFxyXG4gKiBUaGVzZSBhcmUgbm90XHJcbiAqICAgIGEgLT4gMDB8MTAxMTAwfDEwMFxyXG4gKiAgICBiIC0+IDAwfDAwMDEwMHwxMDBcclxuICogQHBhcmFtIGFzIEFuIGFycmF5IG9mIG51bWJlcnMgdG8gY2hlY2tcclxuICogQHBhcmFtIG1heEJpdExlbmd0aCBUaGUgbWF4IGFsbG93ZWQgYml0bGVuZ3RoXHJcbiAqIEBwYXJhbSBncmlkU3BhY2luZ0V4cG9uZW50IFRoZSBncmlkIHNwYWNpbmcgPT09IDFeZ3JpZFNwYWNpbmdFeHBvbmVudFxyXG4gKi9cclxuZnVuY3Rpb24gaXNCaXRBbGlnbmVkKGEsIG1heEJpdExlbmd0aCwgZ3JpZFNwYWNpbmdFeHBvbmVudCkge1xyXG4gICAgaWYgKGEgPT09IDApIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGNvbnN0IGUgPSBleHBvbmVudChhKTtcclxuICAgIGNvbnN0IG1heFNldEJpdCA9IGdldEhpZ2hlc3RTZXRCaXQoYSkgLSA1MiArIGU7XHJcbiAgICBjb25zdCBtaW5TZXRCaXQgPSBnZXRMb3dlc3RTZXRCaXQoYSkgLSA1MiArIGU7XHJcbiAgICBjb25zdCBtaW5CaXRCaWdFbm91Z2ggPSBtaW5TZXRCaXQgPj0gZ3JpZFNwYWNpbmdFeHBvbmVudDtcclxuICAgIGNvbnN0IG1heEJpdFNtYWxsRW5vdWdoID0gbWF4U2V0Qml0IDw9IG1heEJpdExlbmd0aCAtIDEgKyBncmlkU3BhY2luZ0V4cG9uZW50O1xyXG4gICAgcmV0dXJuIG1pbkJpdEJpZ0Vub3VnaCAmJiBtYXhCaXRTbWFsbEVub3VnaDtcclxufVxyXG5leHBvcnQgeyBpc0JpdEFsaWduZWQgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXMtYml0LWFsaWduZWQuanMubWFwIiwiaW1wb3J0IHsgZ2V0TG93ZXN0U2V0Qml0IH0gZnJvbSBcIi4vZ2V0LW1heC1zZXQtYml0LmpzXCI7XHJcbmltcG9ydCB7IGV4cG9uZW50IH0gZnJvbSBcIi4vZXhwb25lbnQuanNcIjtcclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHRydWUgZXhwb25lbnQgb2YgdGhlIGxzYiB0aGF0IGlzIHNldCBvZiB0aGUgZ2l2ZW4gbnVtYmVyIG9yXHJcbiAqIE5hTiBpZiBhID09PSAwIG9yICstaW5mIG9yIE5hTi5cclxuICogQHBhcmFtIGEgQW4gYXJyYXkgb2YgbnVtYmVycyB0byBjaGVja1xyXG4gKi9cclxuZnVuY3Rpb24gbHNiRXhwb25lbnQoYSkge1xyXG4gICAgaWYgKGEgPT09IDAgfHwgIU51bWJlci5pc0Zpbml0ZShhKSkge1xyXG4gICAgICAgIHJldHVybiBOYU47XHJcbiAgICB9XHJcbiAgICBjb25zdCBlID0gZXhwb25lbnQoYSk7XHJcbiAgICByZXR1cm4gZ2V0TG93ZXN0U2V0Qml0KGEpIC0gNTIgKyBlO1xyXG59XHJcbmV4cG9ydCB7IGxzYkV4cG9uZW50IH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxzYi1leHBvbmVudC5qcy5tYXAiLCJpbXBvcnQgeyBnZXRIaWdoZXN0U2V0Qml0IH0gZnJvbSBcIi4vZ2V0LW1heC1zZXQtYml0LmpzXCI7XHJcbmltcG9ydCB7IGV4cG9uZW50IH0gZnJvbSBcIi4vZXhwb25lbnQuanNcIjtcclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHRydWUgZXhwb25lbnQgb2YgdGhlIG1zYiB0aGF0IGlzIHNldCBvZiB0aGUgZ2l2ZW4gbnVtYmVyIG9yXHJcbiAqIE5hTiBpZiBhID09PSAwIG9yICstaW5mIG9yIE5hTi5cclxuICogQHBhcmFtIGEgQW4gYXJyYXkgb2YgbnVtYmVycyB0byBjaGVja1xyXG4gKi9cclxuZnVuY3Rpb24gbXNiRXhwb25lbnQoYSkge1xyXG4gICAgaWYgKGEgPT09IDAgfHwgIU51bWJlci5pc0Zpbml0ZShhKSkge1xyXG4gICAgICAgIHJldHVybiBOYU47XHJcbiAgICB9XHJcbiAgICBjb25zdCBlID0gZXhwb25lbnQoYSk7XHJcbiAgICAvLyBXaWxsIHJldHVybiBlIGZvciBhbGwgYnV0IHN1Ym5vcm1hbCBudW1iZXJzXHJcbiAgICByZXR1cm4gZ2V0SGlnaGVzdFNldEJpdChhKSAtIDUyICsgZTtcclxufVxyXG5leHBvcnQgeyBtc2JFeHBvbmVudCB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tc2ItZXhwb25lbnQuanMubWFwIiwiLy8gTW9kaWZpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vYmFydGF6L2llZWU3NTQtdmlzdWFsaXphdGlvbi9cclxuLy8gdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbi8vIENvcHlyaWdodCAyMDEzIEJhcnRlayBTem9wa2EgKG9yaWdpbmFsIGF1dGhvcilcclxuaW1wb3J0IHsgZG91YmxlVG9CaW5hcnlTdHJpbmcgfSBmcm9tIFwiLi9kb3VibGUtdG8tYmluYXJ5LXN0cmluZy5qc1wiO1xyXG5pbXBvcnQgeyBkb3VibGVUb09jdGV0cyB9IGZyb20gXCIuL2RvdWJsZS10by1vY3RldHMuanNcIjtcclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHJlbGV2YW50IHBhcnRzIG9mIHRoZSBnaXZlbiBJRUVFLTc1NCBkb3VibGUuIFRoZSByZXR1cm5lZFxyXG4gKiBleHBvbmVudCBoYXMgYmVlbiBub3JtYWxpemVkIChpLmUuIDEwMjMgaGEgYmVlbiBzdWJ0cmFjdGVkKSBhbmQgdGhlXHJcbiAqIHNpZ25pZmljYW5kIGhhcyB0aGUgaGlkZGVuIGJpdCBhZGRlZCBpZiBhcHByb3ByaWF0ZS5cclxuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9iYXJ0YXovaWVlZTc1NC12aXN1YWxpemF0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBwYXJzZURvdWJsZSh4KSB7XHJcbiAgICBjb25zdCBwYXJ0cyA9IGRvdWJsZVRvT2N0ZXRzKHgpO1xyXG4gICAgY29uc3QgcDAgPSBwYXJ0c1swXTtcclxuICAgIGNvbnN0IHAxID0gcGFydHNbMV07XHJcbiAgICBjb25zdCBzaWduID0gcDAgPj4gNztcclxuICAgIGNvbnN0IGV4cG9uZW50XyA9ICgocDAgJiAxMjcpIDw8IDQpICsgKChwMSAmIDBiMTExMTAwMDApID4+IDQpO1xyXG4gICAgLy8tLS0tIENoZWNrIGZvciBuZWdhdGl2ZSAvIHBvc2l0aXZlIHplcm8gLyBkZW5vcm1hbGl6ZWQgbnVtYmVycy5cclxuICAgIGNvbnN0IGhpZGRlbk1zYiA9IGV4cG9uZW50XyA9PT0gMCA/IDAgOiAxNjtcclxuICAgIC8vIE5vdGU6IGV4cG9uZW50ID09PSAwID0+IDAgb3IgZGVub3JtYWxpemVkIG51bWJlciAoYS5rLmEuIHN1Ym5vcm1hbCBudW1iZXIpLlxyXG4gICAgY29uc3QgZXhwb25lbnQgPSBleHBvbmVudF8gPT09IDBcclxuICAgICAgICA/IGV4cG9uZW50XyAtIDEwMjIgLy8gU3Vibm9ybWFscyB1c2UgYSBiaWFzZWQgZXhwb25lbnQgb2YgMSAobm90IDAhKVxyXG4gICAgICAgIDogZXhwb25lbnRfIC0gMTAyMztcclxuICAgIC8vLS0tLSBCcmVhayB1cCB0aGUgc2lnbmlmaWNhbmQgaW50byBieXRlc1xyXG4gICAgY29uc3Qgc2lnbmlmaWNhbmQgPSBwYXJ0cy5zbGljZSgxKTtcclxuICAgIHNpZ25pZmljYW5kWzBdID0gKHAxICYgMTUpICsgaGlkZGVuTXNiO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzaWduLFxyXG4gICAgICAgIGV4cG9uZW50LFxyXG4gICAgICAgIHNpZ25pZmljYW5kXHJcbiAgICB9O1xyXG59XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSByZWxldmFudCBwYXJ0cyBvZiB0aGUgZ2l2ZW4gSUVFRS03NTQgZG91YmxlLlxyXG4gKiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2JhcnRhei9pZWVlNzU0LXZpc3VhbGl6YXRpb24uXHJcbiAqIFRoaXMgaXMgYSBzbG93ZXIgdmVyc2lvbiBvZiBwYXJzZURvdWJsZSB0aGF0IGdpdmVzIGJpbmFyeSBzdHJpbmdcclxuICogcmVwcmVzZW50YXRpb25zIG9mIHRoZSBjb21wb25lbnRzLlxyXG4gKi9cclxuZnVuY3Rpb24gcGFyc2VEb3VibGVEZXRhaWxlZCh4KSB7XHJcbiAgICBjb25zdCBzdHIgPSBkb3VibGVUb0JpbmFyeVN0cmluZyh4KTtcclxuICAgIC8vIHNpZ257MX0gZXhwb25lbnR7MTF9IGZyYWN0aW9uezUyfSA9PT0gNjQgYml0cyAoKzEgaGlkZGVuISlcclxuICAgIGNvbnN0IFssIHNpZ24sIGV4cG9uZW50LCBzaWduaWZpY2FuZF0gPSBzdHIubWF0Y2goL14oLikoLnsxMX0pKC57NTJ9KSQvKTtcclxuICAgIGNvbnN0IGV4cG9uZW50XyA9IHBhcnNlSW50KGV4cG9uZW50LCAyKTtcclxuICAgIGNvbnN0IGhpZGRlbiA9IGV4cG9uZW50XyA9PT0gMCA/IFwiMFwiIDogXCIxXCI7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGZ1bGw6IHNpZ24gKyBleHBvbmVudCArIGhpZGRlbiArIHNpZ25pZmljYW5kLFxyXG4gICAgICAgIHNpZ24sXHJcbiAgICAgICAgZXhwb25lbnQsXHJcbiAgICAgICAgaGlkZGVuLFxyXG4gICAgICAgIHNpZ25pZmljYW5kXHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydCB7IHBhcnNlRG91YmxlLCBwYXJzZURvdWJsZURldGFpbGVkIH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhcnNlLWRvdWJsZS5qcy5tYXAiLCJpbXBvcnQgeyBwYXJzZURvdWJsZSB9IGZyb20gXCIuL3BhcnNlLWRvdWJsZS5qc1wiO1xyXG4vKipcclxuICogUmV0dXJuIHRoZSBzaWduaWZpY2FuZCBvZiB0aGUgZ2l2ZW4gZG91YmxlIHdpdGggdGhlIGhpZGRlbiBiaXQgYWRkZWQgKGluIGNhc2VcclxuICogYSBpcyBub3Qgc3Vibm9ybWFsIG9yIDAsIGV0Yy4pXHJcbiAqIEBwYXJhbSBhIEEgZG91YmxlXHJcbiAqL1xyXG5mdW5jdGlvbiBzaWduaWZpY2FuZChhKSB7XHJcbiAgICByZXR1cm4gcGFyc2VEb3VibGUoYSkuc2lnbmlmaWNhbmQ7XHJcbn1cclxuZXhwb3J0IHsgc2lnbmlmaWNhbmQgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2lnbmlmaWNhbmQuanMubWFwIiwiaW1wb3J0IHsgdHdvUHJvZHVjdCB9IGZyb20gXCIuLi9iYXNpYy90d28tcHJvZHVjdC5qc1wiO1xyXG5pbXBvcnQgeyBlRGlmZiB9IGZyb20gXCIuLi9kb3VibGUtZXhwYW5zaW9uL2UtZGlmZi5qc1wiO1xyXG5pbXBvcnQgeyBlRXN0aW1hdGUgfSBmcm9tIFwiLi4vZG91YmxlLWV4cGFuc2lvbi9lLWVzdGltYXRlLmpzXCI7XHJcbmltcG9ydCB7IHR3b0RpZmYgfSBmcm9tIFwiLi4vYmFzaWMvdHdvLWRpZmYuanNcIjtcclxuaW1wb3J0IHsgZmFzdEV4cGFuc2lvblN1bSB9IGZyb20gXCIuLi9kb3VibGUtZXhwYW5zaW9uL2Zhc3QtZXhwYW5zaW9uLXN1bS5qc1wiO1xyXG5pbXBvcnQgeyBlQ29tcHJlc3MgfSBmcm9tIFwiLi4vZG91YmxlLWV4cGFuc2lvbi9lLWNvbXByZXNzLmpzXCI7XHJcbmNvbnN0IGNjd2VycmJvdW5kQSA9IDMuMzMwNjY5MDczODc1NDcyZS0xNjtcclxuY29uc3QgY2N3ZXJyYm91bmRCID0gMi4yMjA0NDYwNDkyNTAzMTVlLTE2O1xyXG5jb25zdCBjY3dlcnJib3VuZEMgPSAxLjEwOTMzNTY0Nzk2NzA0OWUtMzE7XHJcbmNvbnN0IHJlc3VsdGVycmJvdW5kID0gMy4zMzA2NjkwNzM4NzU0NzFlLTE2O1xyXG4vKipcclxuICogKiBQb3J0ZWQgZnJvbSBbU2hld2NodWtdKGh0dHA6Ly9kb2NzLnJvcy5vcmcva2luZXRpYy9hcGkvYXNyX2FwcHJveF9tdmJiL2h0bWwvUHJlZGljYXRlc184Y3BwX3NvdXJjZS5odG1sKVxyXG4gKiAqIHNlZSBhbHNvIGh0dHBzOi8vcGVvcGxlLmVlY3MuYmVya2VsZXkuZWR1L35qcnMvcGFwZXJzL3JvYnVzdHIucGRmXHJcbiAqXHJcbiAqICogQWRhcHRpdmUgZXhhY3QgMmQgb3JpZW50YXRpb24gdGVzdC5cclxuICpcclxuICogKiBSb2J1c3QuXHJcbiAqXHJcbiAqIFJldHVybiBhIHBvc2l0aXZlIHZhbHVlIGlmIHRoZSBwb2ludHMgcGEsIHBiLCBhbmQgcGMgb2NjdXIgaW5cclxuICogY291bnRlcmNsb2Nrd2lzZSBvcmRlcjsgYSBuZWdhdGl2ZSB2YWx1ZSBpZiB0aGV5IG9jY3VyIGluIGNsb2Nrd2lzZSBvcmRlcjtcclxuICogYW5kIHplcm8gaWYgdGhleSBhcmUgY29sbGluZWFyLiAgVGhlIHJlc3VsdCBpcyBhbHNvIGEgcm91Z2ggYXBwcm94aW1hdGlvbiBvZlxyXG4gKiB0d2ljZSB0aGUgc2lnbmVkIGFyZWEgb2YgdGhlIHRyaWFuZ2xlIGRlZmluZWQgYnkgdGhlIHRocmVlIHBvaW50cy5cclxuICpcclxuICogVGhlIHJlc3VsdCByZXR1cm5lZCBpcyB0aGUgZGV0ZXJtaW5hbnQgb2YgYSBtYXRyaXguIFRoaXMgZGV0ZXJtaW5hbnQgaXNcclxuICogY29tcHV0ZWQgYWRhcHRpdmVseSwgaW4gdGhlIHNlbnNlIHRoYXQgZXhhY3QgYXJpdGhtZXRpYyBpcyB1c2VkIG9ubHkgdG8gdGhlXHJcbiAqIGRlZ3JlZSBpdCBpcyBuZWVkZWQgdG8gZW5zdXJlIHRoYXQgdGhlIHJldHVybmVkIHZhbHVlIGhhcyB0aGUgY29ycmVjdCBzaWduLlxyXG4gKiBIZW5jZSwgb3JpZW50MmQoKSBpcyB1c3VhbGx5IHF1aXRlIGZhc3QsIGJ1dCB3aWxsIHJ1biBtb3JlIHNsb3dseSB3aGVuIHRoZVxyXG4gKiBpbnB1dCBwb2ludHMgYXJlIGNvbGxpbmVhciBvciBuZWFybHkgc28uXHJcbiAqL1xyXG5mdW5jdGlvbiBvcmllbnQyZChBLCBCLCBDKSB7XHJcbiAgICBjb25zdCBkZXRsZWZ0ID0gKEFbMF0gLSBDWzBdKSAqIChCWzFdIC0gQ1sxXSk7XHJcbiAgICBjb25zdCBkZXRyaWdodCA9IChBWzFdIC0gQ1sxXSkgKiAoQlswXSAtIENbMF0pO1xyXG4gICAgY29uc3QgZGV0ID0gZGV0bGVmdCAtIGRldHJpZ2h0O1xyXG4gICAgbGV0IGRldHN1bTtcclxuICAgIGlmIChkZXRsZWZ0ID4gMCkge1xyXG4gICAgICAgIGlmIChkZXRyaWdodCA8PSAwKSB7XHJcbiAgICAgICAgICAgIC8vIEFudGktY2xvY2t3aXNlXHJcbiAgICAgICAgICAgIHJldHVybiBkZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkZXRzdW0gPSBkZXRsZWZ0ICsgZGV0cmlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZGV0bGVmdCA8IDApIHtcclxuICAgICAgICBpZiAoZGV0cmlnaHQgPj0gMCkge1xyXG4gICAgICAgICAgICAvLyBDbG9ja3dpc2VcclxuICAgICAgICAgICAgcmV0dXJuIGRldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRldHN1bSA9IC1kZXRsZWZ0IC0gZGV0cmlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgLy8gQW50aS1jbG9ja3dpc2UsIGNsb2Nrd2lzZSBvciBzdHJhaWdodFxyXG4gICAgICAgIHJldHVybiBkZXQ7XHJcbiAgICB9XHJcbiAgICBpZiAoTWF0aC5hYnMoZGV0KSA+PSBjY3dlcnJib3VuZEEgKiBkZXRzdW0pIHtcclxuICAgICAgICAvLyBBbnRpLWNsb2Nrd2lzZSBvciBjbG9ja3dpc2VcclxuICAgICAgICByZXR1cm4gZGV0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9yaWVudDJkQWRhcHQoQSwgQiwgQywgZGV0c3VtKTtcclxufVxyXG5mdW5jdGlvbiBvcmllbnQyZEFkYXB0KEEsIEIsIEMsIGRldHN1bSkge1xyXG4gICAgY29uc3QgYWN4ID0gQVswXSAtIENbMF07XHJcbiAgICBjb25zdCBiY3ggPSBCWzBdIC0gQ1swXTtcclxuICAgIGNvbnN0IGFjeSA9IEFbMV0gLSBDWzFdO1xyXG4gICAgY29uc3QgYmN5ID0gQlsxXSAtIENbMV07XHJcbiAgICBjb25zdCBiID0gZURpZmYodHdvUHJvZHVjdChhY3gsIGJjeSksIHR3b1Byb2R1Y3QoYWN5LCBiY3gpKTtcclxuICAgIGxldCBkZXQgPSBlRXN0aW1hdGUoYik7XHJcbiAgICBpZiAoTWF0aC5hYnMoZGV0KSA+PSBjY3dlcnJib3VuZEIgKiBkZXRzdW0pIHtcclxuICAgICAgICAvLyBBbnRpLWNsb2Nrd2lzZSBvciBjbG9ja3dpc2VcclxuICAgICAgICByZXR1cm4gZGV0O1xyXG4gICAgfVxyXG4gICAgY29uc3QgYWN4dGFpbCA9IHR3b0RpZmYoQVswXSwgQ1swXSlbMF07XHJcbiAgICBjb25zdCBiY3h0YWlsID0gdHdvRGlmZihCWzBdLCBDWzBdKVswXTtcclxuICAgIGNvbnN0IGFjeXRhaWwgPSB0d29EaWZmKEFbMV0sIENbMV0pWzBdO1xyXG4gICAgY29uc3QgYmN5dGFpbCA9IHR3b0RpZmYoQlsxXSwgQ1sxXSlbMF07XHJcbiAgICBpZiAoYWN4dGFpbCA9PT0gMCAmJiBhY3l0YWlsID09PSAwICYmXHJcbiAgICAgICAgYmN4dGFpbCA9PT0gMCAmJiBiY3l0YWlsID09PSAwKSB7XHJcbiAgICAgICAgLy8gU3RyYWlnaHRcclxuICAgICAgICByZXR1cm4gZGV0O1xyXG4gICAgfVxyXG4gICAgY29uc3QgZXJyYm91bmQgPSBjY3dlcnJib3VuZEMgKiBkZXRzdW0gKyByZXN1bHRlcnJib3VuZCAqIE1hdGguYWJzKGRldCk7XHJcbiAgICBkZXQgKz0gKGFjeCAqIGJjeXRhaWwgKyBiY3kgKiBhY3h0YWlsKSAtIChhY3kgKiBiY3h0YWlsICsgYmN4ICogYWN5dGFpbCk7XHJcbiAgICBpZiAoTWF0aC5hYnMoZGV0KSA+PSBlcnJib3VuZCkge1xyXG4gICAgICAgIHJldHVybiBkZXQ7XHJcbiAgICB9XHJcbiAgICBjb25zdCBhID0gZURpZmYodHdvUHJvZHVjdChhY3h0YWlsLCBiY3kpLCB0d29Qcm9kdWN0KGFjeXRhaWwsIGJjeCkpO1xyXG4gICAgY29uc3QgYyA9IGZhc3RFeHBhbnNpb25TdW0oYiwgYSk7XHJcbiAgICBjb25zdCBkID0gZURpZmYodHdvUHJvZHVjdChhY3gsIGJjeXRhaWwpLCB0d29Qcm9kdWN0KGFjeSwgYmN4dGFpbCkpO1xyXG4gICAgY29uc3QgZSA9IGZhc3RFeHBhbnNpb25TdW0oYywgZCk7XHJcbiAgICBjb25zdCBmID0gZURpZmYodHdvUHJvZHVjdChhY3h0YWlsLCBiY3l0YWlsKSwgdHdvUHJvZHVjdChhY3l0YWlsLCBiY3h0YWlsKSk7XHJcbiAgICBsZXQgRCA9IGZhc3RFeHBhbnNpb25TdW0oZSwgZik7XHJcbiAgICBEID0gZUNvbXByZXNzKEQpO1xyXG4gICAgcmV0dXJuIERbRC5sZW5ndGggLSAxXTtcclxufVxyXG5leHBvcnQgeyBvcmllbnQyZCB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1vcmllbnQyZC5qcy5tYXAiLCJpbXBvcnQgeyBlVG9CaXRsZW5ndGggfSBmcm9tICcuL2RvdWJsZS1leHBhbnNpb24vZS10by1iaXRsZW5ndGguanMnO1xyXG5pbXBvcnQgeyBlRGl2IH0gZnJvbSAnLi9kb3VibGUtZXhwYW5zaW9uL2UtZGl2LmpzJztcclxuaW1wb3J0IHsgZUxvbmdEaXZpZGUgfSBmcm9tICcuL2RvdWJsZS1leHBhbnNpb24vZS1sb25nLWRpdmlkZS5qcyc7XHJcbmltcG9ydCB7IGVJbnREaXYgfSBmcm9tICcuL2RvdWJsZS1leHBhbnNpb24vZS1pbnQtZGl2LmpzJztcclxuaW1wb3J0IHsgZVJlbSB9IGZyb20gJy4vZG91YmxlLWV4cGFuc2lvbi9lLXJlbS5qcyc7XHJcbmltcG9ydCB7IGVDb21wcmVzcyB9IGZyb20gJy4vZG91YmxlLWV4cGFuc2lvbi9lLWNvbXByZXNzLmpzJztcclxuaW1wb3J0IHsgZUNvbXBhcmUgfSBmcm9tICcuL2RvdWJsZS1leHBhbnNpb24vZS1jb21wYXJlLmpzJztcclxuaW1wb3J0IHsgZUFicyB9IGZyb20gJy4vZG91YmxlLWV4cGFuc2lvbi9lLWFicy5qcyc7XHJcbmltcG9ydCB7IGVFc3RpbWF0ZSB9IGZyb20gJy4vZG91YmxlLWV4cGFuc2lvbi9lLWVzdGltYXRlLmpzJztcclxuaW1wb3J0IHsgZURpZmYgfSBmcm9tICcuL2RvdWJsZS1leHBhbnNpb24vZS1kaWZmLmpzJztcclxuaW1wb3J0IHsgZmFzdEV4cGFuc2lvblN1bSB9IGZyb20gJy4vZG91YmxlLWV4cGFuc2lvbi9mYXN0LWV4cGFuc2lvbi1zdW0uanMnO1xyXG5pbXBvcnQgeyBmYXN0VHdvRGlmZiB9IGZyb20gJy4vYmFzaWMvZmFzdC10d28tZGlmZi5qcyc7XHJcbmltcG9ydCB7IGZhc3RUd29TdW0gfSBmcm9tICcuL2Jhc2ljL2Zhc3QtdHdvLXN1bS5qcyc7XHJcbmltcG9ydCB7IGdyb3dFeHBhbnNpb24gfSBmcm9tICcuL2RvdWJsZS1leHBhbnNpb24vZ3Jvdy1leHBhbnNpb24uanMnO1xyXG5pbXBvcnQgeyBlTmVnYXRpdmVPZiB9IGZyb20gJy4vZG91YmxlLWV4cGFuc2lvbi9lLW5lZ2F0aXZlLW9mLmpzJztcclxuaW1wb3J0IHsgc2NhbGVFeHBhbnNpb24sIHNjYWxlRXhwYW5zaW9uMiB9IGZyb20gJy4vZG91YmxlLWV4cGFuc2lvbi9zY2FsZS1leHBhbnNpb24uanMnO1xyXG5pbXBvcnQgeyBlTXVsdEJ5MiB9IGZyb20gJy4vZG91YmxlLWV4cGFuc2lvbi9lLW11bHQtYnktMi5qcyc7XHJcbmltcG9ydCB7IGVNdWx0QnlOZWcyIH0gZnJvbSAnLi9kb3VibGUtZXhwYW5zaW9uL2UtbXVsdC1ieS1uZWctMi5qcyc7XHJcbmltcG9ydCB7IGVEaXZCeTIgfSBmcm9tICcuL2RvdWJsZS1leHBhbnNpb24vZS1kaXYtYnktMi5qcyc7XHJcbmltcG9ydCB7IHNwbGl0IH0gZnJvbSAnLi9iYXNpYy9zcGxpdC5qcyc7XHJcbmltcG9ydCB7IHR3b0RpZmYgfSBmcm9tICcuL2Jhc2ljL3R3by1kaWZmLmpzJztcclxuaW1wb3J0IHsgdHdvUHJvZHVjdCB9IGZyb20gJy4vYmFzaWMvdHdvLXByb2R1Y3QuanMnO1xyXG5pbXBvcnQgeyB0d29TdW0gfSBmcm9tICcuL2Jhc2ljL3R3by1zdW0uanMnO1xyXG5pbXBvcnQgeyByZWR1Y2VTaWduaWZpY2FuZCB9IGZyb20gJy4vYmFzaWMvcmVkdWNlLXNpZ25pZmljYW5kLmpzJztcclxuaW1wb3J0IHsgZXhwYW5zaW9uUHJvZHVjdCB9IGZyb20gJy4vZG91YmxlLWV4cGFuc2lvbi9leHBhbnNpb24tcHJvZHVjdC5qcyc7XHJcbmltcG9ydCB7IHBhcnNlRG91YmxlLCBwYXJzZURvdWJsZURldGFpbGVkIH0gZnJvbSAnLi9kb3VibGUtcmVwcmVzZW50YXRpb24vcGFyc2UtZG91YmxlLmpzJztcclxuaW1wb3J0IHsgaXNCaXRBbGlnbmVkIH0gZnJvbSAnLi9kb3VibGUtcmVwcmVzZW50YXRpb24vaXMtYml0LWFsaWduZWQuanMnO1xyXG5pbXBvcnQgeyBtc2JFeHBvbmVudCB9IGZyb20gJy4vZG91YmxlLXJlcHJlc2VudGF0aW9uL21zYi1leHBvbmVudC5qcyc7XHJcbmltcG9ydCB7IGxzYkV4cG9uZW50IH0gZnJvbSAnLi9kb3VibGUtcmVwcmVzZW50YXRpb24vbHNiLWV4cG9uZW50LmpzJztcclxuaW1wb3J0IHsgZVNpZ24gfSBmcm9tICcuL2RvdWJsZS1leHBhbnNpb24vZS1zaWduLmpzJztcclxuaW1wb3J0IHsgYml0TGVuZ3RoIH0gZnJvbSAnLi9kb3VibGUtcmVwcmVzZW50YXRpb24vYml0LWxlbmd0aC5qcyc7XHJcbmltcG9ydCB7IGV4cEJpdExlbmd0aCB9IGZyb20gJy4vZG91YmxlLXJlcHJlc2VudGF0aW9uL2JpdC1sZW5ndGguanMnO1xyXG5pbXBvcnQgeyBlQ2FsY3VsYXRlIH0gZnJvbSAnLi9kb3VibGUtZXhwYW5zaW9uL2UtY2FsY3VsYXRlLmpzJztcclxuaW1wb3J0IHsgZVN1bSB9IGZyb20gJy4vZG91YmxlLWV4cGFuc2lvbi9lLXN1bS5qcyc7XHJcbmltcG9ydCB7IGVQcm9kdWN0IH0gZnJvbSAnLi9kb3VibGUtZXhwYW5zaW9uL2UtcHJvZHVjdC5qcyc7XHJcbmltcG9ydCB7IGV4cG9uZW50IH0gZnJvbSAnLi9kb3VibGUtcmVwcmVzZW50YXRpb24vZXhwb25lbnQuanMnO1xyXG5pbXBvcnQgeyBzaWduaWZpY2FuZCB9IGZyb20gJy4vZG91YmxlLXJlcHJlc2VudGF0aW9uL3NpZ25pZmljYW5kLmpzJztcclxuaW1wb3J0IHsgZG91YmxlVG9CaW5hcnlTdHJpbmcgfSBmcm9tICcuL2RvdWJsZS1yZXByZXNlbnRhdGlvbi9kb3VibGUtdG8tYmluYXJ5LXN0cmluZy5qcyc7XHJcbmltcG9ydCB7IGRvdWJsZVRvT2N0ZXRzIH0gZnJvbSAnLi9kb3VibGUtcmVwcmVzZW50YXRpb24vZG91YmxlLXRvLW9jdGV0cy5qcyc7XHJcbmltcG9ydCB7IGdldEhpZ2hlc3RTZXRCaXQsIGdldExvd2VzdFNldEJpdCB9IGZyb20gJy4vZG91YmxlLXJlcHJlc2VudGF0aW9uL2dldC1tYXgtc2V0LWJpdC5qcyc7XHJcbmltcG9ydCB7IGVJbnRQb3cgfSBmcm9tICcuL2RvdWJsZS1leHBhbnNpb24vZS1pbnQtcG93LmpzJztcclxuaW1wb3J0IHsgZVRvRGQgfSBmcm9tICcuL2RvdWJsZS1leHBhbnNpb24vZS10by1kb3VibGUtZG91YmxlLmpzJztcclxuaW1wb3J0IHsgb3JpZW50MmQgfSBmcm9tICcuL2dlb21ldHJpYy1wcmltaXRpdmVzL29yaWVudDJkLmpzJztcclxuaW1wb3J0IHsgaXNBZGphY2VudCB9IGZyb20gJy4vZG91YmxlLWV4cGFuc2lvbi9pcy1hZGphY2VudC5qcyc7XHJcbmltcG9ydCB7IGlzTm9uT3ZlcmxhcHBpbmdBbGwgfSBmcm9tICcuL2RvdWJsZS1leHBhbnNpb24vaXMtb3ZlcmxhcHBpbmcuanMnO1xyXG5pbXBvcnQgeyBlSXNJbnRlZ2VyIH0gZnJvbSAnLi9kb3VibGUtZXhwYW5zaW9uL2UtaXMtaW50ZWdlci5qcyc7XHJcbi8vIEFsaWFzZXMgZm9yIHNvbWUgZnVuY3Rpb25zIHdoaWNoIG5hbWVzIHdlcmUgbm90IGNoYW5nZWQgZHVlIHRvIHRoZW0gYmVpbmdcclxuLy8gdXNlZCBleHRlbnNpdmVseSBpbiB0aGUgbGl0ZXJhdHVyZSB3aXRoIGEgcGFydGljdWxhciByZWNvZ25pemFibGUgbmFtZVxyXG5jb25zdCBlQWRkID0gZmFzdEV4cGFuc2lvblN1bTtcclxuY29uc3QgZUFkZERvdWJsZSA9IGdyb3dFeHBhbnNpb247XHJcbmNvbnN0IGVNdWx0ID0gZXhwYW5zaW9uUHJvZHVjdDtcclxuY29uc3QgZU11bHREb3VibGUxID0gc2NhbGVFeHBhbnNpb247XHJcbmNvbnN0IGVNdWx0RG91YmxlMiA9IHNjYWxlRXhwYW5zaW9uMjtcclxuY29uc3Qgb3BlcmF0b3JzID0ge1xyXG4gICAgLy8tLS0tIGJhc2ljIC0tLS0vL1xyXG4gICAgZmFzdFR3b0RpZmYsXHJcbiAgICBmYXN0VHdvU3VtLFxyXG4gICAgc3BsaXQsXHJcbiAgICB0d29EaWZmLFxyXG4gICAgdHdvUHJvZHVjdCxcclxuICAgIHR3b1N1bSxcclxuICAgIHJlZHVjZVNpZ25pZmljYW5kLFxyXG4gICAgLy8tLS0tIGRvdWJsZSBmbG9hdGluZyBwb2ludCBleHBhbnNpb25zIC0tLS0vL1xyXG4gICAgZmFzdEV4cGFuc2lvblN1bSwgZUFkZCxcclxuICAgIGdyb3dFeHBhbnNpb24sIGVBZGREb3VibGUsXHJcbiAgICBleHBhbnNpb25Qcm9kdWN0LCBlTXVsdCxcclxuICAgIHNjYWxlRXhwYW5zaW9uLCBlTXVsdERvdWJsZTEsXHJcbiAgICBzY2FsZUV4cGFuc2lvbjIsIGVNdWx0RG91YmxlMixcclxuICAgIGVEaXYsXHJcbiAgICBlTG9uZ0RpdmlkZSxcclxuICAgIGVJbnREaXYsXHJcbiAgICBlUmVtLFxyXG4gICAgZUNvbXByZXNzLFxyXG4gICAgZUVzdGltYXRlLFxyXG4gICAgZURpZmYsXHJcbiAgICBlTmVnYXRpdmVPZixcclxuICAgIGVNdWx0QnkyLFxyXG4gICAgZU11bHRCeU5lZzIsXHJcbiAgICBlRGl2QnkyLFxyXG4gICAgZVNpZ24sXHJcbiAgICBlQ29tcGFyZSxcclxuICAgIGVBYnMsXHJcbiAgICBlVG9CaXRsZW5ndGgsXHJcbiAgICBlSW50UG93LFxyXG4gICAgZUNhbGN1bGF0ZSxcclxuICAgIGVTdW0sXHJcbiAgICBlUHJvZHVjdCxcclxuICAgIGVUb0RkLFxyXG4gICAgLy8tLS0tIGRvdWJsZSBmbG9hdGluZyBwb2ludCByZXByZXNlbnRhdGlvbiAtLS0tLy9cclxuICAgIHBhcnNlRG91YmxlLFxyXG4gICAgcGFyc2VEb3VibGVEZXRhaWxlZCxcclxuICAgIGlzQml0QWxpZ25lZCxcclxuICAgIG1zYkV4cG9uZW50LFxyXG4gICAgbHNiRXhwb25lbnQsXHJcbiAgICBiaXRMZW5ndGgsXHJcbiAgICBleHBCaXRMZW5ndGgsXHJcbiAgICBkb3VibGVUb0JpbmFyeVN0cmluZyxcclxuICAgIGRvdWJsZVRvT2N0ZXRzLFxyXG4gICAgZ2V0SGlnaGVzdFNldEJpdCxcclxuICAgIGdldExvd2VzdFNldEJpdCxcclxuICAgIGV4cG9uZW50LFxyXG4gICAgc2lnbmlmaWNhbmQsXHJcbiAgICAvLy0tLS0gZ2VvbWV0cmljIHByaW1pdGl2ZXNcclxuICAgIG9yaWVudDJkLFxyXG4gICAgLy8tLS0tIG90aGVyc1xyXG4gICAgaXNBZGphY2VudCxcclxuICAgIGlzTm9uT3ZlcmxhcHBpbmdBbGwsXHJcbiAgICBlSXNJbnRlZ2VyXHJcbn07XHJcbmV4cG9ydCB7IG9wZXJhdG9ycyB9O1xyXG5leHBvcnQgeyBcclxuLy8tLS0tIGJhc2ljIC0tLS0vL1xyXG5mYXN0VHdvRGlmZiwgZmFzdFR3b1N1bSwgc3BsaXQsIHR3b0RpZmYsIHR3b1Byb2R1Y3QsIHR3b1N1bSwgcmVkdWNlU2lnbmlmaWNhbmQsIFxyXG4vLy0tLS0gZG91YmxlIGZsb2F0aW5nIHBvaW50IGV4cGFuc2lvbnMgLS0tLS8vXHJcbmZhc3RFeHBhbnNpb25TdW0sIGVBZGQsIGdyb3dFeHBhbnNpb24sIGVBZGREb3VibGUsIGV4cGFuc2lvblByb2R1Y3QsIGVNdWx0LCBzY2FsZUV4cGFuc2lvbiwgZU11bHREb3VibGUxLCBzY2FsZUV4cGFuc2lvbjIsIGVNdWx0RG91YmxlMiwgZURpdiwgZUxvbmdEaXZpZGUsIGVJbnREaXYsIGVSZW0sIGVDb21wcmVzcywgZUVzdGltYXRlLCBlRGlmZiwgZU5lZ2F0aXZlT2YsIGVNdWx0QnkyLCBlTXVsdEJ5TmVnMiwgZURpdkJ5MiwgZVNpZ24sIGVDb21wYXJlLCBlQWJzLCBlVG9CaXRsZW5ndGgsIGVJbnRQb3csIGVDYWxjdWxhdGUsIGVTdW0sIGVQcm9kdWN0LCBlVG9EZCwgXHJcbi8vLS0tLSBkb3VibGUgZmxvYXRpbmcgcG9pbnQgcmVwcmVzZW50YXRpb24gLS0tLS8vXHJcbnBhcnNlRG91YmxlLCBwYXJzZURvdWJsZURldGFpbGVkLCBpc0JpdEFsaWduZWQsIG1zYkV4cG9uZW50LCBsc2JFeHBvbmVudCwgYml0TGVuZ3RoLCBleHBCaXRMZW5ndGgsIGRvdWJsZVRvQmluYXJ5U3RyaW5nLCBkb3VibGVUb09jdGV0cywgZ2V0SGlnaGVzdFNldEJpdCwgZ2V0TG93ZXN0U2V0Qml0LCBleHBvbmVudCwgc2lnbmlmaWNhbmQsIFxyXG4vLy0tLS0gZ2VvbWV0cmljIHByaW1pdGl2ZXNcclxub3JpZW50MmQsIFxyXG4vLy0tLS0gb3RoZXJzXHJcbmlzQWRqYWNlbnQsIGlzTm9uT3ZlcmxhcHBpbmdBbGwsIGVJc0ludGVnZXIgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBncmFoYW1TY2FuIH0gZnJvbSBcIi4uLy4uL3NyYy9pbmRleC5qc1wiO1xyXG5cclxuXHJcbmZ1bmN0aW9uIHRlc3QoKSB7XHJcbiAgICAvLyBjb25zdCBiZXogPSBbWzU4NSw1NThdLCBbNTg2LDU1OV0sIFs1ODksNTYyXSwgWzU5MCw1NjVdXTtcclxuICAgIFxyXG4gICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZ3JhaGFtU2NhbihiZXosIHRydWUpKSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShncmFoYW1TY2FuKGJleiwgZmFsc2UpKSk7XHJcblxyXG4gICAgLy8gY29uc3QgYmV6ID0gW1swLDBdLCBbMSwwXSwgWzEsMV0sIFswLDFdLCBbMCwwLjVdXTtcclxuICAgIGNvbnN0IGJleiA9IFtbMCwwXSwgWzAuNV0sIFsxLDBdLCBbMSwxXSwgWzAsMV1dO1xyXG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZ3JhaGFtU2NhbihiZXopKSk7XHJcbn1cclxuXHJcblxyXG50ZXN0KCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9