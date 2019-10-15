import * as mocha from 'mocha';
// assert cannot be defaulted import
import assert = require('assert');
import addContext = require('mochawesome/addContext');
import chai = require('chai');
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

import app from '../../src/app';

mocha.describe("", function(this) {
  mocha.it("should 204 healthcheck", async function(){
    let initApp = await app();
    let response = await chai.request(initApp.app)
      .get('/~/health');
    addContext(this, {
      title: "res.status",
      value: response.status
    });
    assert.equal(204, response.status);
  })
})