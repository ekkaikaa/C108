Webcam.set({
    width:350, 
    height: 300,
    image_format: 'png',
    png_quality: 90
}); 

camera = document.getElementById("camera");
Webcam.attach('#camera')

function take_snapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerhtml = '<img id="capture_img" src="' + data_uri + '">'
    });
}

console.log('Ml5_version:', ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/DWXSosiPG/model.json",Model_loaded);

function Model_loaded(){
    console.log("teachable machine has been initialized");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_1 = "First Prediction is " + prediction_1;
    speak_2 = " And the second Prediction is " + prediction_2;
var utterthis = new SpeechSynthesisUtterance(speak_1 + speak_2)
synth.speak(utterthis);
};

function check() {
    console.log("inside the check function")
    img = document.getElementById("capture_img");
    classifier.classify(img, got_results);
}

function got_results(error, results) {
    if(error) {
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name1").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
        if(results[0].label == "thumbs up") {
            document.getElementById("update_emoji1").innerHTML = "&#128077";
            ;
        }
        if(results[0].label == "swag") {
            document.getElementById("update_emoji1").innerHTML = "&#129304;";
        }
        if(results[0].label == "perfect") {
            document.getElementById("update_emoji1").innerHTML = "&#128076;";
        }
    }} 