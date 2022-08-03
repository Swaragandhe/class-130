song="";
leftWristX= 0;
leftWristY = 0; 
scoreLeftwrist="";
rightWristX = 0;
rightWristY = 0;
scoreRightWrist=0;
function preload() {
    song = loadSound("music.mp3");
  
}

function setup() {
    canvas = createCanvas(600 , 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video , modelLoaded);
    posenet.on('pose' , gotPoses);
}
function draw() {
    image(video , 0 , 0 , 600 , 500)
    fill("#fc0303");
stroke("#fc0303");
if(scoreRightWrist > 0.2 ) {
    circle(rightWristX , rightWristY , 20);
    if(rightWristY > 0 && rightWristY <= 100 ) {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY > 100  && rightWristY <=200) {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);

    }
    else if(rightWristY > 200 && rightWristY <=300) {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY > 300 && rightWristY <=400) {
        document.getElementById("speed").innerHTML = "speed = 2x";
        song.rate(2);

    }
    else if (rightWristY > 400 && rightWristY<=500 ) {
        document.getElementById("speed").innerHTML = "speed is 2.5x";
        song.rate(2.5);

    }

}
if(scoreLeftwrist > 0.2) {


    circle(leftWristX , leftWristY, 20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "volume= " + volume;
    song.setVolume(volume);
}

}
function gotPoses(results) {
    if( results.length > 0) {
        console.log(results);
        scoreLeftwrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score Left wrist = " + scoreLeftwrist + "Score Right wrist = " + scoreRightWrist);
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist x is " + leftWristX + "Left wrist Y is " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist x is " + rightWristX + " Right wrist Y is " + rightWristY);

    }

}
function modelLoaded() {
    console.log("Posenet is initialized");
}




function play1() {
    song.play();
    song.rate(1);
    song.setVolume(1);
}

