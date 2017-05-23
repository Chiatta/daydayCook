<?php
header('Content-Type:application/json');

$conn = mysqli_connect('127.0.0.1','root','','ddcook');

$foodId = $_REQUEST["id"];

$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = "SELECT * FROM food where foodId = '$foodId'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);


if(empty($row))
{
    echo '[]';
}
else
{
	$lookedOrign = $row['foodLooked'];
	$sql = "update food set foodLooked = $lookedOrign +1 where foodId = '$foodId'";
	mysqli_query($conn,$sql);
    echo json_encode($row);
}
?>