<?php
include "db.php";
if(isset($_GET['id']))
{
    $id = $_GET['id'];

    $delete = "DELETE * FROM tb_class WHERE id='$id'";

    $deleteResult = mysqli_query($connection, $delete);

if($deleteResult){
    echo "ok";
}
else{
    echo "error";
}
}