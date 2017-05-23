<?php
// if ((($_FILES["file"]["type"] == "image/png")
// || ($_FILES["file"]["type"] == "image/jpeg")
// || ($_FILES["file"]["type"] == "image/pjpeg"))
// && ($_FILES["file"]["size"] < 20000))
//   {
  if ($_FILES["file"]["error"] > 0){
    $status = $_FILES["file"]["error"];
  }else{
    $name = $_FILES["file"]["name"];
    $type = $_FILES["file"]["type"];
    // echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
    // echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br />";

    if (file_exists("upload/" . $_FILES["file"]["name"])){
      $status =  10001;//10001表示文件已经存在
    }else{
      $status = 0;//0表示成功上传
      move_uploaded_file($_FILES["file"]["tmp_name"],
      "upload/" . $_FILES["file"]["name"]);
      $url = "data/upload/" . $_FILES["file"]["name"];
    }
  }
  if($status == 0){
    $list = [
      'name'=>$name,
      'type'=>$type,
      'status'=>$status,
      'url'=>$url
    ];
  }else{
    $list = [
      'status'=> $status
    ];
  }
    echo json_encode($list);
//   }
// else
//   {
//   echo "Invalid file";
//   }
?>