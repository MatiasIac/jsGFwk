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

### Moving a game object

Move a game object into the screen will depends of how you draw and update it between frames
Having the same "cube" object, you can add a couple of functions and behaviors to move the cube
through the sceen.

```javascript
var cube = jsGame.GameObject.extend({
    name: 'cube',
    visible: true,
    init: function () {
        this.data = { x: 10, y: 10 };
    },
    update: function (delta) {
        this.data.x += 1;
    },
    draw: function (ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.data.x, 50, 20, 20);
    }
});
```

The "init" function is called each time the game object is added into the context.
In this case, when a scene take action in the game.
Use this function to set any value that you will use in this game object.

### Canvas size and clear color

Each time you create a new game, a new canvas is added into the body page.
The default values for the canvas are: width = 640, height = 480, background color = black
You can customize all these properties when you create your game.

```javascript
var myGame = new jsGame.Game(300, 300, 'red');
```

Also, a precreated canvas can be used instead the created by the framework.

```html
<body>
    <canvas id='myCanvas' width="100" height="100"></canvas>
</body>
```

And in your code

```javascript
var myGame = new jsGame.Game(undefined, undefined, 'blue', 'myCanvas');
```

### Capturing the keyboard

jsGame allows you to capture inputs from many different sources, including keyboard, mouse,
gamepads and touchscreens.

The keyboard is always alive and running in background. This means if the playes has a 
keyboard, the framework will capture the keys even if we don't want it to use them.

For a easier keyboard handling, the framework will expose an enumeration with all available
keys, and a safe checker to know if a particular key is pressed or not.

To capture and interact with the keyboard, add the keyboard conditions into the "update" function
of your game object.

```javascript
update: function (delta) {
    if (myGame.keyboard.isPressed(jsGame.Constants.Keys.A)) {
        this.data.x--;
    }

    if (myGame.keyboard.isPressed(jsGame.Constants.Keys.S)) {
        this.data.y++;
    }

    if (myGame.keyboard.isPressed(jsGame.Constants.Keys.D)) {
        this.data.x++;
    }

    if (myGame.keyboard.isPressed(jsGame.Constants.Keys.W)) {
        this.data.y--;
    }
}
```