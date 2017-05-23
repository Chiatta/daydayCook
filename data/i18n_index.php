<?php
/**根据客户端的首选语言，输出不同形式不同语言的欢迎消息**/
header('Content-Type: application/json;charset=UTF-8');

//定义输出的变量
@$output = [
    loginUl =>'',
    searchTxt => '',
    searchKind => '',
    footer =>''
];

//读取客户端提交的所有的请求头
$list = getallheaders();

//读取客户端的可以接收的语言
$lang = $list['Accept-Language'];

//读取语言列表中的首选语言——最开头的两个字母
$first = substr($lang, 0, 2);
//连接数据库
$conn = mysqli_connect('127.0.0.1','root','','ddcook');
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

if($first=='zh'){	//客户端首选中文

    $output['loginUl'] = ['中国大陆','香港','台湾','澳门','其它'];
    $output['searchTxt'] = '食材/食谱';
    $output['footer'] = ['香港官网','关于我们','联系我们','隐私条款','使用条款'];

    //读取中文kindName
    $sql = "SELECT kindName FROM food group by kindName";
    $result = mysqli_query($conn,$sql);
}else {	//客户端首选其他语言

    $output['loginUl'] = ['Mainland','Hong Kong','Taiwan','Macau','Other'];
    $output['searchTxt'] = 'Ingredients / Recipes';
    $output['footer'] = [' Hong Kong Website','About Us','Contact Us','Privacy Policy','Terms of Use'];

    //读取英文kindName
    $sql = "SELECT kindNameEng FROM food group by kindNameEng";
    $result = mysqli_query($conn,$sql);
}

//kindName读取结果
$row = mysqli_fetch_all($result);

//kindName 读取
//var_dump($output['searchKind'][0][0]);

if(empty($row))
{
    echo '[]';
}
else
{
    $output['searchKind']=$row;
//var_dump($output['searchKind']);
    echo json_encode($output);
}