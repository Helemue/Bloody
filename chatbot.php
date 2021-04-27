<?php
// Start the session
session_start();
$forwardUrl = "forwardingPage.php?PHPSESSID=".session_id();
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.1/showdown.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj" crossorigin="anonymous"></script>
    <script src="js/chatbot.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <link rel="stylesheet" href="css/chatbot.css" type="text/css">
    <!--Only needed for carousel, if needed also uncomment in chatbot.js file
    <script src="js/lightslider.js"></script>
    <link rel="stylesheet" href="css/lightslider.css" type="text/css">
    <script type="text/javascript">
      $(document).ready(function () {
        $("#lightSlider").lightSlider();
      });
    </script>
    -->
    <base target="_blank">

</head>

<body class="fontStyle">
  <script>
  directToIndex(<?php if(isset($_POST["version"])){
                          echo 0;
                        } else {
                          session_unset();
                          session_destroy();
                          echo 1;
                        };
                  ?>);
  </script>
  <?php
    $sessionID = bin2hex(random_bytes(16));
    $_SESSION["version"] = $_POST["version"];
  ?>
  <span style="display: none;" id="sessionId">
    <?php
    echo $sessionID;
    ?>
  </span>
  <span style="display: none;" id="version">
    <?php
      echo $_SESSION["version"];
    ?>
  </span>
  <div class="background container-md" id="background">
    <a id="head"></a>&nbsp;&nbsp;&nbsp;
    <script type="text/javascript">
      loadNameImage();
    </script>
    <div class="chatWindow container-fluid" id="chat-text"></div>
    <form>
      <div class="row">
        <div class="col-10" style="padding:0px; padding-left:10px;">
          <span style="width:100%;" id="inputSpan">
            <input class="inputbox" placeholder="Schreiben Sie etwas und drücken Sie Enter..." id="message" name="date" value="" x-webkit-speech>
          </span>
        </div>
        <div class="col-2" style="padding:0px; padding-left:10px; ">
          <button class="sendbutton" type="submit" value="Submit">Senden</button>
        </div>
        <input name="submit" type="hidden" value="Submit">
      </div>
    </form>
  </div>
</body>
</html>
