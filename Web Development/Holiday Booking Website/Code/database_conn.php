<?php
   $dbConn = new mysqli('localhost', 'unn_w20003739', 'Relempago', 'unn_w20003739');

   if ($dbConn->connect_error) {
      echo "<p>Connection failed: ".$dbConn->connect_error."</p>\n";
      exit;
   }
?>
