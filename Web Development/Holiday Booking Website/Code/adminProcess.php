<!doctype html> 
<html lang="en"> 
<head>
	<!--Page Title-->
	<meta charset="utf-8">
	<title>Admin Confirmation</title>
	<link href='lcg.css' rel='stylesheet'>
</head>
<body class="result">
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
	<?php
		include 'database_conn.php';
		//This code initialises a list of variables with values from the inputted 
		//data into the various form fields, and sets the variables to null
		//if the certain input field was left blank
		$title=isset($_POST['title'])?$dbConn->real_escape_string($_POST['title']):null;
		$desc=isset($_POST['description'])?$dbConn->real_escape_string($_POST['description']):null;
		$duration=isset($_POST['duration'])?$_POST['duration']:null;
		$price=isset($_POST['price'])?$_POST['price']:null;
		$category=isset($_POST['category'])?$_POST['category']:null;
		$location=isset($_POST['location'])?$_POST['location']:null;
		
		//This code checks to see if any of the input fields are empty
		//and does not allow the user to proceed if they are
		if(empty($title)||empty($desc)||empty($duration)||empty($price)||empty($category)||empty($location))
		{
			echo'<p>All holiday details should be entered';
			echo'<a href="adminForm.php">Go Back</a></p>';
		}
		else
		{
			//This code initialises and carries out the SQL query to add the details
			//of the new holiday into the database
			$insert="INSERT INTO LCG_holidays
			(holidayTitle,holidayDescription,holidayDuration,locationID,catID,holidayPrice)
			VALUES('$title','$desc','$duration','$location','$category','$price')";
			$success=$dbConn->query($insert);
			
			echo"<h2>New Holiday Added</h2>";
			//This code performs another SQL query on the database in order to
			//gather the details of the newly added holiday  and present them on screen
			echo"<p>The new holiday has been registered with the following details:</p>";
			$details="SELECT holidayTitle,holidayDescription,holidayDuration,catDesc,locationName,holidayPrice
				FROM LCG_holidays
				INNER JOIN LCG_location
				ON LCG_holidays.locationID=LCG_location.locationID
				INNER JOIN LCG_category
				ON LCG_holidays.catID=LCG_category.catID
				WHERE LCG_holidays.holidayID=(
				SELECT MAX(holidayID)
				FROM LCG_holidays)";
			$queryResult=$dbConn->query($details);
			if($queryResult === false) {
			echo "<p>Query failed: ".$dbConn->error."</p>\n</body>\n</html>";
			exit;
			}
			//This code displays on screen the data that was entered
			//for the new holiday in the Admin form after this data
			//was fetched from the database
			else {
				$newholiday=$queryResult->fetch_object();
				echo "<div class='holiday'>
					<span class='holidayTitle'>Holiday Title: $newholiday->holidayTitle<br></span> 
					<span class='holidayDescription'>Description: $newholiday->holidayDescription<br></span>
					<span class='holidayDuration'>Duration: $newholiday->holidayDuration days<br></span>
					<span class='locationName'>Location: $newholiday->locationName<br></span> 
					<span class='catDesc'>Category: $newholiday->catDesc<br></span>
					<span class='holidayPrice'>Price: £$newholiday->holidayPrice<br></span> 
					</div>";
			}
			mysqli_close($dbConn);
		}
	?>
	<footer>
		<p>Leading Choice Getaways 2021</p>
	</footer>
</body>
</html>