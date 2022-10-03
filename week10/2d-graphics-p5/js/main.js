
// console.log('Loaded!', dat, p5);

// const setup = function(){ ... };

const circles = []; // for storing all the drawn circles, so we can redraw and move them around

// For keeping track of which draw 'group' the circles are in
let shiftKeyCount = 0;


const controls = {
  velocityScale: 0.2,
  drawLines: true,
  drawCircles: false,
  drawTrails: false,
  circleSize: 50,
  lineDistanceThreshold: 200,
  edgeMode: 'bounce',
  lineWidth: 2,
};

function setup(){

  // Create a control panel
  const gui = new dat.GUI();
  gui.add( controls, 'velocityScale', -2.0, 2.0  );
  gui.add( controls, 'circleSize', 10.0, 200.0  );
  gui.add( controls, 'lineWidth', 1, 100 );
  gui.add( controls, 'drawLines' );
  gui.add( controls, 'drawCircles' );
  gui.add( controls, 'drawTrails' );
  gui.add( controls, 'lineDistanceThreshold', 10.0, windowWidth );
  gui.add( controls, 'edgeMode', ['bounce', 'wrap'] );

  // R, G, B   or  H, S, V  depending on mode
  // grayscale
  createCanvas( windowWidth, windowHeight );
  background( 0 ); // FF
 
  // fill( 255, 0, 0 );
  // // strokeWeight( 10 );
  // // stroke( 0, 0, 255 );
  // noStroke(); 
  // //        x   y       w   h  
  // ellipse( 200, 300,  100, 100 );

  // // square()

  // fill( 0, 0, 255 );
  // rect( 200, 300,  150, 150 );


  // fill( 0, 255, 0 );
  // triangle( 
  //   270, 100,  // x, y position of first point
  //   150, 300,
  //   400, 300
  // );

  // stroke( 255, 0, 0 );
  // strokeWeight(5);
  // line( 100, 300,  600, 200 );

  // strokeWeight(1);
  // point( 500, 100 );

  // Switch from RGB to HSB "colour space"
  colorMode( HSB, 255 );

} // setup()


// Paintr mode
function draw(){

  const hue = frameCount % 256;    // 256 % 255 == 1,  257 % 256 == 2,  

  if( keyIsDown(SHIFT) ){

    noStroke();
    
    // const mouseXNormalized = mouseX / windowWidth;  //  700 / 1400 == 0.5
    // const hue = mouseXNormalized * 255;  // 0.5 * 255 == 127

    // const hue = map( 
    //   mouseY, // input value
    //   0, windowHeight, // input range
    //   0, 255 // output range  127..255    
    // );

    // const hue = random(256);

    const mouseXVel = mouseX - pwinMouseX;
    const mouseYVel = mouseY - pwinMouseY;

    const newCircle = {
      xPos: mouseX,
      yPos: mouseY,
      hue: hue,
      size: controls.circleSize,
      xVel: mouseXVel, //random(-20, 20),
      yVel: mouseYVel, //random(-20, 20)
      drawGroup: shiftKeyCount
    };

    circles.push( newCircle );

    // fill( 
    //   // random(256), 
    //   // mouseX,
    //   hue,
    //   255, 
    //   255 
    // );

    // ellipse(mouseX, mouseY, 100, 100);

  } // if key is down

  updateCircles();

} // draw


function updateCircles(){


  // TODO: add a checkbox to the dat.gui controls so that you can conditionally
  // enable or disable the background clearing - trails
  if( !controls.drawTrails ){
    background(0); // clear screen
  }

  // loop over each of the saved circles and redraw them
  for( const circle of circles ){

    // update the position of the circle using its velocity
    circle.xPos += circle.xVel * controls.velocityScale; // scale up or down
    circle.yPos += circle.yVel * controls.velocityScale;


    // // wrap/warp across edges 

    if( controls.edgeMode === 'bounce' ){

      // bounce off edges!
      if( circle.xPos > windowWidth || circle.xPos < 0 ){
        circle.xVel *= -1; // flip the direction!
      }
      if( circle.yPos > windowHeight || circle.yPos < 0 ){
        circle.yVel *= -1; // flip the direction!
      }

    } else if( controls.edgeMode === 'wrap' ){

      if( circle.xPos > windowWidth ){
        circle.xPos = 0;
      } else if( circle.xPos < 0 ){
        circle.xPos = windowWidth;
      }
      
      if( circle.yPos > windowHeight ){
        circle.yPos = 0;
      } else if( circle.yPos < 0 ){
        circle.xPos = windowHeight;
      }
    
    }


    // TODO: 
    // 1. Draw a line from the current circle to every other circle?
    //    - 1a. Draw a line ONLY to other circles that are "close enough", i.e. within a certain distance
    //    - Look up Pythagoras' Distance Formula
    //    - What is "time complexity" of each frame draw once we are drawing these
    //      lines? (in Big-O notation)

    if( controls.drawLines ){
      drawLinesFrom( circle );
    }

    if( controls.drawCircles ){
      fill( circle.hue, 255, 255 );
      ellipse( circle.xPos, circle.yPos, circle.size, circle.size );
    }


  } // for each circle
   
} // updateCircles()



function drawLinesFrom( circle ){

  strokeWeight(2);
  // stroke( circle.hue, 255, 255, 100 );

  for( const otherCircle of circles ){

    if( circle === otherCircle 
      || circle.drawGroup !== otherCircle.drawGroup ){
      continue; // don't draw a line from the same circle to itself (which would look like a dot)
    }

    // TODO: ONLY draw lines when the two circles in question are near enough to each other
    // (i.e. below some constant threshold)
    // HOW DO YOU GET THE DISTANCE BETWEEN CIRCLES? Pythagoras' Theorem!


    // What is the distance between these two circles?
    // PYTHAGORAS!
    const xDist = circle.xPos - otherCircle.xPos;
    const yDist = circle.yPos - otherCircle.yPos;
    const dist = Math.sqrt( xDist*xDist + yDist*yDist );

    if( dist <= controls.lineDistanceThreshold ){

      // TODO: as a variation of the above, how would you 
      // make the opacity or thickness of the
      // line proportional to the distance between the 
      // circles? (Remember map())
      const opacity = map(
        dist,
        0, controls.lineDistanceThreshold,
        255, 0 // the larger the distance, the more transparent
      );

      strokeWeight( controls.lineWidth );
      stroke( circle.hue, 255, 255, opacity );
      line( circle.xPos, circle.yPos, otherCircle.xPos, otherCircle.yPos);
    } // if dist small


    // TODO: How would you draw lines not from every circle to every other, but only
    // between 'groups' of circles, i.e. circles created during the same 'shift' keydown hold?
    //
    // See `shiftKeyCount` and `drawGroup`

    // TODO: How would you make the circles fade out and disappear over time?

  } // for each other circle

  noStroke();

} // drawLinesFrom()




// make the window responsive, i.e
// automatically update the canvas size
// whenever the user changes the browser window size
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

// This runs whenever a key is pressed
function keyPressed( ev ){
  
  // TODO: press spacebar to clear screen, i.e. empty the circles array
  if( ev.key === ' ' ){
    ev.preventDefault();
    background(0);
    circles.length = 0;   // effectively empty the array, no more circles
  } else if( ev.key === 'Shift' ){
    // For drawing lines only between circles drawn at 
    // the same time as each other, i.e. same shift
    // key press

    shiftKeyCount++;
  }

} // keyPressed()




// Screensaver mode
// function draw(){

//   // console.log('drawing!');

//   fill(
//     random(256), // hue
//     255,  // saturation
//     255,  // brightness
//     127   // "alpha channel" i.e. opacity
//   );


//   const size = random(100, 400);

//   noStroke();

//   ellipse( 
//     random(windowWidth), // x
//     random(windowHeight), // y
//     size,
//     size

//   );

// } // draw()