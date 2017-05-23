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



//video control button
$("#detail_video").on("click",function(){
    if(video.paused){
        video.play();
        $("#detail_video img").css("display","none");
    }else{
        video.pause();
        $("#detail_video img").css("display","block");
    }
});


var _self = this;
function jumpToListSearch(param){
    console.log("jumpToList:param:"+param);
    var url = "./resultList.html?searchName=";
    var searchName = param;
    window.open(encodeURI(url+searchName));
}

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
    var id = decodeURI(this.location.href.split("?")[1].split("=")[1]);

    $.ajax({
        url:"data/searchAllInfoByFoodID.php?id="+id,
        success:function(data)
        {
            var html="";
            html = `<video src="${data.foodVideo}" controls width="100%" id="video"></video>
                    <img src="img/playBtn.png" class="playBtn">`;
            $("#detail_video").html(html);

            html = `
            <div class="title">${data.foodName}</div>
            <div class="time">${new Date(parseInt(data.foodLoadtime) * 1000).toLocaleString()}</div>
            <div class="look"><i class="demo-icon icon-eye">&#xe804;</i>${data.foodLooked}</div>
            <div class="des">${data.foodIntro}</div>
            <div class="useTime"><i class="demo-icon icon-clock">&#xe803;</i>烹饪时间${data.foodTime}</div>`;
             $('.detail_foodInfo_name').html(html);

            var foodStep = data.foodStep;
            var stepsArr = foodStep.split(/；/);
            // var stepsArrLength = stepsArr.length;
            // var step = [];
            // for(var i=0;i<stepsArrLength;i++){
            //     var stepArr = stepsArr[i].split(/,/);
            //     step.push(stepArr);
            // }
            html = '';
            $.each(stepsArr,function(i,p){
             html += `
                <div class="list">
                    <div class="img box">
                        <img src="stepImg/step${i+1}.png" class="lf">
                    </div>
                    <div class="info box rt">
                        <span class="stepNo">STEP.${i+1}</span>
                        <p>${p}</p>
                    </div>
                </div>
             `;
            });
            $(".stepList").html(html);

            var material = [];
            var foodMaterial = data.foodMaterial;
            var materialsArr = foodMaterial.split(/；/);
            var materialsArrLength = materialsArr.length;
            for(var i=0;i<materialsArrLength;i++){
                var stepArr = materialsArr[i].split(/，/);
                material.push(stepArr);
            }
            html = '';
            $.each(material,function(i,p){
             html += `
                        <tr>
                            <td>${p[0]}</td>
                            <td>${p[1]}</td>
                        </tr>
             `;
            });
            $(".table table tbody").html(html);
        }
    });

    $.ajax({
          url:"data/suggestFood.php?foodId="+id,
          success:function(data)
          {
              console.log(data);
              var html=`<div class="tip"><p>当红人气菜</p></div>`;
              $.each(data,function(i,p)
              {
                  html+=`<div class="list">
                    <div class="list_img clear">
                        <a href="./managerDetail.html?id=${p.foodID}">
                            <img src="${p.foodImg}">
                        </a>
                    </div>
                    <div class="list_info">
                        <p class="title">${p.foodName}</p>
                        <p>${p.foodIntro}</p>
                        <p><i class="demo-icon icon-eye">&#xe804;</i>${p.foodLooked}</p>
                    </div>
                </div>`;
              });
              $('#detail_video_suggestion').html(html);
          }
    });
    
  $(".searchBox button").on("click",function(){
      var input = $(".searchBox input").val();
      _self.jumpToListSearch(input);
  }); 

    $.ajax({
        url:"data/commentsByFoodID.php?id="+id,
        success:function(data){
            console.log(data);
            var html = ``;
            $.each(data,function(i,p){
                html += `
                    <div class="commentList">
                       
                        <div class="name">
                            ${p.userName}
                        </div>
                        <div class="info">
                            <p>${p.contents}</p>
                            <div class="time">
                                ${new Date(parseInt(p.commentTime) * 1000).toLocaleString()}
                            </div>
                        </div>
                    </div>
                `;
            });
            $('.comments').html(html);
        }
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
    //comment
    // 用户在输入评论后，点击评论按钮触发该方法。
    $(".talkSubmit .commit").on("click",function(){
      // 判断评论框中是否为空，如果为空跳出方法不执行评论操作，如果不为空进行接下来的操作。
        if($(".talkBox textarea").val()){
          // 保存评论框中的字符，并赋给变量commentContent。
            var commentContent = $(".talkBox textarea").val();
            // 如果浏览器cookie中存在userId，即用户成功登录后，如果用户没有登录，弹出你还没有登录的提示信息
            if($.cookie("userId")){
              // 发起ajax请求，该请求是为了在评论表中插入该用户的评论信息
                $.ajax({
                  // 请求路径，进行拼接，传递该php文件所需参数。
                    url:"data/comment.php?foodID="+id+"&userId="+$.cookie("userId")+"&contents="+commentContent,
                    success:function(data){
                      // 发表了的请求成功后，再发起查询评论的请求，用该菜谱的id作为参数调用相应php文件。
                        $.ajax({
                            url:"data/commentsByFoodID.php?id="+id,
                            success:function(data){
                              // 进行html拼接，将该菜谱的评论信息都展示出来，最新插入的在最前面做展示
                                var html = ``;
                                $.each(data,function(i,p){
                                    html += `
                                        <div class="commentList">
                                            <div class="name">
                                                ${p.userName}
                                            </div>
                                            <div class="info">
                                                <p>${p.contents}</p>
                                                <div class="time">
                                                    ${new Date(parseInt(p.commentTime) * 1000).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                });
                                // 将html做标签内容展示在页面上，并将评论框清空。
                                $('.comments').html(html);
                                $(".talkBox textarea").val("");
                            }
                        });
                    }
                }); 
            }else{
              alert("您还没有登录");
            }
        }
        else{
            return;
        }
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

