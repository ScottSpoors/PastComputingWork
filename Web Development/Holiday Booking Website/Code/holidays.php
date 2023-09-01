<!doctype html> 
<html lang="en"> 

<head>
	<!--Page Title-->
	<meta charset="utf-8">
	<title>View Holidays - Leading Choice Getaways</title>
	<link href='lcg.css' rel='stylesheet'>
</head>
<body class="viewpage">
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
	<h2>View Available Holidays</h2>
	
<?php
	include 'database_conn.php';//This links this php code to the external databse connection code
	//This code sets out the SQL query that is going to be passed to the database to
	//gather the information on the available holidays
	$sql=
	"SELECT holidayTitle, locationName, country, catDesc, holidayDuration, holidayPrice, holidayDescription
	FROM LCG_holidays
	INNER JOIN LCG_location
	ON LCG_holidays.locationID=LCG_location.locationID
	INNER JOIN LCG_category
	ON LCG_holidays.catID=LCG_category.catID
	ORDER BY LCG_holidays.holidayTitle";
	//This code passes the query to the database connection and gathers the data
	$queryResult=$dbConn->query($sql);
	
	if($queryResult === false) {
	echo "<p>Query failed: ".$dbConn->error."</p>\n</body>\n</html>";
	exit;
	}
	else {
		//This code is responsible for creating the table that the holiday details
		//are presented in
		echo"<table>
		<tr>
			<th>Title</th>
			<th>Location</th>
			<th>Country</th>
			<th>Category</th>
			<th>Duration</th>
			<th>Price</th>
			<th>Description</th>
		</tr>";
		//This code iterates through the data from the database table
		//and places the gathered holiday data into the correct
		//table columns
		while($rowObj = $queryResult->fetch_object()){
			echo "<tr>
				<td>{$rowObj->holidayTitle}</td> 
				<td>{$rowObj->locationName}</td> 
				<td>{$rowObj->country}</td> 
				<td>{$rowObj->catDesc}</td>
				<td>{$rowObj->holidayDuration} days</td> 
				<td>£{$rowObj->holidayPrice}</td> 
				<td>{$rowObj->holidayDescription}</td>
				</tr>";
		}
		echo"</table>";
	}
	//This code closes the database connection once the data has all been fetched
	$queryResult->close();
	$dbConn->close();
?>
	<footer>
		<p>Leading Choice Getaways 2021</p>
	</footer>
</body>
</html>