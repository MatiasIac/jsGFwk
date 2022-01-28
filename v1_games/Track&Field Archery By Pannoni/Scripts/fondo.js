var fondo = {
	id: "fondo",

	visible: true,
	posFlechaX: 0,		//Posicion de la flecha en el mapa
	posX:0,				//Posicion que tiene en el blanco
	posY:0,				//Posicion que tiene en el blanco
	Angle: 0,			//Variable que nos da el margen en la pos y en el blanco
	puntaje:0,			//Puntaje Total deespues de cada ronda
	flechas:10,			//Cantidad de flechas
	margen:0,			//Pos en Y de la flecha sobre el blanco
	lanzo: false,		//Accionador de lanzamiento
	hit: false,			//Seguimiento y puntaje
	activo:true,	//Activador para suma de angle
	rondas:3,
	puntosR1:0,
	puntosR2:0,
	puntosR3:0,
	
	init: function () {
	},
	
	update: function (delta) {
		
		if (jsGFwk.IO.keyboard._activeKey[38]){			//Presiono la tecla W
			if(this.flechas>0 && this.posFlechaX==30){	//Cantidad de flechas
				this.activado=true;
				if(this.angle<113){
					this.angle+=5;
				}else{
					this.angle=0;
				}
			}
		}else{
			if(this.activado==true){
				this.lanzo=true;					//Activamos el lanzamiento
			}
		}
		
		if (jsGFwk.IO.keyboard._activeKey[82]){	
			console.log(this.rondas);
		}
		
		if(this.flechas==0){
			if(this.rondas==3){
				this.flechas=9;
				this.puntosR1=this.puntaje;
				this.puntaje=0;
				this.rondas=2;
			}else{if(this.rondas==2){
					this.flechas=9;
					this.puntosR2=this.puntaje;
					this.puntaje=0;
					this.rondas=1;
				}else{if(this.rondas==1){
					this.flechas=9;
					this.puntosR3=this.puntaje;
					this.puntaje=0;
					this.rondas=0;
					}
				}
			}
		}
		
		if(this.lanzo==false && this.hit==false){		//Reseteo de flecha
			if (this.flechas>0){
				this.posFlechaX=30;
				this.posFlechaY=390;
			}else{
				this.posFlechaX=800;
				this.posFlechaY=980;
			}
		}
		
		/*		Movimiento de la flecha	*/
		
		
		if(this.lanzo==true){
			if(this.posFlechaX < 800 && this.hit==false){		//Si la posFlecha men posBlanco
				this.posFlechaX+=10;							//Mueve flecha hacia la aderecha
			}else{												//Limite de la pantalla
				this.flechas-=1;								//Descuenta flechas
				this.lanzo=false;
				this.activado=false;
			}
		}
		
		/*		Movimiento de la flecha	*/
		
		/*		Movimiento del blanco	*/
		
		if(this.posBlanco <540){		//Blanco tope abajo
			this.posBlanco += 5;		//Baja el blanco
		}else{
			this.posBlanco=0;			//Resetea a pos origen
			this.hit=false;				//La flecha deja de seguir el blanco
			this.activo=false;
		}
		
		/*		Movimiento del blanco	*/
		
		/*		Colisionador	*/
		
		if(this.posFlechaX==680){								//pos estandar la colision Grande
			if(this.posBlanco > 275 && this.posBlanco < 391){	//Margen de colision
				this.hit=true;									//Activamos el seguimiento y puntaje
				this.activo=true;
				this.margen= (390-this.posBlanco);				//Margen para 
			}
		}
		
		if(this.hit){										//Seguimiento y puntaje
			this.posFlechaY=this.posBlanco + this.margen;	//Seguimiento de flecha pegue donde pegue
			this.posFlechaX=710;							//Pos X de la flecha igual que el blanco
			
			if (this.margen < 15){
				console.log("entro");
				if(this.angle>21 && this.angle < 85){
					if(this.activo){
						this.puntaje=this.puntaje+10;
						this.activo=false;
					}
				}
			}
			if(this.margen> 14 && this.margen < 29){
				console.log("entro");
				if(this.angle > 13 && this.angle < 29){
					if(this.activo){
						this.puntaje=this.puntaje+10;
						this.activo=false;
					}
				}
				if(this.angle > 27 && this.angle < 85){
					if(this.activo){
						this.puntaje=this.puntaje+30;
						this.activo=false;
					}
				}
				if(this.angle > 84 && this.angle < 113){
					if(this.activo){
						this.puntaje=this.puntaje+10;
						this.activo=false;
					}
				}
			}
			if (this.margen > 27 && this.margen < 43){
				console.log("entro");
				if(this.angle > 0 && this.angle < 15){
					if(this.activo){
						this.puntaje=this.puntaje+10;
						this.activo=false;
					}
				}
				if(this.angle > 14 && this.angle < 29){
					if(this.activo){
						this.puntaje=this.puntaje+30;
						this.activo=false;
					}
				}
				if(this.angle > 28 && this.angle < 85){
					if(this.activo){
						this.puntaje=this.puntaje+50;
						this.activo=false;
					}
				}
				if(this.angle > 84 && this.angle < 89){
					if(this.activo){
						this.puntaje=this.puntaje+30;
						this.activo=false;
					}
				}
				if(this.angle > 88 && this.angle < 113){
					if(this.activo){
						this.puntaje=this.puntaje+10;
						this.activo=false;
					}
				}
			}
			if(this.margen > 42 && this.margen < 69){
				console.log("entro");
				if(this.angle > 0 && this.angle < 15){
					if(this.activo){
						this.puntaje=this.puntaje+10;
						this.activo=false;
					}
				}
				if(this.angle > 14 && this.angle < 29){
					if(this.activo){
						this.puntaje=this.puntaje+30;
						this.activo=false;
					}
				}
				if(this.angle > 28 && this.angle < 43){
					if(this.activo){
						this.puntaje=this.puntaje+50;
						this.activo=false;
					}
				}
				if(this.angle > 42 && this.angle < 69){
					if(this.activo){
						this.puntaje=this.puntaje+1000;
						this.activo=false;
					}
				}
				if(this.angle > 68 && this.angle < 85){
					if(this.activo){
						this.puntaje=this.puntaje+50;
						this.activo=false;
					}
				}
				if(this.angle > 84 && this.angle < 99){
					if(this.activo){
						this.puntaje=this.puntaje+30;
						this.activo=false;
					}
				}
				if(this.angle > 98 && this.angle < 113){
					if(this.activo){
						this.puntaje=this.puntaje+10;
						this.activo=false;
					}
				}
			}
			if(this.margen > 68 && this.margen < 85){
				console.log("entro");
				if(this.angle > 0 && this.angle < 15){
					if(this.activo){
						this.puntaje=this.puntaje+10;
						this.activo=false;
					}
				}
				if(this.angle > 14 && this.angle < 29){
					if(this.activo){
						this.puntaje=this.puntaje+30;
						this.activo=false;
					}
				}
				if(this.angle > 28 && this.angle < 85){
					if(this.activo){
						this.puntaje=this.puntaje+50;
						this.activo=false;
					}
				}
				if(this.angle > 84 && this.angle < 98){
					if(this.activo){
						this.puntaje=this.puntaje+30;
						this.activo=false;
					}
				}
				if(this.angle > 97 && this.angle < 113){
					if(this.activo){
						this.puntaje=this.puntaje+10;
						this.activo=false;
					}
				}
			}
			if(this.margen > 84 && this.margen < 99){
				console.log("entro");
				if(this.angle > 13 && this.angle < 29){
					if(this.activo){
						this.puntaje=this.puntaje+10;
						this.activo=false;
					}
				}
				if(this.angle > 27 && this.angle < 85){
					if(this.activo){
						this.puntaje=this.puntaje+30;
						this.activo=false;
					}
				}
				if(this.angle > 84 && this.angle < 99){
					if(this.activo){
						this.puntaje=this.puntaje+10;
						this.activo=false;
					}
				}
			}
			if(this.margen > 98){
				console.log("entro");
				if(this.angle > 27 && this.angle < 85){
					if(this.activo){
						this.puntos=this.puntos+10;
						this.activo=false;
					}
				}
			}
		}
	},
	
	draw: function (context) {
		
		context.drawImage(jsGFwk.ResourceManager.graphics.fondo.image,
		0,0,780,680,
		0,0,780,680);								//Fondo
		
		context.drawImage(jsGFwk.ResourceManager.graphics.fondo.image,
		90,700,50,15,
		this.posFlechaX,this.posFlechaY,50,15);		//Flecha
		
		context.drawImage(jsGFwk.ResourceManager.graphics.fondo.image,
		70,720,100,50,
		5,363,100,50);								//Jugador
	
		context.drawImage(jsGFwk.ResourceManager.graphics.fondo.image,
		750,685,50,140
		,730,this.posBlanco,50,140);				//Blanco
		
		context.drawImage(jsGFwk.ResourceManager.graphics.fondo.image,
		0,0,780,140,
		0,0,780,150);								//Puntaje actual
		
		context.drawImage(jsGFwk.ResourceManager.graphics.fondo.image,
		0,780,760,140,
		20,540,760,140);							//Clasificacion
		
		if (this.flechas>8){
		
			context.drawImage(jsGFwk.ResourceManager.graphics.fondo.image,
			90,700,50,15,
			70,210,50,15);
		
		}
		if (this.flechas>7){
			
			context.drawImage(jsGFwk.ResourceManager.graphics.fondo.image,
			90,700,50,15,
			70,220,50,15);
		
		}
		if (this.flechas>6){
			
			context.drawImage(jsGFwk.ResourceManager.graphics.fondo.image,
			90,700,50,15,
			70,230,50,15);
			
		}
		if (this.flechas>5){			
			
			context.drawImage(jsGFwk.ResourceManager.graphics.fondo.image,
			90,700,50,15,
			70,240,50,15);
		
		}
		if (this.flechas>4){
			
			context.drawImage(jsGFwk.ResourceManager.graphics.fondo.image,
			90,700,50,15,
			70,250,50,15);
		
		}
		if (this.flechas>3){
			
			context.drawImage(jsGFwk.ResourceManager.graphics.fondo.image,
			90,700,50,15,
			70,260,50,15);
		
		}
		if (this.flechas>2){
			
			context.drawImage(jsGFwk.ResourceManager.graphics.fondo.image,
			90,700,50,15,
			70,270,50,15);
		
		}
		if (this.flechas>1){
		
			context.drawImage(jsGFwk.ResourceManager.graphics.fondo.image,
			90,700,50,15,
			70,280,50,15);
		
		}
		
		context.fillStyle="Black";
		if(this.hit){
			context.fillText("X",565+(this.margen),290-(this.angle));
		}
		/*context.fillText("X",570,180);
		context.fillText("X",570+113,180+113);*/
		
		context.font="30px Times";
		context.fillStyle="White";
		context.fillText("Angle",450,210);
		context.fillText((this.angle/10),450,240);
		context.fillText("Puntaje ",580,480);
		context.fillText(this.puntaje,580,510);
		context.fillText("Record Mundial=2500",460,40);
		if (this.rondas<3){
			context.fillText(this.puntosR1,560,70);
		}
		if (this.rondas<2){
			context.fillText(this.puntosR2,560,100);
		}
		if (this.rondas<1){
			context.fillText(this.puntosR3,560,130);
		}
		if(this.rondas==0){
			context.fillText("Fin del Juego",300,300);
			this.posBlanco=0;
		}
	},
};
