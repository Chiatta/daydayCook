<?php
header('Content-Type:application/json');

$conn = mysqli_connect('127.0.0.1','root','','ddcook');

$kindName = $_REQUEST["kindName"];

$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = "insert into kind(kindName) 
values('$kindName')";
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