'use strict'

var mocha;
var chai;
var helper;
var GrahamScan;

if (typeof require === 'undefined') {
	// Browser
} else {
	// Node
	mocha    = require('mocha');
	chai     = require('chai');
	helper   = require('./helpers/helper.js');
	GrahamScan = require('../../graham-scan.js');
}

var { assert, expect } = chai;
var { } = GrahamScan;

describe('', function() {
	it('should ', 
	function() {

	});
});