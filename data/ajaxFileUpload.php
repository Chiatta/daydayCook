<?php
  // 上传失败  错误未知
  if ($_FILES["file"]["error"] > 0){
    $status = $_FILES["file"]["error"];
  }else{
    // 得到文件名称、类型
    $name = $_FILES["file"]["name"];
    $type = $_FILES["file"]["type"];
    // 文件已存在
    if (file_exists("upload/" . $_FILES["file"]["name"])){
      $status =  10001;//10001表示文件已经存在
    }else{
      // 上传成功
      $status = 0;//0表示成功上传
      // 删除tmp文件
      move_uploaded_file($_FILES["file"]["tmp_name"],
      "upload/" . $_FILES["file"]["name"]);
      // 得到文件存储位置
      $url = "data/upload/" . $_FILES["file"]["name"];
    }
  }
  // 封装返回数据对象
  if($status == 0){
    $list = [
      'name'=>$name,
      'type'=>$type,
      'statusCode'=>$status,
      'url'=>$url
    ];
  }else{
    $list = [
      'statusCode'=> $status
    ];
  }
  // 将数据对象转化为json格式返回
  echo json_encode($list);
?>