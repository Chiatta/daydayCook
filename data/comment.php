<?php
header('Content-Type:application/json');

$conn = mysqli_connect('127.0.0.1','root','','ddcook');

$userId = $_REQUEST["userId"];
$contents = $_REQUEST["contents"];
$commentTime = strtotime(date("y-m-d h:i:s"));
$foodID = $_REQUEST["foodID"];
$rank = $_REQUEST["rank"];

$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = "insert into usercomment (userID,contents,commentTime,foodID,rank)
		values('$userId','$contents','$commentTime','$foodID','$rank')";
mysqli_query($conn,$sql);
$id = mysqli_insert_id($conn);
$sql = "select * from usercomment";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_all($result,MYSQLI_ASSOC);

$sql = "select count(rank) as total from usercomment where foodID = '$foodID'";
$result = mysqli_query($conn,$sql);
$total = substr(json_encode(mysqli_fetch_all($result,MYSQLI_ASSOC)),11); //查询数据的总数total
$total = intval(substr($total,0,-3));

$sql = "select sum(rank) from usercomment where foodID = '$foodID'";
$result = mysqli_query($conn,$sql);
$totalRank = substr(json_encode(mysqli_fetch_all($result,MYSQLI_ASSOC)),15);
$totalRank = intval(substr($totalRank,0,-3));

$rankNew = $totalRank/$total;      //获得新的分数

$sql = "select foodLooked from food where foodID = '$foodID'";
$foodLooked = mysqli_fetch_all(mysqli_query($conn,$sql))[0];
$foodLooked = intval($foodLooked[0]);
$foodTotalRank = $rankNew*0.7 + $foodLooked*0.3;
$sql = "UPDATE food SET foodRank = $rankNew WHERE foodID = '$foodID'";
mysqli_query($conn,$sql);
$sql = "UPDATE food SET totalRank = $foodTotalRank WHERE foodID = '$foodID'";
mysqli_query($conn,$sql);

if(empty($row))
{
    echo '[]';
}
else
{
    echo json_encode($row);
}

?>