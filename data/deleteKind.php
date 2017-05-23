<?php
//首先设置请求头中的内容类型，将其格式定为json格式，保证前端能够获取到一个json格式的数据。
header('Content-Type:application/json');
//建立'127.0.0.1'地址下'ddcook'数据库进行连接，用户名为‘root’，密码为空
$conn = mysqli_connect('127.0.0.1','root','','ddcook');
// 读取前端发来的参数foodId并将其保存在变量$foodId中。
$kindId = $_REQUEST["kindId"];
$sql = "SET NAMES UTF8";
// 在连接下，运行sql语句
mysqli_query($conn,$sql);

$sql = "delete FROM kind where kindID='$kindId'";
mysqli_query($conn,$sql);
//使用empty()方法对$row变量进行判断，如果查询结果为空，那么返回一个空的数组给前端；否则将$row变量用json_encode ()方法进行编码，将其解析成就是格式，并返回给前端。
if(empty($row))
{
    echo '[]';
}
else
{
    echo json_encode($row);
}
?>