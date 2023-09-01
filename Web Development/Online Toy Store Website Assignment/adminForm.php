<?php
	ini_set("session.save_path", "/home/unn_w20003739/sessionData");
	session_start();
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Edit Toy</title>
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
	
		require_once("functions.php");
		$dbConn = getConnection();
		$id = filter_has_var(INPUT_GET, 'toySelect') ? $_GET['toySelect'] : null;
		$id=trim($id);
		
		if(!isset($id))
		{
			echo"<a href='adminSelect.php'>Please select a toy to edit</a>\n";
		}
		else
		{
			$query = "SELECT toyID, toyName, description,toyPrice, catDesc, manName
					FROM NTL_toys
					INNER JOIN NTL_category
					ON NTL_toys.catID = NTL_category.catID
					INNER JOIN NTL_manufacturer
					ON NTL_toys.manID = NTL_manufacturer.manID
					WHERE toyID = :id";
			$statement = $dbConn ->prepare($query);
			$statement-> execute(array(':id'=>$id));
			
			$query2 = "SELECT catID, catDesc
					FROM NTL_category";
			$categories = $dbConn->query($query2);
			
			$query3 = "SELECT manID, manName
					FROM NTL_manufacturer";
			$manufacturers = $dbConn->query($query3);
			
			while($info=$statement->fetchObject())
			{
				echo"<form method='get' action='adminProcess.php'>
					<label>Toy ID<input type='text' name='toyID' value='$info->toyID' readonly></label><br>
					<label>Toy Name<input type='text' name='name' value='$info->toyName'></label><br>
					<label>Description<textarea name='description'>$info->description</textarea></label><br>
					<label>Price<input type='number' name='price' value='$info->toyPrice' step='0.01' min='0.00'></label><br>
					<label>Category<select name='category'>";
						while($category=$categories->fetchObject())
						{
							echo"<option value=$category->catID"; if(($category->catDesc)==($info->catDesc)){echo" selected='selected'";}echo">$category->catDesc</option>";
						}
					echo"</select></label><br>
					<label>Manufacturer<select name='manID'>";
						while($manufacturer=$manufacturers->fetchObject())
						{
							echo"<option value=$manufacturer->manID"; if(($manufacturer->manName)==($info->manName)){echo" selected='selected'";}echo">$manufacturer->manName</option>";
						}
					echo"</select></label><br>
					<input type='submit' value='Submit'>
					</form>";
			}
		}
	?>
</body>
</html>