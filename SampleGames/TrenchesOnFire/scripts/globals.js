var global = {
	players: 1,
	trenches: 1,
    gunPositions: {
        "down": 0,
        "up": 1,
        "right": 2,
        "upRight": 3,
        "downRight": 4,
        "left": 5,
        "upLeft": 6,
        "downLeft": 7
    },
    gunPositionToAngle: {
        "0": 90,
        "1": 270,
        "2": 0,
        "3": 315,
        "4": 45,
        "5": 180,
        "6": 225,
        "7": 135
    },
    playersConfig: {
        player1: {
            topSpeed: 20,
            friction: 0.7,
            breathInterval: 0.01,
            bulletSpeed: 5,
            bulletFiringInterval: 0.2
        },
        player2: {
            topSpeed: 10,
            friction: 0.95,
            breathInterval: 0.01,
            bulletSpeed: 2,
            bulletFiringInterval: 0.5
        }
    },
	trenchConfig: {
		maxOffsetX: 3,
        trenchDefinition: {
            width: 63,
            height: 63
        }
	},
    sides: {
        "left": 1,
        "right": 2
    },
    gameSpeed: 1,
    gameDimension: {
        width: 640,
        height: 480
    },
    nodeTypes: {
        "vertical": 0,
        "codeDownRight": 1,
        "codeRightUp": 2,
        "horizontal": 3,
        "codeDownLeft": 4,
        "codeLeftUp": 5
    },
    trenchDirections: {
        "right": 1,
        "left": -1
    },
    getAngle: function (angle) {
        "use strict";
        return angle * 0.0174532925199432957;
    }
};