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

const FRAME_WIDTH = 32;
const FRAME_HEIGHT = 32;


// =====================================================
// IDLE ANIMATION
// =====================================================

let duckFrame = 0;

let duckTimer = 0;

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


    duck.style.objectPosition =
        `${duckFrame * FRAME_WIDTH}px 0px`;


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
// ESCAPE
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
