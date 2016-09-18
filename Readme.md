# jsGame framework

This is a simple and minimalistic videogame framework for JavaScript and HTML5.

jsGame uses 2D canvas (No WebGL) to render objects on the screen.

## Version 2

Version 2 is a more object oriented version than the initial, trying to apply 
better coding practices and a better experience for the developer.

Instead of the original version, where you was able to include different functionalities
of the whole framework, this time the whole frame is presented as one piece of software
and can't be divided (But extendend) in parts.

## Compilation and construction

This version is completely created with TypeScript. You will need a compiler to get an older
javascript code version. 

## Usage

### Creating a game object

```javascript
var myGame = new jsGame.Game();
//game object goes here
myGame.start();
```