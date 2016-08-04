var Levels = [
    {
        startingPoint: { x: 35, y: 35},
        platforms: [

            {"x":1,"y":1,"width":28,"height":478},
            {"x":29,"y":0,"width":600,"height":29},
            {"x":29,"y":95,"width":151,"height":30},
            {"x":230,"y":96,"width":81,"height":29},
            {"x":311,"y":65,"width":240,"height":30},
            {"x":310,"y":96,"width":27,"height":194},
            {"x":128,"y":287,"width":87,"height":8},
            {"x":370,"y":126,"width":231,"height":28},
            {"x":369,"y":188,"width":30,"height":29},
            {"x":431,"y":188,"width":29,"height":28},
            {"x":489,"y":188,"width":30,"height":29},
            {"x":548,"y":188,"width":53,"height":28},
            {"x":370,"y":261,"width":28,"height":28},
            {"x":431,"y":261,"width":29,"height":28},
            {"x":490,"y":261,"width":29,"height":28},
            {"x":548,"y":260,"width":53,"height":29},
            {"x":601,"y":30,"width":28,"height":388},
            {"x":29,"y":450,"width":600,"height":29}

            /*{ width: 30, height: 480, x: 0, y: 0 },
            { width: 570, height: 30, x: 30, y: 0 },
            { width: 30, height: 419, x: 600, y: 0 },
            { width: 600, height: 30, x: 30, y: 450 },
            
            { width: 150, height: 30, x: 30, y: 95 },
            { width: 107, height: 30, x: 230, y: 95 },
            { width: 240, height: 30, x: 310, y: 65 },
            { width: 231, height: 30, x: 369, y: 125 },
            { width: 30, height: 165, x: 307, y: 125 },
            { width: 30, height: 30, x: 369, y: 187 },
            { width: 30, height: 30, x: 430, y: 187 },
            { width: 30, height: 30, x: 489, y: 187 },
            { width: 53, height: 30, x: 547, y: 187 },
            { width: 30, height: 30, x: 369, y: 260 },
            { width: 30, height: 30, x: 430, y: 260 },
            { width: 30, height: 30, x: 489, y: 260 },
            { width: 53, height: 30, x: 547, y: 260 }*/        
        ],
        spikes: [
            { x: 390, y: 118, delay: 1.5 },
            { x: 447, y: 118, delay: 1.7 },
            { x: 510, y: 118, delay: 1.2 }
        ],
        bats: [
            {x: 190, y: 130, max: 100, upDown: true, speed: 0.02 },
            {x: 450, y: 160, max: 100, upDown: false, speed: 0.01 },
            {x: 450, y: 230, max: 100, upDown: false, speed: 0.03 }
        ],
        blood: [
            { x: 425, y: 90, isActive: true },
            { x: 580, y: 150, isActive: true },
            { x: 440, y: 220, isActive: true }
        ],
        fallingWalls: [
            { x: 230, y: 125, fallSpeed: 1.5 },
            { x: 369, y: 290, fallSpeed: 1.5 },
            { x: 489, y: 290, fallSpeed: 1.5 }
        ],
        levers: [
            { x: 80, y: 83, state: 0, wall: { x: 150, y: 350, width: 30, height: 30 } },
            { x: 130, y: 83, state: 0, wall: { x: 200, y: 350, width: 30, height: 30 } }
        ],
        movableWalls: [
            { x: 140, y: 40, id: 0 },
            { x: 220, y: 240, id: 1 }
        ],
        saws: [
            //{ x: 155, y: 300, type: 'circular', speed: 0.02, range: 115 },
            //{ x: 160, y: 252, type: 'linear', speed: 0.1, range: 50 },
        ],
        coffin: { x: 35, y: 60 },
        exit: [ { x: 625, y: 420, goTo: 1, showsAt: { x: 20, y: 420 } } ]
    },
    {
        startingPoint: { x: 35, y: 35},
        platforms: [
            { width: 30, height: 419, x: 0, y: 0 },
            { width: 570, height: 30, x: 30, y: 0 },
            { width: 30, height: 480, x: 600, y: 0 },
            { width: 600, height: 30, x: 0, y: 450 }          
        ],
        spikes: [ ],
        bats: [ ],
        blood: [ ],
        fallingWalls: [],
        levers: [],
        movableWalls: [],
        exit: [ { x: 0, y: 420, goTo: 0, showsAt: { x: 610, y: 420 } } ]
    }
];