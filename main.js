object= []

function setup(){
    canvas= createCanvas(640,420)
    canvas.center()
    objectDetector= ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML= "status:detecting objects"
}

img= ""

status= ""

function preload(){
    img= loadImage("download.jfif")
}


function draw(){
    image(img, 0,0,640,420)
    if(status!= ""){
        for(i= 0;i<object.length;i++){
            document.getElementById("status").innerHTML= "STATUS: object detected"
            fill("red")
            percent= floor(object[i].confidence*100)
            text (object[i].label+" "+percent, object[i].x+15, object[i].y+15)
            noFill()
            stroke("red")
            rect(object[i].x,object[i].y, object[i].width,  object[i].height)
        }
    }
}


function modelLoaded(){
    console.log("model is loaded")
    status= true
    objectDetector.detect(img, gotResults)
}


function gotResults(error, results){
    if(error){
        console.error(error)
    }
    console.log(results)
    object= results
}
