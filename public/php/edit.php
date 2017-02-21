<?php
include "db.php";
if(isset($_POST['edit']))
{
    $id = $_POST['id'];
    $name = $_POST['name'];
    $instructor = $_POST['instructor'];
    $day = $_POST['day'];
    $starttime = $_POST['starttime'];
    $endtime = $_POST['endtime'];

    $update = "UPDATE tb_class SET name='$name', instructor='$instructor' , day='$day', starttime='$starttime' , endtime='$endtime' WHERE id='$id'";

    $updateResult = mysqli_query($connection, $update);

if($updateResult){
    echo "ok";
}
else{
    echo "error";
}
}
