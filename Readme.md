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

### Adding a game object into the game

In jsGame framework all is about scenes. A scene will help you to handle transitions between
different sections of the game (Loading screen, main menu, level 1, level n, end game, etc.).
With this in mind, a scene will hold all those game objects that could be part of the scene.

Also, any game object must extend the functionality of the game object base before been added
into the game.

```javascript
var myGame = new jsGame.Game();

//a game object is created
//name is a required property and must be unique.
//visible will let the framework know if the object must be renderer or not
//draw must be used to draw the object on the screen using primitive html5 directives
//update will contain all the logic for this game object 
var cube = jsGame.GameObject.extend({
    name: 'cube',
    visible: true,
    draw: function (ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(50, 50, 20, 20);
    }
});

//the main scene is created and in it, the cube
myGame.scene.add('main', [cube]);

//the main scene is enabled
myGame.scene.enable('main');

//the game is started
myGame.start();
```