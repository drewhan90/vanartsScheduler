<?php
include "db.php";
if(isset($_POST['add']))
{
    $name = $_POST['className'];
    $instructor = $_POST['instructorName'];
    $day = $_POST['day'];
    $starttime = $_POST['startTime'];
    $endtime = $_POST['endTime'];

    $insert = "INSERT INTO tb_class (name, instructor, day, starttime, endtime) 
            VALUES ('$name','$instructor' ,'$day','$starttime','$endtime')";

    $insertResult = mysqli_query($connection, $insert);

if($insertResult){
    echo "ok";
}
else{
    echo "error";
}
}