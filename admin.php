<?PHP
session_start();

// please change password
$passwort = "ptGhpX9PF47kc";

if (isset($_POST['go'])){
  $check = $_POST["password"];
  $_SESSION["access"] = "empty";
  if ($check == "$passwort"){
    $_SESSION["access"] = "okay";
  }else{
    echo "Falsches Passwort...";
  }
}

$bot_setup_old = file_get_contents('json/bot_setup.json');
$data = json_decode($bot_setup_old, true);
?>

<!DOCTYPE html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="css/landingPage.css" type="text/css">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<script src="js/introductionFunctions.js"></script>
<title>Reisepass Chatbot Admin</title>
</head>

<body>
  <div class="container-fluid bg-1 text-center">
    <h2>Admin-Seite zum Chatbot Experiment</h2>
  </div>

<?php
//check if session access is granted (user has provided correct password)
if ($_SESSION["access"] == "okay") {
// --------------- start of protected content ---------------

//check if page is reloaded by submitting a reset
  if(isset($_POST['submit'], $_POST['newCount']))
  {
    // reset the counter_adjustable in JSON file using function
    reset_counter();
  }


  $bot_setup = file_get_contents('json/bot_setup.json');
  $data = json_decode($bot_setup, true);?>
  <div class="container" id="content">
  <a href="logout.php">Logout</a>
  <? foreach ($data as $bot) {?>
  <div class="row" style="margin-top:30px">
    <div class="col">
      <p> <b><? echo $bot["bot_id"]; ?> :
          <? if ($bot["bot_image"] === true){ ?>
            <img src="<? echo $bot["image_url"]?>" alt="image of <? echo $bot["bot_name"] ?>" width="38">
          <? } ?>
          <? echo $bot["bot_name"]; ?></b>
          <input class="button" type="button" onclick="openBot('<? echo $bot["bot_id"]; ?>')" value="Starten" />
          </br>
          <? echo $bot["bot_type"]; ?></br>
          <? echo $bot["bot_explanation"]; ?></br>
          <? if ($bot["bot_image"] === true){ ?>
            mit Bild
          <? } else {?>
            kein Bild
          <? } ?>
          </br>
          ewiger Zähler: <? echo $bot["counter_persistent"]; ?></br>
          aktueller Zähler: <? echo $bot["counter_adjustable"]; ?> </br>
          <? echo "<script>console.log('" . $bot["counter_adjustable"] . "');</script>"; ?>
          <form method="post" action="admin.php">
            <label for="newCount">Wert des aktuellen Zählers neu setzen:</label>
            <input type="number" id="newCount" name="newCount" min="0" style="width: 4em;" >
            <button class="button" type="submit" value="<? echo $bot["bot_id"]; ?>" name="submit" onclick="return confirm('Soll der aktuelle Zähler wirklich zurückgesetzt werden?');">setzen</button>
          </form>
        </p>
    </div>
  </div>
  <a href="logout.php">Logout</a>
  <? }

// --------------- end of protected content ---------------
}else{
// start of login form
?>
<form method="POST" action="">
<fieldset>
  <div class="container-fluid bg-2 text-center" id="content">

    <div class="row">
      <div class="col">

        <legend>Bitte Passwort eingeben...</legend>
        <input type="password" name="password" size="16" />
        <input type="submit" value="Login" name="go"/>
      </div>
    </div>
</form>
<?php }
// end of login form

//function to reset counter_adjustable in JSON file
function reset_counter()
  {
    $bot_setup = file_get_contents('json/bot_setup.json');
    $data = json_decode($bot_setup, true);
    for ($i = 0; $i < count($data); $i++){
      if ($data[$i]["bot_id"] === $_POST["submit"]){
        $data[$i]["counter_adjustable"] = $_POST["newCount"];
      }
    }
    $bot_setup_new = json_encode($data);
    file_put_contents('json/bot_setup.json', $bot_setup_new);
  }
?>
</body>
</html>
