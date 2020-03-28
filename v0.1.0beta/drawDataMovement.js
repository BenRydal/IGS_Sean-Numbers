class DrawDataMovement {

    constructor() {
        this.bugXPos = -1;
        this.bugYPos = -1;
        this.bugTimePos = -1;
    }

    setData(path, shade) {
        this.resetBug();
        this.draw(PLAN, path.movement, shade);
        this.draw(SPACETIME, path.movement, shade);
        if (this.bugXPos != -1) this.drawBug(shade); // if selected, draw bug
        if (!animation) this.drawSlicer();
    }

    draw(view, points, shade) {
        strokeWeight(5);
        stroke(shade); //stroke(shade, 225);
        noFill(); // important for curve drawing
        beginShape();
        for (var i = 0; i < animationCounter; i++) {
            var point = points[i];
            if (view == PLAN) curveVertex(point.xPos, point.yPos);
            else if (view == SPACETIME) { // text/get bug values
                curveVertex(point.time, point.yPos);
                if (videoIsPlaying) {
                    var kdp = document.getElementById('kalturaPlayer');
                    var videoTime = kdp.evaluate('{video.player.currentTime}');
                    var videoX = map(videoTime, 0, videoDuration, timelineStart, timelineEnd);
                    if (videoX >= point.time - bugPrecision && videoX <= point.time + bugPrecision) {
                        this.recordBug(point.xPos, point.yPos, point.time);
                    }
                } else if (mouseY < timelineHeight && mouseX >= point.time - bugPrecision && mouseX <= point.time + bugPrecision) {
                    this.recordBug(point.xPos, point.yPos, point.time);
                } else if (animation && i <= animationCounter - 1) {
                    this.recordBug(point.xPos, point.yPos, point.time);
                }
            }
        }
        endShape();
    }

    resetBug() {
        this.bugXPos = -1;
        this.bugYPos = -1;
        this.bugTimePos = -1;
    }
    recordBug(xPos, yPos, timePos) {
        this.bugXPos = xPos;
        this.bugYPos = yPos;
        this.bugTimePos = timePos;
        bugTimePosForVideo = timePos;
    }

    drawBug(shade) {
        stroke(0);
        strokeWeight(5);
        fill(shade);
        ellipse(this.bugXPos, this.bugYPos, bugSize, bugSize);
        ellipse(this.bugTimePos, this.bugYPos, bugSize, bugSize);
    }

    drawSlicer() {
        fill(0);
        stroke(0);
        strokeWeight(2);
        //if (videoIsPlaying) {
        //  float videoX = map(ballVideo.time(), 0, videoDuration, timelineStart, timelineEnd);
        //  line(videoX, 0, videoX, timelineHeight);
        //} else
        line(this.bugTimePos, 0, this.bugTimePos, timelineHeight);

    }
}
