var jsGame;
(function (jsGame) {
    var Sprite = (function () {
        function Sprite() {
        }
        return Sprite;
    }());
    jsGame.Sprite = Sprite;
    ;
})(jsGame || (jsGame = {}));
var jsGame;
(function (jsGame) {
    var Game = (function () {
        function Game(width, height, clearColor) {
            this._configuration = {
                width: 640,
                height: 480,
                clearColor: 'black'
            };
            this._configuration.width = width || 640;
            this._configuration.height = height || 480;
            this._configuration.clearColor = clearColor || 'black';
        }
        Game.FrameworkObject = (function () {
            function class_1() {
            }
            return class_1;
        }());
        return Game;
    }());
    jsGame.Game = Game;
})(jsGame || (jsGame = {}));
