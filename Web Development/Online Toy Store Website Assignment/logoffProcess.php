<?php
	ini_set("session.save_path", "/home/unn_w20003739/sessionData");
	session_start();
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Signed Out</title>
</head>
<body>
	<?php
		if(isset($_SESSION['logged-in'])&&$_SESSION['logged-in'])
		{
			$_SESSION['logged-in']=false;
			echo"<a href='homePage.php'>You are now logged out</a>";
		}
		else if(isset($_SESSION['logged-in'])&&!($_SESSION['logged-in']))
		{
			echo"<a href='loginForm.html'>You are already logged out, click here to log in</a>";
		}
		else
		{
			$_SESSION['logged-in']=false;
			echo"<a href=homePage.php>You are logged out</a>";
		}
	?>
</body>
</html>