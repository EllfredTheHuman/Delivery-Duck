const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 960;
canvas.height = 540;

ctx.imageSmoothingEnabled = false;


// =====================================
// PLAYER
// =====================================

const player = {
    x: 480,
    y: 270,

    width: 24,
    height: 24,

    speed: 3
};


// =====================================
// CAMERA
// =====================================

const camera = {
    x: 0,
    y: 0
};


// =====================================
// COLLISION OBJECTS
// =====================================

const walls = [

    // Building
    {
        x: 150,
        y: 100,
        width: 300,
        height: 180
    },

    // Building
    {
        x: 650,
        y: 80,
        width: 220,
        height: 200
    },

    // Small building
    {
        x: 400,
        y: 450,
        width: 250,
        height: 150
    },

    // Tree
    {
        x: 900,
        y: 350,
        width: 40,
        height: 40
    }
];


// =====================================
// INPUT
// =====================================

const keys = {};

window.addEventListener("keydown", (event) => {
    keys[event.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (event) => {
    keys[event.key.toLowerCase()] = false;
});


// =====================================
// COLLISION
// =====================================

function isColliding(a, b) {

    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}


function movePlayer(dx, dy) {

    // Move horizontally
    player.x += dx;

    for (const wall of walls) {

        if (isColliding(player, wall)) {

            if (dx > 0) {
                player.x = wall.x - player.width;
            }

            if (dx < 0) {
                player.x = wall.x + wall.width;
            }
        }
    }


    // Move vertically
    player.y += dy;

    for (const wall of walls) {

        if (isColliding(player, wall)) {

            if (dy > 0) {
                player.y = wall.y - player.height;
            }

            if (dy < 0) {
                player.y = wall.y + wall.height;
            }
        }
    }
}


// =====================================
// UPDATE
// =====================================

function update() {

    let dx = 0;
    let dy = 0;


    if (keys["w"] || keys["arrowup"]) {
        dy -= player.speed;
    }

    if (keys["s"] || keys["arrowdown"]) {
        dy += player.speed;
    }

    if (keys["a"] || keys["arrowleft"]) {
        dx -= player.speed;
    }

    if (keys["d"] || keys["arrowright"]) {
        dx += player.speed;
    }


    // Prevent diagonal movement being faster
    if (dx !== 0 && dy !== 0) {

        dx *= 0.7071;
        dy *= 0.7071;
    }


    movePlayer(dx, dy);


    // Camera follows player
    camera.x = player.x - canvas.width / 2 + player.width / 2;
    camera.y = player.y - canvas.height / 2 + player.height / 2;
}


// =====================================
// DRAW
// =====================================

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // -------------------------------
    // WORLD
    // -------------------------------

    ctx.save();

    ctx.translate(-camera.x, -camera.y);


    // Ground
    ctx.fillStyle = "#78a85a";

    ctx.fillRect(
        -1000,
        -1000,
        4000,
        4000
    );


    // Roads
    ctx.fillStyle = "#555";

    ctx.fillRect(
        -1000,
        300,
        4000,
        120
    );

    ctx.fillRect(
        500,
        -1000,
        120,
        3000
    );


    // Buildings
    ctx.fillStyle = "#b56f52";

    for (const wall of walls) {

        ctx.fillRect(
            wall.x,
            wall.y,
            wall.width,
            wall.height
        );
    }


    // -------------------------------
    // DUCK
    // -------------------------------

    ctx.fillStyle = "#f5d84a";

    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );


    // Duck beak
    ctx.fillStyle = "#e58b35";

    ctx.fillRect(
        player.x + player.width,
        player.y + 8,
        7,
        6
    );


    // Eye
    ctx.fillStyle = "#111";

    ctx.fillRect(
        player.x + 15,
        player.y + 5,
        3,
        3
    );


    ctx.restore();
}


// =====================================
// GAME LOOP
// =====================================

function gameLoop() {

    update();
    draw();

    requestAnimationFrame(gameLoop);
}


gameLoop();
