import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { grahamScan } from '../src/index.js';


describe('graham scan', function() {
    it('should do graham-scan by passing basic examples',
    function() {
        {
            // no points
            const ps: number[][] = [];
            const hullA = grahamScan(ps, false);
            const hullB = grahamScan(ps, true);

            expect(hullA).to.be.undefined;
            expect(hullB).to.be.undefined;
        }

        {
            // one points
            const ps: number[][] = [[2,3]];
            const hullA = grahamScan(ps, false);
            const hullB = grahamScan(ps, true);
            const r = ps;

            expect(hullA).to.eql(r);
            expect(hullB).to.eql(r);
        }

        {
            // two coincident points
            const ps: number[][] = [[2,3],[2,3]];
            const hullA = grahamScan(ps, false);
            const hullB = grahamScan(ps, true);
            const rA = [[2,3]];
            const rB = [[2,3]];  // coincidents point are always removed except one

            expect(hullA).to.eql(rA);
            expect(hullB).to.eql(rB);
        }


        {
            // points on a square with 2 redundant convex hull points
            const ps = [[0,0], [1,0], [2,0], [2,1], [2,2], [0,2]];
            const r =  [[0,0],        [2,0],        [2,2], [0,2]];
            const hull = grahamScan(ps, false);
            expect(hull).to.eql(r);
        }
        {
            // points on a square with 2 redundant convex hull points
            const ps = [[0,0], [1,0], [2,0], [2,1], [2,2], [0,2]];
            const r =  [[0,0], [1,0], [2,0], [2,1], [2,2], [0,2]];
            const hull = grahamScan(ps, true);
            expect(hull).to.eql(r);
        }

        {
            const ps = [[0,0], [1,0], [1,1], [0,1]];
            const r = ps;
            const hull = grahamScan(ps, false);
            expect(hull).to.eql(r);
        }

        {
            const ps = [[0,0], [0.5,0], [1,0], [1,0.5], [1,1], [0.5,1], [0,1], [0,0.5]];
            const r = [[0,0], [1,0], [1,1], [0,1]];
            const hull = grahamScan(ps, false);
            expect(hull).to.eql(r);
        }

        {
            const ps = [[0,0], [0.5,0.0001], [1,0], [1,0.5], [1,1], [0.5,1], [0,1], [0,0.5]];
            const r = [[0,0], [1,0], [1,1], [0,1]];
            const hull = grahamScan(ps, false);
            expect(hull).to.eql(r);
        }

        {
            const ps = [[0,0], [0.5,-0.0001], [1,0], [1,0.5], [1,1], [0.5,1], [0,1], [0,0.5]];
            const r = [[0.5,-0.0001], [1,0], [1,1], [0,1], [0,0]];
            const hull = grahamScan(ps, false);
            expect(hull).to.eql(r);
        }

        const square = [[0,0], [1,0], [1,1], [0,1]];
        {
            const ps = [[0,0], [1,0], [1,1], [0,1], [0,0.5]];
            const hull = grahamScan(ps, false);
            expect(hull).to.eql(square);
        }
        {
            const ps = [[0,0], [0.5,0], [1,0], [1,1], [0,1]];
            const hull = grahamScan(ps, false);
            expect(hull).to.eql(square);
        }
        {
            const ps = [[0,0], [0.17,0], [0.5,0], [1,0], [1,1], [0,1]];
            const hull = grahamScan(ps, false);
            expect(hull).to.eql(square);
        }
        {
            const ps = [[0,0], [0.5,0], [0.17,0], [1,0], [1,1], [0,1]];
            const hull = grahamScan(ps, false);
            expect(hull).to.eql(square);
        }
        {
            const ps = [
                [0,0], [0,0], [0,0],
                [0.5,0], [0.17,0], [1,0],
                [1,0.33], [1,0.34], [1,0.34], [1,1],
                [0,1], [0,1], [0,1], [0,1]
            ];

            const hull = grahamScan(ps, false);

            expect(hull).to.eql(square);
        }
        {
            const ps = [
                [0,0], [0,0], [0,0],
                [0.17,0], [1,0], [1,0.33],
                [0.5,0], [1,0.34], [1,0.34], [1,1],
                [0.44,1], [0.45,1], [0.44,1],
                [0,1], [0,0.33], [0,1],
                [0,0.55], [0,1], [0,1]
            ];
            const hull = grahamScan(ps, false);
            expect(hull).to.eql(square);
        }
    });

    it('should do graham-scan by passing with collinear points',
    function() {
        {
            // 2 out of the 4 points are collinear
            const ps = [[85,58], [86,59], [89,62], [90,65]];
            const r  = [[85,58], [89,62],          [90,65]];
            const hull = grahamScan(ps, false);
            expect(hull).to.eql(r);
        }
        {
            // 2 out of the 4 points are collinear
            const ps = [[85,58], [86,59], [89,62], [90,65]];
            const r  = [[85,58], [86,59], [89,62], [90,65]];
            const hull = grahamScan(ps, true);
            expect(hull).to.eql(r);
        }


        {
            // All 4 points are collinear
            const ps = [[85,58], [86,59], [89,62], [94,67]];
            const r =  [[85,58],                   [94,67]];
            const hull = grahamScan(ps, false);
            expect(hull).to.eql(r);
        }
        {
            // All 4 points are collinear
            const ps = [[85,58], [86,59], [89,62], [94,67]];
            const r =  [[85,58], [86,59], [89,62], [94,67]];
            const hull = grahamScan(ps, true);
            expect(hull).to.eql(r);
        }
    });

	it('should robustly do graham-scan by passing `Classroom Examples of Robustness Problems`',
	function() {
        // Examples from Classroom Examples of Robustness Problems in Geometric Computations 
        // See https://people.mpi-inf.mpg.de/~mehlhorn/ftp/classroomExamplesNonrobustness.pdf

        {
            // Failure A1: A point outside the current hull sees no edge of the current hull.
            let A1 = [
                [7.3000000000000194, 7.3000000000000167],     // in hull? no
                [24.000000000000068, 24.000000000000071],     // in hull? no
                [24.00000000000005, 24.000000000000053],      // in hull? no
                [0.50000000000001621, 0.50000000000001243],   // in hull? yes
                [8, 4],   // in hull? yes
                [4, 9],   // in hull? yes
                [15,27],  // in hull? yes
                [26,25],  // in hull? yes
                [19,11]   // in hull? yes
            ];

            const r = [
                [0.50000000000001621, 0.50000000000001243],
                [8, 4],
                [19,11],
                [26,25],
                [15,27],
                [4, 9]
            ];

            const hull = grahamScan(A1, false);

            expect(hull).to.eql(r);
        }

        {
            // Failure A1 (global): A point outside the current hull sees no edge of the current hull.
            let A1g = [
                [0.10000000000000001,0.10000000000000001],
                [0.20000000000000001,0.20000000000000004],
                [0.79999999999999993,0.80000000000000004],
                [1.267650600228229 * 1e30, 1.2676506002282291 * 1e30]
            ];
        }

        {
            // Failure A2: A point inside the current hull sees an edge of the current hull.
            let A2 = [
                [27.643564356435643, -21.881188118811881],
                [83.366336633663366, 15.544554455445542],
                [4.0, 4.0],
                [73.415841584158414, 8.8613861386138595]
            ];

            const r = [
                [27.643564356435643, -21.88118811881188],
                [83.36633663366337, 15.544554455445542],
                [4, 4]
            ];

            const hull = grahamScan(A2, false);
            expect(hull).to.eql(r);
        }

        {
            // Failure A2 (visible): A point inside the current hull sees an edge of the current hull.
            let A2v = [
                [24.00000000000005, 24.000000000000053],
                [24, 6],
                [54.850000000000357, 61.000000000000121],
                [24.000000000000068, 24.000000000000071],
                [6,6]
            ];
        }

        {
            // Failure B1: A point outside the current hull sees all edges of the convex hull.
            let B1 = [
                [200.0, 49.200000000000003],
                [100.0, 49.600000000000001],
                [-233.33333333333334, 50.93333333333333],
                [166.66666666666669, 49.333333333333336]
            ];
        }

        {
            // Failure B2: A point outside the current hull sees a non-contiguous set of edges.
            let B2 = [
                [0.50000000000001243, 0.50000000000000189],
                [0.50000000000001243, 0.50000000000000333],
                [24.00000000000005, 24.000000000000053],
                [24.000000000000068, 24.000000000000071],
                [17.300000000000001, 17.300000000000001]
            ];
        }
    });
});
