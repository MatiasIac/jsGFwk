// This is the core framework and our main entry point.
// This MUST be loaded first.
var jsGFwkSetup = require ('./Framework/jsGFwk');

// extend works just like jQuery.extend
var extend = require('extend');

// This is a list of available plugins.
var fastAnimationPlugin   = require('./Framework/jsGFwk2dFastAnimation');
var basicAnimationPlugin  = require('./Framework/jsGFwkBasicAnimation');
var cameraPlugin          = require('./Framework/jsGFwkCamera');
var collisionsPlugin      = require('./Framework/jsGFwkCollisions');
var containerPlugin       = require('./Framework/jsGFwkContainer');
var debuggerPlugin        = require('./Framework/jsGFwkDebugger');
var effectsPlugin         = require('./Framework/jsGFwkEffects');
var fontsPlugin           = require('./Framework/jsGFwkFonts');
var gamepadPlugin         = require('./Framework/jsGFwkGamepad');
var imagesPlugin          = require('./Framework/jsGFwkImages');
var ioPlugin              = require('./Framework/jsGFwkIO');
var jukeboxPlugin         = require('./Framework/jsGFwkJukebox');
var pathPlugin            = require('./Framework/jsGFwkPath');
var resourceManagerPlugin = require('./Framework/jsGFwkRM');
var scenesPlugin          = require('./Framework/jsGFwkScenes');
var spritesPlugin         = require('./Framework/jsGFwkSprites');
var timersPlugin          = require('./Framework/jsGFwkTimers');
var webStoragePlugin      = require('./Framework/jsGFwkWebStorage');

var defaultOptions = {
  fastAnimation:   true,
  basicAnimation:  true,
  camera:          true,
  collisions:      true,
  container:       true,
  debugger:        true,
  effects:         true,
  fonts:           true,
  gamepad:         true,
  images:          true,
  io:              true,
  jukebox:         true,
  path:            true,
  resourceManager: true,
  scenes:          true,
  sprites:         true,
  timers:          true,
  webStorage:      true,
};


// We export our entire module from here.
module.exports = function (options) {

  if (typeof options === 'undefined') {
    options = {};
  }

  // We extend our options with the defaults.
  var loaded = extend({}, defaultOptions, options);

  var jsGFwk = jsGFwkSetup();

  // We load all modules. In Node, we let things like uglify and webpack to 
  // optimize wich parts aren't using, so they are removed automatically.
  fastAnimationPlugin(loaded.fastAnimation, jsGFwk);
  basicAnimationPlugin(loaded.basicAnimation, jsGFwk);
  cameraPlugin(loaded.camera, jsGFwk);
  collisionsPlugin(loaded.collisions, jsGFwk);
  containerPlugin(loaded.container, jsGFwk);
  debuggerPlugin(loaded.debugger, jsGFwk);
  effectsPlugin(loaded.effects, jsGFwk);
  fontsPlugin(loaded.fonts, jsGFwk);
  gamepadPlugin(loaded.gamepad, jsGFwk);
  imagesPlugin(loaded.images, jsGFwk);
  ioPlugin(loaded.io, jsGFwk);
  jukeboxPlugin(loaded.jukebox, jsGFwk);
  pathPlugin(loaded.path, jsGFwk);
  resourceManagerPlugin(loaded.resourceManager, jsGFwk);
  scenesPlugin(loaded.scenes, jsGFwk);
  spritesPlugin(loaded.sprites, jsGFwk);
  timersPlugin(loaded.timers, jsGFwk);
  webStoragePlugin(loaded.webStorage, jsGFwk);

  return jsGFwk;

};