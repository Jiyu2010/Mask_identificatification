https://teachablemachine.withgoogle.com/models/RhQdqHCCU/

Webcam.set({
    Width:350,
    height:300,
    image_format:'png',
    png_quality:100
    
});
camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML= '<img id="captured_image" src="'+data_uri+'"/>';

    });
    

}

console.log('ml5 version:',ml5.version);
Classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/RhQdqHCCU/model.json",modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The prediction is "+prediction_1;
    
    var utterThis= new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);

}

function check()
{
    img=document.getElementById('captured_image');
    Classifier.classify(img,gotResult)
}

function gotResult(error,results)
{
    if(error){
        console.log(error);
    }else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML=results[0].label;
        
        prediction_1=results[0].label;
        

        speak();
        if(results[0].label == "no mask")
        {
            document.getElementById("update_gesture").innerHTML ="ENTRY DENIED";
        
        }

        if(results[0].label == "With mask")
        {
            document.getElementById("update_gesture").innerHTML ="ENTRY ALLOWED";
        }

        
    }
}

