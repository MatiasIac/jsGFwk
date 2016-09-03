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
        blood: [],
        fallingWalls: [
            { x: 270, y: 270, fallSpeed: 1.5 },
            { x: 330, y: 270, fallSpeed: 1.5 },
            { x: 390, y: 270, fallSpeed: 1.5 }
        ],
        levers: [
            { x: 578, y: 318, state: 0, wall: { x: 30, y: 450, width: 30, height: 30 } }
        ],
        movableWalls: [],
        item: { item: 2, x: 40, y: 115, width: 18, height: 18 },
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
        spikes: [
            { x: 120, y: 443, delay: 1.5 },
            { x: 150, y: 443, delay: 1.6 },
            { x: 180, y: 443, delay: 1.7 },
            { x: 210, y: 443, delay: 1.8 },
            { x: 240, y: 443, delay: 1.9 },
            { x: 270, y: 443, delay: 2 },
            { x: 300, y: 443, delay: 2.1 }
        ],
        bats: [
            {x: 400, y: 400, max: 100, upDown: false, speed: 0.02 },
            {x: 350, y: 100, max: 150, upDown: false, speed: 0.02 }
        ],
        blood: [
            { x: 425, y: 85, isActive: true },
            { x: 45, y: 410, isActive: true }
        ],
        fallingWalls: [
            { x: 270, y: 270, fallSpeed: 1.5 },
            { x: 300, y: 150, fallSpeed: 1.5 },
            { x: 330, y: 150, fallSpeed: 1.5 },
            { x: 430, y: 150, fallSpeed: 1.5 }
        ],
        levers: [
            { x: 578, y: 438, state: 0, wall: { x: 90, y: 330, width: 30, height: 30 },
                otherActions: function () {
                    Levels[4].levers[0].state = 1;
                }
            }
        ],
        movableWalls: [],
        saws: [
            { x: 30, y: 90, type: 'linear', speed: 0, range: 0 },
            { x: 60, y: 180, type: 'linear', speed: 0, range: 0 },
            { x: 30, y: 270, type: 'linear', speed: 0, range: 0 }
        ],
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
        blood: [
            { x: 35, y: 27, isActive: true }
        ],
        fallingWalls: [],
        levers: [],
        movableWalls: [],
        saws: [
            { x: 155, y: 250, type: 'circular', speed: 0.02, range: 100 },
            { x: 420, y: 150, type: 'circular', speed: 0.03, range: 100 },
            { x: 470, y: 300, type: 'circular', speed: 0.025, range: 70 }
        ],
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
        spikes: [
            { x: 60, y: 413, delay: 1.5 },
            { x: 90, y: 413, delay: 1.5 },
            { x: 120, y: 413, delay: 1.5 },
            { x: 150, y: 413, delay: 1.5 },
            { x: 180, y: 413, delay: 1.5 },
            { x: 210, y: 413, delay: 1.5 },
            { x: 240, y: 413, delay: 1.5 },
            { x: 270, y: 413, delay: 1.5 },
            { x: 300, y: 413, delay: 1.5 },
            { x: 330, y: 413, delay: 1.5 },
            { x: 360, y: 413, delay: 1.5 },
            { x: 390, y: 413, delay: 1.5 },
            { x: 420, y: 413, delay: 1.5 },
            { x: 450, y: 413, delay: 1.5 }
        ],
        bats: [
            {x: 250, y: 330, max: 100, upDown: false, speed: 0.03 },
        ],
        blood: [
            { x: 510, y: 380, isActive: true }
        ],
        fallingWalls: [],
        levers: [
            { x: -30, y: -30, state: 0, walls: [
                { x: 30, y: 240, width: 30, height: 30 },
                { x: 60, y: 240, width: 30, height: 30 },
                { x: 90, y: 240, width: 30, height: 30 },
                { x: 120, y: 240, width: 30, height: 30 },
                { x: 150, y: 240, width: 30, height: 30 },
                { x: 180, y: 240, width: 30, height: 30 },
                { x: 210, y: 240, width: 30, height: 30 },
                { x: 240, y: 240, width: 30, height: 30 },
                { x: 330, y: 240, width: 30, height: 30 },
                { x: 360, y: 240, width: 30, height: 30 },
                { x: 390, y: 240, width: 30, height: 30 },
                { x: 420, y: 240, width: 30, height: 30 },
                { x: 450, y: 240, width: 30, height: 30 },
                { x: 480, y: 240, width: 30, height: 30 },
                { x: 510, y: 240, width: 30, height: 30 },
                { x: 540, y: 240, width: 30, height: 30 }] 
            }
        ],
        movableWalls: [],
        exit: [ 
            { x: 0, y: 360, width: 3, height: 60, goTo: 2, showsAt: { x: 602, y: 389 } },
            { x: 30, y: 0, width: 30, height: 3, goTo: 4, showsAt: { x: 44, y: 447 } } 
        ]
    },
    {
        startingPoint: { x: 150, y: 350},
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
        spikes: [
            { x: 360, y: 443, delay: 1.5 },
            { x: 390, y: 443, delay: 1.7 },
            { x: 420, y: 443, delay: 1.2 },
            { x: 450, y: 443, delay: 1.1 },
            { x: 480, y: 443, delay: 1.3 },
            { x: 510, y: 443, delay: 1.3 },
            { x: 540, y: 443, delay: 1.3 },
            { x: 570, y: 443, delay: 1.3 }
        ],
        bats: [ 
            {x: 555, y: 210, max: 80, upDown: true, speed: 0.02 }
        ],
        blood: [
            { x: 570, y: 400, isActive: true }
        ],
        fallingWalls: [
            { x: 200, y: 300, fallSpeed: 1.5 }
        ],
        levers: [
            { x: -20, y: -20, state: 0, wall: { x: 30, y: 400, width: 30, height: 30 } }
        ],
        stakeDoor: { x: 450, y: 300, width: 30, height: 30 },
        coffin: { x: 500, y: 175, width: 30, height: 30 },
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
        spikes: [
            { x: 120, y: 443, delay: 1.5 },
            { x: 180, y: 443, delay: 1.7 },
            { x: 240, y: 443, delay: 1.2 },
            { x: 300, y: 443, delay: 1.1 },
            { x: 360, y: 443, delay: 1.3 },
            { x: 420, y: 443, delay: 1.3 },
            { x: 480, y: 443, delay: 1.3 }
        ],
        bats: [
            {x: 250, y: 70, max: 100, upDown: false, speed: 0.02 }
        ],
        blood: [
            { x: 40, y: 30, isActive: true }
        ],
        fallingWalls: [
            { x: 210, y: 120, fallSpeed: 1.5 },
            { x: 270, y: 120, fallSpeed: 1.5 },
            { x: 330, y: 120, fallSpeed: 1.5 },
            { x: 390, y: 120, fallSpeed: 1.5 }
        ],
        levers: [
            { x: 480, y: 348, state: 0, wall: { "x":510,"y":330,"width":30,"height":30 } }
        ],
        saws: [
            { x: 30, y: 420, type: 'linear', speed: 0, range: 1 }
        ],
        movableWalls: [],
        portal: { x: 120, y: 328 },
        item: { item: 3, x: 488, y: 188, width: 18, height: 18 },
        exit: [ 
            { x: 628, y: 420, width: 2, height: 30, goTo: 5, showsAt: { x: 14, y: 420 } },
            { x: 120, y: 330, width: 19, height: 28, goTo: 11, type: 'portal', showsAt: { x: 450, y: 360 } }
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
        blood: [
            { x: 410, y: 110, isActive: true }
        ],
        fallingWalls: [],
        levers: [
            { x: -10, y: -10, state: 0, wall: { x: 90, y: 420, width: 30, height: 30 } }
        ],
        movableWalls: [
            { x: 200, y: 40, id: 0 },
            { x: 400, y: 30, id: 0 },
            { x: 400, y: 60, id: 1 },
            { x: 200, y: 80, id: 2 }
        ],
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
        bats: [
            {x: 250, y: 170, max: 100, upDown: false, speed: 0.04 },
            {x: 280, y: 360, max: 60, upDown: true, speed: 0.03 }
        ],
        blood: [
            { x: 97, y: 88, isActive: true }
        ],
        fallingWalls: [
            { x: 90, y: 150, fallSpeed: 1.5 },
            { x: 31, y: 31, fallSpeed: 1.5 }
        ],
        levers: [],
        movableWalls: [],
        batteryContainer: { x: 40, y: 396, width: 95, height: 54 },
        skeletonDoor: { x: 210, y: 420, width: 30, height: 30 },
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
        spikes: [
            { x: 240, y: 323, delay: 1.5 },
            { x: 270, y: 323, delay: 1.5 },
            { x: 300, y: 323, delay: 1.5 },
            { x: 390, y: 323, delay: 1.5 },
            { x: 420, y: 323, delay: 1.5 },
            { x: 450, y: 323, delay: 1.5 }
        ],
        bats: [
            {x: 100, y: 270, max: 100, upDown: false, speed: 0.02 },
            {x: 400, y: 170, max: 100, upDown: false, speed: 0.02 }
        ],
        blood: [
            { x: 450, y: 50, isActive: true },
            { x: 74, y: 40, isActive: true }
        ],
        fallingWalls: [
            { x: 260, y: 30, fallSpeed: 1.5 },
            { x: 290, y: 30, fallSpeed: 1.5 },
            { x: 320, y: 30, fallSpeed: 1.5 },
            { x: 350, y: 30, fallSpeed: 1.5 }
        ],
        levers: [
            { x: 575, y: 198, state: 0, walls: [
                    { x: 450, y: 90, width: 30, height: 30 },
                    { x: 420, y: 90, width: 30, height: 30 },
                    { x: 390, y: 90, width: 30, height: 30 }
                ],
                otherActions: function () {
                    Levels[7].levers[0].state = 1;
                } 
            }
        ],
        movableWalls: [
            { x: 390, y: 60, id: 0 },
            { x: 430, y: 60, id: 1 }
        ],
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
        item: { item: 1, x: 530, y: 160, width: 18, height: 18 },
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
        spikes: [
            { x: 120, y: 413, delay: 1.5 },
            { x: 90, y: 413, delay: 1.5 },
            { x: 270, y: 444, delay: 1.5 },
            { x: 300, y: 444, delay: 1.5 },
            { x: 510, y: 384, delay: 1.5 }
        ],
        bats: [],
        blood: [
            { x: 35, y: 380, isActive: true },
            { x: 400, y: 380, isActive: true }
        ],
        saws: [
            { x: 390, y: 420, type: 'linear', speed: 0, range: 1 }
        ],
        fallingWalls: [],
        levers: [],
        movableWalls: [],
        portal: { x: 420, y: 358 },
        foreground: true,
        exit: [
            { x: 30, y: 0, width: 30, height: 2, goTo: 7, showsAt: { x: 41, y: 444 } },
            { x: 390, y: 478, width: 30, height: 2, goTo: 12, showsAt: { x: 400, y: 15 } },
            { x: 420, y: 360, width: 18, height: 30, goTo: 6, showsAt: { x: 150, y: 330 } } 
        ]
    }
  /*  {
        startingPoint: { x: 60, y: 40},
        platforms: [
            {"x":420,"y":0,"width":210,"height":30},
            {"x":0,"y":0,"width":390,"height":30},
            {"x":375,"y":120,"width":75,"height":5},
            {"x":0,"y":30,"width":30,"height":450},
            {"x":30,"y":360,"width":600,"height":120}
        ],
        spikes: [],
        bats: [],
        blood: [],
        fallingWalls: [],
        levers: [],
        movableWalls: [],
        exit: [ 
            { x: 390, y: 0, width: 30, height: 2, goTo: 11, showsAt: { x: 400, y: 446 } },
            { x: 628, y: 31, width: 2, height: 322, goTo: 13, showsAt: { x: 13, y: 203 } }
        ]
    },
    {
        startingPoint: { x: 60, y: 40},
        platforms: [
            {"x":0,"y":0,"width":630,"height":30},
            {"x":120,"y":30,"width":510,"height":30},
            {"x":210,"y":60,"width":420,"height":30},
            {"x":0,"y":360,"width":630,"height":120},
            {"x":570,"y":90,"width":60,"height":150},
            {"x":600,"y":240,"width":30,"height":120},
            {"x":420,"y":295,"width":180,"height":5},
            {"x":120,"y":60,"width":30,"height":120},
            {"x":300,"y":90,"width":30,"height":150},
            {"x":180,"y":230,"width":60,"height":5}
        ],
        spikes: [],
        bats: [],
        blood: [],
        fallingWalls: [],
        levers: [],
        movableWalls: [],
        item: { item: 4, x: 560, y: 270, width: 18, height: 18 },
        exit: [ 
            { x: 0, y: 30, width: 2, height: 323, goTo: 12, showsAt: { x: 604, y: 170 } } 
        ]
    } */
];

var LevelsTemp = [
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
        blood: [],
        fallingWalls: [
            { x: 270, y: 270, fallSpeed: 1.5 },
            { x: 330, y: 270, fallSpeed: 1.5 },
            { x: 390, y: 270, fallSpeed: 1.5 }
        ],
        levers: [
            { x: 578, y: 318, state: 0, wall: { x: 30, y: 450, width: 30, height: 30 } }
        ],
        movableWalls: [],
        item: { item: 2, x: 40, y: 115, width: 18, height: 18 },
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
        spikes: [
            { x: 120, y: 443, delay: 1.5 },
            { x: 150, y: 443, delay: 1.6 },
            { x: 180, y: 443, delay: 1.7 },
            { x: 210, y: 443, delay: 1.8 },
            { x: 240, y: 443, delay: 1.9 },
            { x: 270, y: 443, delay: 2 },
            { x: 300, y: 443, delay: 2.1 }
        ],
        bats: [
            {x: 400, y: 400, max: 100, upDown: false, speed: 0.02 },
            {x: 350, y: 100, max: 150, upDown: false, speed: 0.02 }
        ],
        blood: [
            { x: 425, y: 85, isActive: true },
            { x: 45, y: 410, isActive: true }
        ],
        fallingWalls: [
            { x: 270, y: 270, fallSpeed: 1.5 },
            { x: 300, y: 150, fallSpeed: 1.5 },
            { x: 330, y: 150, fallSpeed: 1.5 },
            { x: 430, y: 150, fallSpeed: 1.5 }
        ],
        levers: [
            { x: 578, y: 438, state: 0, wall: { x: 90, y: 330, width: 30, height: 30 }, otherActions: 4 }
        ],
        movableWalls: [],
        saws: [
            { x: 30, y: 90, type: 'linear', speed: 0, range: 0 },
            { x: 60, y: 180, type: 'linear', speed: 0, range: 0 },
            { x: 30, y: 270, type: 'linear', speed: 0, range: 0 }
        ],
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
        blood: [
            { x: 35, y: 27, isActive: true }
        ],
        fallingWalls: [],
        levers: [],
        movableWalls: [],
        saws: [
            { x: 155, y: 250, type: 'circular', speed: 0.02, range: 100 },
            { x: 420, y: 150, type: 'circular', speed: 0.03, range: 100 },
            { x: 470, y: 300, type: 'circular', speed: 0.025, range: 70 }
        ],
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
        spikes: [
            //{ x: 60, y: 413, delay: 1.5 },
            { x: 90, y: 413, delay: 1.5 },
            { x: 120, y: 413, delay: 1.5 },
            { x: 150, y: 413, delay: 1.5 },
            { x: 180, y: 413, delay: 1.5 },
            { x: 210, y: 413, delay: 1.5 },
            { x: 240, y: 413, delay: 1.5 },
            { x: 270, y: 413, delay: 1.5 },
            { x: 300, y: 413, delay: 1.5 },
            { x: 330, y: 413, delay: 1.5 },
            { x: 360, y: 413, delay: 1.5 },
            { x: 390, y: 413, delay: 1.5 },
            { x: 420, y: 413, delay: 1.5 },
            { x: 450, y: 413, delay: 1.5 }
        ],
        bats: [
            {x: 250, y: 330, max: 100, upDown: false, speed: 0.03 },
        ],
        blood: [
            { x: 510, y: 380, isActive: true }
        ],
        saws: [
            { x: 290, y: 230, type: 'circular', speed: 0.02, range: 115 },
            { x: 300, y: 80, type: 'linear', speed: 0.03, range: 230 },
        ],
        fallingWalls: [],
        levers: [
            { x: -30, y: -30, state: 0, walls: [
                { x: 30, y: 240, width: 30, height: 30 },
                { x: 60, y: 240, width: 30, height: 30 },
                { x: 90, y: 240, width: 30, height: 30 },
                { x: 120, y: 240, width: 30, height: 30 },
                { x: 150, y: 240, width: 30, height: 30 },
                { x: 180, y: 240, width: 30, height: 30 },
                { x: 210, y: 240, width: 30, height: 30 },
                { x: 240, y: 240, width: 30, height: 30 },
                { x: 330, y: 240, width: 30, height: 30 },
                { x: 360, y: 240, width: 30, height: 30 },
                { x: 390, y: 240, width: 30, height: 30 },
                { x: 420, y: 240, width: 30, height: 30 },
                { x: 450, y: 240, width: 30, height: 30 },
                { x: 480, y: 240, width: 30, height: 30 },
                { x: 510, y: 240, width: 30, height: 30 },
                { x: 540, y: 240, width: 30, height: 30 }] 
            }
        ],
        movableWalls: [],
        exit: [ 
            { x: 0, y: 360, width: 3, height: 60, goTo: 2, showsAt: { x: 602, y: 389 } },
            { x: 30, y: 0, width: 30, height: 3, goTo: 4, showsAt: { x: 44, y: 447 } } 
        ]
    },
    {
        startingPoint: { x: 150, y: 350},
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
        spikes: [
            { x: 360, y: 443, delay: 1.5 },
            { x: 390, y: 443, delay: 1.7 },
            { x: 420, y: 443, delay: 1.2 },
            { x: 450, y: 443, delay: 1.1 },
            { x: 480, y: 443, delay: 1.3 },
            { x: 510, y: 443, delay: 1.3 },
            { x: 540, y: 443, delay: 1.3 },
            { x: 570, y: 443, delay: 1.3 }
        ],
        bats: [ 
            {x: 555, y: 210, max: 80, upDown: true, speed: 0.02 }
        ],
        blood: [
            { x: 570, y: 400, isActive: true }
        ],
        fallingWalls: [
            { x: 200, y: 300, fallSpeed: 1.5 }
        ],
        levers: [
            { x: -20, y: -20, state: 0, wall: { x: 30, y: 400, width: 30, height: 30 } }
        ],
        stakeDoor: { x: 450, y: 300, width: 30, height: 30 },
        coffin: { x: 500, y: 175, width: 30, height: 30 },
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
        spikes: [
            { x: 120, y: 443, delay: 1.5 },
            { x: 180, y: 443, delay: 1.7 },
            { x: 240, y: 443, delay: 1.2 },
            { x: 300, y: 443, delay: 1.1 },
            { x: 360, y: 443, delay: 1.3 },
            { x: 420, y: 443, delay: 1.3 },
            { x: 480, y: 443, delay: 1.3 }
        ],
        bats: [
            {x: 250, y: 70, max: 100, upDown: false, speed: 0.02 }
        ],
        blood: [
            { x: 40, y: 30, isActive: true }
        ],
        fallingWalls: [
            { x: 210, y: 120, fallSpeed: 1.5 },
            { x: 270, y: 120, fallSpeed: 1.5 },
            { x: 330, y: 120, fallSpeed: 1.5 },
            { x: 390, y: 120, fallSpeed: 1.5 }
        ],
        levers: [
            { x: 480, y: 348, state: 0, wall: { "x":510,"y":330,"width":30,"height":30 } }
        ],
        saws: [
            { x: 30, y: 420, type: 'linear', speed: 0, range: 1 }
        ],
        movableWalls: [],
        portal: { x: 120, y: 328 },
        item: { item: 3, x: 488, y: 188, width: 18, height: 18 },
        exit: [ 
            { x: 628, y: 420, width: 2, height: 30, goTo: 5, showsAt: { x: 14, y: 420 } },
            { x: 120, y: 330, width: 19, height: 28, type: 'portal', goTo: 11, showsAt: { x: 450, y: 360 } }
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
        blood: [
            { x: 410, y: 110, isActive: true }
        ],
        fallingWalls: [],
        levers: [
            { x: -10, y: -10, state: 0, wall: { x: 90, y: 420, width: 30, height: 30 } }
        ],
        movableWalls: [
            { x: 200, y: 40, id: 0 },
            { x: 400, y: 30, id: 0 },
            { x: 400, y: 60, id: 1 },
            { x: 200, y: 80, id: 2 }
        ],
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
        bats: [
            {x: 250, y: 170, max: 100, upDown: false, speed: 0.04 },
            {x: 280, y: 360, max: 60, upDown: true, speed: 0.03 }
        ],
        blood: [
            { x: 97, y: 88, isActive: true }
        ],
        fallingWalls: [
            { x: 90, y: 150, fallSpeed: 1.5 },
            { x: 31, y: 31, fallSpeed: 1.5 }
        ],
        levers: [],
        movableWalls: [],
        batteryContainer: { x: 40, y: 396, width: 95, height: 54 },
        skeletonDoor: { x: 210, y: 420, width: 30, height: 30 },
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
        spikes: [
            { x: 240, y: 323, delay: 1.5 },
            { x: 270, y: 323, delay: 1.5 },
            { x: 300, y: 323, delay: 1.5 },
            { x: 390, y: 323, delay: 1.5 },
            { x: 420, y: 323, delay: 1.5 },
            { x: 450, y: 323, delay: 1.5 }
        ],
        bats: [
            {x: 100, y: 270, max: 100, upDown: false, speed: 0.02 },
            {x: 400, y: 170, max: 100, upDown: false, speed: 0.02 }
        ],
        blood: [
            { x: 450, y: 50, isActive: true },
            { x: 74, y: 40, isActive: true }
        ],
        fallingWalls: [
            { x: 260, y: 30, fallSpeed: 1.5 },
            { x: 290, y: 30, fallSpeed: 1.5 },
            { x: 320, y: 30, fallSpeed: 1.5 },
            { x: 350, y: 30, fallSpeed: 1.5 }
        ],
        levers: [
            { x: 575, y: 198, state: 0, walls: [
                    { x: 450, y: 90, width: 30, height: 30 },
                    { x: 420, y: 90, width: 30, height: 30 },
                    { x: 390, y: 90, width: 30, height: 30 }
                ], otherActions: 7 }
        ],
        movableWalls: [
            { x: 390, y: 60, id: 0 },
            { x: 430, y: 60, id: 1 }
        ],
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
        item: { item: 1, x: 530, y: 160, width: 18, height: 18 },
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
        spikes: [
            { x: 120, y: 413, delay: 1.5 },
            { x: 90, y: 413, delay: 1.5 },
            { x: 270, y: 444, delay: 1.5 },
            { x: 300, y: 444, delay: 1.5 },
            { x: 510, y: 384, delay: 1.5 }
        ],
        bats: [],
        blood: [
            { x: 35, y: 380, isActive: true },
            { x: 400, y: 380, isActive: true }
        ],
        saws: [
            { x: 390, y: 420, type: 'linear', speed: 0, range: 1 }
        ],
        fallingWalls: [],
        levers: [],
        movableWalls: [],
        portal: { x: 420, y: 358 },
        foreground: true,
        exit: [
            { x: 30, y: 0, width: 30, height: 2, goTo: 7, showsAt: { x: 41, y: 444 } },
            { x: 390, y: 478, width: 30, height: 2, goTo: 12, showsAt: { x: 400, y: 15 } },
            { x: 420, y: 360, width: 18, height: 30, type: 'portal', goTo: 6, showsAt: { x: 150, y: 330 } } 
        ]
    }
   /* {
        startingPoint: { x: 60, y: 40},
        platforms: [
            {"x":420,"y":0,"width":210,"height":30},
            {"x":0,"y":0,"width":390,"height":30},
            {"x":375,"y":120,"width":75,"height":5},
            {"x":0,"y":30,"width":30,"height":450},
            {"x":30,"y":360,"width":600,"height":120}
        ],
        spikes: [],
        bats: [],
        blood: [],
        fallingWalls: [],
        levers: [],
        movableWalls: [],
        exit: [ 
            { x: 390, y: 0, width: 30, height: 2, goTo: 11, showsAt: { x: 400, y: 446 } },
            { x: 628, y: 31, width: 2, height: 322, goTo: 13, showsAt: { x: 13, y: 203 } }
        ]
    },
    {
        startingPoint: { x: 60, y: 40},
        platforms: [
            {"x":0,"y":0,"width":630,"height":30},
            {"x":120,"y":30,"width":510,"height":30},
            {"x":210,"y":60,"width":420,"height":30},
            {"x":0,"y":360,"width":630,"height":120},
            {"x":570,"y":90,"width":60,"height":150},
            {"x":600,"y":240,"width":30,"height":120},
            {"x":420,"y":295,"width":180,"height":5},
            {"x":120,"y":60,"width":30,"height":120},
            {"x":300,"y":90,"width":30,"height":150},
            {"x":180,"y":230,"width":60,"height":5}
        ],
        spikes: [],
        bats: [],
        blood: [],
        fallingWalls: [],
        levers: [],
        movableWalls: [],
        item: { item: 4, x: 560, y: 270, width: 18, height: 18 },
        exit: [ 
            { x: 0, y: 30, width: 2, height: 323, goTo: 12, showsAt: { x: 604, y: 170 } } 
        ]
    }*/
];