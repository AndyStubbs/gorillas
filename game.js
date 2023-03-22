const WIDTH = 640;
const HEIGHT = 350;
let gorilla1 = {
	"x": 48,
	"y": 50,
	"leftArmUp": false,
	"rightArmUp": false,
	"hand": "right"
};
let gorilla2 = {
	"x": 592,
	"y": 50,
	"leftArmUp": false,
	"rightArmUp": false,
	"hand": "left"
};
let lastBanana = null;

// Initialize our screen
$.screen({ "aspect": WIDTH + "x" + HEIGHT, "isMultiple": true });

// Setup our colors
$.setPalColor( 1, "#0000a8" );	// Blue
$.setPalColor( 2, "#a8a8a8" );	// Gray
$.setPalColor( 3, "#a80000" );	// Red
$.setPalColor( 4, "#00a8a8" );	// Yellow 1
$.setPalColor( 5, "#fcfc00" );	// Yellow 2
$.setPalColor( 6, "#fcfc54" );	// Yellow 3
$.setPalColor( 7, "#fca854" );  // Tan
$.setPalColor( 8, "#545454" );  // Dark Gray
$.setPalColor( 9, "#FFFFFF" );

startGame();

function drawScene() {
	// Draw our scene
	const BUILDING_COLORS = [2, 3, 4];
	const BUILDING_SIZE = 32;
	const MAX_BUILDING_HEIGHT = 250;
	const MIN_BUILDING_HEIGHT = 100;
	const WINDOW_COLORS = [6, 8, 6, 6];

	$.setContainerBgColor("black");
	$.setBgColor(1);
	let buildingHeight = Math.floor(Math.random() * 150) + 100;
	for(let x = 0; x < WIDTH; x += BUILDING_SIZE) {

		// Compute building height
		buildingHeight += Math.floor(Math.random() * 100) - 50;
		if(buildingHeight > MAX_BUILDING_HEIGHT) {
			buildingHeight = MAX_BUILDING_HEIGHT;
		} else if(buildingHeight < MIN_BUILDING_HEIGHT) {
			buildingHeight = MIN_BUILDING_HEIGHT;
		}
		// Compute building color
		let color = BUILDING_COLORS[Math.floor(Math.random() * BUILDING_COLORS.length)];

		// Draw building
		$.setColor(1);
		$.rect(x, HEIGHT - buildingHeight, BUILDING_SIZE, HEIGHT + 2, color);

		// Draw windows
		const WINDOW_HEIGHT = 5;
		const WINDOW_WIDTH = 4;
		const NUM_WINDOWS = 3;
		for(y = HEIGHT - buildingHeight + 3; y < HEIGHT; y += WINDOW_HEIGHT * 2) {
			for(i = 0; i < NUM_WINDOWS; i++) {
				// Compute window color
				color = WINDOW_COLORS[Math.floor(Math.random() * WINDOW_COLORS.length)];

				// Draw windows for the row
				$.setColor(color);
				$.rect(x + (i * (WINDOW_WIDTH * 2.5)) + 4, y, WINDOW_WIDTH, WINDOW_HEIGHT, color);
			}
		}
	}
}

function drawSun(isSurprise) {
	// Draw Rays
	$.setColor(5);
	let radius = 15;
	for(let a = 0; a <= 360; a += 22.5) {
		x = Math.cos((Math.PI / 180) * a) * radius + 320;
		y = Math.sin((Math.PI / 180) * a) * radius + 20;
		$.line(320, 20, x, y);
	}
	
	// Draw Sun
	$.circle(320, 20, 10, 5);
	
	// Draw Face
	$.setColor(1);
	$.circle(317, 18, 2, 1);
	$.circle(323, 18, 2, 1);
	if(isSurprise) {
		$.circle(320, 24, 3, 1);
	} else {
		$.arc(320, 22, 4, 40, 140);
	}
}

function drawGorilla(gorilla) {
	let x = gorilla.x;
	let y = gorilla.y;
	$.render();
	$.cls(x - 16, y - 17, 30, 34);
	//$.rect(x - 16, y - 17, 30, 34, "red");
	$.setColor(7)
	$.pset(x, y);

	// Draw bottom half
	$.draw("L2 R4 L2 U L R2 L U D3 L5 R10 D6 L11 U6 BF1 P7 L D4");

	// Draw Legs
	$.draw("L D2 L2 D2 L D5 R D R5 U L U5 R U R U BG3 P7 BE3 R4 D R D R D6 L R5 U R U 4 L U2 L2 U BL P7 U7 R");
	
	// Draw Upper Torso
	$.draw("E R1 U7 L16 D7 R3 E1 R2 E2 U2 R2 D2 F2 R2 BU P7");
	
	// Draw Head
	$.draw( "L2 U6 E U2 E U2 L U2 L8 F R6 F D L8 U2 G D2 R2 D R3 U2 BD2 R3 U R D L8 D2 F BR P7");
	
	// Draw Left Arm
	let x2 = x + 3;
	let y2 = y - 1;	
	if(gorilla.leftArmUp) {
		y2 = y - 11;
	}	
	$.arc(x2, y2, 7, 290, 70);
	$.arc(x2 + 4, y2, 7, 270, 90);	
	$.paint(x2 + 7, y2, 7);
	
	// Draw Right Arm
	x2 = x - 9;
	y2 = y - 1;	
	if(gorilla.rightArmUp) {
		y2 = y - 11;
	}	
	$.arc(x2, y2, 7, 90, 270);
	$.arc(x2 + 4, y2, 7, 125, 235);	
	$.paint(x2 - 5, y2, 7);
}

function drawBanana(banana) {
	let data1 = [
		[ 0, 6, 6, 0, 0, 0, 0 ],
		[ 0, 6, 6, 6, 0, 0, 0 ],
		[ 0, 0, 6, 6, 6, 0, 0 ],
		[ 0, 0, 6, 6, 6, 0, 0 ],
		[ 0, 0, 6, 6, 6, 0, 0 ],
		[ 0, 6, 6, 6, 0, 0, 0 ],
		[ 0, 6, 6, 0, 0, 0, 0 ],
	];
	let data2 = [
		[ 0, 0, 0, 0, 0, 0, 0 ],
		[ 6, 6, 0, 0, 0, 6, 6 ],
		[ 6, 6, 6, 6, 6, 6, 6 ],
		[ 0, 6, 6, 6, 6, 6, 0 ],
		[ 0, 0, 6, 6, 6, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0 ],
	];
	let data3 = [
		[ 0, 0, 0, 0, 6, 6, 0 ],
		[ 0, 0, 0, 6, 6, 6, 0 ],
		[ 0, 0, 6, 6, 6, 0, 0 ],
		[ 0, 0, 6, 6, 6, 0, 0 ],
		[ 0, 0, 6, 6, 6, 0, 0 ],
		[ 0, 0, 0, 6, 6, 6, 0 ],
		[ 0, 0, 0, 0, 6, 6, 0 ],
	];
	let data4 = [
		[ 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 6, 6, 6, 0, 0 ],
		[ 0, 6, 6, 6, 6, 6, 0 ],
		[ 6, 6, 6, 6, 6, 6, 6 ],
		[ 6, 6, 0, 0, 0, 6, 6 ],
		[ 0, 0, 0, 0, 0, 0, 0 ],
	];
	let data = [ data1, data2, data3, data4 ];
	if(lastBanana) {
		$.cls(lastBanana.x, lastBanana.y, 7, 7);	
	}
	$.put(data[banana.frame % 4], banana.x, banana.y);
	lastBanana = {
		"x": banana.x,
		"y": banana.y
	};
}

function startGame() {
	drawScene();
	gorilla1.y = findBuildingHeight(gorilla1.x, gorilla1.y);
	gorilla2.y = findBuildingHeight(gorilla2.x, gorilla2.y);
	updateScene();
}

function findBuildingHeight(x, y) {
	let c = 0;
	let ty = y;
	let data = $.get(x, y, x, HEIGHT);
	for( let i = 0; i < data.length; i++ ){
		c = data[i][0];
		if(c !== 0) {
			return y + i - 16;
		}
	}
	return -1;
}

function updateScene() {
	drawGorilla(gorilla1);
	drawGorilla(gorilla2);
	drawSun();
	$.setColor( 9 );
	$.print(" Player 1", true);
	$.setPos($.getCols() - 9, 0);
	$.print("Player 2", true);
	$.setInputCursor("_");
	nextTurn(gorilla1, {"row": 1, "col": 1});
}

async function nextTurn(gorilla, pos) {
	let angle = 181;
	$.setPos(pos);
	let posPx = $.getPosPx();
	while( angle > 180) {
		$.setPos(pos);
		$.setColor( 9 );
		angle = await $.input("Angle: ", null, true, true, false);
		if( angle > 180 ) {
			$.cls(0, posPx.y, WIDTH, 50);
			drawSun();
		}
	}
	let velocity = 200;
	while(velocity > 199) {
		$.setPos(pos.col, pos.row + 1);
		velocity = await $.input("Velocity: ", null, true, true, false);
		if( velocity > 199 ) {
			$.cls(0, posPx.y, WIDTH, 50);
			drawSun();
			$.setColor(9);
			$.setPos(pos);
			$.print("Angle: " + angle);
		}
	}
	throwBanana(gorilla, angle, velocity);
}

function throwBanana(gorilla, angle, velocity) {
	let banana = {
		"y": gorilla.y - 20,
		"frame": 0
	};
	if(gorilla.hand === "right") {
		banana.x = gorilla.x - 16;
		banana.vx = Math.cos(Math.PI / 180 * -angle) * (velocity / 650);
		banana.vy = Math.sin(Math.PI / 180 * -angle) * (velocity / 650);
		gorilla.rightArmUp = true;
	} else {
		angle += 90;
		banana.x = gorilla.x + 6;
		banana.vx = Math.cos(Math.PI / 180 * angle) * (velocity / 650);
		banana.vy = Math.sin(Math.PI / 180 * angle) * (velocity / 650);
		gorilla.leftArmUp = true;
	}
	drawGorilla(gorilla);
	animateBanana(banana);
}

function animateBanana(banana) {
	let t = new Date().getTime();
	let interval = setInterval(function () {
		let nt = new Date().getTime();
		let dt = (nt - t);
		if(dt > 3000) {
			dt = 3000;
		}
		t = nt;
		banana.vy += 0.00005 * dt;
		banana.x += banana.vx * dt;
		banana.y += banana.vy * dt;
		drawSun();
		drawBanana(banana);
		banana.frame += 1;
	}, 60);
}


