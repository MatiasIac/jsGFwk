const jsGFwk = require ('../index')();

const { expect } = require('chai');

describe('Testing node packages', function() {
  it('Checks than the core library exists', function () {
    expect(jsGFwk).to.exist;
  });

  it('Checks than the Fast Animation library exists', function () {
    expect(jsGFwk.FastAnimation).to.exist;
  });

  it('Checks than the Basic Animation library exists', function () {
    expect(jsGFwk.BasicAnimation).to.exist;
  });

  it('Checks than the Camera library exists', function () {
    expect(jsGFwk.Camera).to.exist;
  });

  it('Checks than the Collisions library exists', function () {
    expect(jsGFwk.Collisions).to.exist;
  });

  it('Checks than the Container library exists', function () {
    expect(jsGFwk.Container).to.exist;
  });

  it('Checks than the Debugger library exists', function () {
    expect(jsGFwk.Debugger).to.exist;
  });

  it('Checks than the Effects library exists', function () {
    expect(jsGFwk.Effects).to.exist;
  });

  it('Checks than the Fonts library exists', function () {
    expect(jsGFwk.Fonts).to.exist;
  });              

  it('Checks than the Fonts library exists', function () {
    expect(jsGFwk.Fonts).to.exist;
  });              

  it('Checks than the Fonts library exists', function () {
    expect(jsGFwk.Fonts).to.exist;
  });              


  it('Checks than the Gamepad library exists', function () {
    expect(jsGFwk.Gamepad).to.exist;
  });              


  it('Checks than the Images library exists', function () {
    expect(jsGFwk.Images).to.exist;
  });              


  it('Checks than the IO library exists', function () {
    expect(jsGFwk.IO).to.exist;
  });              


  it('Checks than the Jukebox library exists', function () {
    expect(jsGFwk.Jukebox).to.exist;
  });              

  it('Checks than the Path library exists', function () {
    expect(jsGFwk.Path).to.exist;
  });              

  it('Checks than the Resource Manager library exists', function () {
    expect(jsGFwk.ResourceManager).to.exist;
  });              

  it('Checks than the Scenes library exists', function () {
    expect(jsGFwk.Scenes).to.exist;
  });              
  
  it('Checks than the Timer library exists', function () {
    expect(jsGFwk.Timer).to.exist;
  });                 

  it('Checks than the Storage library exists', function () {
    expect(jsGFwk.Storage).to.exist;
  });         

});