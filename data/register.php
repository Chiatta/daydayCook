<?php
header('Content-Type:application/json');

$conn = mysqli_connect('127.0.0.1','root','','ddcook');

$name = $_REQUEST["name"];
$pwd = $_REQUEST["pwd"];


$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = "insert into userinfo (userName,userPwd) values('$name','$pwd')";
mysqli_query($conn,$sql);

$id = mysqli_insert_id($conn);
$sql = "select * from userInfo where userID = $id";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);

if($row)
{
	echo(json_encode($row));
}
else
{
	

}

?>