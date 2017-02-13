const jsGFwk = require ('../index')({ fastAnimation: false });

const { expect } = require('chai');

describe('Testing node packages', function() {

  it('Checks than the core library exists', function () {
    expect(jsGFwk).to.exist;
  });

  it('Checks than the Fast Animation library was not loaded', function () {
    expect(jsGFwk.FastAnimation).to.not.exist;
  });
})