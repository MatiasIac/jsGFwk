var levels = [
    {foots: [ { x: 100, y: 240}, { x: 200, y: 240}, { x: 300, y: 240}, { x: 400, y: 240}, { x: 500, y: 240}, { x: 600, y: 240}],
     hazards: [ ],
     playerInit: { x: 40, y: 230 },
     parTime: 60,
     trapParser: function trapParser(parser) { return parser; }
    },
    
    {foots: [ { x: 100, y: 200}, { x: 200, y: 240}, { x: 300, y: 200}, { x: 400, y: 200}, { x: 500, y: 240}, { x: 600, y: 200}],
     hazards: [ ],
     playerInit: { x: 40, y: 230 },
     parTime: 10,
     trapParser: function trapParser(parser) { return parser; }
    },
    
    {foots: [ { x: 100, y: 240}, { x: 200, y: 240}, { x: 300, y: 240}, { x: 400, y: 240}, { x: 500, y: 240}, { x: 600, y: 240},
              { x: 100, y: 140}, { x: 200, y: 140}, { x: 300, y: 140}, { x: 400, y: 140}, { x: 500, y: 140}, { x: 600, y: 140}],
     hazards: [ ],
     playerInit: { x: 40, y: 230 },
     parTime: 10,
     trapParser: function trapParser(parser) { return parser; }
    },
        
    { foots: [ { x: 100, y: 240}, { x: 200, y: 240}, { x: 300, y: 240}, { x: 500, y: 240}, { x: 600, y: 240}],
     hazards: [ { x: 400, y: 240 } ],
     playerInit: { x: 40, y: 230 },
     parTime: 10,
     trapParser: function trapParser(parser) { return parser; }
    },
    
    { foots: [ { x: 100, y: 240}, { x: 200, y: 240}, { x: 300, y: 240}, { x: 500, y: 240}, { x: 600, y: 240}],
     hazards: [ { x: 400, y: 240}, { x: 400, y: 200} ],
     playerInit: { x: 40, y: 230 },
     parTime: 8,
     trapParser: function trapParser(parser) { return parser; }
    },
    
    { foots: [ { x: 100, y: 240}, { x: 200, y: 240}, { x: 300, y: 240}, { x: 500, y: 240}, { x: 600, y: 240}],
     hazards: [ { x: 400, y: 240}, { x: 400, y: 200}, { x: 400, y: 280} ],
     playerInit: { x: 40, y: 230 },
     parTime: 8,
     trapParser: function trapParser(parser) { return parser; }
    },
    
    { foots: [ { x: 100, y: 240}, { x: 200, y: 240}, { x: 300, y: 240}, { x: 500, y: 240}, { x: 600, y: 240}, { x: 400, y: 240 }],
     hazards: [ { x: 400, y: 200, move: { style: 'upDown', speed: 0.1, range: 100 } }, { x: 400, y: 250, move: { style: 'upDown', speed: -0.1, range: 100 }} ],
     playerInit: { x: 40, y: 230 },
     parTime: 8,
     trapParser: function trapParser(parser) { return parser; }
    },
    
    { foots: [ { x: 100, y: 240}, { x: 200, y: 240}, { x: 300, y: 240}, { x: 500, y: 240}, { x: 600, y: 240}, { x: 400, y: 240 }],
     hazards: [ 
         { x: 100, y: 200, move: { style: 'upDown', speed: 0.1, range: 100 } }, { x: 100, y: 250, move: { style: 'upDown', speed: -0.1, range: 100 }},
         { x: 400, y: 200, move: { style: 'upDown', speed: 0.1, range: 100 } }, { x: 400, y: 250, move: { style: 'upDown', speed: -0.1, range: 100 }},
         { x: 600, y: 200, move: { style: 'upDown', speed: 0.1, range: 100 } }, { x: 600, y: 250, move: { style: 'upDown', speed: -0.1, range: 100 }} ],
     playerInit: { x: 40, y: 230 },
     parTime: 8,
     trapParser: function trapParser(parser) { return parser; }
    },
    
    { foots: [ { x: 100, y: 240}, { x: 200, y: 240}, { x: 300, y: 240}, { x: 500, y: 240}, { x: 600, y: 240}, { x: 400, y: 240 }],
     hazards: [ 
         { x: 100, y: 200, move: { style: 'upDown', speed: 0.1, range: 100 } }, { x: 100, y: 250, move: { style: 'upDown', speed: -0.1, range: 100 }},
         { x: 400, y: 200, move: { style: 'upDown', speed: 0.1, range: 100 } }, { x: 400, y: 250, move: { style: 'upDown', speed: -0.1, range: 100 }},
         { x: 600, y: 200, move: { style: 'upDown', speed: 0.1, range: 100 } }, { x: 600, y: 250, move: { style: 'upDown', speed: -0.1, range: 100 }} ],
     playerInit: { x: 40, y: 230 },
     parTime: 10,
     enableFriction: true,
     trapParser: function trapParser(parser) { return parser; }
    },
    
    { foots: [ { x: 100, y: 240}, { x: 200, y: 240}, { x: 300, y: 240}, { x: 500, y: 240}, { x: 600, y: 240}, { x: 400, y: 240 }],
     hazards: [ 
         { x: 100, y: 200, move: { style: 'both', speed: 0.1, range: 100 } },
         { x: 400, y: 200, move: { style: 'upDown', speed: 0.1, range: 100 } },
         { x: 600, y: 200, move: { style: 'both', speed: 0.1, range: 100 } } ],
     playerInit: { x: 40, y: 230 },
     parTime: 10,
     enableFriction: true,
     trapParser: function trapParser(parser) { return parser; }
    },
    
    { foots: [ { x: 100, y: 240}, { x: 200, y: 200}, { x: 300, y: 260}, { x: 500, y: 180}, { x: 600, y: 280}, { x: 400, y: 240 }],
     hazards: [ 
         { x: 100, y: 200, move: { style: 'both', speed: 0.1, range: 100 } },
         { x: 400, y: 200, move: { style: 'upDown', speed: 0.1, range: 100 } },
         { x: 600, y: 200, move: { style: 'both', speed: 0.1, range: 100 } } ],
     playerInit: { x: 40, y: 230 },
     parTime: 10,
     enableFriction: true,
     trapParser: function trapParser(parser) { return parser; }
    },
    
    { foots: [ { x: 100, y: 240}, { x: 200, y: 240}, { x: 300, y: 240}, { x: 500, y: 240}, { x: 600, y: 240}, { x: 400, y: 240 }],
     hazards: [ 
         { x: 100, y: 200, move: { style: 'both', speed: 0.1, range: 100 } }, { x: 100, y: 250, move: { style: 'upDown', speed: -0.1, range: 100 }},
         { x: 400, y: 200, move: { style: 'upDown', speed: 0.1, range: 100 } }, { x: 400, y: 250, move: { style: 'upDown', speed: -0.1, range: 100 }},
         { x: 600, y: 200, move: { style: 'both', speed: 0.1, range: 100 } }, { x: 600, y: 250, move: { style: 'upDown', speed: -0.1, range: 100 }} ],
     playerInit: { x: 40, y: 230 },
     parTime: 10,
     enableFriction: true,
     trapParser: function trapParser(parser) { return parser; }
    },
    
    { foots: [ { x: 100, y: 240}, { x: 200, y: 240}, { x: 300, y: 240}, { x: 500, y: 240}, { x: 600, y: 240}, { x: 400, y: 240 }],
     hazards: [ 
         { x: 200, y: 480, crocodile: { speed: 5 } },
         { x: 400, y: 200, move: { style: 'upDown', speed: 0.1, range: 100 } }, { x: 400, y: 250, move: { style: 'upDown', speed: -0.1, range: 100 }}],
     playerInit: { x: 40, y: 230 },
     parTime: 10,
     enableFriction: true,
     trapParser: function trapParser(parser) { return parser; }
    },
    
    { foots: [ { x: 100, y: 140}, { x: 200, y: 140}, { x: 300, y: 140}, { x: 500, y: 140}, { x: 600, y: 140}, { x: 400, y: 140 },
               { x: 100, y: 240}, { x: 200, y: 240}, { x: 300, y: 240}, { x: 500, y: 240}, { x: 600, y: 240}, { x: 400, y: 240 },
               { x: 100, y: 340}, { x: 200, y: 340}, { x: 300, y: 340}, { x: 500, y: 340}, { x: 600, y: 340}, { x: 400, y: 340 }
             ],
     hazards: [{ x: 0, y: 0, rain: true }],
     playerInit: { x: 40, y: 230 },
     parTime: 15,
     enableFriction: true,
     trapParser: function trapParser(parser) { return parser; }
    },
    
    { foots: [ {x: 310, y: 40}, {x: 310, y: 80}, {x: 310, y: 120}, {x: 310, y: 160},
               {x: 310, y: 200}, {x: 310, y: 240}, {x: 310, y: 280}, {x: 310, y: 320},
               {x: 310, y: 360}, {x: 310, y: 400}],
     hazards: [{ x: 300, y: 200, crocodile: { speed: 5 } }],
     playerInit: { x: 40, y: 230 },
     parTime: 15,
     enableFriction: false,
     trapParser: function trapParser(parser) { return parser; }
    },
    
    { foots: [ {x: 310, y: 40}, {x: 310, y: 80}, {x: 310, y: 120}, {x: 310, y: 160},
               {x: 310, y: 200}, {x: 310, y: 240}, {x: 310, y: 280}, {x: 310, y: 320},
               {x: 310, y: 360}, {x: 310, y: 400}],
     hazards: [
        { x: 300, y: 200, move: { style: 'leftRight', speed: 0.1, range: 100 } },
        { x: 300, y: 200, crocodile: { speed: 5 } }],
     playerInit: { x: 40, y: 230 },
     parTime: 15,
     enableFriction: false,
     trapParser: function trapParser(parser) { return parser; }
    },
    
    { foots: [ {x: 310, y: 40}, {x: 310, y: 80}, {x: 310, y: 120}, {x: 310, y: 160},
               {x: 310, y: 200}, {x: 310, y: 240}, {x: 310, y: 280}, {x: 310, y: 320},
               {x: 310, y: 360}, {x: 310, y: 400}],
     hazards: [
        { x: 300, y: 200, move: { style: 'both', speed: 0.1, range: 100 } },
        { x: 300, y: 200, crocodile: { speed: 5 } }],
     playerInit: { x: 40, y: 230 },
     parTime: 15,
     enableFriction: true,
     trapParser: function trapParser(parser) { return parser; }
    },
    
    { foots: [ {x: 310, y: 200}],
     hazards: [
        { x: 300, y: 200, move: { style: 'both', speed: 0.15, range: 100 } },
        { x: 300, y: 200, crocodile: { speed: 7 } }],
     playerInit: { x: 40, y: 230 },
     parTime: 15,
     enableFriction: true,
     trapParser: function trapParser(parser) { return parser; }
    },
    
    { foots: [ {x: 310, y: 200}],
     hazards: [
        { x: 300, y: 200, move: { style: 'both', speed: 0.15, range: 100 } },
        { x: 300, y: 200, crocodile: { speed: 7 }},
        { x: 150, y: 200, crocodile: { speed: 2 }},
        { x: 400, y: 200, crocodile: { speed: 3 }},
        { x: 0, y: 0, rain: true }],
     playerInit: { x: 40, y: 230 },
     parTime: 15,
     enableFriction: true,
     trapParser: function trapParser(parser) { return parser; }
    },
    
    { foots: [ {x: 450, y: 230}, {x: 470, y: 230}, {x: 490, y: 230}],
     hazards: [{ x: 250, y: 190, mud: true},{ x: 270, y: 190, mud: true},
               { x: 250, y: 170, mud: true},{ x: 270, y: 170, mud: true},
               { x: 250, y: 150, mud: true},{ x: 270, y: 150, mud: true},
               { x: 250, y: 130, mud: true},{ x: 270, y: 130, mud: true},
               { x: 250, y: 110, mud: true},{ x: 270, y: 110, mud: true},
               { x: 250, y: 90, mud: true},{ x: 270, y: 90, mud: true},
               { x: 250, y: 70, mud: true},{ x: 270, y: 70, mud: true},
               { x: 250, y: 50, mud: true},{ x: 270, y: 50, mud: true},
               { x: 250, y: 30, mud: true},{ x: 270, y: 30, mud: true},
               { x: 250, y: 210, mud: true},{ x: 270, y: 210, mud: true},
               { x: 250, y: 230, mud: true},{ x: 270, y: 230, mud: true},
               { x: 250, y: 250, mud: true},{ x: 270, y: 250, mud: true},
               { x: 250, y: 270, mud: true},{ x: 270, y: 270, mud: true},
               { x: 250, y: 290, mud: true},{ x: 270, y: 290, mud: true},
               { x: 250, y: 310, mud: true},{ x: 270, y: 310, mud: true},
               { x: 250, y: 330, mud: true},{ x: 270, y: 330, mud: true},
               { x: 250, y: 350, mud: true},{ x: 270, y: 350, mud: true},
               { x: 250, y: 370, mud: true},{ x: 270, y: 370, mud: true},
               { x: 250, y: 390, mud: true},{ x: 270, y: 390, mud: true},
               { x: 250, y: 410, mud: true},{ x: 270, y: 410, mud: true},
               { x: 250, y: 430, mud: true},{ x: 270, y: 430, mud: true}
              ],
     playerInit: { x: 40, y: 230 },
     parTime: 7,
     enableFriction: false,
     trapParser: function trapParser(parser) { return parser; }
    },
    
    { foots: [ {x: 275, y: 230}, {x: 325, y: 130}, {x: 375, y: 430}],
     hazards: [{ x: 250, y: 190, mud: true},{ x: 300, y: 190, mud: true},
               { x: 250, y: 170, mud: true},{ x: 300, y: 170, mud: true},
               { x: 250, y: 150, mud: true},{ x: 300, y: 150, mud: true},
               { x: 250, y: 130, mud: true},{ x: 300, y: 130, mud: true},
               { x: 250, y: 110, mud: true},{ x: 300, y: 110, mud: true},
               { x: 250, y: 90, mud: true},{ x: 300, y: 90, mud: true},
               { x: 250, y: 70, mud: true},{ x: 300, y: 70, mud: true},
               { x: 250, y: 50, mud: true},{ x: 300, y: 50, mud: true},
               { x: 250, y: 30, mud: true},{ x: 300, y: 30, mud: true},
               { x: 250, y: 210, mud: true},{ x: 300, y: 210, mud: true},
               { x: 250, y: 230, mud: true},{ x: 300, y: 230, mud: true},
               { x: 250, y: 250, mud: true},{ x: 300, y: 250, mud: true},
               { x: 250, y: 270, mud: true},{ x: 300, y: 270, mud: true},
               { x: 250, y: 290, mud: true},{ x: 300, y: 290, mud: true},
               { x: 250, y: 310, mud: true},{ x: 300, y: 310, mud: true},
               { x: 250, y: 330, mud: true},{ x: 300, y: 330, mud: true},
               { x: 250, y: 350, mud: true},{ x: 300, y: 350, mud: true},
               { x: 250, y: 370, mud: true},{ x: 300, y: 370, mud: true},
               { x: 250, y: 390, mud: true},{ x: 300, y: 390, mud: true},
               { x: 250, y: 410, mud: true},{ x: 300, y: 410, mud: true},
               { x: 250, y: 430, mud: true},{ x: 300, y: 430, mud: true},
               { x: 350, y: 190, mud: true},{ x: 400, y: 190, mud: true},
               { x: 350, y: 170, mud: true},{ x: 400, y: 170, mud: true},
               { x: 350, y: 150, mud: true},{ x: 400, y: 150, mud: true},
               { x: 350, y: 130, mud: true},{ x: 400, y: 130, mud: true},
               { x: 350, y: 110, mud: true},{ x: 400, y: 110, mud: true},
               { x: 350, y: 90, mud: true},{ x: 400, y: 90, mud: true},
               { x: 350, y: 70, mud: true},{ x: 400, y: 70, mud: true},
               { x: 350, y: 50, mud: true},{ x: 400, y: 50, mud: true},
               { x: 350, y: 30, mud: true},{ x: 400, y: 30, mud: true},
               { x: 350, y: 210, mud: true},{ x: 400, y: 210, mud: true},
               { x: 350, y: 230, mud: true},{ x: 400, y: 230, mud: true},
               { x: 350, y: 250, mud: true},{ x: 400, y: 250, mud: true},
               { x: 350, y: 270, mud: true},{ x: 400, y: 270, mud: true},
               { x: 350, y: 290, mud: true},{ x: 400, y: 290, mud: true},
               { x: 350, y: 310, mud: true},{ x: 400, y: 310, mud: true},
               { x: 350, y: 330, mud: true},{ x: 400, y: 330, mud: true},
               { x: 350, y: 350, mud: true},{ x: 400, y: 350, mud: true},
               { x: 350, y: 370, mud: true},{ x: 400, y: 370, mud: true},
               { x: 350, y: 390, mud: true},{ x: 400, y: 390, mud: true},
               { x: 350, y: 410, mud: true},{ x: 400, y: 410, mud: true},
               { x: 350, y: 430, mud: true},{ x: 400, y: 430, mud: true},
               { x: 265, y: 480, crocodile: { speed: 5 } },
               { x: 320, y: 480, crocodile: { speed: 6 } },
               { x: 365, y: 480, crocodile: { speed: 3 } }
              ],
     playerInit: { x: 40, y: 230 },
     parTime: 15,
     enableFriction: false,
     trapParser: function trapParser(parser) { return parser; }
    },
    
    /*{ x: 300, y: 480, crocodile: { speed: 5 } },
    { x: 400, y: 200, crocodile: { speed: 3 } },
    { x: 0, y: 0, rain: true }*/
    
    
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