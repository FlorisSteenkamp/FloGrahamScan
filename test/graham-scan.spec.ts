import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { grahamScan } from '../src/index.js';


describe('graham scan', function() {
    it('should do graham-scan by passing basic examples',
    function() {
        const ps1 = [[0,0], [1,0], [1,1], [0,1]];
        const r1 = ps1;
        test(ps1, r1);

        const ps2 = [[0,0], [0.5,0], [1,0], [1,0.5], [1,1], [0.5,1], [0,1], [0,0.5]];
        test(ps2, r1);

        const ps3 = [[0,0], [0.5,0.0001], [1,0], [1,0.5], [1,1], [0.5,1], [0,1], [0,0.5]];
        test(ps3, r1);

        const ps4 = [[0,0], [0.5,-0.0001], [1,0], [1,0.5], [1,1], [0.5,1], [0,1], [0,0.5]];
        test(ps4, [[0.5,-0.0001], [1,0], [1,1], [0,1], [0,0]]);

        const square = [[0,0], [1,0], [1,1], [0,1]];
        const ps5 = [[0,0], [1,0], [1,1], [0,1], [0,0.5]];
        test(ps5, square);

        const ps6 = [[0,0], [0.5,0], [1,0], [1,1], [0,1]];
        test(ps6, square);

        const ps7 = [[0,0], [0.17,0], [0.5,0], [1,0], [1,1], [0,1]];
        test(ps7, square);

        const ps8 = [[0,0], [0.5,0], [0.17,0], [1,0], [1,1], [0,1]];
        test(ps8, square);

        const ps9 = [
            [0,0],
            [0,0],
            [0,0],
            [0.5,0],
            [0.17,0],
            [1,0],
            [1,0.33],
            [1,0.34],
            [1,0.34],
            [1,1],
            [0,1],
            [0,1],
            [0,1],
            [0,1]
        ];
        test(ps9, square);

        const psa = [
            [0,0],
            [0,0],
            [0,0],
            [0.17,0],
            [1,0],
            [1,0.33],
            [0.5,0],
            [1,0.34],
            [1,0.34],
            [1,1],
            [0.44,1],
            [0.45,1],
            [0.44,1],
            [0,1],
            [0,0.33],
            [0,1],
            [0,0.55],
            [0,1],
            [0,1]
        ];
        test(psa, square);
    });

    it('should do graham-scan by passing with collinear points',
    function() {
        const ps1 = [[585,558], [586,559], [589,562], [590,565]];
        const r1 = [[585,558],[589,562],[590,565]];
        test(ps1, r1);

        const ps2 = [[585,558], [586,559], [589,562], [594,567]];
        const r2 = [[585,558],[594,567]];
        test(ps2, r2);
    });

	it('should robustly do graham-scan by passing `Classroom Examples of Robustness Problems`',
	function() {
        // Examples from Classroom Examples of Robustness Problems in Geometric Computations 
        // See https://people.mpi-inf.mpg.de/~mehlhorn/ftp/classroomExamplesNonrobustness.pdf

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

        // Failure A1 (global): A point outside the current hull sees no edge of the current hull.
        let A1g = [
            [0.10000000000000001,0.10000000000000001],
            [0.20000000000000001,0.20000000000000004],
            [0.79999999999999993,0.80000000000000004],
            [1.267650600228229 * 1e30, 1.2676506002282291 * 1e30]
        ];

        // Failure A2: A point inside the current hull sees an edge of the current hull.
        let A2 = [
            [27.643564356435643, -21.881188118811881],
            [83.366336633663366, 15.544554455445542],
            [4.0, 4.0],
            [73.415841584158414, 8.8613861386138595]
        ];

        // Failure A2 (visible): A point inside the current hull sees an edge of the current hull.
        let A2v = [
            [24.00000000000005, 24.000000000000053],
            [24, 6],
            [54.850000000000357, 61.000000000000121],
            [24.000000000000068, 24.000000000000071],
            [6,6]
        ];


        // Failure B1: A point outside the current hull sees all edges of the convex hull.
        let B1 = [
            [200.0, 49.200000000000003],
            [100.0, 49.600000000000001],
            [-233.33333333333334, 50.93333333333333],
            [166.66666666666669, 49.333333333333336]
        ];

        // Failure B2: A point outside the current hull sees a non-contiguous set of edges.
        let B2 = [
            [0.50000000000001243, 0.50000000000000189],
            [0.50000000000001243, 0.50000000000000333],
            [24.00000000000005, 24.000000000000053],
            [24.000000000000068, 24.000000000000071],
            [17.300000000000001, 17.300000000000001]
        ];

        test(A1, [
            [0.50000000000001621, 0.50000000000001243],
            [8, 4],
            [19,11],
            [26,25],
            [15,27],
            [4, 9]
        ]);
    
        //test(A1g, []);

        test(A2, [
            [27.643564356435643, -21.88118811881188],
            [83.36633663366337, 15.544554455445542],
            [4, 4]
        ]);

        //test(A2v, []);
        //test(B1, []);
        //test(B2, []);
    });
});


function test(
        ps: number[][],
        result: number[][]) {

    let hull = grahamScan(ps);

    console.log(hull);
    expect(hull).to.eql(result);
}
