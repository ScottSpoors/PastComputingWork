<?php
	ini_set("session.save_path", "/home/unn_w20003739/sessionData");
	session_start();
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Logged in</title>
</head>
<body>
	<?php
		$_SESSION['logged-in']=false;
		$incorrect = "<a href='loginForm.html'>Username or password were incorrect, try again</a>\n";
		$username = filter_has_var(INPUT_POST,'username') ? $_POST['username'] : null;
		$password = filter_has_var(INPUT_POST,'password') ? $_POST['password'] : null;
		$password = trim($password);
		
		try{
			require_once("functions.php");
			$dbConn = getConnection();
			
			$query = "SELECT passwordHash
					FROM NTL_users
					WHERE username = :username";
			$statement = $dbConn->prepare($query);
			$statement->execute(array(':username'=>$username));
			
			$user = $statement->fetchObject();
			if($user)
			{
				$passwordHash = $user->passwordHash;
				if(password_verify($password,$passwordHash))
				{
					$_SESSION['logged-in']=true;
					echo"
					<aside><a href='logoffProcess.php'>Sign Out</a></aside>
					<ul>
						<li><a href='homePage.php'>Home</a></li>
						<li><a href='adminSelect.php'>Edit Toys</a></li>
						<li><a href='orderToysForm.php'>Order Toys</a></li>
						<li><a href='credits.php'>Credits</a></li>
					</ul>
					<h2>Login successful, welcome $username</h2>";
				}
				else
				{
					echo $incorrect;
				}
			}
		}
		catch(Exception $e)
		{
			echo "There was a problem: " . $e->getMessage();
		}
	?>
</body>
</html>