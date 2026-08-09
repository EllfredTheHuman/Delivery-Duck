// =====================================================
// DELIVERY DUCK
// CITY GAMEPLAY
// =====================================================


// =====================================================
// CANVAS
// =====================================================

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;


// =====================================================
// CANVAS SIZE
// =====================================================

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


// =====================================================
// SPRITESHEET
// =====================================================

const duckSprite = new Image();

duckSprite.src =
    "ducky_3_spritesheet.png";


// =====================================================
// SPRITE SETTINGS
// =====================================================

const FRAME_WIDTH = 32;
const FRAME_HEIGHT = 32;

const IDLE_ROW = 0;
const WALK_ROW = 1;

const IDLE_FRAMES = 2;
const WALK_FRAMES = 6;


// =====================================================
// WORLD
// =====================================================

const WORLD_WIDTH = 3200;
const WORLD_HEIGHT = 2400;


// =====================================================
// DUCK
// =====================================================

const duck = {

    x: 400,
    y: 400,

    width: 24,
    height: 24,

    speed: 3,

    direction: "down",

    frame: 0,
    animationTimer: 0,

    moving: false

};


// =====================================================
// CAMERA
// =====================================================

const camera = {

    x: 0,
    y: 0

};


// =====================================================
// INPUT
// =====================================================

const keys = {};

window.addEventListener(
    "keydown",
    event => {

        keys[event.key.toLowerCase()] = true;

    }
);


window.addEventListener(
    "keyup",
    event => {

        keys[event.key.toLowerCase()] = false;

    }
);


// =====================================================
// CITY BUILDINGS
// =====================================================

const buildings = [

    // North-west block

    {
        x: 120,
        y: 120,
        width: 330,
        height: 230,
        type: "building",
        colour: "#d96f63"
    },

    {
        x: 600,
        y: 120,
        width: 260,
        height: 230,
        type: "building",
        colour: "#6d8fba"
    },


    // North-middle

    {
        x: 1040,
        y: 120,
        width: 300,
        height: 230,
        type: "cafe",
        colour: "#d89b62",

        name: "Sunny Bean Café",

        dialogue: [
            "Welcome to the Sunny Bean!",
            "The coffee here is almost as good as your feathers.",
            "You delivering something today?",
            "I swear the muffins disappear by themselves."
        ]

    },


    // North-east

    {
        x: 1500,
        y: 120,
        width: 350,
        height: 230,
        type: "building",
        colour: "#9b78b8"
    },


    {
        x: 2050,
        y: 120,
        width: 300,
        height: 230,
        type: "shop",
        colour: "#c96d91",

        name: "Quack & Co.",

        dialogue: [
            "Quack & Co. — finest goods in town!",
            "We've got absolutely everything.",
            "...probably.",
            "Nice parcel."
        ]

    },


    // Middle-left

    {
        x: 120,
        y: 650,
        width: 330,
        height: 280,
        type: "shop",
        colour: "#75a86c",

        name: "Green Grocer",

        dialogue: [
            "Fresh fruit!",
            "The apples arrived this morning.",
            "Need anything for the road?",
            "A duck buying groceries would be pretty funny."
        ]

    },


    {
        x: 600,
        y: 650,
        width: 260,
        height: 280,
        type: "building",
        colour: "#c47d59"
    },


    // Middle

    {
        x: 1040,
        y: 650,
        width: 300,
        height: 280,
        type: "building",
        colour: "#8c9d6c"
    },


    {
        x: 1500,
        y: 650,
        width: 350,
        height: 280,
        type: "cafe",
        colour: "#b8799e",

        name: "The Purple Mug",

        dialogue: [
            "Oh! A duck!",
            "You're a delivery duck, aren't you?",
            "We get deliveries here all the time.",
            "Come back later!"
        ]

    },


    {
        x: 2050,
        y: 650,
        width: 300,
        height: 280,
        type: "building",
        colour: "#6688a3"
    },


    // South-west

    {
        x: 120,
        y: 1200,
        width: 330,
        height: 300,
        type: "building",
        colour: "#bd805d"
    },


    {
        x: 600,
        y: 1200,
        width: 260,
        height: 300,
        type: "shop",
        colour: "#806fa8",

        name: "Duck's General Store",

        dialogue: [
            "Everything must go!",
            "Well... not literally everything.",
            "You look like you need a hat.",
            "We don't sell delivery uniforms."
        ]

    },


    {
        x: 1040,
        y: 1200,
        width: 300,
        height: 300,
        type: "building",
        colour: "#d16e67"
    },


    {
        x: 1500,
        y: 1200,
        width: 350,
        height: 300,
        type: "building",
        colour: "#6e9d9c"
    },


    {
        x: 2050,
        y: 1200,
        width: 300,
        height: 300,
        type: "cafe",
        colour: "#c18b62",

        name: "Little Bean",

        dialogue: [
            "One small coffee, coming right up!",
            "Actually, you're a duck.",
            "Would you like a tiny coffee?",
            "We don't serve pond water."
        ]

    }

];


// =====================================================
// DELIVERY LOCATIONS
// =====================================================

const deliveries = [

    {
        x: 480,
        y: 480,
        name: "Miller House"
    },

    {
        x: 900,
        y: 470,
        name: "Rose House"
    },

    {
        x: 1400,
        y: 470,
        name: "Oak House"
    },

    {
        x: 1930,
        y: 470,
        name: "Willow House"
    },

    {
        x: 470,
        y: 1020,
        name: "Pine House"
    },

    {
        x: 900,
        y: 1020,
        name: "Maple House"
    },

    {
        x: 1400,
        y: 1020,
        name: "River House"
    },

    {
        x: 1930,
        y: 1020,
        name: "Sunny House"
    },

    {
        x: 470,
        y: 1600,
        name: "Hill House"
    },

    {
        x: 900,
        y: 1600,
        name: "Lake House"
    }

];


let currentDelivery = 0;

let coins = 0;


// =====================================================
// TREES
// =====================================================

const trees = [

    { x: 520, y: 190 },
    { x: 930, y: 200 },
    { x: 1410, y: 190 },
    { x: 1920, y: 210 },

    { x: 520, y: 730 },
    { x: 930, y: 760 },
    { x: 1410, y: 730 },
    { x: 1920, y: 760 },

    { x: 520, y: 1280 },
    { x: 930, y: 1300 },
    { x: 1410, y: 1290 },
    { x: 1920, y: 1310 }

];


// =====================================================
// STREET LAMPS
// =====================================================

const lamps = [

    { x: 520, y: 390 },
    { x: 970, y: 390 },
    { x: 1450, y: 390 },
    { x: 1980, y: 390 },

    { x: 520, y: 940 },
    { x: 970, y: 940 },
    { x: 1450, y: 940 },
    { x: 1980, y: 940 },

    { x: 520, y: 1530 },
    { x: 970, y: 1530 },
    { x: 1450, y: 1530 },
    { x: 1980, y: 1530 }

];


// =====================================================
// CARS
// =====================================================

const cars = [

    {
        x: 540,
        y: 500,
        width: 48,
        height: 24,
        colour: "#d94d4d"
    },

    {
        x: 960,
        y: 500,
        width: 48,
        height: 24,
        colour: "#4d79d9"
    },

    {
        x: 1450,
        y: 500,
        width: 48,
        height: 24,
        colour: "#d9b84d"
    },

    {
        x: 1980,
        y: 500,
        width: 48,
        height: 24,
        colour: "#70a86d"
    }

];


// =====================================================
// DIALOGUE
// =====================================================

let dialogueOpen = false;

let dialogueText = "";

let dialogueName = "";


// =====================================================
// DISTANCE
// =====================================================

function distance(
    x1,
    y1,
    x2,
    y2
) {

    return Math.sqrt(

        (x2 - x1) ** 2 +
        (y2 - y1) ** 2

    );

}


// =====================================================
// COLLISION
// =====================================================

function rectanglesCollide(
    a,
    b
) {

    return (

        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y

    );

}


// =====================================================
// COLLISION OBJECTS
// =====================================================

function getCollisionObjects() {

    const objects = [];


    // Buildings

    buildings.forEach(
        building => {

            objects.push({

                x: building.x,
                y: building.y,
                width: building.width,
                height: building.height

            });

        }
    );


    // Trees

    trees.forEach(
        tree => {

            objects.push({

                x: tree.x - 15,
                y: tree.y - 15,
                width: 30,
                height: 30

            });

        }
    );


    // Cars

    cars.forEach(
        car => {

            objects.push({

                x: car.x,
                y: car.y,
                width: car.width,
                height: car.height

            });

        }
    );


    return objects;

}


// =====================================================
// MOVE DUCK
// =====================================================

function moveDuck() {

    if (dialogueOpen) {
        duck.moving = false;
        return;
    }


    let dx = 0;
    let dy = 0;


    if (
        keys["arrowup"] ||
        keys["w"]
    ) {

        dy -= 1;

        duck.direction = "up";

    }


    if (
        keys["arrowdown"] ||
        keys["s"]
    ) {

        dy += 1;

        duck.direction = "down";

    }


    if (
        keys["arrowleft"] ||
        keys["a"]
    ) {

        dx -= 1;

        duck.direction = "left";

    }


    if (
        keys["arrowright"] ||
        keys["d"]
    ) {

        dx += 1;

        duck.direction = "right";

    }


    duck.moving =
        dx !== 0 ||
        dy !== 0;


    if (
        dx !== 0 &&
        dy !== 0
    ) {

        dx *= 0.707;
        dy *= 0.707;

    }


    const nextX =
        duck.x +
        dx *
        duck.speed;


    const nextY =
        duck.y +
        dy *
        duck.speed;


    const collisionObjects =
        getCollisionObjects();


    const nextHorizontal = {

        x: nextX,
        y: duck.y,

        width: duck.width,
        height: duck.height

    };


    let horizontalBlocked = false;


    collisionObjects.forEach(
        object => {

            if (
                rectanglesCollide(
                    nextHorizontal,
                    object
                )
            ) {

                horizontalBlocked = true;

            }

        }
    );


    if (!horizontalBlocked) {

        duck.x = nextX;

    }


    const nextVertical = {

        x: duck.x,
        y: nextY,

        width: duck.width,
        height: duck.height

    };


    let verticalBlocked = false;


    collisionObjects.forEach(
        object => {

            if (
                rectanglesCollide(
                    nextVertical,
                    object
                )
            ) {

                verticalBlocked = true;

            }

        }
    );


    if (!verticalBlocked) {

        duck.y = nextY;

    }


    duck.x = Math.max(
        0,
        Math.min(
            WORLD_WIDTH - duck.width,
            duck.x
        )
    );


    duck.y = Math.max(
        0,
        Math.min(
            WORLD_HEIGHT - duck.height,
            duck.y
        )
    );

}


// =====================================================
// ANIMATION
// =====================================================

function updateAnimation() {

    if (!duck.moving) {

        duck.animationTimer++;

        if (
            duck.animationTimer >= 20
        ) {

            duck.animationTimer = 0;

            duck.frame++;

            if (
                duck.frame >=
                IDLE_FRAMES
            ) {

                duck.frame = 0;

            }

        }

        return;

    }


    duck.animationTimer++;


    if (
        duck.animationTimer >= 7
    ) {

        duck.animationTimer = 0;

        duck.frame++;

        if (
            duck.frame >=
            WALK_FRAMES
        ) {

            duck.frame = 0;

        }

    }

}


// =====================================================
// CAMERA
// =====================================================

function updateCamera() {

    camera.x =
        duck.x -
        canvas.width / 2 +
        duck.width / 2;


    camera.y =
        duck.y -
        canvas.height / 2 +
        duck.height / 2;


    camera.x = Math.max(
        0,
        Math.min(
            WORLD_WIDTH -
            canvas.width,
            camera.x
        )
    );


    camera.y = Math.max(
        0,
        Math.min(
            WORLD_HEIGHT -
            canvas.height,
            camera.y
        )
    );

}


// =====================================================
// DRAW GROUND
// =====================================================

function drawGround() {

    ctx.fillStyle =
        "#78a85a";

    ctx.fillRect(
        0,
        0,
        WORLD_WIDTH,
        WORLD_HEIGHT
    );

}


// =====================================================
// DRAW ROADS
// =====================================================

function drawRoads() {

    ctx.fillStyle =
        "#55545a";


    // Horizontal roads

    ctx.fillRect(
        0,
        400,
        WORLD_WIDTH,
        150
    );


    ctx.fillRect(
        0,
        950,
        WORLD_WIDTH,
        150
    );


    ctx.fillRect(
        0,
        1530,
        WORLD_WIDTH,
        150
    );


    // Vertical roads

    ctx.fillRect(
        480,
        0,
        120,
        WORLD_HEIGHT
    );


    ctx.fillRect(
        870,
        0,
        120,
        WORLD_HEIGHT
    );


    ctx.fillRect(
        1360,
        0,
        120,
        WORLD_HEIGHT
    );


    ctx.fillRect(
        1900,
        0,
        120,
        WORLD_HEIGHT
    );


    // Road markings

    ctx.fillStyle =
        "#d7c76a";


    for (
        let x = 0;
        x < WORLD_WIDTH;
        x += 80
    ) {

        ctx.fillRect(
            x,
            470,
            40,
            5
        );


        ctx.fillRect(
            x,
            1020,
            40,
            5
        );


        ctx.fillRect(
            x,
            1600,
            40,
            5
        );

    }


    for (
        let y = 0;
        y < WORLD_HEIGHT;
        y += 80
    ) {

        ctx.fillRect(
            535,
            y,
            5,
            40
        );


        ctx.fillRect(
            925,
            y,
            5,
            40
        );


        ctx.fillRect(
            1415,
            y,
            5,
            40
        );


        ctx.fillRect(
            1955,
            y,
            5,
            40
        );

    }

}


// =====================================================
// DRAW BUILDINGS
// =====================================================

function drawBuildings() {

    buildings.forEach(
        building => {

            // Main building

            ctx.fillStyle =
                building.colour;

            ctx.fillRect(
                building.x,
                building.y,
                building.width,
                building.height
            );


            // Roof

            ctx.fillStyle =
                "#3e3d45";

            ctx.fillRect(
                building.x - 5,
                building.y - 10,
                building.width + 10,
                12
            );


            // Windows

            ctx.fillStyle =
                "#bde1e5";


            const windowSpacing = 55;


            for (
                let x =
                    building.x + 25;

                x <
                    building.x +
                    building.width -
                    25;

                x += windowSpacing
            ) {

                for (
                    let y =
                        building.y + 35;

                    y <
                        building.y +
                        building.height -
                        45;

                    y += 55
                ) {

                    ctx.fillRect(
                        x,
                        y,
                        24,
                        24
                    );


                    ctx.fillStyle =
                        "#55545a";


                    ctx.fillRect(
                        x + 11,
                        y,
                        3,
                        24
                    );


                    ctx.fillStyle =
                        "#bde1e5";

                }

            }


            // Door

            ctx.fillStyle =
                "#553f35";

            ctx.fillRect(
                building.x +
                building.width / 2 -
                15,

                building.y +
                building.height -
                45,

                30,
                45
            );


            // Special building sign

            if (
                building.type ===
                "cafe" ||
                building.type ===
                "shop"
            ) {

                ctx.fillStyle =
                    "#fff4c4";

                ctx.fillRect(
                    building.x + 20,
                    building.y + 12,
                    building.width - 40,
                    32
                );


                ctx.fillStyle =
                    "#3b3434";

                ctx.font =
                    "bold 14px monospace";

                ctx.textAlign =
                    "center";

                ctx.fillText(
                    building.name,
                    building.x +
                    building.width / 2,

                    building.y + 34
                );

                ctx.textAlign =
                    "left";

            }

        }
    );

}


// =====================================================
// DRAW TREES
// =====================================================

function drawTrees() {

    trees.forEach(
        tree => {

            // Trunk

            ctx.fillStyle =
                "#79503a";

            ctx.fillRect(
                tree.x - 5,
                tree.y,
                10,
                22
            );


            // Leaves

            ctx.fillStyle =
                "#347448";

            ctx.fillRect(
                tree.x - 18,
                tree.y - 15,
                36,
                30
            );


            ctx.fillStyle =
                "#3f8751";

            ctx.fillRect(
                tree.x - 12,
                tree.y - 25,
                24,
                20
            );

        }
    );

}


// =====================================================
// DRAW LAMPS
// =====================================================

function drawLamps() {

    lamps.forEach(
        lamp => {

            ctx.fillStyle =
                "#303035";

            ctx.fillRect(
                lamp.x,
                lamp.y,
                5,
                45
            );


            ctx.fillStyle =
                "#ffe994";

            ctx.fillRect(
                lamp.x - 6,
                lamp.y - 8,
                17,
                12
            );

        }
    );

}


// =====================================================
// DRAW CARS
// =====================================================

function drawCars() {

    cars.forEach(
        car => {

            ctx.fillStyle =
                car.colour;

            ctx.fillRect(
                car.x,
                car.y,
                car.width,
                car.height
            );


            ctx.fillStyle =
                "#a9d5dd";

            ctx.fillRect(
                car.x + 8,
                car.y + 4,
                13,
                10
            );


            ctx.fillRect(
                car.x + 27,
                car.y + 4,
                13,
                10
            );


            ctx.fillStyle =
                "#222";

            ctx.fillRect(
                car.x + 5,
                car.y + 19,
                9,
                6
            );


            ctx.fillRect(
                car.x + 34,
                car.y + 19,
                9,
                6
            );

        }
    );

}


// =====================================================
// DRAW DELIVERY
// =====================================================

function drawDelivery() {

    const delivery =
        deliveries[currentDelivery];


    if (!delivery) {
        return;
    }


    // Parcel marker

    ctx.fillStyle =
        "#e7b85b";

    ctx.fillRect(
        delivery.x - 12,
        delivery.y - 12,
        24,
        24
    );


    ctx.fillStyle =
        "#8b5b36";

    ctx.fillRect(
        delivery.x - 2,
        delivery.y - 12,
        4,
        24
    );


    // Arrow

    ctx.fillStyle =
        "#ffffff";

    ctx.font =
        "bold 24px monospace";

    ctx.textAlign =
        "center";

    ctx.fillText(
        "!",
        delivery.x,
        delivery.y - 25
    );

    ctx.textAlign =
        "left";

}


// =====================================================
// DRAW DUCK
// =====================================================

function drawDuck() {

    if (
        !duckSprite.complete
    ) {
        return;
    }


    const row =
        duck.moving
            ? WALK_ROW
            : IDLE_ROW;


    ctx.drawImage(

        duckSprite,

        duck.frame *
        FRAME_WIDTH,

        row *
        FRAME_HEIGHT,

        FRAME_WIDTH,
        FRAME_HEIGHT,

        duck.x,
        duck.y,

        duck.width,
        duck.height

    );

}


// =====================================================
// DRAW HUD
// =====================================================

function drawHUD() {

    ctx.fillStyle =
        "rgba(30,30,35,0.85)";

    ctx.fillRect(
        15,
        15,
        280,
        75
    );


    ctx.fillStyle =
        "#ffffff";

    ctx.font =
        "16px monospace";

    ctx.fillText(
        "DELIVERY DUCK",
        30,
        40
    );


    const delivery =
        deliveries[currentDelivery];


    if (delivery) {

        ctx.fillText(
            "Deliver to: " +
            delivery.name,

            30,
            65
        );

    } else {

        ctx.fillText(
            "All deliveries complete!",
            30,
            65
        );

    }


    ctx.fillText(
        "Coins: " + coins,
        30,
        85
    );

}


// =====================================================
// DRAW DIALOGUE
// =====================================================

function drawDialogue() {

    if (!dialogueOpen) {
        return;
    }


    ctx.fillStyle =
        "rgba(25,25,30,0.95)";

    ctx.fillRect(
        30,
        canvas.height - 180,
        canvas.width - 60,
        140
    );


    ctx.strokeStyle =
        "#ffffff";

    ctx.lineWidth = 3;

    ctx.strokeRect(
        30,
        canvas.height - 180,
        canvas.width - 60,
        140
    );


    ctx.fillStyle =
        "#ffe05b";

    ctx.font =
        "bold 20px monospace";

    ctx.fillText(
        dialogueName,
        55,
        canvas.height - 140
    );


    ctx.fillStyle =
        "#ffffff";

    ctx.font =
        "16px monospace";


    // Simple dialogue wrapping

    const words =
        dialogueText.split(" ");

    let line = "";

    let lineY =
        canvas.height - 105;


    words.forEach(
        word => {

            const test =
                line +
                word +
                " ";

            if (
                ctx.measureText(
                    test
                ).width >
                canvas.width - 120
            ) {

                ctx.fillText(
                    line,
                    55,
                    lineY
                );

                line =
                    word +
                    " ";

                lineY += 24;

            } else {

                line = test;

            }

        }
    );


    ctx.fillText(
        line,
        55,
        lineY
    );


    ctx.font =
        "12px monospace";

    ctx.fillText(
        "Press E to continue",
        canvas.width - 190,
        canvas.height - 55
    );

}


// =====================================================
// INTERACTION
// =====================================================

function interact() {

    // Close dialogue

    if (dialogueOpen) {

        dialogueOpen = false;

        return;

    }


    // Check shops and cafes

    for (
        const building of buildings
    ) {

        if (
            building.type !==
                "cafe" &&
            building.type !==
                "shop"
        ) {

            continue;

        }


        const buildingCentreX =
            building.x +
            building.width / 2;


        const buildingCentreY =
            building.y +
            building.height / 2;


        if (
            distance(
                duck.x,
                duck.y,
                buildingCentreX,
                buildingCentreY
            ) < 180
        ) {

            dialogueName =
                building.name;


            dialogueText =
                building.dialogue[
                    Math.floor(
                        Math.random() *
                        building.dialogue.length
                    )
                ];


            dialogueOpen = true;

            return;

        }

    }


    // Check delivery

    const delivery =
        deliveries[currentDelivery];


    if (
        delivery &&
        distance(
            duck.x,
            duck.y,
            delivery.x,
            delivery.y
        ) < 70
    ) {

        coins += 10;

        currentDelivery++;

        dialogueName =
            "Delivery complete!";


        dialogueText =
            "Nice work! You earned 10 coins.";


        dialogueOpen = true;

    }

}


// =====================================================
// INTERACTION KEY
// =====================================================

window.addEventListener(
    "keydown",
    event => {

        if (
            event.key.toLowerCase() ===
            "e"
        ) {

            interact();

        }

    }
);


// =====================================================
// DRAW WORLD
// =====================================================

function drawWorld() {

    ctx.save();


    ctx.translate(
        -camera.x,
        -camera.y
    );


    drawGround();

    drawRoads();

    drawBuildings();

    drawTrees();

    drawLamps();

    drawCars();

    drawDelivery();

    drawDuck();


    ctx.restore();

}


// =====================================================
// GAME LOOP
// =====================================================

function gameLoop() {

    moveDuck();

    updateAnimation();

    updateCamera();


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    drawWorld();

    drawHUD();

    drawDialogue();


    requestAnimationFrame(
        gameLoop
    );

}


// =====================================================
// START
// =====================================================

duckSprite.onload = () => {

    gameLoop();

};
