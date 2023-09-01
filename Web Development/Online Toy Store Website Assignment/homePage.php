<?php
	ini_set("session.save_path", "/home/unn_w20003739/sessionData");
	session_start();
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>NTL - Home</title>
</head>
<body>
	<h1>Northumbria Toys Limited</h1>
	
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
	<aside id='offers'></aside>
	<script type="text/javascript" src="offers.js"></script>
</body>
</html>