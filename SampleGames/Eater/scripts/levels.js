var levels = [
    { foots: [ { x: 100, y: 240},
        { x: 200, y: 240}, { x: 300, y: 240}, { x: 400, y: 240},
        { x: 500, y: 240}, { x: 600, y: 240}],
     hazards: [ /*{ x: 430, y: 200}*/ ],
     playerInit: { x: 40, y: 230 },
     parTime: 5,
     trapParser: function trapParser(parser) {
         return parser;//parser.swirl(300, 220, 100, 2.3);
     }
    },
    { foots: [ { x: 100, y: 240},
        { x: 200, y: 240}, { x: 300, y: 240},
        { x: 500, y: 240}, { x: 600, y: 240}],
     hazards: [ { x: 400, y: 240} ],
     playerInit: { x: 40, y: 230 },
     parTime: 6,
     trapParser: function trapParser(parser) {
         return parser;//parser.swirl(300, 220, 100, 2.3);
     }
    },
    { foots: [ { x: 100, y: 240},
        { x: 200, y: 240}, { x: 300, y: 240},
        { x: 500, y: 240}, { x: 600, y: 240}],
     hazards: [ { x: 400, y: 240}, { x: 400, y: 200} ],
     playerInit: { x: 40, y: 230 },
     parTime: 5,
     trapParser: function trapParser(parser) {
         return parser;//parser.swirl(300, 220, 100, 2.3);
     }
    },
    { foots: [ { x: 100, y: 240},
        { x: 200, y: 240}, { x: 300, y: 240},
        { x: 500, y: 240}, { x: 600, y: 240}],
     hazards: [ { x: 400, y: 240}, { x: 400, y: 200}, { x: 400, y: 280} ],
     playerInit: { x: 40, y: 230 },
     parTime: 10,
     trapParser: function trapParser(parser) {
         return parser;//parser.swirl(300, 220, 100, 2.3);
     }
    },
    { foots: [ { x: 100, y: 240},
        { x: 200, y: 240}, { x: 300, y: 240},
        { x: 500, y: 240}, { x: 600, y: 240}],
     hazards: [ { x: 400, y: 240}, { x: 400, y: 200}, { x: 400, y: 280} ],
     playerInit: { x: 40, y: 230 },
     parTime: 10,
     trapParser: function trapParser(parser) {
         return parser.swirl(300, 220, 100, 2.3);
     }
    },
    { foots: [{ x: 100, y: 240 },
              { x: 200, y: 440 },
              { x: 300, y: 40 },
              { x: 400, y: 340 },
              { x: 500, y: 140 },
              { x: 600, y: 240 }],
    hazards: [ ],
    playerInit: { x: 40, y: 230 },
    parTime: 100,
    trapParser: function trapParser(parser) {
        return parser
            .swirl(100, 220, 100, 2.3)
            .swirl(200, 460, 100, 2.3)
            .swirl(300, 50, 100, 2.3)
            .swirl(400, 340, 100, 2.3)
            .swirl(300, 125, 100, 2.3)
            .swirl(300, 260, 100, 2.3);
     }
    }
];