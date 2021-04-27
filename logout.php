<?php
  // Initialize the session.
  // If you are using session_name("something"), don't forget it now!
  session_start();

  // Unset all of the session variables.
  $_SESSION = array();

  // If it's desired to kill the session, also delete the session cookie.
  // Note: This will destroy the session, and not just the session data!
  if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );

  }

  // Finally, destroy the session.
  session_destroy();
?>
<!DOCTYPE html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="css/landingPage.css" type="text/css">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<title>Reisepass Chatbot Admin-Logout</title>

</head>

<body>

<div class="container-fluid bg-1 text-center">
  <h2>Admin-Seite zum Chatbot Experiment</h2>
</div>

<!-- Content -->
<div class="container bg-2" id="content">

  <div class="row">
    <div class="col", id="question_col">
      <p> Sie wurden ausgeloggt</br>
          <a href="admin.php">Erneut anmelden</a>
      </p>
    </div>
  </div>
</body>
</html>
