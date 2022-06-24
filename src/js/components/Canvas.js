const { FPS } = require('../const');

let instance = null;

class Canvas {
    face = undefined
    facialLandmark = undefined
    basicFacialExpression = undefined
    valenceFacialExpression = undefined

    constructor() {
        if (instance) {
            return instance;
        }
        this.video = document.getElementById("video");
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext('2d');
        this.ctx.strokeStyle = "#ec008c";
        this.ctx.fillStyle = "#ec008c";
        this.ctx.lineWidth = "3";
        this.ctx.font = "20px gulim";
        this.video.addEventListener("play", function() {
            setTimeout(instance._draw(instance), 0);
        }, false);
        instance = this;
    }

    draw(face, facialLandmark, basicFacialExpression, valenceFacialExpression) {
        this.face = face
        this.facialLandmark = facialLandmark;
        this.basicFacialExpression = basicFacialExpression;
        this.valenceFacialExpression = valenceFacialExpression;
    }

    _draw(obj) {
        obj.ctx.beginPath();
        // obj.ctx.drawImage(obj.video, 0, 0, obj.video.width, obj.video.height);

        if (obj.face) {
            if (obj.face.getIsDetect()) {
                obj.ctx.beginPath();
                obj.ctx.rect(obj.face.getX(), obj.face.getY(), obj.face.getW(), obj.face.getH());
                obj.ctx.stroke();

                if (obj.facialLandmark) {
                    for (var i = 0; i < ESRCType.ESRCFacialLandmark.FACIAL_LANDMARK_COUNT; i++) {
                        obj.ctx.beginPath();
                        var x = obj.facialLandmark.getXPosition(i);
                        var y = obj.facialLandmark.getYPosition(i);
                        obj.ctx.arc(x, y, 1, 0, Math.PI * 2, true);
                        obj.ctx.stroke();
                    }
                }

                if (obj.basicFacialExpression) {
                    obj.ctx.fillText("Basic Facial Exp.: " + obj.basicFacialExpression.getEmotionStr(), 10, 20);
                }

                if (obj.valenceFacialExpression) {
                    obj.ctx.fillText("Valence Facial Exp.: " + obj.valenceFacialExpression.getEmotionStr(), 10, 50);
                }
            }   
        }

        setTimeout(function(){ obj._draw(obj) }, 1000 / FPS);
    }

    static getInstance() {
        return new ESRCCanvas();
    }
}

export { Canvas };