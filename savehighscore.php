<?php
    file_put_contents("data.txt", $_GET['highscore']);
    $highscore = $_GET['highscore'];

    $dbhost = "localhost"; // DB host //
    $dbuser = "root"; // user of DB //
    $dbpass = ""; // PW DB, mostly ""//
    $dbname = "duckhunt"; // DB name //

    $con = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

    $query = "INSERT INTO `score` (score) VALUES ('$highscore')";
    $con->query($query);

    if ($con -> connect_errno) { 
        echo "Failed to connect to MySQL: " . $con -> connect_error; // connection error // 
        exit();
    }
    
    if (!$con) {
        die("Could not connect to the database!");
    }
?>