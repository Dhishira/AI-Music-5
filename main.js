song_1 = "";
song_2 = "";

scoreLeftWrist = 0;
scoreRightWrist = 0;

status_1 = "";
status_2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

song_peter_pan = "";
song_harry_potter = "";

function preload()
{
  song_1 = loadSound("music2.mp3");
  song_2 = loadSound("music.mp3");
}

function setup()
{
  canvas = createCanvas(600,325);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();

  posenet = ml5.poseNet(video,modelLoaded);
  posenet.on('pose',gotposes);
}

function modelLoaded()
{
  console.log("Posenet is Intialized!");
}

function gotposes(results)
{
  if(results.length > 0)
  {
    console.log(results);

    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log(scoreLeftWrist);

    scoreRightWrist = results[0].pose.keypoints[10].score;
    console.log(scoreRightWrist);
    
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftwristX - " + leftWristX+ "leftwristY - " + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightwristX - " + rightWristX+ "rightwristY - " + rightWristY);
  }
}

function draw()
{
  image(video,0,0,600,325);
  fill("#F72F28");
  stroke("#F72F28")

  status_1 = song_1.isPlaying();

  status_2 = song_2.isPlaying();

  if(scoreLeftWrist > 0.2)
  {
    circle(leftWristX,leftWristY,20);
    status_1.stop();
    if(song_1 == false)
    {
      status_1.play();
      document.getElementById("song_name").innerHTML = "Song Name - Peter Pan";
    }
  }

  if(scoreRightWrist > 0.2)
  {
    circle(rightWristX,rightWristY,20);
    status_2.stop();
    if(song_2 == false)
    {
      status_2.play();
      document.getElementById("song_name").innerHTML = "Song Name - Harry Potter Theme";
    }
  }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
