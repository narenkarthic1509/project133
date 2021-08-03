statusofcoco = "";
object = [];

function preload(){
    imge = loadImage("tv.jpg");
}

function setup(){
    canvas = createCanvas(467,360);
    canvas.position(450,300);

    objectdetect = ml5.objectDetector('cocossd',modelLoaded);

    document.getElementById("status").innerHTML = "Status : Detecting objects";
}

function modelLoaded(){
    console.log("model has been loaded");
    statusofcoco = true;
    objectdetect.detect(imge,gotResults);
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        object = results;
    }
}

function draw(){
    image(imge,0,0,467,360);

    if(statusofcoco != ""){
        for(i = 0; i < object.length; i++){
            percent = floor(object[i].confidence * 100) + "%";
            lbl = object[i].label;
            total = lbl + percent;

            objectx = object[i].x;
            objecty = object[i].y;

            updated_objecty = objecty - 20;

            wdth = object[i].width;
            heiht = object[i].height;

            fill("#800080");
            noFill();
            stroke("#800080");

            rect(objectx,objecty,wdth,heiht);
            text(total,objectx,updated_objecty);

            document.getElementById("object").innerHTML = "the image has 3 objects but cocossd has detected only 1 object";
            document.getElementById("status").innerHTML = "Status : Objects Detected";
        }
    }
}