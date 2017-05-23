<?php
header('Content-Type:application/json');

$conn = mysqli_connect('127.0.0.1','root','','ddcook');

$foodId = $_REQUEST["foodId"];

$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = "SELECT * FROM `food` where foodId != '$foodId' order by totalRank desc limit 7";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_all($result,MYSQLI_ASSOC);
if(empty($row))
{
    echo '[]';
}
else
{
    echo json_encode($row);
}


?>