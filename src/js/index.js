const { body } = require("./const")
const { ESRCAction } = require("./ESRCAction");
const { Camera } = require("./components/Camera");
const { Canvas } = require("./components/Canvas");
const { Spinner } = require("./components/Spinner");

const esrc = new ESRCAction();
const camera = new Camera();
const canvas = new Canvas();
let isRunning = false;

// Start spinner
Spinner.start(body);

// Define a global variable 'Module' with a method 'onLoadedESRC'
Module = {
    onLoadedESRC() {
        // Initialize
        initialize(() => {
            // Remove spinner
            Spinner.remove();
        });
    }
}
// Load '@esrc/face' assinging the value to the global variable 'ESRC'
require("@esrc/face");

// Set button handler
const buttonEl = document.querySelector("#start-stop-button");
buttonEl.addEventListener("click", () => {
    isRunning = !isRunning;
    if (isRunning) {  // Start
        // Start spinner
        Spinner.start(body);

        // Change button text
        buttonEl.innerHTML = "STOP";

        // Start
        start();
        
        // Remove spinner
        Spinner.remove();
    } else {  // Start
        // Start spinner
        Spinner.start(body);

        // Change button text
        buttonEl.innerHTML = "START";
        
        // Stop
        stop();

        // Remove spinner
        Spinner.remove();
    }
});

// Define a method to initialization
function initialize(oninitCallback) {
    // Initialize ESRC
    esrc.init(() => {
        // Load camera
        camera.load(oninitCallback);
    });
}

// Define a method to start
function start() {
    isRunning = true;
    
    // Start ESRC
    esrc.start();

    // Start camera
    camera.start((frame, id) => {
        if (isRunning) {
            // Feed frame on ESRC
            esrc.feed(frame, id);
        }

        // Draw
        console.log(esrc.basicFacialExpression.toString());
        canvas.draw(esrc.face, esrc.facialLandmark, esrc.basicFacialExpression, esrc.valenceFacialExpression);
    });
}

// Define a method to stop
function stop() {
    isRunning = false;

    // Stop camera
    camera.stop();

    // Stop ESRC
    esrc.stop();
}