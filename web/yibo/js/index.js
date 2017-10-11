$(document).ready(function(){
    var oHeart=document.querySelector('.heart');
    var oCheer=document.querySelector('.cheer');
    var oMusic=document.querySelector('.music');
    var bOk=true;
    var bPlay=true;
    var bSubmit=true;
    oHeart.volume = 1;
    
    //智能机浏览器版本信息:
     
    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {//移动终端浏览器版本信息
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    if (browser.versions.android) {
       
    }
    var json={};
    var oImg=document.querySelector('.long_imgbox');
    var timer=null;
    var oVideo=document.querySelector('.video');
    var oFirstVieo=document.querySelector('.video_first video');
    var oLastVideo=document.querySelector('.film_video video');
    var left=0;
    var distance=0;
    var Flag=true;
    var oInnerBox=document.querySelector('.intro_position');
    var oInner_2Box=document.querySelector('.inner_2');
    var oInner_3Box=document.querySelector('.inner_3');
    var oInner_Box=document.querySelector('.intro_name');
    var oInner="场上位置：前锋";
    var oInner_2="参加国家队比赛场次：44";
    var oInner_3="俱乐部：大连权健";
    var oInner_name="王 霜";
    var innerindex=0;
    var inner2index=0;
    var inner3index=0;
    var oNameindex=0;
    var show_time=null;
    var innerTimer=null;
    var innerTimer2=null;
    var innerTimer3=null;
	function DeviceOrientationHandler(event)
    {
        var alpha = event.alpha;
        var beta = event.beta;
        var gamma = event.gamma;
        if(alpha != null || beta != null || gamma != null){
            if(beta<-100||beta>100)return;
            if(beta<1&&beta>-1)return;
            if(Flag)
            {
                oImg.style.WebkitTransform='translate3d(-4.8rem,0,0)';
            }
            if( beta>0)
            {
                left=(20*beta)/rem+distance;
                if(left>4.8)
                {
                    left=4.8;
                }
                oImg.style.WebkitTransform='translate3d('+left+'rem,0,0)';
            }
            else
            {
                left=(20*beta)/rem+distance;
                if(left<(document.documentElement.clientWidth-oImg.offsetWidth)/rem+4.8)
                {
                    left=(document.documentElement.clientWidth-oImg.offsetWidth)/rem+4.8;
                }
                oImg.style.WebkitTransform='translate3d('+left+'rem,0,0)';
            }
            if(left>=3)
            {
            	setTimeout(function(){
	                show_time=setInterval(function(){
	                    oInner_Box.innerHTML+=oInner_name.charAt(oNameindex);
	                    oNameindex++;
	                    if(oNameindex==oInner_name.length)
	                    {
	                        clearInterval(show_time);
	                        return;
	                    }
	                },30);
                },500);
            	setTimeout(function(){
	                innerTimer=setInterval(function(){
	                    oInnerBox.innerHTML+=oInner.charAt(innerindex);
	                    innerindex++;
	                    if(innerindex==oInner.length)
	                    {
	                        clearInterval(innerTimer);
	                        return;
	                    }
	                },30);
                },600);
                setTimeout(function(){
                	innerTimer2=setInterval(function(){
	                	oInner_2Box.innerHTML+=oInner_2.charAt(inner2index);
	                    inner2index++;
	                    if(inner2index==oInner_2.length)
	                    {
	                        clearInterval(innerTimer2);
	                        return;
	                    }
                    },30);
                },810);
                setTimeout(function(){
                	innerTimer3=setInterval(function(){
	                	oInner_3Box.innerHTML+=oInner_3.charAt(inner3index);
	                    inner3index++;
	                    if(inner3index==oInner_3.length)
	                    {
	                        clearInterval(innerTimer3);
	                        return;
	                    }
                    },30);
                },960);
                setTimeout(function(){
                    $('.intro_wang').hide();
                    $('.against').show();
                    $('.notice_icon').show();
                },3000);
            }
        }
        else
        {
            //alert("当前浏览器不支持DeviceOrientation");
        }
    }
    //手动滑动
    oImg.addEventListener('touchstart',function(ev)
    {
        //点击播放视频
        var oSrc=ev.srcElement||ev.target;
        if(oSrc.tagName=='I')
        {
            window.removeEventListener('deviceorientation',DeviceOrientationHandler,false);
            $('.imgbox').hide();
            $('.video_box').css({'visibility':'visible'});
            oVideo.play();
            oHeart.pause();
            oMusic.pause();
        }
        clearTimeout(timer);
        var disX=ev.targetTouches[0].pageX/rem-left;
        function fnMove(ev)
        {
            left=ev.targetTouches[0].pageX/rem-disX;
            if(left>4.8)left=4.8;
            if(left<(document.documentElement.clientWidth-oImg.offsetWidth)/rem+4.8)
            {
                left=(document.documentElement.clientWidth-oImg.offsetWidth)/rem+4.8;
            }
            oImg.style.WebkitTransform='translate3d('+left+'rem,0,0)';
        }
        function fnEnd()
        {
            oImg.removeEventListener('touchmove',fnMove,false);
            oImg.removeEventListener('touchend',fnEnd,false);
            if(left>=3)
            {
            	setTimeout(function(){
	                show_time=setInterval(function(){
	                    oInner_Box.innerHTML+=oInner_name.charAt(oNameindex);
	                    oNameindex++;
	                    if(oNameindex==oInner_name.length)
	                    {
	                        clearInterval(show_time);
	                        return;
	                    }
	                },30);
                },500);
            	setTimeout(function(){
	                innerTimer=setInterval(function(){
	                    oInnerBox.innerHTML+=oInner.charAt(innerindex);
	                    innerindex++;
	                    if(innerindex==oInner.length)
	                    {
	                        clearInterval(innerTimer);
	                        return;
	                    }
	                },30);
                },600);
                setTimeout(function(){
                	innerTimer2=setInterval(function(){
	                	oInner_2Box.innerHTML+=oInner_2.charAt(inner2index);
	                    inner2index++;
	                    if(inner2index==oInner_2.length)
	                    {
	                        clearInterval(innerTimer2);
	                        return;
	                    }
                    },30);
                },810);
                setTimeout(function(){
                	innerTimer3=setInterval(function(){
	                	oInner_3Box.innerHTML+=oInner_3.charAt(inner3index);
	                    inner3index++;
	                    if(inner3index==oInner_3.length)
	                    {
	                        clearInterval(innerTimer3);
	                        return;
	                    }
                    },30);
                },960);
                setTimeout(function(){
                    $('.intro_wang').hide();
                    $('.against').show();
                    $('.notice_icon').show();
                },3000);
            }
            oImg.style.WebkitTransform='translate3d('+left+'rem,0,0)';
            timer=setTimeout(function(){
                if(window.DeviceOrientationEvent){
                    window.addEventListener('deviceorientation',DeviceOrientationHandler,false);
                }
            },1000);
            distance=left-0.15;
        }
        oImg.addEventListener('touchmove',fnMove,false);
        oImg.addEventListener('touchend',fnEnd,false);
        window.removeEventListener('deviceorientation',DeviceOrientationHandler,false);
        ev.preventDefault();
    },false);
    //横屏体验
    ;(function(){
        var browser=
            { 
                versions:function()
                { 
                    var u = navigator.userAgent;
                    var app = navigator.appVersion; 
                    return{//移动终端浏览器版本信息 
                        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
                        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1   //android终端或者uc浏览器 
                    }; 
                }(), 
                language:(navigator.browserLanguage || navigator.language).toLowerCase()
            };
            if(browser.versions.ios)
            {
                window_resize_orientation();
                $(window).on('resize',function(){
                    window_resize_orientation();
                });
            } 
            else
            {
                window_orientation();
                $(window).on('resize',function(){
                    window_orientation();
                });
            }
        //横屏提示
        function window_resize_orientation(e)
        {
            if($(window).width()>$(window).height())
            {
                orientationHandler('landscape');
            }
            else
            {
                orientationHandler('portrait');
            }
        }

        function window_orientation(e) 
        {
            if (window.orientation == 90 || window.orientation == -90) 
            {
                orientationHandler('landscape');
            }
            else if (window.orientation == 0 || window.orientation == 180) 
            {
                orientationHandler('portrait');
            }
        }
        
        function orientationHandler(orientation){
            //横屏 翻转提示浮层隐藏
            if (orientation=='landscape')
            {
                $('.turn_pos').removeClass('active');
                if(bPlay)
                {
                    oFirstVieo.play();
                    oMusic.play();
                }
            }
            else if (orientation=='portrait')
            {
                $('.turn_pos').addClass('active');
            }
        }
    })();
    //视频结束
    oVideo.onended=function(){
        $('.video_box').hide();
        $('.last_content').show();
        oCheer.play();
        //btns_bg
        var images=0;
        setInterval(function(){
            images++;
            if(images>23)
            {
                images=1;
            }
            $('.film_btn img').attr({'src':'images/png/'+images+'.png'});
            $('.gift_btn img').attr({'src':'images/png/'+images+'.png'});
        },100);
    };
    oFirstVieo.onended=function()
    {
        bPlay=false;
        $('.imgbox').show();
        $('.video_first').hide();
        oHeart.play();
        if(window.DeviceOrientationEvent){
            window.addEventListener('deviceorientation',DeviceOrientationHandler,false);
        }else{
            //alert("您的浏览器不支持DeviceOrientation");
        }
    };
    //观看视频
    $('.film_btn').click(function(){
        $('.last_content').addClass('active');
        $('.film_box').show();
    });
    $('.film_box .close').click(function(){
        $('.last_content').removeClass('active');
        $('.film_box').hide();
        $('.film_playbtn').show();
        oLastVideo.pause();
        oLastVideo.currentTime=0;
        oCheer.play();
    });
    $('.film_playbtn').click(function(){
        oLastVideo.play();
        oCheer.pause();
        $('.film_playbtn').hide();
    });
    oLastVideo.onended=function()
    {
        oLastVideo.currentTime=0;
        $('.film_playbtn').show();
    };
    //申领限量礼品
    $('.gift_btn').click(function(){
        $('.last_content').addClass('active');
        $('.gift_box').show();
    });
    $('.gift_box .close').click(function(){
        $('.last_content').removeClass('active');
        $('.gift_box').hide();
    });
    $('.form_name span').click(function(){
        $('.form_name input').focus();
        $('.form_name span').hide();
    });
    $('.form_phone span').click(function(){
        $('.form_phone input').focus();
        $('.form_phone span').hide();
    });
    //姓名
    $('.form_name input').blur(function(){
        if(!$(this).val())
        {
            $('.form_name span').show();
        }
        else
        {
            json.name=$('.form_name input').val();
        }
    });
    //电话
    $('.form_phone input').blur(function(){
        var re=/^1[34578][0-9]{9}$/;
        if(!$(this).val())
        {
            $('.form_phone span').show();
        }
        else if(re.test($(this).val()))
        {
            json.phone=$('.form_phone input').val();
        }
    });

    //经销商：
        var $province     =  $("#province"),
            $city             =  $("#city"),
            $dealer             =  $("#dealer");
        var phtml = "<option value=''>省份</option>";
            $.each( global_data, function(i,n){
                phtml += '<option value="'+i+'">'+i+'</option>';
            });
            $province.html(phtml);
            $city.html("<option value=''>城市</option>");
            $dealer.html("<option value=''>经销商</option>");
        $province.on("change",function(){
            var p         = $(this).val();
            var chtml = '<option value="">城市</option>';
            if(p != ''){
                $.each( global_data[p], function(i, n){
                    chtml += '<option value="'+i+'">'+i+'</option>';
                });
            }
            json.province=$("#province").val();
            $city.html(chtml); 
            $dealer.html("<option value=''>经销商</option>");
        });
        $city.on("change",function(){
            var p = $province.val();
            var c         = $(this).val();
            var dhtml = '<option value="">经销商</option>';
            if(c != ''){
                $.each( global_data[p][c], function(i, n){
                    dhtml += '<option value="'+n.name+'">'+n.name+'</option>';
                });
            }
            json.city=$("#city").val()
            $dealer.html(dhtml);
        });

    var $_GET = (function(){
        var url = window.document.location.href.toString();
        var u = url.split("?");
        if(typeof(u[1]) == "string"){
            u = u[1].split("&");
            var get = {};
            for(var i in u){
                var j = u[i].split("=");
                get[j[0]] = j[1];
            }
            return get;
        } else {
            return '';
        }
    })();
    function setcookie(name,value){  
        var Days = 1;  
        var exp  = new Date();  
        exp.setTime(exp.getTime() + Days*24*60*60*1000);  
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";  
    } 
    if($_GET['utm_source'] != undefined) {
        setcookie('utm_source',$_GET['utm_source']);
    }
    if($_GET['utm_medium'] != undefined) {
        setcookie('utm_medium',$_GET['utm_medium']);
    }
    if($_GET['utm_campaign'] != undefined) {
        setcookie('utm_campaign',$_GET['utm_campaign']);
    }
    if($_GET['utm_content'] != undefined) {
        setcookie('utm_content',$_GET['utm_content']);
    }

    /*获取cookie并传值*/
    var cookieArr = document.cookie.replace(/[ ]/g, "").split(";");
    var utm_source = '';
    var utm_medium = '';
    var utm_campaign = '';
    var utm_content = '';

    if (cookieArr.length > 0) {
        for (var i in cookieArr) {
            if (cookieArr[i].split("=")[0] == 'fromconfig') {
                fromconfig = cookieArr[i].split("=")[1];
            }
            if (cookieArr[i].split("=")[0] == 'utm_source') {
                utm_source = cookieArr[i].split("=")[1];
            }
            if (cookieArr[i].split("=")[0] == 'utm_medium') {
                utm_medium = cookieArr[i].split("=")[1];
            }
            if (cookieArr[i].split("=")[0] == 'utm_campaign') {
                utm_campaign = cookieArr[i].split("=")[1];
            }
            if (cookieArr[i].split("=")[0] == 'utm_content') {
                utm_content = cookieArr[i].split("=")[1];
            }
        }
    }

    
        $('.submit_btn').click(function(){
            if(!json.name)
            {
                alert('请填写姓名！')
                return;
            }
            if(!json.phone)
            {
                alert('请填写电话！')
                return;
            }
            if(!$("#province option:checked").text())
            {
                alert('请选择省份！')
                return;
            }
            if(!$("#city option:checked").text())
            {
                alert('请选择城市！')
                return;
            }
            else
            {
                if(bSubmit)
                {
                    bSubmit=false;
                    $.ajax({
                        url:"https://www.cafsecure.ford.com.cn/fode_apply_data/index.php/api/http_json",
                        dataType: "jsonp",
                        type : "GET",
                        data: {
                            name:json.name,
                            mobile:json.phone, 
                            province:json.province,
                            city:json.city, 
                            //dealerName:$("#dealer option:checked").text(),
                            //buyCarTime:预计购车时间,
                            curl_num:105,  //进无止境 放手一搏PC-103, 进无止境 放手一搏WAP-104 //翼搏为女足加油H5-105
                            toform:document.referrer,
                            utm_source:utm_source,
                            utm_medium:utm_medium,
                            utm_campaign:utm_campaign,
                            utm_content:utm_content
                        },
                        success: function(res) {
                            if(res.result == 1){
                                //提交成功
                                try{ga('send', 'event', 'Button', 'Click', 'TD_ChinaFootball');}catch(e){};
                                alert('提交成功！');
                                json={};
                                $('.gift_box').hide();
                                $('.last_content').removeClass('active');
                                document.querySelector('form').reset();
                                $('.form_name span').show();
                                $('.form_phone span').show();           
                            }else{
                                //提交失败
                                alert(res.msg);//输出错误原因
                            }
                            bSubmit=true;
                        }
                    });
                }
            }
        });
    

    //分享
    $.ajax({
      url: 'http://shwj.allyes.com/public_share/weixin/weixinAPI.php',
      type: 'get',
      dataType: 'jsonp',
      success: function (data) {
        wx.config({
          debug: false,
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });

        /*微信分享*/
        wx.ready(function () {
            wx.onMenuShareAppMessage({
                title: '铿锵玫瑰晋级八强！为中国女足加油！',
                desc: "距离不是问题，心与中国姑娘一起，里约放手一搏！Let's Go！",//http://m.ecosport.ford.com.cn/china-football/
                link: "http://m.ecosport.ford.com.cn/china-football/",//
                imgUrl: 'http://m.ecosport.ford.com.cn/china-football/images/icon.jpg',
                trigger: function (res) {
                    //alert('用户点击发送给朋友');
                },
                success: function (res) {
                    //alert('已分享成功');
                    //checkShare(key);
                },
                cancel: function (res) {
                    //alert('已取消');
                },
                fail: function (res) {
                    // alert(JSON.stringify(res));
                }
            });

            wx.onMenuShareTimeline({
                title: '铿锵玫瑰晋级八强！为中国女足加油！',
                link: "http://m.ecosport.ford.com.cn/china-football/",
                imgUrl: 'http://m.ecosport.ford.com.cn/china-football/images/icon.jpg',
                trigger: function (res) {
                    // alert('用户点击分享到朋友圈');
                },
                success: function (res) {
                    //alert('已分享成功');
                    //checkShare(key);
                },
                cancel: function (res) {
                    //alert('已取消分享');
                },
                fail: function (res) {
                    //alert(JSON.stringify(res));
                }
            });
        });
      }
    });






});