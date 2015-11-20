var Levels = [
    {
        startingPoint: { x: 35, y: 35},
        platforms: [
            { width: 30, height: 480, x: 0, y: 0 },
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
            { width: 53, height: 30, x: 547, y: 260 }            
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
        exit: [ { x: 0, y: 420, goTo: 0, showsAt: { x: 610, y: 420 } } ]
    }
];