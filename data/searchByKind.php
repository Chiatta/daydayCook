﻿<?php
header('Content-Type:application/json');

$conn = mysqli_connect('127.0.0.1','root','','ddcook');

$page = $_REQUEST["page"];
$num = $_REQUEST["num"]; 
$start = ($page-1)*$num;

$KindName = $_REQUEST["kindName"];

$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = "select * from food where kindName = '$KindName'";
$total=mysqli_num_rows(mysqli_query($conn,$sql)); //查询数据的总数total
$pagenum=ceil($total/$num);      //获得总页数 pagenum

$sql = "SELECT * FROM food where kindName = '$KindName'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_all($result,MYSQLI_ASSOC);
if(empty($row))
{
    echo '[]';
}
else
{
	
	$list = [
		'page'=>$page,
		'num'=>$num,
		'start'=>$start,
		'pagenum'=>$pagenum,
		'data'=>$row
	];
    echo json_encode($list);
}


?>