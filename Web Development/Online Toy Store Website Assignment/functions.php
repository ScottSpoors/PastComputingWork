<?php
function getConnection() {
	try {
		$connection = new PDO("mysql:host=localhost;dbname=unn_w20003739",
		  "unn_w20003739", "Relempago");
		$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			return $connection;
		} 
		catch (Exception $e) 
		{
			throw new Exception("Connection error ". $e->getMessage(), 0, $e);
		}
}
?>
