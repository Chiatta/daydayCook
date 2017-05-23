<?php
header('Content-Type:application/json');

$conn = mysqli_connect('127.0.0.1','root','','ddcook');

$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = "SELECT kindName FROM food group by kindName";
$result = mysqli_query($conn,$sql);

$row = mysqli_fetch_all($result);
if(empty($row))
{
    echo '[]';
}
else
{
    echo json_encode($row);
}
?>