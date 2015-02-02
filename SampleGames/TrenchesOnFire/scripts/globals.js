var global = {
	players: 1,
	trenches: 1,
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
    }
};