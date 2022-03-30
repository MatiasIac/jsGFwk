# jsGFwk v3: Release 1

## IMPORTANT NOTE

This version is missing some minor legacy plugins but it is already fully functional. Main plugins have been migrated and tested. You are welcome to use each individual file (As in the old framework) to use *jsGFwk*, or simple use the bundle that can be found in **dist** directory.

## What's this?

This is the third version of jsGFwk and it will become the official one.

The key difference with the older version is the JavaScript language version used on v3.

This version is trying to keep retrocompatibily when it is possible. If you have used version 1, you might need to change the way that you import the plug ins and some minor upgrades to some functions.

## What's jsGFwk?

jsGFwk is a simple, but powerful, JavaScript videogame framework.

The first version of jsGFwk was built more than 7 years ago in 40 hours. From that point the framework kept evolving, adding new features and plug ins to it.

The main difference (*and its reason to exists*) with other frameworks in the market is that jsGFwk doesn't tries to take control of what is happening on your game. It only provides a foundation to build games and gives you full control through your code.

Additionally, it is intended to be extended with plug ins, meaning that, if you find a better way to do something that the jsGFwk does out of the box, you can code it and add it into the foundation.

Each file in the framework is, actually, a plug in that provides a particular functionality. From sound, keyboard and mouse handling, to drawing in the screen or saving data into the browser.

#

<img src="./jsGFwkLogo.png" alt="jsGFwk" width="400" />

This is a very brief introduction of how to use jsGFwk. It is recommended to review the example located [here](./examples/index.html) for a complete example of the different plug ins and components.

### Setup your project

To get the latest version of jsGFwk, please check the latest releases [here](https://github.com/MatiasIac/jsGFwk/tags). Search for the *dist* folder and download the bundle file. Place this file into a folder called *scripts* (Or any other name that makes sense to you).

Include the jsGFwk bundle into your web page.

```html
<script src="./scripts/jsgfwk-bundle.js" lang="javascript"></script>
```

Following, define a canvas where your game will take place.

```html
<canvas id="canvas" width="640" height="480"></canvas>
```

### Plugins

**Engine** - Core engine coordinator.

```javascript
const game = new jsGFwk.Engine();
```

**Animator** - 2D graphic engine.

```javascript
const animator = new jsGFwk.Animator2D();
```

**Collisions** - Collision detector and provider.

```javascript
const collisions = new jsGFwk.Collisions();
```

**ResourceManager** - Load and handles all the game resources.

```javascript
const resourceManager = new jsGFwk.ResourcesManager();
```

**Sprites** - Creates sprintes from loaded resources.

```javascript
const sprites = new jsGFwk.Sprites();
```

**KeyboardIO** - Provides keyboard handling capabilities to the game.

```javascript
const keyboardIO = new jsGFwk.KeyboardIO();
```

**TouchIO** - Provides touch capabilities on devices that support it.

```javascript
const touchIO = new jsGFwk.TouchIO();
```

**MouseIO** - Provides mouse handling capabilities to the game.

```javascript
const mouseIO = new jsGFwk.MouseIO();
```

**WebStorage** - A simple interface with the browser web storage.

```javascript
const webStorage = new jsGFwk.WebStorage();
```

**Jukebox** - Handles sounds allowing the creation of multiple sound channels and others.

```javascript
const myJukebox = new jsGFwk.Jukebox();
```

**ScenesManager** - Allow encapsulate different game objects into a particular scene helping transitioning them between scenes and game states.

```javascript
const scenesManager = new jsGFwk.ScenesManager();
```

### Game plug in

jsGFwk can run several games in the same page. Each game is managed by a set of plugins and coordinated by a particular engine or plugin.

Define a new game engine.

```javascript
const game = new jsGFwk.Engine();
```

Once all the elements were defined, start your game as follows:

```javascript
game.start();
```

### Including plugins

Most of plugins will not work unless they are added into a game engine instance. The game engine will control them and give them the necessary resources to work. Add the instantiated plugins that you want to use as the following example.

```javascript
game.include(animator);
game.include(collisions);
game.include(resourceManager);
game.include(sprites);
game.include(keyboardIO);
game.include(touchIO);
game.include(mouseIO);
game.include(scenesManager);
```
