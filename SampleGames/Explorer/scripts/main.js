var resources = {
    mineral: 0,
    energy: 0,
    water: 0,
    food: 0,
    oxygen: 0
};

var stash = [];

var columns = 8;

var map = new Float32Array(800);

for (var i = 0; i < 800; i++) {
    map[i] = i % columns;
}

console.log(map);

var x = 0;
var y = 7;

console.log(map[columns * x + y]);
//map[columns * x + y] = 10;
//console.log(map[columns * x + y]);