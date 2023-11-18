import { grahamScan } from "../../src/index.js";


function test() {
    // const bez = [[585,558], [586,559], [589,562], [590,565]];
    
    // console.log(JSON.stringify(grahamScan(bez, true)));
    // console.log(JSON.stringify(grahamScan(bez, false)));

    // const bez = [[0,0], [1,0], [1,1], [0,1], [0,0.5]];
    const bez = [[0,0], [0.5], [1,0], [1,1], [0,1]];
    console.log(JSON.stringify(grahamScan(bez)));
}


test();