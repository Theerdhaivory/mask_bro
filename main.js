Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
})

  camera = document.getElementById("camera");

  Webcam.attach('#camera');

  function take_snapshot()
  {
    Webcam.snap(function(data_uri) {
        document.getElementById("snap").innerHTML = '<img id="captured_image" src = "'+data_uri+'"/> ';
    });
  }

  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/yWNnWKNd6/model.json',loaded);

  console.log('ml5 version:',ml5.version);

  function loaded() {
    console.log('Model Loaded!');
    }

    function speak(){
        var synth = window.speechSynthesis;
        speak_data = "The prediction is " + prediction_1;
        var utterThis = new SpeechSynthesisUtterance (speak_data_);
        synth.speak(utterThis);
        }

  function check()
  {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
  }

  function gotResult(error, results) {
    if (error) {
      console.error(error);
    } else{
      console.log(results);
      document.getElementById("result_1").innerHTML = results[0].label;
      prediction_1 = results[0].label;
      speak();
      if(results[0].label == "improper mask")
      {
        document.getElementById("update_1").innerHTML = "&#58163; Wear your mask properly!";
      }
      if(results[0].label == "no mask")
      {
        document.getElementById("update_1").innerHTML = "&#58163; Wear a mask!";
      }
      if(results[0].label == "proper mask")
      {
        document.getElementById("update_1").innerHTML = "&#10003; You have wore a mask!";
      }
      
    }
  }