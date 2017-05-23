
<?php
header('Content-Type:application/json');

$conn = mysqli_connect('127.0.0.1','root','','ddcook');

$foodId = $_REQUEST["id"];

$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = "SELECT * FROM usercomment,userInfo where usercomment.foodId = '$foodId' and usercomment.userID=userInfo.userID order by usercomment.commentTime desc";
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