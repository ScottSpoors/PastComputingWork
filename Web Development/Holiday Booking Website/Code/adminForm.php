<!doctype html> 
<html lang="en"> 
<head>
	<!--Page Title-->
	<meta charset="utf-8">
	<title>Admin - Leading Choice Getaways</title>
	<link href='lcg.css' rel='stylesheet'>
</head>
<body class="admin">
	<header><!--This is the logo image for the website-->
		<a href="index.html"><img src="lcglogo.png" alt="LCG Logo"></a>
		<h1>Leading Choice Getaways</h1>
	</header>
	<nav>
		<a href="index.html">Home</a>
		<a href="holidays.php">View Available Holidays</a>
		<a href="adminForm.php">Admin</a>
		<a href="credits.html">Credits</a>
		<a href="lcgw.pdf">Wireframes</a>
	</nav>
	<h2>Add new holiday</h2>
	<?php
		include 'database_conn.php';//This links this php code to the external databse connection code
		//The following code establishes the SQL queries needed to gather all
		//necessary data from the database to be used in the form
		$sqlcategory="SELECT catDesc, catID 
		FROM LCG_category";
		$queryResult1=$dbConn->query($sqlcategory);
		$sqllocation="SELECT locationName, locationID 
		FROM LCG_location";
		$queryResult2=$dbConn->query($sqllocation);
		//This code creates the input areas in the form
		echo"<form action='adminProcess.php' method='post'>
			<fieldset>
			<legend>Please enter the details of the new holiday below</legend>
			<div class='formgrid'>
			<label>Title</label>
				<input type='text' name='title' tabindex='1' class='input' required>
			<label>Description</label>
				<textarea name='description' tabindex='2' class='input' required></textarea>
			<label>Duration</label>
				<input type='number' min=0 name='duration' tabindex='3' class='input' required>
			<label>Price</label>
				<input type='number' min=0 name='price' tabindex='4' class='input' required>
			<label>Category</label>
			<select name='category' tabindex='5' class='input'>";
			//This following code creates the drop down menus for the user to choose
			//the location and category of the new holiday, using the locations
			//and categories gathered from the database
			while($category=$queryResult1->fetch_object())
			{
				echo"<option value=$category->catID>$category->catDesc</option>";
			}
			echo"</select>
				<label>Location</label>
				<select name='location' tabindex='6' class='input'>";
			while($location=$queryResult2->fetch_object())
			{
				echo"<option value=$location->locationID>$location->locationName</option>";
			}
			echo"</select>
			<input type='submit' value='Submit' class='submit' tabindex='7'>
			</div>
			</fieldset>
		</form>";
	?>
	<footer>
		<p>Leading Choice Getaways 2021</p>
	</footer>
</body>
</html>