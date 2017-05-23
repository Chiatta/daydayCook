<?php
header('Content-Type:application/json');

$conn = mysqli_connect('127.0.0.1','root','','ddcook');

$foodName = $_REQUEST["foodName"];
$foodTime = $_REQUEST["foodTime"];
$foodTaste = $_REQUEST["foodTaste"];
$foodTech = $_REQUEST["foodTech"];
$kindName = $_REQUEST["kindName"];
$foodMaterial = $_REQUEST["foodMaterial"];
$foodStep = $_REQUEST["foodStep"];
$foodIntro = $_REQUEST["foodIntro"];
$foodVideo = $_REQUEST["foodVideo"];
$foodImg = $_REQUEST["foodImg"];
$foodLooked = 0;
$foodRank = 0;
$totalRank = 0;
$foodLoadtime = time();

$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = "insert into food(foodRank,totalRank,foodName,foodTime,foodTaste,foodTech,kindName,foodMaterial,foodStep,foodIntro,foodVideo,foodImg,foodLooked,foodLoadtime) 
values('$foodRank','$totalRank','$foodName','$foodTime','$foodTaste','$foodTech','$kindName','$foodMaterial','$foodStep','$foodIntro','$foodVideo','$foodImg','$foodLooked','$foodLoadtime')";
mysqli_query($conn,$sql);

$id = mysqli_insert_id($conn);


if($id)
{
	$msg = array(0 => "msg", 1 => 'succ');
	echo json_encode($msg);
}
else
{
	$msg = array(0 => "msg", 1 => 'err');
	echo json_encode($msg);
}

?>