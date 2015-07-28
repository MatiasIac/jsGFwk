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
     hazards: [ { x: 400, y: 240, move: 'none' } ],
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
    //Sat
    { foots: [{ x: 320, y: 60 },
              { x: 320, y: 140 },
              { x: 320, y: 220 },
              { x: 360, y: 220 },
              { x: 440, y: 140 },
              { x: 520, y: 100 }],
     hazards: [{ x: 320, y: 100 },
              { x: 320, y: 180 },
              { x: 320, y: 260 },              
              { x: 400, y: 180 },
              { x: 480, y: 100 }],
     playerInit: { x: 320, y: 30 },
     parTime: 50,
     tiltingAcc: 0,
     trapParser: function trapParser(parser) {         
         return parser.brightnessContrast(-0.8, -0.33);
     }
    },
    //Invert
    { foots: [{ x: 320, y: 60 },
              { x: 320, y: 140 },
              { x: 320, y: 220 },
              { x: 360, y: 220 },
              { x: 440, y: 140 },
              { x: 520, y: 100 }],
     hazards: [{ x: 320, y: 100 },
              { x: 320, y: 180 },
              { x: 320, y: 260 },              
              { x: 400, y: 180 },
              { x: 480, y: 100 }],
     playerInit: { x: 320, y: 30 },
     parTime: 50,
     tiltingAcc: 0,
     trapParser: function trapParser(parser) {         
         return parser.hueSaturation(-1, -1);
     }
    },
    //Zoom
    { foots: [{ x: 320, y: 60 },
              { x: 320, y: 140 },
              { x: 320, y: 220 },
              { x: 360, y: 220 },
              { x: 440, y: 140 },
              { x: 520, y: 100 }],
     hazards: [{ x: 320, y: 100 },
              { x: 320, y: 180 },
              { x: 320, y: 260 },              
              { x: 400, y: 180 },
              { x: 480, y: 100 }],
     playerInit: { x: 320, y: 30 },
     parTime: 50,
     tiltingAcc: 0,
     trapParser: function trapParser(parser) {
         this.tiltingAcc += 0.05;
         this.tiltFinal = Math.cos(this.tiltingAcc);
         this.shake = (Math.sin(this.tiltingAcc) * 30) + 225;
         
         return parser.zoomBlur(320, this.shake, this.tiltFinal);
     }
    },
    //Jumping
    { foots: [{ x: 320, y: 60 },
              { x: 320, y: 140 },
              { x: 320, y: 220 },
              { x: 360, y: 220 },
              { x: 440, y: 140 },
              { x: 520, y: 100 }],
     hazards: [{ x: 320, y: 100 },
              { x: 320, y: 180 },
              { x: 320, y: 260 },              
              { x: 400, y: 180 },
              { x: 480, y: 100 }],
     playerInit: { x: 320, y: 30 },
     parTime: 50,
     tiltingAcc: 0,
     trapParser: function trapParser(parser) {
         this.tiltingAcc += 0.05;
         this.tiltFinal = Math.cos(this.tiltingAcc);
         
         return parser.bulgePinch(320, 240, 250, this.tiltFinal);
     }
    },
    //Pespective Tilt
    { foots: [{ x: 320, y: 60 },
              { x: 320, y: 140 },
              { x: 320, y: 220 },
              { x: 360, y: 220 },
              { x: 440, y: 140 },
              { x: 520, y: 100 }],
     hazards: [{ x: 320, y: 100 },
              { x: 320, y: 180 },
              { x: 320, y: 260 },              
              { x: 400, y: 180 },
              { x: 480, y: 100 }],
     playerInit: { x: 320, y: 30 },
     parTime: 50,
     tiltingAcc: 0,
     trapParser: function trapParser(parser) {
         this.tiltingAcc += 0.1;
         this.tiltFinal = (Math.cos(this.tiltingAcc) * 10) + 160;
         this.otherTilt = (Math.cos(this.tiltingAcc) * 10) + 235;
         
         return parser.perspective([175,156,496,55,161,279,504,330],
                                   [this.tiltFinal,180,358,107,172,this.otherTilt,377,300]);
     }
    }
];