video = "";
modelStatus = "";
objects = [];


function preload() 
{
    video = createVideo('video.mp4');
    video.hide();
}

function setup() 
{
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw()
{
    image(video, 0, 0, 480, 380);

    if(modelStatus != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length;i++)
        {
            document.getElementById("status").innerHTML = "Status: Detected Objects";   
            document.getElementById("numberOfObjects").innerHTML = "Number of Detected Objects: "+ objects.length;   
            
            fill("#4D07B1");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#4D07B1");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }   
    }
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function start() 
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: Detecting Objects";
}


function modelLoaded() 
{
    console.log("Modelo Carregado!");
    modelStatus = true;
    video.loop();
    video.speed(1);
    video.volume(0.5);
}