const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


// =====================================================
// CANVAS
// =====================================================

canvas.width = 320;
canvas.height = 180;

ctx.imageSmoothingEnabled = false;


// =====================================================
// DUCK SPRITESHEET
// =====================================================

const duckSprite = new Image();

duckSprite.src = "ducky_3_spritesheet.png";

const DUCK_FRAME_WIDTH = 32;
const DUCK_FRAME_HEIGHT = 32;


// =====================================================
// DUCK ANIMATIONS
// =====================================================

const duckAnimations = {

    idle: {
        row: 0,
        frames: 2
    },

    walk: {
        row: 1,
        frames: 6
    },

    bouncyIdle: {
        row: 2,
        frames: 4
    },

    bouncyWalk: {
        row: 3,
        frames: 6
    }

};


// =====================================================
// PLAYER
// =====================================================

const player = {

    x: 144,
    y: 76,

    width: 32,
    height: 32,

    speed: 1.5,

    direction: "down",

    animation: "idle",

    animationFrame: 0,

    animationTimer: 0,

    hitbox: {

        x: 9,
        y: 15,

        width: 14,
        height: 12

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

    // Building

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

        x:
            player.x +
            player.hitbox.x,

        y:
            player.y +
            player.hitbox.y,

        width:
            player.hitbox.width,

        height:
            player.hitbox.height

    };

}


// =====================================================
// COLLISION
// =====================================================

function isColliding(a, b) {

    return (

        a.x <
        b.x + b.width

        &&

        a.x + a.width >
        b.x

        &&

        a.y <
        b.y + b.height

        &&

        a.y + a.height >
        b.y

    );

}


// =====================================================
// PLAYER MOVEMENT
// =====================================================

function movePlayer(dx, dy) {

    // ---------------------------------------------
    // Horizontal movement
    // ---------------------------------------------

    player.x += dx;

    let hitbox =
        getPlayerHitbox();


    for (const wall of walls) {

        if (
            isColliding(
                hitbox,
                wall
            )
        ) {

            if (dx > 0) {

                player.x =
                    wall.x
                    -
                    player.hitbox.x
                    -
                    player.hitbox.width;

            }

            else if (dx < 0) {

                player.x =
                    wall.x
                    +
                    wall.width
                    -
                    player.hitbox.x;

            }

            hitbox =
                getPlayerHitbox();

        }

    }


    // ---------------------------------------------
    // Vertical movement
    // ---------------------------------------------

    player.y += dy;

    hitbox =
        getPlayerHitbox();


    for (const wall of walls) {

        if (
            isColliding(
                hitbox,
                wall
            )
        ) {

            if (dy > 0) {

                player.y =
                    wall.y
                    -
                    player.hitbox.y
                    -
                    player.hitbox.height;

            }

            else if (dy < 0) {

                player.y =
                    wall.y
                    +
                    wall.height
                    -
                    player.hitbox.y;

            }

            hitbox =
                getPlayerHitbox();

        }

    }


    // ---------------------------------------------
    // World boundaries
    // ---------------------------------------------

    player.x = Math.max(

        0,

        Math.min(

            world.width -
            player.width,

            player.x

        )

    );


    player.y = Math.max(

        0,

        Math.min(

            world.height -
            player.height,

            player.y

        )

    );

}


// =====================================================
// ANIMATION
// =====================================================

function updateAnimation(dx, dy) {

    const moving =
        dx !== 0 ||
        dy !== 0;


    const newAnimation =
        moving
            ? "walk"
            : "idle";


    // Animation changed

    if (
        player.animation !==
        newAnimation
    ) {

        player.animation =
            newAnimation;

        player.animationFrame =
            0;

        player.animationTimer =
            0;

    }


    // Animate idle AND walking

    player.animationTimer++;


    if (
        player.animationTimer >= 12
    ) {

        player.animationTimer = 0;

        player.animationFrame++;


        const animation =
            duckAnimations[
                player.animation
            ];


        if (
            player.animationFrame >=
            animation.frames
        ) {

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


    // ---------------------------------------------
    // WASD
    // ---------------------------------------------

    if (
        keys["w"] ||
        keys["arrowup"]
    ) {

        dy -= player.speed;

        player.direction = "up";

    }


    if (
        keys["s"] ||
        keys["arrowdown"]
    ) {

        dy += player.speed;

        player.direction = "down";

    }


    if (
        keys["a"] ||
        keys["arrowleft"]
    ) {

        dx -= player.speed;

        player.direction = "left";

    }


    if (
        keys["d"] ||
        keys["arrowright"]
    ) {

        dx += player.speed;

        player.direction = "right";

    }


    // ---------------------------------------------
    // Diagonal movement
    // ---------------------------------------------

    if (
        dx !== 0 &&
        dy !== 0
    ) {

        dx *= 0.7071;

        dy *= 0.7071;

    }


    // ---------------------------------------------
    // Move
    // ---------------------------------------------

    movePlayer(
        dx,
        dy
    );


    // ---------------------------------------------
    // Animation
    // ---------------------------------------------

    updateAnimation(
        dx,
        dy
    );


    // ---------------------------------------------
    // Camera
    // ---------------------------------------------

    camera.x =

        player.x
        +
        player.width / 2
        -
        canvas.width / 2;


    camera.y =

        player.y
        +
        player.height / 2
        -
        canvas.height / 2;


    // ---------------------------------------------
    // Camera boundaries
    // ---------------------------------------------

    camera.x = Math.max(

        0,

        Math.min(

            world.width -
            canvas.width,

            camera.x

        )

    );


    camera.y = Math.max(

        0,

        Math.min(

            world.height -
            canvas.height,

            camera.y

        )

    );

}


// =====================================================
// DRAW DUCK
// =====================================================

function drawDuck() {

    const animation =
        duckAnimations[
            player.animation
        ];


    ctx.drawImage(

        duckSprite,

        // Source X

        player.animationFrame *
        DUCK_FRAME_WIDTH,

        // Source Y

        animation.row *
        DUCK_FRAME_HEIGHT,

        // Source width

        DUCK_FRAME_WIDTH,

        // Source height

        DUCK_FRAME_HEIGHT,

        // Screen X

        Math.floor(
            player.x
        ),

        // Screen Y

        Math.floor(
            player.y
        ),

        // Screen width

        DUCK_FRAME_WIDTH,

        // Screen height

        DUCK_FRAME_HEIGHT

    );

}


// =====================================================
// DRAW TREE
// =====================================================

function drawTree(x, y) {

    // Trunk

    ctx.fillStyle =
        "#69472f";

    ctx.fillRect(

        x + 9,
        y + 13,

        7,
        14

    );


    // Leaves

    ctx.fillStyle =
        "#356b3d";

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


    // Camera

    ctx.translate(

        -Math.floor(
            camera.x
        ),

        -Math.floor(
            camera.y
        )

    );


    // ---------------------------------------------
    // GRASS
    // ---------------------------------------------

    ctx.fillStyle =
        "#72a653";

    ctx.fillRect(

        0,
        0,

        world.width,
        world.height

    );


    // ---------------------------------------------
    // ROADS
    // ---------------------------------------------

    ctx.fillStyle =
        "#4e4b4a";


    // Horizontal

    ctx.fillRect(

        0,
        250,

        world.width,
        80

    );


    // Vertical

    ctx.fillRect(

        600,
        0,

        80,
        world.height

    );


    // ---------------------------------------------
    // ROAD MARKINGS
    // ---------------------------------------------

    ctx.fillStyle =
        "#d9c85c";


    for (

        let x = 0;

        x < world.width;

        x += 40

    ) {

        ctx.fillRect(

            x,
            288,

            20,
            3

        );

    }


    for (

        let y = 0;

        y < world.height;

        y += 40

    ) {

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

    for (
        const wall of walls
    ) {

        // Tree

        if (

            wall.width === 25 &&
            wall.height === 25

        ) {

            drawTree(

                wall.x,
                wall.y

            );

            continue;

        }


        // Shadow

        ctx.fillStyle =
            "#493c38";

        ctx.fillRect(

            wall.x + 4,
            wall.y + 4,

            wall.width,
            wall.height

        );


        // Building

        ctx.fillStyle =
            "#b87559";

        ctx.fillRect(

            wall.x,
            wall.y,

            wall.width,
            wall.height

        );


        // Windows

        ctx.fillStyle =
            "#79a9b7";


        for (

            let wx =
                wall.x + 15;

            wx <
                wall.x +
                wall.width -
                15;

            wx += 35

        ) {

            for (

                let wy =
                    wall.y + 15;

                wy <
                    wall.y +
                    wall.height -
                    15;

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

    if (
        duckSprite.complete
    ) {

        drawDuck();

    }


    ctx.restore();

}


// =====================================================
// GAME LOOP
// =====================================================

function gameLoop() {

    update();

    draw();

    requestAnimationFrame(
        gameLoop
    );

}


gameLoop();
