<?php
 	header("Access-Control-Allow-Origin: *");
 	//mysql_connect("localhost","root","root");
	//mysql_select_db("phonegap_demo");

	$host = "localhost";
	$username = "root";
	$password = "";
	$database = "db_class";
	$connection = mysqli_connect($host, $username, $password, $database);
