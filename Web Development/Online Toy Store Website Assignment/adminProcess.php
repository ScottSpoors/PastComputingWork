<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Toy Updated</title>
</head>
<body>
	<?php
		require_once("functions.php");
		$dbConn = getConnection();
		
		try
		{
			$toyID = filter_has_var(INPUT_GET, 'toyID') ? $_GET['toyID'] : null;
			$toyID = trim($toyID);
			$toyName = filter_has_var(INPUT_GET,'name') ? $_GET['name'] : null;
			$toyName = trim($toyName);
			$description = filter_has_var(INPUT_GET,'description') ? $_GET['description'] : null;
			$description = trim($description);
			$toyPrice = filter_has_var(INPUT_GET,'price') ? $_GET['price'] : null;
			$toyPrice = trim($toyPrice);
			$category = filter_has_var(INPUT_GET,'category') ? $_GET['category'] : null;
			$category = trim($category);
			$manID = filter_has_var(INPUT_GET, 'manID') ? $_GET['manID'] : null;
			
			$insertSQL = "UPDATE NTL_toys
						SET toyName = :toyName,
						description = :description,
						manID = :manID,
						catID = :catID,
						toyPrice = :toyPrice
						WHERE toyID = :toyID";
			$stmt = $dbConn->prepare($insertSQL);
			$stmt->execute(array('toyID'=>$toyID, ':toyName'=>$toyName, ':description'=>$description, ':manID'=>$manID, ':catID'=>$category, ':toyPrice'=>$toyPrice));
			echo"<p>The record for $toyName has been successfully updated</p>";
		}
		catch(Exception $e)
		{
			echo "<p>A problem occured, please try again.</p>\n";
			log_error($e);
		}
	?>
</body>
</html>