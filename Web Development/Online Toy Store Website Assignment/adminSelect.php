<?php
	ini_set("session.save_path", "/home/unn_w20003739/sessionData");
	session_start();
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Select A Toy</title>
</head>
<body>
	<?php
		if(!isset($_SESSION['logged-in']))
		{
			$_SESSION['logged-in']=false;
		}
		
		echo
		'<ul>
			<li><a href="homePage.php">Home</a></li>';
			if($_SESSION['logged-in'])
			{
				echo"<li><a href='adminSelect.php'>Edit Toys</a></li>";
			}
			echo'<li><a href="orderToysForm.php">Order Toys</a></li>
			<li><a href="credits.php">Credits</a></li>
		</ul>';
		
		if(isset($_SESSION['logged-in'])&&$_SESSION['logged-in'])
		{
			require_once("functions.php");
			$dbConn=getConnection();
			$retrieveSQL = "SELECT toyID, toyName, description, catDesc, toyPrice
							FROM NTL_toys
							INNER JOIN NTL_category
							ON NTL_toys.catID = NTL_category.catID
							ORDER BY toyName";
			$query = $dbConn->query($retrieveSQL);
			echo"<form method='get' action='adminForm.php'>
				<label>Toy Name<select name='toySelect'>";
				while($name=$query->fetchObject())
				{
					echo"<option value=$name->toyID>$name->toyName, $name->description, $name->catDesc, $name->toyPrice</option>";
				}
				echo"</select></label>\n
				<input type='Submit' value='Submit'>
			</form>";
		}
		else
		{
			echo"<a href='loginForm.html'>Please login to access this content</a>";
		}
	?>
</body>
</html>