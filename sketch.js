let font;
let fontData;
let path;

function preload() {
  fontData = loadBytes('time-new-roman.ttf');
}

function setup() {
	createCanvas(900, 400);
  font = opentype.parse(fontData.bytes.buffer);
}

function draw() {
  background(255);
  translate(50, 125);
  var ctx = canvas.getContext('2d');
  path = font.getPath("landscape of type", 100, 200, 100)
  drawNewType(path.commands)
}

function drawNewType(cmds) {
  // adapted from comptypo example!
  let cx = 0;
  let cy = 0;

  let startX = 0;
  let startY = 0;
  for (let cmd of cmds) {
    switch (cmd.type) {
      case 'M':
        startX = cmd.x;
        startY = cmd.y;
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'L':
        // stroke(118,49,49);
        strokeWeight(3);
        line(cx, cy, cmd.x, cmd.y);
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'Q':
        beginShape();
        vertex(cx, cy);
        quadraticVertex(cmd.x, cmd.y, cmd.x, cmd.y);
        
        // stroke('rgb(70,146,70)');
        strokeWeight(10);

        
        if (cy < 190) {
          // stroke('rgb(135,214,238)');
          quadraticVertex(cmd.x, cmd.y, cmd.x, cmd.y);

          strokeWeight(2);
        }

        if (cy < 140) {
          // stroke('rgb(253,244,43)');
          strokeWeight(40);
        }

        endShape();
        cx = cmd.x;
        cy = cmd.y;
        break;
    }
  }
}