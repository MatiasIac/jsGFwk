var Levels = [
    {
        startingPoint: { x: 100, y: 150},
        platforms: [
            {"x":0,"y":0,"width":30,"height":480},
            {"x":30,"y":60,"width":210,"height":30},
            {"x":240,"y":30,"width":30,"height":240},
            {"x":60,"y":450,"width":390,"height":30},
            {"x":510,"y":450,"width":120,"height":30},
            {"x":270,"y":240,"width":360,"height":30},
            {"x":600,"y":270,"width":30,"height":180},
            {"x":570,"y":330,"width":30,"height":30},
            {"x":30,"y":135,"width":30,"height":5},
            {"x":210,"y":210,"width":30,"height":5},
            {"x":30,"y":300,"width":30,"height":5}
        ],
        spikes: [
            { x: 120, y: 443, delay: 1.5 },
            { x: 180, y: 443, delay: 1.7 },
            { x: 240, y: 443, delay: 1.2 },
            { x: 300, y: 443, delay: 1.1 },
            { x: 360, y: 443, delay: 1.3 }
        ],
        bats: [
            {x: 80, y: 270, max: 100, upDown: true, speed: 0.02 },
            {x: 170, y: 230, max: 100, upDown: true, speed: 0.01 }
        ],
        blood: [
            /*{ x: 425, y: 90, isActive: true },
            { x: 580, y: 150, isActive: true },
            { x: 440, y: 220, isActive: true }*/
        ],
        fallingWalls: [
            { x: 270, y: 270, fallSpeed: 1.5 },
            { x: 330, y: 270, fallSpeed: 1.5 },
            { x: 390, y: 270, fallSpeed: 1.5 }
        ],
        levers: [
            { x: 578, y: 318, state: 0, wall: { x: 30, y: 450, width: 30, height: 30 } }
        ],
        movableWalls: [
            /*{ x: 140, y: 40, id: 0 },
            { x: 220, y: 240, id: 1 }*/
        ],
        saws: [
            //{ x: 155, y: 300, type: 'circular', speed: 0.02, range: 115 },
            //{ x: 160, y: 252, type: 'linear', speed: 0.1, range: 50 },
        ],
        exit: [ 
            { x: 29, y: 476, width: 30, height: 4, goTo: 1, showsAt: { x: 41, y: 21 } },
            { x: 449, y: 476, width: 61, height: 4, goTo: 1, showsAt: { x: 475, y: 14 } }
        ]
    },
    {
        startingPoint: { x: 150, y: 100},
        platforms: [
            {"x":0,"y":0,"width":30,"height":480},
            {"x":30,"y":450,"width":600,"height":30},
            {"x":60,"y":0,"width":390,"height":30},
            {"x":510,"y":0,"width":120,"height":30},
            {"x":90,"y":30,"width":30,"height":299},
            {"x":90,"y":360,"width":540,"height":30},
            {"x":600,"y":30,"width":30,"height":150},
            {"x":600,"y":240,"width":30,"height":120},
            {"x":300,"y":120,"width":180,"height":30},
            {"x":600,"y":390,"width":30,"height":60},
            {"x":240,"y":240,"width":150,"height":30}
        ],
        spikes: [ ],
        bats: [ ],
        blood: [ ],
        fallingWalls: [],
        levers: [],
        movableWalls: [],
        exit: [ 
            { x: 31, y: 0, width: 30, height: 3, goTo: 0, showsAt: { x: 41, y: 443 } },
            { x: 450, y: 0, width: 59, height: 3, goTo: 0, showsAt: { x: 475, y: 443 } },
            { x: 627, y: 180, width: 3, height: 60, goTo: 2, showsAt: { x: 13, y: 206 } }
        ]
    },
    {
        startingPoint: { x: 150, y: 100},
        platforms: [
            {"x":0,"y":0,"width":30,"height":180},
            {"x":0,"y":240,"width":30,"height":240},
            {"x":600,"y":420,"width":30,"height":60},
            {"x":30,"y":0,"width":600,"height":30},
            {"x":600,"y":30,"width":30,"height":330},
            {"x":150,"y":270,"width":60,"height":5},
            {"x":420,"y":150,"width":60,"height":5},
            {"x":300,"y":450,"width":60,"height":5},
            {"x":450,"y":330,"width":60,"height":5},
            {"x":30,"y":60,"width":120,"height":30}
        ],
        spikes: [ ],
        bats: [ ],
        blood: [ ],
        fallingWalls: [],
        levers: [],
        movableWalls: [],
        exit: [ 
            { x: 0, y: 180, width: 3, height: 60, goTo: 1, showsAt: { x: 603, y: 208 } },
            { x: 627, y: 360, width: 3, height: 60, goTo: 3, showsAt: { x: 32, y: 389 } },
            { x: 30, y: 478, width: 570, height: 2, goTo: 5, showsAt: { x: 292, y: 22 } }
        ]
    },
    {
        startingPoint: { x: 150, y: 100},
        platforms: [
            {"x":0,"y":0,"width":30,"height":360},
            {"x":0,"y":420,"width":30,"height":60},
            {"x":30,"y":420,"width":600,"height":60},
            {"x":570,"y":0,"width":60,"height":420},
            {"x":60,"y":0,"width":510,"height":60},
            {"x":30,"y":120,"width":60,"height":60},
            {"x":270,"y":210,"width":60,"height":60},
            {"x":510,"y":330,"width":60,"height":30},
            {"x":540,"y":360,"width":30,"height":30}
        ],
        spikes: [ ],
        bats: [ ],
        blood: [ ],
        fallingWalls: [],
        levers: [],
        movableWalls: [],
        exit: [ 
            { x: 0, y: 360, width: 3, height: 60, goTo: 2, showsAt: { x: 602, y: 389 } },
            { x: 30, y: 0, width: 30, height: 3, goTo: 4, showsAt: { x: 44, y: 447 } } 
        ]
    },
    {
        startingPoint: { x: 150, y: 100},
        platforms: [
            {"x":600,"y":90,"width":30,"height":390},
            {"x":60,"y":450,"width":540,"height":30},
            {"x":0,"y":330,"width":30,"height":150},
            {"x":30,"y":330,"width":60,"height":30},
            {"x":60,"y":300,"width":90,"height":30},
            {"x":420,"y":90,"width":180,"height":30},
            {"x":450,"y":120,"width":30,"height":150},
            {"x":120,"y":270,"width":360,"height":30},
            {"x":450,"y":330,"width":150,"height":30},
            {"x":240,"y":390,"width":90,"height":60},
            {"x":390,"y":355,"width":60,"height":5},
            {"x":480,"y":210,"width":60,"height":5}
        ],
        spikes: [ ],
        bats: [ ],
        blood: [ ],
        fallingWalls: [],
        levers: [],
        coffin: { x: 500, y: 175 },
        movableWalls: [],
        exit: [ 
            { x: 30, y: 478, width: 30, height: 2, goTo: 3, showsAt: { x: 43, y: 6 } }
        ]
    },
    {
        startingPoint: { x: 150, y: 100},
        platforms: [
            {"x":0,"y":450,"width":390,"height":30},
            {"x":0,"y":0,"width":30,"height":420},
            {"x":420,"y":420,"width":210,"height":60},
            {"x":600,"y":-1,"width":30,"height":421},
            {"x":450,"y":390,"width":150,"height":30},
            {"x":480,"y":360,"width":120,"height":30},
            {"x":510,"y":330,"width":90,"height":30},
            {"x":540,"y":300,"width":60,"height":30},
            {"x":270,"y":90,"width":60,"height":30},
            {"x":390,"y":210,"width":30,"height":5}
        ],
        spikes: [ ],
        bats: [ ],
        blood: [ ],
        fallingWalls: [],
        levers: [],
        coffin: { x: 500, y: 175 },
        movableWalls: [],
        exit: [ 
            { x: 30, y: 0, width: 570, height: 2, goTo: 2, showsAt: { x: 189, y: 442 } } 
        ]
    }
];