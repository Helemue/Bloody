var url = "/index.php";
var chatbotUrl = "/chatbot.php";
var comprehensionUrl = "/comprehensionQuestions.php";
var errorUrl = "/errorPage.php";


function errorMessage(varTry){
  const urlParams = new URLSearchParams(window.location.search);
  const noconsent = urlParams.get('noconsent');
  if(noconsent){
      var messageText = document.createTextNode("Bitte stimmen Sie der Datenschutzerklärung und der Nutzung der Dienste Forms und Dialogflow von Google zu.");
      document.getElementById('errorMessage').appendChild(messageText);
      document.getElementById('errorMessage').appendChild(document.createElement("br"));
  }
  if(varTry===2){
    var messageText = document.createTextNode("Ihre Antworten waren leider nicht richtig. Dies ist ihr zweiter von drei Versuchen. Lesen Sie die Experimentbeschreibung noch einmal gründlich durch und beantworten Sie anschließend die Fragen erneut.");
    document.getElementById('errorMessage').appendChild(messageText);
  } else if (varTry===3) {
    var messageText = document.createTextNode("Das ist Ihr letzter Versuch! Lesen Sie die Experimentbeschreibung noch einmal gründlich durch und beantworten Sie anschließend die Fragen erneut.");
    document.getElementById('errorMessage').appendChild(messageText);
  } else if (varTry>3) {
    window.open(errorUrl, "_self");
  }
}

function openBot(version){
  openWithPost(chatbotUrl, "version", version);
  }

function openWithPost(url, name, value){
  var dummyForm = document.createElement("form");
  dummyForm.method = "POST";
  dummyForm.action = url;
  dummyForm.style.display = "none";
  var dummyInput = document.createElement("input");
  dummyInput.type = "text";
  dummyInput.name = name;
  dummyInput.value = value;
  dummyForm.appendChild(dummyInput);
  document.body.appendChild(dummyForm);
  dummyForm.submit();
  document.body.removeChild(dummyForm);
}

function directToIndex(bool){
  if(bool){
    window.open(url, "_self");
  }
}

function validate(varTry) {
        if (document.getElementById('privacy').checked && document.getElementById('dialogflow').checked && document.getElementById('forms').checked) {
            openWithPost('comprehensionQuestions.php','try', varTry);
        } else {
            openWithPost('index.php?noconsent=true','try', varTry);
        }
    }

function getAnswers(questionIds){
  var jsonAnswers = {};
  questionIds.forEach(function(id){
    jsonAnswers[id] = $("input[name="+id+"]:checked").val();
  });
  return jsonAnswers;
}

function checkAnswers(questionIds, varTry){
  document.getElementById("try").value = varTry;
  document.getElementById("answers").value = JSON.stringify(getAnswers(questionIds));
  console.log({answers: getAnswers(questionIds), try: varTry});
}
