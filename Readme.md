# jsGFwk

A simple framework for game development.

## What's this?

This is a simple minimalistic game framework for JavaScript and HTML5

This framework will allow you to:

- Create simple 2D games with HTML5 and JavaScript
- Handles image and sound resources for your games
- Includes basic rect boxing collision
- Handles keyboard and mouse for your games

More important:

- To be used as a foundation for complex games or to work with other frameworks

AND REMEMBER. SIMPLICITY IS THE BEST.

## How to use it in node

First install it: (adding a published package in npm in the future)

```sh
npm install --save github:MatiasIac/jsGFwk
```

Then you need to load an instance of the framework.

The framework can be loaded multiple times on node:

Add a file, such as: framework.js in your project:

### ES5: 

```js
const jsGFwkSetup = require('jsgfwk');
module.exports = jsGFwkSetup({
  // Here you can put the modules you want to load,
  // All are by default loaded, but you can disable one using:
  fastAnimations: false,
  // To disable fastAnimations, under this list is a list of plugins.
})
```

### ES6:

```js
import jsGFwkSetup from 'jsgfwk';

export default jsGFwkSetup({
  // Here you can put the modules you want to load,
  // All are by default loaded, but you can disable one using:
  fastAnimations: false,
  // To disable fastAnimations, under this list is a list of plugins.  
})

```

## What Plugins are available

| Plugin Name       | Description               | Configuration name |
| ----------------- | ------------------------- | ------------------ |
| Basic Animations  |                           |  basicAnimations   |
| Fast Animations   |                           |  fastAnimations    |
| Camera            |                           |  camera            |
| Collisions        |                           |  collisions        |
| Container         |                           |  container         |
| Debugger          |                           |  debugger          |
| Effects           |                           |  effects           |
| Fonts             |                           |  fonts             |
| Gamepad           |                           |  gamepad           |
| Images            |                           |  images            |
| IO                |                           |  io                |
| Jukebox           |                           |  jukebox           |
| Path              |                           |  path              |
| Resource Manager  |                           |  resourceManager   |
| Scenes            |                           |  scenes            |
| Sprites           |                           |  sprites           |
| Sugar             |Simplifies getters/settes  |  (Not exported)    |
| Timers            |                           |  timers            |
| Web Storage       |                           |  webStorage        |

## Testing the framework

First, clone this repository and install dependencies:

```sh 
npm install
```

Then just run:

```sh 
npm run test
```