<?php
	include "db.php";
	$data=array();

	//$q=mysqli_query("SELECT * FROM 'course_details'");

	$query = "SELECT * FROM tb_class";

	$queryResult = mysqli_query($connection, $query);

	$numberOfRows = mysqli_num_rows($queryResult);

	if( $numberOfRows > 0 ){
		while($row = mysqli_fetch_assoc($queryResult)) {
			$data[] = $row;
		}
	}

	//while ($row=mysql_fetch_object($q)){
	//	$data[]=$row;
	//}
	echo json_encode($data);
?>