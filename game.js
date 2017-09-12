/*
// canvas width = 480
// canvas height = 640
// 48 x 64 matrix
//
// sizeof arena is 42 * 
*/

//getting the canvas and its context
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let splashAnimationFrameId;
let pikuAnimationFrameId;
let updatePiecesAnimationFrameId;
let gameLevel = 1;
let platform = createLevel(gameLevel);
let arena = createMatrix(42, 44, 0);
let totalLevel = 5;

let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

let cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;


//defining the characters piku and chiku
var piku = {
	pos: { x: 0, y: 0},
	matrix: pikuMatrix,
}

var chiku = {
	pos: {x: 0, y: 0},
	matrix: chikuMatrix,
}

context.scale(10,10);

context.fillStyle = '#212121';
context.fillRect(0, 0, canvas.width, canvas.height);

var pikuMatrix = [
					[1, 1, 1],
					[1, 1, 1],
					[1, 1, 1],
					[1, 1, 1],
					[1, 1, 1],
				];

var chikuMatrix = [
					[1, 1, 1],
					[1, 1, 1],
					[1, 1, 1],
					[1, 1, 1],
					[1, 1, 1],
				];

function createLevel(level) {
	let platform;
	if( level === 1) {
		platform = createMatrix(48, 20, 1);
		platform[0][7] = platform[0][8] = platform[0][9] = platform[1][8] = 0;
		platform[0][15] = platform[0][16] = platform[0][17] = platform[1][16] = 0;

		return platform;

	} else if( level === 2) {
		platform = createMatrix(48, 20, 1);
		platform[0][20] = platform[0][21] = 0;
		platform[1][20] = platform[1][21] = 0;

		return platform;
	} else if( level === 3) {
		platform = createMatrix(48, 20, 1);
		platform[0][20] = platform[0][21] = 0;
		platform[1][20] = platform[1][21] = 0;

		return platform;
	} else if( level === 4) {
		platform = createMatrix(48, 20, 1);
		platform[0][20] = platform[0][21] = 0;
		platform[1][20] = platform[1][21] = 0;

		return platform;
	} else if( level === 5) {
		platform = createMatrix(48, 20, 1);
		platform[0][20] = platform[0][21] = 0;
		platform[1][20] = platform[1][21] = 0;

		return platform;
	} 
}


//creating the base matrix to store basic platform
function createMatrix(w, h, visual) {
	const matrix = [];
	while(h--) {
		matrix.push( new Array(w).fill(visual) );
	}
	return matrix;
}

function drawArena(matrix) {
	matrix.forEach( (row, y) => {
		row.forEach( (value, x) => {
			if(value !== 0) {
				context.fillStyle = "#D50000";
				context.fillRect(x + 3, y, 1, 1);
			}
		});
	});
}

//drawing the platform
function drawPlatform(matrix) {
	matrix.forEach( (row, y) => {
		row.forEach( (value, x) => {
			if(value !== 0) {
				context.fillStyle = '#C5CAE9';
				context.fillRect(x, y + 44 ,1 ,1);
			}
		});
	});
}

function drawPikuChiku(pikuOffset) {
	pikuMatrix.forEach( (row, y) => {
		row.forEach( (value, x) => {
			if(value !== 0) {
				context.fillStyle = '#FFCCBC';
				context.fillRect(x + pikuOffset.x , y + 38, 1, 1);
			}
		});
	});

	chikuMatrix.forEach( (row, y) => {
		row.forEach( (value, x) => {
			if(value !== 0) {
				context.fillStyle = '#C8E6C9';
				context.fillRect(x + 45, y + 38, 1, 1);
			}
		});
	});

	//eyes for piku
	context.fillStyle = '#000';
	context.fillRect(0.5 + pikuOffset.x, 39, 0.5, 0.5);
	context.fillRect(1.5 + pikuOffset.x, 39, 0.5, 0.5);
	
	//legs for piku
	context.fillStyle = '#FFCCBC';
	context.fillRect(0.5 + pikuOffset.x, 43, 0.5, 0.5);
	context.fillRect(0.5 + pikuOffset.x, 43.5, 0.5, 0.5);
	context.fillRect(1.7 + pikuOffset.x, 43, 0.5, 0.5);
	context.fillRect(1.7 + pikuOffset.x, 43.5, 0.5, 0.5);

	//eyes for chiku
	context.fillStyle = '#000';
	context.fillRect(47, 39, 0.5, 0.5);
	context.fillRect(46, 39, 0.5, 0.5);

	//legs for chiku
	context.fillStyle = '#C8E6C9';   
	context.fillRect(47, 43, 0.5, 0.5);
	context.fillRect(47, 43.5, 0.5, 0.5);
	context.fillRect(45.8, 43, 0.5, 0.5);
	context.fillRect(45.8, 43.5, 0.5, 0.5);

}


function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    context.fillStyle = "#CFD8DC";
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.lineTo(x + width - radius, y + height);
    ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
    ctx.lineTo(x + width, y + radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.lineTo(x + radius, y);
    ctx.arcTo(x, y, x, y + radius, radius);
    ctx.fill();
}

function drawScreenInterval(text) {
	context.fillStyle = '#212121';
	context.globalAlpha = 0.9;
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.globalAlpha = 1.0;

	roundedRect(context, 11, 20, 25, 20, 2);

	context.fillStyle = "#263238";
	let textXpos = 11 + ( (25 - text.length) / 2 )
	context.fillText(text, textXpos, 31);
}

function draw() {
	context.fillStyle = '#212121';
	context.fillRect(0, 0, canvas.width, canvas.height);

	//drawArena(arena, 3);
	drawArena(arena);
	drawPlatform(platform);
	drawPikuChiku(piku.pos);
}

var pikuInterval = 100;
var pikuMotionCounter = 0;
var lastTimePiku = 0;

function update(time = 0) {
	

	var deltaTimePiku = time - lastTimePiku;
	lastTimePiku = time;

	pikuMotionCounter += deltaTimePiku;
	if(pikuMotionCounter > pikuInterval) {
		piku.pos.x++;
		pikuMotionCounter = 0;
	}

	if(piku.pos.x < 43){
		draw();
		requestAnimationFrame(update);
	} else if(piku.pos.x >= 43) {
		//put a level screen
		//pikuAfterAnimation();

		cancelAnimationFrame( pikuAnimationFrameId );
		cancelAnimationFrame( updatePiecesAnimationFrameId );

		draw();
		audioPlayer.src = endSoundURL;
		audioPlayer.play();
		drawScreenInterval("Chapter Completed");
		window.setTimeout( 'pikuAfterAnimation()', 1000 );
	}

	//in the else part, next level should be drawn
	//in the else part, have to put a love sign b/w piku and chiku
}

function pikuAfterAnimation() {
	gameLevel++;
	if(gameLevel > totalLevel) {
		drawEndScreen();
	} else {
		platform = createLevel(gameLevel);
		piku.pos.x = 0;

		draw();
		audioPlayer.src = startSoundURL;
		audioPlayer.play();
		drawScreenInterval("Chapter: " + gameLevel);
		window.setTimeout( 'draw()', 1000 );
	}
}

let splashMotionCounter = 0;
let splashLastTime = 0;
let splashInterval = 500;
let splasColorFlag = true;

function updateSplash(time = 0) {
	let splashDeltaTime = time - splashLastTime;
	splashLastTime = time;

	splashMotionCounter += splashDeltaTime;
	if(splashMotionCounter > splashInterval) {
		if(splasColorFlag) {
			drawSplash("#4FC3F7");
			splasColorFlag = false;
		} else {
			drawSplash("#FFF176");
			splasColorFlag = true;
		}
		splashMotionCounter = 0;
	}

	splashAnimationFrameId = requestAnimationFrame(updateSplash);
}


function drawSplash(color) {
	context.fillStyle = '#212121';
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.fillStyle = "#fff";

	context.font = "2.2pt Cornerstone";
	context.fillText("Piku Meets Chiku", 11, 15);

	context.font = "1.2pt Cornerstone"
	context.fillText("Build the road and help", 14, 22);
	context.fillText("two lost friends to reunite", 14, 24);

	context.fillStyle = color;
	context.font = "1.6pt Cornerstone";
	context.fillText("Press SpaceBar to play", 12, 50);drawPikuChiku(piku.pos);

	drawPikuChiku(piku.pos);
}

function drawEndScreen() {
	context.fillStyle = '#212121';
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.fillStyle = "#fff";
	context.font = "2.2pt Cornerstone";
	context.fillText("The End", 16, 15);

	context.font = "1.5pt Cornerstone"
	context.fillText("You helped to lost friends to reunite", 9, 22);
	//context.fillText("two lost friends to meet", 14, 24);

}

// jsfxr:
function SfxrParams(){this.setSettings=function(e){for(var f=0;24>f;f++)this[String.fromCharCode(97+f)]=e[f]||0;0.01>this.c&&(this.c=0.01);e=this.b+this.c+this.e;0.18>e&&(e=0.18/e,this.b*=e,this.c*=e,this.e*=e)}}
function SfxrSynth(){this._params=new SfxrParams;var e,f,d,g,l,z,J,K,L,A,m,M;this.reset=function(){var c=this._params;g=100/(c.f*c.f+0.001);l=100/(c.g*c.g+0.001);z=1-0.01*c.h*c.h*c.h;J=1E-6*-c.i*c.i*c.i;c.a||(m=0.5-c.n/2,M=5E-5*-c.o);K=0<c.l?1-0.9*c.l*c.l:1+10*c.l*c.l;L=0;A=1==c.m?0:2E4*(1-c.m)*(1-c.m)+32};this.totalReset=function(){this.reset();var c=this._params;e=1E5*c.b*c.b;f=1E5*c.c*c.c;d=1E5*c.e*c.e+10;return e+f+d|0};this.synthWave=function(c,N){var a=this._params,O=1!=a.s||a.v,r=0.1*a.v*a.v,
P=1+3E-4*a.w,n=0.1*a.s*a.s*a.s,V=1+1E-4*a.t,W=1!=a.s,X=a.x*a.x,Y=a.g,Q=a.q||a.r,Z=0.2*a.r*a.r*a.r,D=a.q*a.q*(0>a.q?-1020:1020),R=a.p?(2E4*(1-a.p)*(1-a.p)|0)+32:0,$=a.d,S=a.j/2,aa=0.01*a.k*a.k,E=a.a,F=e,ba=1/e,ca=1/f,da=1/d,a=5/(1+20*a.u*a.u)*(0.01+n);0.8<a&&(a=0.8);for(var a=1-a,G=!1,T=0,v=0,w=0,B=0,t=0,x,u=0,h,p=0,s,H=0,b,U=0,q,I=0,C=Array(1024),y=Array(32),k=C.length;k--;)C[k]=0;for(k=y.length;k--;)y[k]=2*Math.random()-1;for(k=0;k<N;k++){if(G)return k;R&&++U>=R&&(U=0,this.reset());A&&++L>=A&&(A=
0,g*=K);z+=J;g*=z;g>l&&(g=l,0<Y&&(G=!0));h=g;0<S&&(I+=aa,h*=1+Math.sin(I)*S);h|=0;8>h&&(h=8);E||(m+=M,0>m?m=0:0.5<m&&(m=0.5));if(++v>F)switch(v=0,++T){case 1:F=f;break;case 2:F=d}switch(T){case 0:w=v*ba;break;case 1:w=1+2*(1-v*ca)*$;break;case 2:w=1-v*da;break;case 3:w=0,G=!0}Q&&(D+=Z,s=D|0,0>s?s=-s:1023<s&&(s=1023));O&&P&&(r*=P,1E-5>r?r=1E-5:0.1<r&&(r=0.1));q=0;for(var ea=8;ea--;){p++;if(p>=h&&(p%=h,3==E))for(x=y.length;x--;)y[x]=2*Math.random()-1;switch(E){case 0:b=p/h<m?0.5:-0.5;break;case 1:b=
1-2*(p/h);break;case 2:b=p/h;b=0.5<b?6.28318531*(b-1):6.28318531*b;b=0>b?1.27323954*b+0.405284735*b*b:1.27323954*b-0.405284735*b*b;b=0>b?0.225*(b*-b-b)+b:0.225*(b*b-b)+b;break;case 3:b=y[Math.abs(32*p/h|0)]}O&&(x=u,n*=V,0>n?n=0:0.1<n&&(n=0.1),W?(t+=(b-u)*n,t*=a):(u=b,t=0),u+=t,B+=u-x,b=B*=1-r);Q&&(C[H%1024]=b,b+=C[(H-s+1024)%1024],H++);q+=b}q=0.125*q*w*X;c[k]=1<=q?32767:-1>=q?-32768:32767*q|0}return N}}var synth=new SfxrSynth;
window.jsfxr=function(e){synth._params.setSettings(e);var f=synth.totalReset();e=new Uint8Array(4*((f+1)/2|0)+44);var f=2*synth.synthWave(new Uint16Array(e.buffer,44),f),d=new Uint32Array(e.buffer,0,44);d[0]=1179011410;d[1]=f+36;d[2]=1163280727;d[3]=544501094;d[4]=16;d[5]=65537;d[6]=44100;d[7]=88200;d[8]=1048578;d[9]=1635017060;d[10]=f;for(var f=f+44,d=0,g="data:audio/wav;base64,";d<f;d+=3)var l=e[d]<<16|e[d+1]<<8|e[d+2],g=g+("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[l>>18]+
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[l>>12&63]+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[l>>6&63]+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[l&63]);d-=f;return g.slice(0,g.length-d)+"==".slice(0,d)};


//draw();
//drawStartLevel();
drawSplash();
updateSplash();
//update();
//draw();
//drawEndScreen();

