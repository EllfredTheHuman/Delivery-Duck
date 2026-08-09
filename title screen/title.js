// =====================================================
// DELIVERY DUCK - TITLE SCREEN
// =====================================================


// =====================================================
// ELEMENTS
// =====================================================

const playButton =
    document.getElementById("playButton");

const creditsButton =
    document.getElementById("creditsButton");

const closeCreditsButton =
    document.getElementById(
        "closeCreditsButton"
    );

const creditsPanel =
    document.getElementById(
        "creditsPanel"
    );

const duck =
    document.querySelector(
        ".title-duck"
    );


// =====================================================
// DUCK SPRITESHEET
// =====================================================

/*
    Sprite sheet:

    192 × 128

    Each sprite:

    32 × 32

    Layout:

    Row 0:
    2 idle frames

    Row 1:
    6 walk frames

    Row 2:
    4 bouncy idle frames

    Row 3:
    6 bouncy walk frames
*/


const FRAME_WIDTH = 32;
const FRAME_HEIGHT = 32;


// =====================================================
// TITLE DUCK
// =====================================================

let duckFrame = 0;

let duckTimer = 0;


// We use the first idle row.

const idleFrames = 2;


// =====================================================
// ANIMATE DUCK
// =====================================================

function animateDuck() {

    duckTimer++;


    if (duckTimer >= 25) {

        duckTimer = 0;

        duckFrame++;

        if (
            duckFrame >= idleFrames
        ) {

            duckFrame = 0;

        }

    }


    /*
        Move the spritesheet so that
        only one 32x32 frame is
        visible.
    */

    duck.style.objectPosition =
        `${duckFrame * 32}px 0px`;


    requestAnimationFrame(
        animateDuck
    );

}


animateDuck();


// =====================================================
// PLAY
// =====================================================

playButton.addEventListener(
    "click",
    () => {

        /*
            index.html is one folder
            above the title screen.

            So:

            ../index.html
        */

        window.location.href =
            "../index.html";

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
// CLOSE CREDITS WITH ESCAPE
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
