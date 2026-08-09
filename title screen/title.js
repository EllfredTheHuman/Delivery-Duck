// =====================================================
// DELIVERY DUCK
// TITLE SCREEN
// =====================================================


// =====================================================
// ELEMENTS
// =====================================================

const playButton =
    document.getElementById(
        "playButton"
    );


const creditsButton =
    document.getElementById(
        "creditsButton"
    );


const closeCreditsButton =
    document.getElementById(
        "closeCreditsButton"
    );


const creditsPanel =
    document.getElementById(
        "creditsPanel"
    );


const duckCanvas =
    document.getElementById(
        "titleDuck"
    );


const duckCtx =
    duckCanvas.getContext(
        "2d"
    );


duckCtx.imageSmoothingEnabled =
    false;


// =====================================================
// DUCK SPRITESHEET
// =====================================================

const duckSprite =
    new Image();


duckSprite.src =
    "../ducky_3_spritesheet.png";


// =====================================================
// SPRITE SETTINGS
// =====================================================

const FRAME_WIDTH = 32;

const FRAME_HEIGHT = 32;


// Bouncy idle is the THIRD row.

const BOUNCY_IDLE_ROW = 2;

const BOUNCY_IDLE_FRAMES = 4;


// =====================================================
// ANIMATION
// =====================================================

let duckFrame = 0;

let duckTimer = 0;

const duckAnimationSpeed = 12;


// =====================================================
// DRAW DUCK
// =====================================================

function drawDuck() {

    duckCtx.clearRect(

        0,
        0,

        FRAME_WIDTH,
        FRAME_HEIGHT

    );


    duckCtx.drawImage(

        duckSprite,

        // Source X

        duckFrame *
        FRAME_WIDTH,

        // Source Y

        BOUNCY_IDLE_ROW *
        FRAME_HEIGHT,

        // Source width

        FRAME_WIDTH,

        // Source height

        FRAME_HEIGHT,

        // Destination X

        0,

        // Destination Y

        0,

        // Destination width

        FRAME_WIDTH,

        // Destination height

        FRAME_HEIGHT

    );

}


// =====================================================
// ANIMATE DUCK
// =====================================================

function animateDuck() {

    duckTimer++;


    if (
        duckTimer >=
        duckAnimationSpeed
    ) {

        duckTimer = 0;

        duckFrame++;


        if (
            duckFrame >=
            BOUNCY_IDLE_FRAMES
        ) {

            duckFrame = 0;

        }

    }


    drawDuck();


    requestAnimationFrame(
        animateDuck
    );

}


// =====================================================
// START DUCK
// =====================================================

duckSprite.onload = () => {

    drawDuck();

    animateDuck();

};


// =====================================================
// PLAY
// =====================================================

playButton.addEventListener(
    "click",
    () => {

        window.location.href =
            "../game.html";

    }
);


// =====================================================
// CREDITS
// =====================================================

creditsButton.addEventListener(
    "click",
    () => {

        creditsPanel.classList.remove(
            "hidden"
        );

    }
);


// =====================================================
// CLOSE CREDITS
// =====================================================

closeCreditsButton.addEventListener(
    "click",
    () => {

        creditsPanel.classList.add(
            "hidden"
        );

    }
);


// =====================================================
// ESCAPE CLOSES CREDITS
// =====================================================

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            creditsPanel.classList.add(
                "hidden"
            );

        }

    }
);
