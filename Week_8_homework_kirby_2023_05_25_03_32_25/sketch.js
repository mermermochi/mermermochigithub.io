let font;

let scene = 0;
// 0: intro
// 1: game
// 2: success

let arr_x = [];
let arr_y = [];
let count = 10;

let img1, img2, img3;
let kirby_x, kirby_y, kirby_vx, kirby_vy;

var song;

function preload() {
  //font = loadFont('PressStart2P.ttf');
    song = loadSound("Candy.mp3");
}

function setup() {
  createCanvas(500, 500);
  song.play();
  //textFont('PressStart2P');
  img1 = loadImage("kirby.png");
  img2 = loadImage("sunset.jpg");
  img3 = loadImage("tomato.png");
  img4 = loadImage("full.png");
  img5 = loadImage("mad.jpg");

  // initialize kirby's position and velocity (random)
  kirby_x = random(width);
  kirby_y = random(height);
  kirby_vx = (-4, 4);
  kirby_vy = (-2, 2);
}

//beggining screen
function draw() {
  if (scene == 0) {
    background(255);
    fill(0);
    image(img5, 0, 0, 500, 500);
    textSize(60);
    //textFont('PressStart2P');
    text("Feed Me!", 90, 150);
  }
  if (scene == 1) {
    background(255, 230, 200);
    image(img2, 0, 0, 500, 500);

    //tomato
    for (let i = 0; i < arr_x.length; i++) {
      image(img3, arr_x[i], arr_y[i], 30, 30);
      arr_y[i] += -5;
    }

    // draw kirby
    image(img1, kirby_x, kirby_y, 170, 100);

    // update kirby's position
    kirby_x += kirby_vx;
    kirby_y += kirby_vy;

    // check if kirby is out of bounds and reverse its velocity
    if (kirby_x < 0 || kirby_x > width - 170) {
      kirby_vx *= -1;
    }
    if (kirby_y < 0 || kirby_y > height - 100) {
      kirby_vy *= -1;
    }

    // draw tomatoes
    for (let i = 0; i < arr_x.length; i++) {
      image(img3, arr_x[i], arr_y[i], 40, 40);
      arr_y[i] -= 1;
      if (arr_y[i] < -30) {
        arr_x.splice(i, 1);
        arr_y.splice(i, 1);
        i--;
      }
    }

    // detect collision between kirby and tomatoes
    for (let i = arr_x.length - 1; i >= 0; i--) {
      if (dist(kirby_x + 85, kirby_y + 50, arr_x[i] + 15, arr_y[i] + 15) < 65) {
        arr_x.splice(i, 1);
        arr_y.splice(i, 1);
        count--;
      }
    }

    // number counter
    print(arr_x.length, count);
    fill(255);
    if (count <= 0) {
      scene = 2;
    } else {
      textSize(50);
      text(count, 240, 80);
      textSize(20);
      text("Hunger Level", 195, 30);
    }
  }

  //end screen
  if (scene == 2) {
    background(255, 230, 200);
    image(img2, 0, 0, 500, 500);
    textSize(60);
    text("Tasty!", 160, 150);
    image(img4, 160, 200, 170, 170);
  }
}

// switching from first screen to second screen
function mousePressed() {
  if (scene == 0) {
    scene = 1;
  } else if (scene == 1) {
    arr_x.push(mouseX);
    arr_y.push(mouseY);
  }
}
