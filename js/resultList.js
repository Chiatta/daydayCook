/**
 * Created by thinkpad on 2017/1/12.
 */

/***********************************login ul点击出现、消失********************************************/
$('#loginDDLHover').on('click',function () {
  if($('#loginDDL').css('display')=='block'){
    $('.icon-up-dir').css('display','none');
    $('#loginDDL').css('display','none');
  }else{
    $('#loginDDL').css('display','block');
    $('.icon-up-dir').css('display','block');
  }
});
$('#loginDDL').on('click',function(){
    $('.icon-up-dir').css('display','none');
    $('#loginDDL').css('display','none');
})
/**********************************login 鼠标悬浮变色*********************************************/
$('#login>i.icon-user').hover(function () {
  $(this).addClass('loginHover');
},function () {
  $(this).removeClass('loginHover');
});
/**********************************login ul 选中的li成为显示的值*********************************************/
$('#loginDDL').on('click','li a',function(e){
    $target = $(e.target);
    $('#loginDDLHover').html($target.html()+'<i style="font-size: 6px;margin:0 5px;" class="demo-icon icon-down-dir"></i>');
});




//hover font-color change
$("#footer ul li a").hover(function () {
  $(this).addClass('hover');
},function () {
  $(this).removeClass('hover');
});

$(function(){
    if($.cookie("userName")){
        var html = `
            <span>欢迎您，${$.cookie("userName")}</span>
          `;
        $("#login>p").html(html);
     }else{
        var html = `
            <span>您还没有登录</span>
          `;
        $("#login>p").html(html);
     }
    console.log(' loading');


    //kindName selected show in inputBox
    var name = decodeURI(this.location.href.split("?")[1].split("=")[0]);
    var kindName = decodeURI(this.location.href.split("?")[1].split("=")[1]);
      $(".searchBox input").val(kindName);
    currentPage=1;
    num=999999;
    if(name == "kindName"){
      $.ajax({
          url:"data/searchByKind.php?kindName="+kindName+'&page='+currentPage+'&num='+num,
          success:function(data)
          {            var html="";
              pages=data.pagenum;
              $.each(data.data,function(i,p)
              {
                                      // <img src="${p.foodImg}"> todo
                  html+=`<div class="box lf">
                              <a href="./detail.html?id=${p.foodID}">
                                  <span class="img">
                                      <img src="${p.foodImg}">
                                      <div class="foodInfo">
                                          <span class="demo-icon icon-clock"> &#xe803; </span><span class="number">${p.foodTime}</span>
                                          <span class="demo-icon icon-eye"> &#xe804; </span><span class="number">${p.foodLooked}</span>
                                      </div>
                                  </span>
                                  <span class="title">${p.foodName}</span>
                              </a>
                          </div>`;
              });
              $('#foodResult').html(html);
          }
      });
    }else{
      $.ajax({
          url:"data/searchByFoodName.php?foodName="+kindName+'&page='+currentPage+'&num='+num,
          success:function(data)
          {            var html="";
              pages=data.pagenum;
              $.each(data.data,function(i,p)
              {
                                      // <img src="${p.foodImg}"> todo
                  html+=`<div class="box lf">
                              <a href="./detail.html?id=${p.foodID}">
                                  <span class="img">
                                      <img src="${p.foodImg}">
                                      <div class="foodInfo">
                                          <span class="demo-icon icon-clock"> &#xe803; </span><span class="number">${p.foodTime}</span>
                                          <span class="demo-icon icon-eye"> &#xe804; </span><span class="number">${p.foodLooked}</span>
                                      </div>
                                  </span>
                                  <span class="title">${p.foodName}</span>
                              </a>
                          </div>`;
              });
              $('#foodResult').html(html);
          }
      });
    }
    // $("#pagePre").on("click",function(){
    //   if(currentPage==1){
    //     $(".pageErr").html("当前已是第一页");
    //   }else{
    //     $(".pageErr").html("");
    //     currentPage=currentPage-1;
    //   }
    // });
    // $("#pageNext").on("click",function(){
    //   if(currentPage==pages){
    //     $(".pageErr").html("当前已是最后一页");
    //   }else{
    //     $(".pageErr").html("");
    //     currentPage=currentPage+1;
    //   }
    // });

    $(".searchBox button").on("click",function(){
      var input = $(".searchBox input").val();
      $.ajax({
        url:"data/searchByFoodName.php?foodName="+input+'&page='+currentPage+'&num='+num,
        success:function(data)
        {           
          pages=data.pagenum;
            var html="";
            $.each(data.data,function(i,p)
            {
                                    // <img src="${p.foodImg}"> todo
                html+=`<div class="box lf">
                            <a href="./detail.html?id=${p.foodID}">
                                <span class="img">
                                    <img src="${p.foodImg}">
                                    <div class="foodInfo">
                                        <span class="demo-icon icon-clock"> &#xe803; </span><span class="number">${p.foodTime}</span>
                                        <span class="demo-icon icon-eye"> &#xe804; </span><span class="number">${p.foodLooked}</span>
                                    </div>
                                </span>
                                <span class="title">${p.foodName}</span>
                            </a>
                        </div>`;
            });
            $('#foodResult').html(html);
        }
    });
    });
    //login  box
    $("#loginBtn").on("click",function (){
        console.log("i am clicked");
        $(".alertBox").removeClass('hidden');
    });
    $(".closeBtn").on("click",function (){
        $(".alertBox").addClass('hidden');
    });
    $("#jumpToReg").on("click",function (){
        $(".login").addClass('hidden');
        $(".register").removeClass('hidden');
    });
    $("#jumpToLogin").on("click",function (){
        $(".register").addClass('hidden');
        $(".login").removeClass('hidden');
    });
    $("#loginSubmit").on("click",function (){
        var name,pwd;
       name = $("#nameLogin").val();
       pwd = $("#pwdLogin").val(); 
        $.post(
            "data/login.php",
            {name:name,pwd:pwd},
            function(data){
                console.log(data);
                if(data[0] == "msg"){
                  $(".alertBox_body .errInfo").html(data[1]);
                }else{
                  if(data){
                      $(".alertBox").addClass('hidden');
                      $.cookie("userName",name,{path:'/',expires:1});
                      $.cookie("pwd",pwd,{path:'/',expires:1});
                      $.cookie("userId",data.userID,{path:'/',expires:1});
                    
                  }
                  $("#nameLogin").val("");
                  $("#pwdLogin").val("");
                  var html = `
                      <span>欢迎您，${$.cookie("userName")}</span>
                  `;
                  $("#login>p").html(html);
                  $(".alertBox_body .errInfo").html('');
                }
        }); 
    });

    
    $("#regSubmit").on("click",function (){
        var nameReg,pwdReg;
       nameReg = $("#nameReg").val();
       pwdReg = $("#pwdReg").val(); 
       if(nameReg == "" || pwdReg == ""){
        $(".errInfo").html("用户名、密码不能为空");
       }else if(nameReg.length>10 || nameReg.length<2){
          $(".errInfo").html("用户名需2-10个字符");
        }else if(pwdReg.length>16 || pwdReg.length<6){
          $(".errInfo").html("密码需6-16个字符");
        }else{
           $.post(
            "data/register.php",
            {name:nameReg,pwd:pwdReg},
            function(data){
                console.log("请求成功");
                console.log(data);
                if(data){
                  $(".alertBox").addClass('hidden');
                  $.cookie("userName",nameReg,{path:'/',expires:1});
                  $.cookie("pwd",pwdReg,{path:'/',expires:1});
                  $.cookie("userId",data.userID,{path:'/',expires:1});
                  $("#nameReg").val("");
                  $("#pwdReg").val("");  
                  var html = `
                    <span>欢迎您，${$.cookie("userName")}</span>
                  `;
                  $("#login>p").html(html);
                }
           }); 
        }
     });


});

