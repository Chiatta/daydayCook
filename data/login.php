<?php
header('Content-Type:application/json');

$conn = mysqli_connect('127.0.0.1','root','','ddcook');

$name = $_REQUEST["name"];
$pwd = $_REQUEST["pwd"];


$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = "SELECT * FROM userinfo where userName = '$name' and userPwd = '$pwd'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
$err = array(0 => "msg", 1 => '');

if($row)
{
	echo(json_encode($row));
}
else
{
	$err[1]= '用户名或密码错误';
	echo json_encode($err);

}


?>