//los tiles del mapa son de 33x33
//0 = espacio vacio
//1 = pared o piso
//2 = enemigo
//3 = estrella 
//4 = puerta
var map = {

	id: "map",

	visible: true,
	
	newArray: [],
	
	level: 0,
	
	starArray: [],
	
	enemyArray: [],
	
	debug: false,
	
	level1: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,1],
			[1,0,0,0,0,2,0,0,3,0,0,0,0,0,1,0,0,4,0,1],
			[1,0,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1],
			[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,0,3,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,1,1,0,1,1,1,1,1,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1],
			[1,0,0,0,1,0,1,0,0,0,0,2,0,1,1,0,0,0,1,1],
			[1,0,0,1,1,0,1,0,0,1,1,1,1,1,1,1,0,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],
			
	level2: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,1,1,0,3,0,0,0,0,0,0,1,0,1,0,2,1],
			[1,0,0,1,1,1,1,1,1,1,0,0,0,1,1,0,1,1,1,1],
			[1,1,0,0,0,1,0,0,0,1,0,0,1,1,1,0,0,0,0,1],
			[1,1,1,0,0,1,0,0,0,1,1,1,1,0,1,0,0,0,0,1],
			[1,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,1],
			[1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1],
			[1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
			[1,1,1,0,0,1,4,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,1],
			[1,0,0,1,1,1,0,1,1,1,0,2,0,0,3,1,1,0,0,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],
			
	level3: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,4,0,2,0,1,0,0,3,0,0,1,0,0,0,0,0,0,1],
			[1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1],
			[1,0,0,0,0,2,0,1,1,1,1,1,0,1,1,0,0,0,0,1],
			[1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,0,0,0,0,0,3,0,0,0,0,0,1,1,0,0,0,0,1],
			[1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
			[1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
			[1,0,1,1,1,0,3,0,1,1,1,0,3,0,1,1,1,0,2,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],
			
	level4: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,4,0,0,0,0,0,0,0,3,0,0,0,0,0,1],
			[1,0,0,0,1,1,1,1,1,1,0,0,1,1,1,1,1,0,2,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
			[1,2,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,1,1,1],
			[1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,1],
			[1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,0,0,0,0,3,0,0,0,0,0,0,0,2,0,0,3,1],
			[1,0,1,1,1,0,1,1,1,1,1,0,1,0,0,1,1,1,1,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
			[1,0,1,1,1,0,0,0,0,0,1,0,0,0,0,0,1,1,0,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],
			
	level5: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,1],
			[1,0,0,2,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,1,0,0,3,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1],
			[1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,2,1],
			[1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
			[1,0,0,1,0,0,0,0,0,3,0,0,0,0,0,1,1,0,0,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],
			
	level6: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,4,0,1],
			[1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,2,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
			[1,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,1,1,1],
			[1,2,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,2,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
			[1,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],
			
	level7:	[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,4,0,0,3,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,2,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,1],
			[1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
			[1,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,0,3,1],
			[1,2,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
			[1,1,0,0,0,0,3,0,0,0,0,0,0,1,0,0,0,0,0,1],
			[1,1,1,0,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1,0,0,1],
			[1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
			[1,0,0,1,1,0,0,0,0,3,0,0,0,0,1,1,1,0,2,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],
			
	level8: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,3,1,1,0,3,0,0,0,0,2,0,0,1],
			[1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,0,1],
			[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
			[1,0,0,1,0,0,0,0,0,3,0,0,0,0,0,0,1,0,0,1],
			[1,0,0,0,0,1,0,1,1,1,1,1,1,0,1,0,0,0,0,1],
			[1,2,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,2,1],
			[1,1,0,0,0,3,0,0,0,0,0,0,0,3,0,0,0,0,1,1],
			[1,1,0,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,1,1],
			[1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],
			
	level9: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1],
			[1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
			[1,1,1,2,0,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1],
			[1,0,1,1,0,0,0,3,0,0,0,0,0,1,3,0,0,0,0,1],
			[1,0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,0,0,1],
			[1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1],
			[1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1],
			[1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
			[1,0,0,1,1,0,0,0,1,1,0,0,0,0,1,1,1,0,2,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],
			
	level10:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,3,0,1,1,4,1,0,0,0,0,0,0,0,0,1],
			[1,2,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1],
			[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,1,0,3,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,3,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
			[1,0,0,0,0,0,0,0,0,0,3,0,0,0,1,1,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1],
			[1,0,0,0,0,2,1,1,1,1,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],
	
	init : function(){
		switch(this.level){
			case 0:
				this.newLevel(this.level1);
				//jsGFwk._gameObjects.player.respawn();
				break;
			case 1:
				this.newLevel(this.level2);
				jsGFwk._gameObjects.player.respawn();
				break;
			case 2:
				this.newLevel(this.level3);
				jsGFwk._gameObjects.player.respawn();
				break;
			case 3:
				this.newLevel(this.level4);
				jsGFwk._gameObjects.player.respawn();
				break;
			case 4:
				this.newLevel(this.level5);
				jsGFwk._gameObjects.player.respawn();
				break;
			case 5:
				this.newLevel(this.level6);
				jsGFwk._gameObjects.player.respawn();
				break;
			case 6:
				this.newLevel(this.level7);
				jsGFwk._gameObjects.player.respawn();
				break;
			case 7:
				this.newLevel(this.level8);
				jsGFwk._gameObjects.player.respawn();
				break;
			case 8:
				this.newLevel(this.level9);
				jsGFwk._gameObjects.player.respawn();
				break;
			case 9:
				this.newLevel(this.level10);
				break;
		}
	},
	
	update : function(delta){
		for(var i = 0; i<this.enemyArray.length; i++){
			this.enemyArray[i].update(delta);
		}
		
		for(var i = 0; i<this.starArray.length; i++){
			this.starArray[i].update(delta);
		}
		
		//modo debug
		if(jsGFwk.IO.keyboard._activeKey[83]){
			this.debug = !this.debug ? true : false;
		}	
	},
	
	draw : function(context){
		context.save();
		for(var i = 0; i<this.newArray.length; i++){
			for(var j = 0; j<this.newArray.length; j++){		
				switch(this.newArray[i][j]){
					case 1:
						context.drawImage(jsGFwk.ResourceManager.graphics.tile1.image,0,0,30,30,(j*30),(i*30),30,30);
						break;
					case 5:
						context.drawImage(jsGFwk.ResourceManager.graphics.tile2.image,0,0,30,30,(j*30), (i*30),30,30);
						break;
					case 4:
						context.drawImage(jsGFwk.ResourceManager.graphics.elementsSprite.image,100,0,110,190,(j*30), (i*30),30,30);
				}
			}
		}
		for(var i = 0; i<this.starArray.length; i++){
			this.starArray[i].draw(context);
		}
		for(var i = 0; i<this.enemyArray.length; i++){
			if(this.enemyArray[i].visible){
				this.enemyArray[i].draw(context);
			}
		}
		
		if(!jsGFwk._gameObjects.player.visible){
			context.fillStyle="#FF0000";
			context.font="40px Georgia";
			context.fillText("GAME OVER", 100,100);
		}
		
		//modo debug
		if(this.debug){
			context.fillStyle="#FF0000";
			context.font="25px Georgia";
			for(var i = 0; i<this.newArray.length; i++){
				for(var j = 0; j<this.newArray.length; j++){
					context.fillText(this.newArray[i][j],(j*30)+5,(i*30)+20);
				}
			}
		}
	},
	
	
	getMatrixCoord: function(x,y){
		var element = 0;
		
		element = this.newArray[Math.floor(y/30)+1][Math.floor(x/30)];
		
		return element;
	},
	
	newLevel: function(levelArray){
		this.newArray = levelArray;
		for(var i = 0; i<this.newArray.length; i++){
			for(var j = 0; j<this.newArray.length; j++){
				switch(this.newArray[i][j]){
					case 2: 
						var newStar = new star();
						newStar.initiate(j*30, i*30);
						this.starArray.push(newStar);
						break;
					case 3: 
						var newEnemy = new enemy();
						newEnemy.initiate(j*30,i*30);
						this.enemyArray.push(newEnemy);
						break;
					default:
						break;
				}	
			}
		}	
		
	},
	
	finishLevel: function(){
	//eliminar todos los elementos y limpiar el array de elementos
		for(var i = 0; i<jsGFwk._gameObjects.map.enemyArray.length; i++){
			jsGFwk._gameObjects.map.enemyArray = [];
		}
		for(var i = 0; i<jsGFwk._gameObjects.map.starArray.length; i++){
			jsGFwk._gameObjects.map.enemyArray = [];
		}
		jsGFwk._gameObjects.map.level++;
		jsGFwk._gameObjects.map.init();
		
	}
}