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
            {"x":0,"y":0,"width":30,"height":419},
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
        movableWalls: [],
        exit: [ 
            { x: 30, y: 0, width: 570, height: 2, goTo: 2, showsAt: { x: 189, y: 442 } },
            { x: 0, y: 420, width: 2, height: 30, goTo: 6, showsAt: { x: 597, y: 421 } }, 
            { x: 390, y: 478, width: 30, height: 2, goTo: 7, showsAt: { x: 403, y: 5 } }
        ]
    },
    {
        startingPoint: { x: 150, y: 150},
        platforms: [
            {"x":0,"y":0,"width":630,"height":30},
            {"x":0,"y":450,"width":630,"height":30},
            {"x":600,"y":30,"width":30,"height":390},
            {"x":0,"y":30,"width":30,"height":420},
            {"x":90,"y":90,"width":450,"height":30},
            {"x":90,"y":120,"width":30,"height":270},
            {"x":120,"y":360,"width":420,"height":30},
            {"x":510,"y":120,"width":30,"height":209},
            {"x":480,"y":205,"width":30,"height":5},
            {"x":570,"y":270,"width":30,"height":30},
            {"x":540,"y":150,"width":30,"height":30}
        ],
        spikes: [ ],
        bats: [ ],
        blood: [ ],
        fallingWalls: [
            { x: 210, y: 120, fallSpeed: 1.5 },
            { x: 270, y: 120, fallSpeed: 1.5 },
            { x: 330, y: 120, fallSpeed: 1.5 },
            { x: 390, y: 120, fallSpeed: 1.5 }
        ],
        levers: [
            { x: 480, y: 348, state: 0, wall: { "x":510,"y":330,"width":30,"height":30 } }
        ],
        movableWalls: [],
        exit: [ 
            { x: 628, y: 420, width: 2, height: 30, goTo: 5, showsAt: { x: 14, y: 420 } }
        ]
    },
    {
        startingPoint: { x: 150, y: 150},
        platforms: [
            {"x":420,"y":0,"width":210,"height":30},
            {"x":0,"y":0,"width":390,"height":30},
            {"x":600,"y":30,"width":30,"height":30},
            {"x":0,"y":30,"width":30,"height":30},
            {"x":60,"y":450,"width":570,"height":30},
            {"x":0,"y":360,"width":30,"height":120},
            {"x":30,"y":360,"width":90,"height":30},
            {"x":90,"y":390,"width":30,"height":30},
            {"x":375,"y":145,"width":75,"height":5},
            {"x":180,"y":235,"width":60,"height":5}
        ],
        spikes: [],
        bats: [],
        blood: [],
        fallingWalls: [],
        levers: [],
        movableWalls: [],
        exit: [ 
            { x: 390, y: 0, width: 30, height: 2, goTo: 5, showsAt: { x: 403, y: 450 } },
            { x: 0, y: 60, width: 2, height: 300, goTo: 8, showsAt: { x: 610, y: 190 } },
            { x: 628, y: 60, width: 2, height: 390, goTo: 9, showsAt: { x: 14, y: 268 } },
            { x: 30, y: 478, width: 30, height: 2, goTo: 11, showsAt: { x: 32, y: 4 } }
        ]
    },
    {
        startingPoint: { x: 150, y: 150},
        platforms: [
            {"x":600,"y":0,"width":30,"height":60},
            {"x":0,"y":0,"width":600,"height":30},
            {"x":0,"y":450,"width":630,"height":30},
            {"x":540,"y":330,"width":90,"height":120},
            {"x":480,"y":360,"width":60,"height":90},
            {"x":420,"y":390,"width":60,"height":60},
            {"x":0,"y":30,"width":30,"height":420},
            {"x":30,"y":300,"width":210,"height":30},
            {"x":180,"y":270,"width":90,"height":30},
            {"x":240,"y":240,"width":60,"height":30},
            {"x":270,"y":210,"width":60,"height":30},
            {"x":210,"y":330,"width":30,"height":90},
            {"x":120,"y":30,"width":30,"height":120},
            {"x":90,"y":120,"width":30,"height":30}
        ],
        spikes: [],
        bats: [],
        blood: [],
        fallingWalls: [],
        levers: [],
        movableWalls: [],
        exit: [ 
            { x: 628, y: 60, width: 2, height: 270, goTo: 7, showsAt: { x: 10, y: 260 } } 
        ]
    },
    {
        startingPoint: { x: 150, y: 150},
        platforms: [
            {"x":0,"y":0,"width":30,"height":60},
            {"x":30,"y":0,"width":600,"height":30},
            {"x":600,"y":30,"width":30,"height":210},
            {"x":480,"y":30,"width":120,"height":60},
            {"x":450,"y":210,"width":150,"height":30},
            {"x":0,"y":450,"width":630,"height":30},
            {"x":210,"y":330,"width":270,"height":121},
            {"x":480,"y":360,"width":60,"height":90},
            {"x":540,"y":390,"width":30,"height":60},
            {"x":570,"y":420,"width":30,"height":30},
            {"x":150,"y":360,"width":60,"height":90},
            {"x":120,"y":390,"width":30,"height":60},
            {"x":90,"y":420,"width":30,"height":30},
            {"x":90,"y":240,"width":60,"height":5},
            {"x":210,"y":150,"width":68,"height":5},
            {"x":60,"y":75,"width":40,"height":5}
        ],
        spikes: [],
        bats: [],
        blood: [],
        fallingWalls: [],
        levers: [],
        movableWalls: [],
        exit: [ 
            { x: 0, y: 60, width: 2, height: 390, goTo: 7, showsAt: { x: 611, y: 250 } },
            { x: 628, y: 240, width: 2, height: 210, goTo: 10, showsAt: { x: 15, y: 292 } }
        ]
    },
    {
        startingPoint: { x: 495, y: 320},
        platforms: [
            {"x":0,"y":0,"width":30,"height":240},
            {"x":0,"y":360,"width":30,"height":120},
            {"x":30,"y":360,"width":180,"height":5},
            {"x":210,"y":360,"width":420,"height":120},
            {"x":30,"y":90,"width":60,"height":30},
            {"x":30,"y":0,"width":600,"height":3},
            {"x":626,"y":3,"width":4,"height":357},
            {"x":495,"y":183,"width":135,"height":90}
        ],
        spikes: [],
        bats: [],
        blood: [
            { x: 420, y: 320, isActive: true },
            { x: 70, y: 50, isActive: true }            
        ],
        fallingWalls: [],
        levers: [
            {
                x: 40, y: 78, state: 0, walls: [
                    { x: 0, y: 240, width: 30, height: 30 },
                    { x: 0, y: 270, width: 30, height: 30 },
                    { x: 0, y: 300, width: 30, height: 30 },
                    { x: 0, y: 330, width: 30, height: 30 }
                ]
            }
        ],
        movableWalls: [],
        exit: [ 
            { x: 0, y: 240, width: 2, height: 120, goTo: 9, showsAt: { x: 606, y: 350 } } 
        ]
    },
    {
        startingPoint: { x: 60, y: 40},
        platforms: [
            {"x":0,"y":0,"width":30,"height":480},
            {"x":60,"y":0,"width":570,"height":30},
            {"x":30,"y":90,"width":90,"height":270},
            {"x":30,"y":420,"width":240,"height":60},
            {"x":150,"y":90,"width":120,"height":180},
            {"x":150,"y":300,"width":120,"height":120},
            {"x":270,"y":90,"width":30,"height":150},
            {"x":330,"y":90,"width":180,"height":30},
            {"x":360,"y":120,"width":150,"height":90},
            {"x":360,"y":240,"width":150,"height":90},
            {"x":270,"y":451,"width":120,"height":29},
            {"x":330,"y":300,"width":30,"height":90},
            {"x":600,"y":30,"width":30,"height":450},
            {"x":360,"y":330,"width":60,"height":60},
            {"x":480,"y":330,"width":30,"height":90},
            {"x":420,"y":390,"width":30,"height":90},
            {"x":450,"y":450,"width":150,"height":30},
            {"x":570,"y":90,"width":30,"height":240},
            {"x":510,"y":390,"width":30,"height":30}
        ],
        spikes: [],
        bats: [],
        blood: [],
        fallingWalls: [],
        levers: [],
        movableWalls: [],
        exit: [ 
            { x: 30, y: 0, width: 30, height: 2, goTo: 7, showsAt: { x: 41, y: 444 } } 
        ]
    }
];