let instance = null;

class Canvas {
    constructor() {
        if (instance) {
            return instance;
        }
        this.video = document.getElementById("video");
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext('2d');
        this.ctx.strokeStyle = "#ec008c";
        this.ctx.fillStyle = "#ec008c";
        this.ctx.lineWidth = "3";
        this.ctx.font = "20px gulim";
        instance = this;
    }

    draw(face, facialLandmark, basicFacialExpression, valenceFacialExpression) {
        this.ctx.drawImage(this.video, 0, 0, video.width, video.height);
        
        if (face) {
            if (face.getIsDetect()) {
                this.ctx.beginPath();
                this.ctx.rect(face.getX(), face.getY(), face.getW(), face.getH());
                this.ctx.stroke();

                if (facialLandmark) {
                    for (var i = 0; i < ESRCType.ESRCFacialLandmark.FACIAL_LANDMARK_COUNT; i++) {
                        this.ctx.beginPath();
                        var x = facialLandmark.getXPosition(i);
                        var y = facialLandmark.getYPosition(i);
                        this.ctx.arc(x, y, 1, 0, Math.PI * 2, true);
                        this.ctx.stroke();
                    }
                }

                if (basicFacialExpression) {
                    this.ctx.fillText("Basic Facial Exp.: " + basicFacialExpression.getEmotionStr(), 10, 20);
                }

                if (valenceFacialExpression) {
                    this.ctx.fillText("Valence Facial Exp.: " + valenceFacialExpression.getEmotionStr(), 10, 50);
                }
            }   
        }
    }

    static getInstance() {
        return new ESRCCanvas();
    }
}

export { Canvas };