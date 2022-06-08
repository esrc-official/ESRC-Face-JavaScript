const { body } = require("./const")
const { Camera } = require("./components/Camera");
const { Spinner } = require("./components/Spinner");

const {
    APP_ID,
    ENABLE_MEASURE_ENV,
    ENABLE_FACE,
    ENABLE_FACIAL_LANDMARK,
    ENABLE_FACIAL_ACTION_UNIT,
    ENABLE_BASIC_FACIAL_EXPRESSION,
    ENABLE_VALENCE_FACIAL_EXPRESSION
} = require('./const');

let property;
let handler;
let face;
let facialLandmark;
let facialActionUnit;
let basicFacialExpression;
let valenceFacialExpression;
let isRunning = false;

// Start spinner
Spinner.start(body);

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

// Define a global variable 'Module' with a method 'onLoadedESRC'
Module = {
    onLoadedESRC() {
        // Initialize
        initialize();

        // Initialize ESRC
        ESRC.initWithApplicationId(APP_ID, (isValid) => {
            if (isValid) {
                console.log("License is valid");

                // Get ESRC instance
                const esrc = ESRC.getInstance();

                // Print
                console.log("SDK Version: " + esrc.getSDKVersion());
                console.log("APP ID: " + esrc.getApplicationId()); 

                // Remove spinner
                Spinner.remove();
            } else {
                console.log("License is invalid");
            }
        });
    }
}
// Load '@esrc/face' assinging the value to the global variable 'ESRC'
require("@esrc/face");

// Define a method to initialization
function initialize() {
    // Load camera
    Camera.load(() => {
        // Initialize variables for ESRC
        face = new ESRCType.ESRCFace();
        facialLandmark = new ESRCType.ESRCFacialLandmark();
        facialActionUnit = new ESRCType.ESRCFacialActionUnit();
        basicFacialExpression = new ESRCType.ESRCBasicFacialExpression();
        valenceFacialExpression = new ESRCType.ESRCValenceFacialExpression();

        // Initialize property for ESRC
        property = new ESRCType.ESRCProperty(
            ENABLE_MEASURE_ENV,  // Whether analyze measurement environment or not.
            ENABLE_FACE,  // Whether detect face or not.
            ENABLE_FACIAL_LANDMARK,  // Whether detect facial landmark or not. If enableFace is false, it is also automatically set to false.
            ENABLE_FACIAL_ACTION_UNIT,  // Whether analyze facial action unit or not. If enableFace or enableFacialLandmark is false, it is also automatically set to false.
            ENABLE_BASIC_FACIAL_EXPRESSION,  // Whether recognize basic facial expression or not. If enableFace is false, it is also automatically set to false.
            ENABLE_VALENCE_FACIAL_EXPRESSION  // Whether recognize valence facial expression or not. If enableFace is false, it is also automatically set to false.
        );

        // Initialize handler for ESRC
        handler = new ESRCHandler();
        handler.onAnalyzeMeasureEnv = function(_measureEnv) {
            // console.log("onAnalyzeMeasureEnv: " + _measureEnv.toString());
        }
        handler.onDetectedFace = function(_face) {
            console.log("onDetectedFace: " + _face.toString());
            face.setFace(_face);
        }
        handler.onDetectedFacialLandmark = function(_facialLandmark) {
            // console.log("onDetectedFacialLandmark: " + _facialLandmark.toString());
            facialLandmark.setFacialLandmark(_facialLandmark);
        }
        handler.onAnalyzedFacialActionUnit = function(_facialActionUnit) {
            // console.log("onAnalyzedFacialActionUnit: " + _facialActionUnit.toString());
            facialActionUnit.setFacialActionUnit(_facialActionUnit);
        }
        handler.onRecognizedBasicFacialExpression = function(_basicFacialExpression) {
            console.log("onRecognizedBasicFacialExpression: " + _basicFacialExpression.toString());
            basicFacialExpression.setBasicFacialExpression(_basicFacialExpression);
        }
        handler.onRecognizedValenceFacialExpression = function(_valenceFacialExpression) {
            // console.log("onRecognizedValenceFacialExpression: " + _valenceFacialExpression.toString());
            valenceFacialExpression.setValenceFacialExpression(_valenceFacialExpression);
        }
    });
}

// Define a method to start
function start() {
    // Start ESRC
    ESRC.start(property, handler);

    // Start camera
    Camera.start((frame, id) => {
        // Convert frame to ESRCMat
        let mat = new ESRCType.ESRCMat(frame, id);

        console.log("oncaptureCallback")

        if (isRunning) {
            // Feed frame on ESRC
            ESRC.feed(mat);

            // // Draw FPS
            // cv.putText(dst, "FPS=" + frameFps, { x: 10, y: 20 }, cv.FONT_HERSHEY_SIMPLEX, 0.5, [236, 0, 140, 255]);

            // // Draw result
            // if (face.isDetect) {
            //     // Draw face
            //     let point1 = new cv.Point(face.getX(), face.getY());
            //     let point2 = new cv.Point(face.getX() + face.getW(), face.getY() + face.getH());
            //     cv.rectangle(dst, point1, point2, [236, 0, 140, 255]);

            //     // Draw facial landmark
            //     for (let i = 0; i < ESRCType.ESRCFacialLandmark.FACIAL_LANDMARK_COUNT; i++) {
            //         let p = new cv.Point(facialLandmark.getXPosition(i), facialLandmark.getYPosition(i));
            //         cv.circle(dst, { x: p.x, y: p.y }, 2, [236, 0, 140, 255]);
            //     }

            //     // Draw basic facial expression.
            //     cv.putText(dst, "Basic Facial Exp.=" + basicFacialExpression.getEmotionStr(), { x: 10, y: 40 }, cv.FONT_HERSHEY_SIMPLEX, 0.5, [236, 0, 140, 255]);

            //     // Draw valence facial expression.
            //     cv.putText(dst, "Valence Facial Exp.=" + valenceFacialExpression.getEmotionStr(), { x: 10, y: 60 }, cv.FONT_HERSHEY_SIMPLEX, 0.5, [236, 0, 140, 255]);
            // };
        }
    });
}

// Define a method to stop
function stop() {
    // Stop camera
    Camera.stop();

    // Stop ESRC
    ESRC.stop();
}