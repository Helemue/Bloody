<!DOCTYPE html>

<html lang="de">
<head>
  <title>Chatbot Experiment</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
  <script src="js/introductionFunctions.js"></script>
  <link rel="stylesheet" href="css/landingPage.css" type="text/css">


</head>

<body>
  <script>
  <?php
  // Script to check number of user's attempts to answer the questions
  // and if submitted answers are correct
  if(isset($_POST["try"])){
    // if "try" is set
    // -> load questions.json and decode to php Object
    $questions_file = file_get_contents('json/questions.json');
    $questions = json_decode($questions_file, true);
    if(isset($_POST["answers"])){
      // if "answers" is set, page was reloaded after user submitted $answers
      // -> decode answers to php Object
      $answers = json_decode($_POST["answers"], true);
      $correctAnswers = true;
      foreach ($questions as $question) {
        // check if all answers submitted by user are identical to correct answer
        if($question["answer_correct"]!==$answers[strval($question["question_id"])]){
          $correctAnswers = false;
          // if user's answer is not correct
          // -> check if maximum number of attempts reached
          if(intval($_POST["try"])>2){?>
            // if maximum number reached, redirect to error page
            window.open(errorUrl, "_self");
          <?} else {
            // if maximum not reached
            // -> unset answers and redirect to index.php for next try
            //unset($_POST["answers"])?>
            openWithPost(url, "try", <?echo (intval($_POST["try"])+1)?>);
          <?}
        }
      }

      if($correctAnswers == true){
        // if all answers are correct
        // -> load bot id of bot with fewest completed experiments
        $bot_setup = file_get_contents('json/bot_setup.json');
        $data = json_decode($bot_setup, true);
        $minId = "";
        $minCount = INF;
        foreach ($data as $bot) {
          if ($bot["counter_adjustable"] < $minCount) {
            $minCount = $bot["counter_adjustable"];
            $minId = $bot["bot_id"];
          }
        }
      ?>
        // open bot with fewest completed experiments
        openBot("<?echo $minId?>");
      <?}
    } else {?>
      // if "answers" is not set, user accessed page from index.php
      // -> display questions and options, store value of "try" in "valTry"
      var varTry = <? echo intval($_POST['try'])?>;
    <?}
  } else {?>
    // if "try" is not set, page was tried to be accessed via URL
    // -> redirect to index.php to make sure terms of service are accepted
    var varTry = <? echo intval($_POST['try'])?>;
    openWithPost(url, "try", varTry);
    <?
  }?>
  </script>

  <!-- Header -->
  <div class="container-fluid bg-1 text-center">
    <h2>Fragen zum Chatbot Experiment</h2>
  </div>

  <!-- Content -->
  <div class="container bg-2" id="content">

    <div class="row">
      <div class="col-*-*", id="question_col" style="margin-top:16px">
		    <p>Um zu überpüfen, dass Sie das Experiment und den Ablauf verstanden
          haben, beantworten Sie bitte noch kurz diese Fragen.
          (Es sollten Fragen zum Ablauf und zu den gegebenen Informationen
          gestellt werden.)
        </p>
        <script>
        var questionIds = [];
      </script>
        <? // load and display all questions and answer options from questions.json
        foreach ($questions as $question) { ?>
            <script>
              questionIds.push("<?php echo $question["question_id"] ?>");
            </script>
            <p><? echo $question["question_text"] ?> </br>
            <? foreach ($question["answer_options"] as $option => $text) {?>
                <input type="radio" name="<? echo $question["question_id"]?>" value="<? echo $option?>" id="<? echo ($question["question_id"] . $option)?>" >
                <label for="<? echo ($question["question_id"] . $option)?>" style="margin-bottom:0px">&nbsp; <? echo $text ?></label> </br>
            <? } ?>
            </p>
          <? } ?>
	    </div>
    </div>
    <div class="row">
      <div class="col-*-*">
	      <p>Bitte klicken Sie nun auf den untenstehenden Button, um Ihre Antorten
           auszuwerten und anschließend mit dem Experiment zu beginnen.</p>
        <? ?>
        <form action="comprehensionQuestions.php" method="POST">
          <input name="try" id="try" type="hidden">
          <input name="answers" id="answers" type="hidden">
          <input class="button" type="submit" onclick="checkAnswers(questionIds, varTry)" value="Starten" />
        </form>
        <br>
		    <p><strong><font color=red><output id="forwardingMessage"></output></font></strong></p>
		  </div>
    </div>
  </div>
</body>
</html>
