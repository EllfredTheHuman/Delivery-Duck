const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Low-resolution game canvas.
// The browser scales this up, giving everything a crisp pixel-art look.
canvas.width = 320;
canvas.height = 180;

ctx.imageSmoothingEnabled = false;


// =====================================================
// PIXEL DUCK
// =====================================================

// Each character is a tiny pixel-art grid.
// 0 = transparent
// 1 = outline
// 2 = yellow
// 3 = orange
// 4 = eye
// 5 = wing

const duckFrames = [

    // WALK FRAME 1
    [
        "0000000000000000",
        "0000111110000000",
        "0001222221100000",
        "0012222222210000",
        "0012222242233330",
        "0012222222233300",
        "0012225552220000",
        "0012225552220000",
        "0001222222210000",
        "0000122222100000",
        "0000111111100000",
        "0001100011000000",
        "0011000011000000",
        "0011000011000000",
        "0000000000000000",
        "0000000000000000"
    ],

    // WALK FRAME 2
    [
        "0000000000000000",
        "0000111110000000",
        "0001222221100000",
        "0012222222210000",
        "0012222242233330",
        "0012222222233300",
        "0012225552220000",
        "0012225552220000",
        "0001222222210000",
        "0000122222100000",
        "0000111111100000",
        "0001100011000000",
        "0001100001100000",
        "0011000000110000",
        "0000000000000000",
        "0000000000000000"
    ]
];


// Colours used by the pixel duck.
const duckColours = {
    1: "#3b342c",
    2: "#f4d34f",
    3: "#e98b35",
    4: "#171717",
    5: "#d9b63e"
};


// =====================================================
// PLAYER
// =====================================================

const player = {

    x: 160,
    y: 90,

    width: 16,
    height: 16,

    speed: 1.5,

    direction: "down",

    animationFrame: 0,
    animationTimer: 0,

    // Smaller than the sprite.
    // This makes collision feel natural.
    hitbox: {
        x: 4,
        y: 8,
        width: 8,
        height: 6
    }
};


// =====================================================
// CAMERA
// =====================================================

const camera = {
    x: 0,
    y: 0
};


// =====================================================
// WORLD
// =====================================================

const world = {
    width: 1200,
    height: 900
};


// =====================================================
// COLLISION OBJECTS
// =====================================================

const walls = [

    // Large building
    {
        x: 80,
        y: 60,
        width: 180,
        height: 100
    },

    // Building
    {
        x: 430,
        y: 40,
        width: 150,
        height: 130
    },

    // Building
    {
        x: 720,
        y: 90,
        width: 200,
        height: 110
    },

    // Building
    {
        x: 280,
        y: 430,
        width: 190,
        height: 120
    },

    // Building
    {
        x: 700,
        y: 500,
        width: 220,
        height: 150
    },

    // Tree
    {
        x: 1050,
        y: 300,
        width: 25,
        height: 25
    },

    // Tree
    {
        x: 1100,
        y: 700,
        width: 25,
        height: 25
    }
];


// =====================================================
// INPUT
// =====================================================

const keys = {};

window.addEventListener("keydown", (event) => {

    keys[event.key.toLowerCase()] = true;

});

window.addEventListener("keyup", (event) => {

    keys[event.key.toLowerCase()] = false;

});


// =====================================================
// PLAYER HITBOX
// =====================================================

function getPlayerHitbox() {

    return {

        x: player.x + player.hitbox.x,

        y: player.y + player.hitbox.y,

        width: player.hitbox.width,

        height: player.hitbox.height
    };
}


// =====================================================
// COLLISION
// =====================================================

function isColliding(a, b) {

    return (

        a.x < b.x + b.width &&

        a.x + a.width > b.x &&

        a.y < b.y + b.height &&

        a.y + a.height > b.y
    );
}


// =====================================================
// MOVEMENT
// =====================================================

function movePlayer(dx, dy) {

    // ---------------------------------------------
    // Horizontal movement
    // ---------------------------------------------

    player.x += dx;

    let hitbox = getPlayerHitbox();

    for (const wall of walls) {

        if (isColliding(hitbox, wall)) {

            if (dx > 0) {

                player.x =
                    wall.x -
                    player.hitbox.x -
                    player.hitbox.width;
            }

            if (dx < 0) {

                player.x =
                    wall.x +
                    wall.width -
                    player.hitbox.x;
            }

            hitbox = getPlayerHitbox();
        }
    }


    // ---------------------------------------------
    // Vertical movement
    // ---------------------------------------------

    player.y += dy;

    hitbox = getPlayerHitbox();

    for (const wall of walls) {

        if (isColliding(hitbox, wall)) {

            if (dy > 0) {

                player.y =
                    wall.y -
                    player.hitbox.y -
                    player.hitbox.height;
            }

            if (dy < 0) {

                player.y =
                    wall.y +
                    wall.height -
                    player.hitbox.y;
            }

            hitbox = getPlayerHitbox();
        }
    }


    // Keep duck inside world

    player.x = Math.max(
        0,
        Math.min(world.width - player.width, player.x)
    );

    player.y = Math.max(
        0,
        Math.min(world.height - player.height, player.y)
    );
}


// =====================================================
// UPDATE DUCK ANIMATION
// =====================================================

function updateAnimation(dx, dy) {

    if (dx === 0 && dy === 0) {

        player.animationFrame = 0;

        return;
    }


    player.animationTimer++;


    if (player.animationTimer >= 12) {

        player.animationTimer = 0;

        player.animationFrame++;

        if (player.animationFrame >= duckFrames.length) {

            player.animationFrame = 0;
        }
    }
}


// =====================================================
// UPDATE
// =====================================================

function update() {

    let dx = 0;
    let dy = 0;


    if (keys["w"] || keys["arrowup"]) {
        dy -= player.speed;
        player.direction = "up";
    }

    if (keys["s"] || keys["arrowdown"]) {
        dy += player.speed;
        player.direction = "down";
    }

    if (keys["a"] || keys["arrowleft"]) {
        dx -= player.speed;
        player.direction = "left";
    }

    if (keys["d"] || keys["arrowright"]) {
        dx += player.speed;
        player.direction = "right";
    }


    // Prevent diagonal movement being faster.

    if (dx !== 0 && dy !== 0) {

        dx *= 0.7071;
        dy *= 0.7071;
    }


    movePlayer(dx, dy);

    updateAnimation(dx, dy);


    // Camera follows duck.

    camera.x =
        player.x +
        player.width / 2 -
        canvas.width / 2;

    camera.y =
        player.y +
        player.height / 2 -
        canvas.height / 2;


    // Keep camera inside world.

    camera.x = Math.max(
        0,
        Math.min(
            world.width - canvas.width,
            camera.x
        )
    );

    camera.y = Math.max(
        0,
        Math.min(
            world.height - canvas.height,
            camera.y
        )
    );
}


// =====================================================
// DRAW PIXEL DUCK
// =====================================================

function drawDuck() {

    const frame = duckFrames[player.animationFrame];

    const pixelSize = 1;


    for (let y = 0; y < frame.length; y++) {

        for (let x = 0; x < frame[y].length; x++) {

            const pixel = Number(frame[y][x]);

            if (pixel === 0) continue;


            ctx.fillStyle = duckColours[pixel];

            ctx.fillRect(

                Math.floor(
                    player.x + x * pixelSize
                ),

                Math.floor(
                    player.y + y * pixelSize
                ),

                pixelSize,
                pixelSize
            );
        }
    }
}


// =====================================================
// DRAW WORLD
// =====================================================

function draw() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.save();

    ctx.translate(
        -Math.floor(camera.x),
        -Math.floor(camera.y)
    );


    // ---------------------------------------------
    // GRASS
    // ---------------------------------------------

    ctx.fillStyle = "#72a653";

    ctx.fillRect(
        0,
        0,
        world.width,
        world.height
    );


    // ---------------------------------------------
    // ROADS
    // ---------------------------------------------

    ctx.fillStyle = "#4e4b4a";

    // Horizontal road

    ctx.fillRect(
        0,
        250,
        world.width,
        80
    );


    // Vertical road

    ctx.fillRect(
        600,
        0,
        80,
        world.height
    );


    // ---------------------------------------------
    // ROAD MARKINGS
    // ---------------------------------------------

    ctx.fillStyle = "#d9c85c";


    for (let x = 0; x < world.width; x += 40) {

        ctx.fillRect(
            x,
            288,
            20,
            3
        );
    }


    for (let y = 0; y < world.height; y += 40) {

        ctx.fillRect(
            638,
            y,
            3,
            20
        );
    }


    // ---------------------------------------------
    // BUILDINGS
    // ---------------------------------------------

    for (const wall of walls) {

        // Trees get different drawing.

        if (
            wall.width === 25 &&
            wall.height === 25
        ) {

            drawTree(wall.x, wall.y);

            continue;
        }


        // Building shadow

        ctx.fillStyle = "#493c38";

        ctx.fillRect(
            wall.x + 4,
            wall.y + 4,
            wall.width,
            wall.height
        );


        // Building

        ctx.fillStyle = "#b87559";

        ctx.fillRect(
            wall.x,
            wall.y,
            wall.width,
            wall.height
        );


        // Windows

        ctx.fillStyle = "#79a9b7";

        for (
            let wx = wall.x + 15;
            wx < wall.x + wall.width - 15;
            wx += 35
        ) {

            for (
                let wy = wall.y + 15;
                wy < wall.y + wall.height - 15;
                wy += 30
            ) {

                ctx.fillRect(
                    wx,
                    wy,
                    12,
                    10
                );
            }
        }
    }


    // ---------------------------------------------
    // DUCK
    // ---------------------------------------------

    drawDuck();


    ctx.restore();
}


// =====================================================
// TREE
// =====================================================

function drawTree(x, y) {

    // Trunk

    ctx.fillStyle = "#69472f";

    ctx.fillRect(
        x + 9,
        y + 13,
        7,
        14
    );


    // Leaves

    ctx.fillStyle = "#356b3d";

    ctx.fillRect(
        x + 3,
        y + 5,
        19,
        15
    );

    ctx.fillRect(
        x + 7,
        y,
        11,
        22
    );
}


// =====================================================
// GAME LOOP
// =====================================================

function gameLoop() {

    update();

    draw();

    requestAnimationFrame(gameLoop);
}


gameLoop();
