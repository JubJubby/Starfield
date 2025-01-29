let stars = [];
let factor = 200;//spreads out the star locations in the createVector function
let speedSlider;

function setup() {
    createCanvas(600, 600);//size of the screen, can use (windowWidth, windowHeight) for full screen
    speedSlider = createSlider(0, 20, 2, 0.1); //(from value, to value, start value, rate of change)
    for (let i = 0; i < 1500; i++) { //adds stars until it reaches the value of the middle param
        stars[i] = createVector( //vector has values of x, y, z built in
            random(-width * factor, width * factor), 
            random(-height * factor, height * factor), 
            random(width)
        );
        stars[i].pz = stars[i].z; //sets value of previous z or "pz" equal to the current z value
    }
}

function draw() { 
    background(0);
    translate(width / 2, height / 2);//in p5.js, (0, 0) is top left corner, so this just moves or translates the location to the middle of the canvas

    for (let star of stars) {
        let x = star.x / star.z;//as the star gets bigger (closer) it should move right or left
        let y = star.y / star.z;//as the star gets bigger (closer) it should move up or down
        let px = star.x / star.pz;//store previous x value relative to current x and previous z
        let py = star.y / star.pz;//store previous y value relative to current y and previous z
        let d = map(star.z, 0, width, 10, 0);//the range of the width of star is from 0 to width and its diameter goes from 10 (up close) to 1 (far away)
        fill(255, 255, 255);//rgb (white)
        noStroke();//no outline
        circle(x, y, d);
        stroke(255, 255, 255);//outline rgb (white)
        line(x, y, px, py);//draw a line from (x, y) to (px, py)
        star.pz = star.z;//save previous z value before moving it
        star.z -= speedSlider.value();//speed of stars moving, see speedSlider in the setup function

        if (star.z < 1) {//when the star gets too close to the screen...
            star.x = random(-width * factor, width * factor);//reset the x value to a new random x location
            star.y = random(-height * factor, height * factor);//reset the y value to a new random y location
            star.z = width;//reset the z value to its furthest point
            star.pz = width;//reset the previous z value to its furthest point as well for the new trail to be created
        }
    }
}