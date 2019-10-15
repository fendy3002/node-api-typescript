import * as mocha from 'mocha';
// assert cannot be defaulted import
import assert = require('assert');
import addContext = require('mochawesome/addContext');

mocha.describe("", function(this) {
  mocha.it("should assert true", function(){
    let actual = true;
    assert.equal(true, actual);
    addContext(this, 'simple string');
  })
})