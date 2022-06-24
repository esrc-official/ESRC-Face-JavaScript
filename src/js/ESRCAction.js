const {
    APP_ID,
    ENABLE_MEASURE_ENV,
    ENABLE_FACE,
    ENABLE_FACIAL_LANDMARK,
    ENABLE_FACIAL_ACTION_UNIT,
    ENABLE_BASIC_FACIAL_EXPRESSION,
    ENABLE_VALENCE_FACIAL_EXPRESSION
} = require('./const');

let instance = null;

class ESRCAction {
    constructor() {
        if (instance) {
            return instance;
        }        
        instance = this;
    }

    init(oninitCallback) {
        ESRC.initWithApplicationId(APP_ID, (isValid) => {
            if (isValid) {
                const esrc = ESRC.getInstance();
                console.log("ESRC Face SDK " + esrc.getSDKVersion() + " is loaded.");

                this.measureEnv = new ESRCType.ESRCMeasureEnv();
                this.face = new ESRCType.ESRCFace();
                this.facialLandmark = new ESRCType.ESRCFacialLandmark();
                this.facialActionUnit = new ESRCType.ESRCFacialActionUnit();
                this.basicFacialExpression = new ESRCType.ESRCBasicFacialExpression();
                this.valenceFacialExpression = new ESRCType.ESRCValenceFacialExpression();
                this.property = new ESRCType.ESRCProperty(
                    ENABLE_MEASURE_ENV,  // Whether analyze measurement environment or not.
                    ENABLE_FACE,  // Whether detect face or not.
                    ENABLE_FACIAL_LANDMARK,  // Whether detect facial landmark or not. If enableFace is false, it is also automatically set to false.
                    ENABLE_FACIAL_ACTION_UNIT,  // Whether analyze facial action unit or not. If enableFace or enableFacialLandmark is false, it is also automatically set to false.
                    ENABLE_BASIC_FACIAL_EXPRESSION,  // Whether recognize basic facial expression or not. If enableFace is false, it is also automatically set to false.
                    ENABLE_VALENCE_FACIAL_EXPRESSION  // Whether recognize valence facial expression or not. If enableFace is false, it is also automatically set to false.
                );
                this.handler = new ESRCHandler();
                this.handler.onAnalyzeMeasureEnv = function(_measureEnv) {
                    // console.log("onAnalyzeMeasureEnv: " + _measureEnv.toString());
                    ESRCAction.getInstance().measureEnv.setMeasureEnv(_measureEnv);
                }
                this.handler.onDetectedFace = function(_face) {
                    // console.log("onDetectedFace: " + _face.toString());
                    ESRCAction.getInstance().face.setFace(_face);
                }
                this.handler.onDetectedFacialLandmark = function(_facialLandmark) {
                    // console.log("onDetectedFacialLandmark: " + _facialLandmark.toString());
                    ESRCAction.getInstance().facialLandmark.setFacialLandmark(_facialLandmark);
                }
                this.handler.onAnalyzedFacialActionUnit = function(_facialActionUnit) {
                    // console.log("onAnalyzedFacialActionUnit: " + _facialActionUnit.toString());
                    ESRCAction.getInstance().facialActionUnit.setFacialActionUnit(_facialActionUnit);
                }
                this.handler.onRecognizedBasicFacialExpression = function(_basicFacialExpression) {
                    // console.log("onRecognizedBasicFacialExpression: " + _basicFacialExpression.toString());
                    ESRCAction.getInstance().basicFacialExpression.setBasicFacialExpression(_basicFacialExpression);
                }
                this.handler.onRecognizedValenceFacialExpression = function(_valenceFacialExpression) {
                    // console.log("onRecognizedValenceFacialExpression: " + _valenceFacialExpression.toString());
                    ESRCAction.getInstance().valenceFacialExpression.setValenceFacialExpression(_valenceFacialExpression);
                }

                oninitCallback();
            } else {
                alert("Please input valid license");
            }
        });
    }

    start() {
        ESRC.start(this.property, this.handler);
    }

    stop() {
        ESRC.stop();
    }

    feed(frame, id) {
        const mat = new ESRCType.ESRCMat(frame, id);
        ESRC.feed(mat);
    }

    static getInstance() {
        return new ESRCAction();
    }
}

export { ESRCAction };