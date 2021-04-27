<?php
  session_start();
  $bot_setup = file_get_contents('json/bot_setup.json');
  $data = json_decode($bot_setup, true);
  for ($i = 0; $i < count($data); $i++){
    if ($data[$i]["bot_id"] === $_SESSION["version"]){
      $data[$i]["counter_persistent"] = $data[$i]["counter_persistent"] + 1;
      $data[$i]["counter_adjustable"] = $data[$i]["counter_adjustable"] + 1;
    }
  }
  $bot_setup_new = json_encode($data);
  file_put_contents('json/bot_setup.json', $bot_setup_new);
  session_unset();
  session_destroy();
?>
<!DOCTYPE html>
<html lang="de">
<head>
  <?php
  $forms_setup = file_get_contents('json/forms_setup.json');
  $forms_data = json_decode($forms_setup, true);?>
  <meta http-equiv="refresh" content="5; URL=<?echo $forms_data["forms_url"]?>">
  <title>Chatbot Experiment Weiterleitung zur Umfrage</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="stylesheet" href="css/landingPage.css" type="text/css">
</head>

<body>
  <div class="container-fluid bg-1 text-center">
    <h2>Weiterleitung zur Umfrage</h2>
  </div>
  <div class="container-fluid bg-2">
    <div class="row">
      <div class="col">
        <p style="text-align:center;"><strong>Vielen Dank, dass Sie sich für eine Teilnahme an unserer Umfrage entschieden haben. </br>
          Sie werden weitergeleitet...</strong></p>
      </div>
    </div>
  </div>
</body>
</html>
