<?php
	ini_set("session.save_path", "/home/unn_w20003739/sessionData");
	session_start();
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Credits</title>
</head>
<body>
	<?php
		if(!isset($_SESSION['logged-in']))
		{
			$_SESSION['logged-in']=false;
			echo"<aside><a href='loginForm.html'>Login</a></aside>";
		}
		else if($_SESSION['logged-in'])
		{
			echo"<aside><a href='logoffProcess.php'>Sign Out</a></aside>";
		}
		else
		{
			echo"<aside><a href='loginForm.html'>Login</a></aside>";
		}
	?>
	<ul>
		<li><a href="homePage.php">Home</a></li>
		<?php
			if($_SESSION['logged-in'])
			{
				echo"<li><a href='adminSelect.php'>Edit Toys</a></li>";
			}
		?>
		<li><a href="orderToysForm.php">Order Toys</a></li>
		<li><a href="credits.php">Credits</a></li>
	</ul>
	<h1>Credits</h1>
	<h2>Student Credentials</h2>
	<ul>
		<li><p>Name: Scott Spoors</p></li>
		<li><p>Student ID: w20003739</p></li>
		<li><p>Email: scott.spoors@northumbria.ac.uk</p></li>
	</ul>
</body>
</html>