$(window).load(function(){
	 	var oHead=document.getElementById('header');
	 	oHead.innerHTML='<div class="logo"><a href="index.html"><img src="images/logo.png" alt="logo" /></a></div>'+
                '<div class="link">'+
                	'<a href="#">网站地图</a>|<a href="#">联系我们</a>'+
                '</div>'+
                '<div class="nav">'+
                    '<ul>'+
                        '<li class="li01"><a href="aboutGCJT.html">GJT赛事<p>Tournament</p></a>'+
                        	'<dl>'+
                                '<dd><a href="aboutGCJT.html">GJT介绍</a></dd>'+
                                '<dd><a href="registration.html">赛事报名</a></dd>'+
                                '<dd><a href="schedule.html">全年赛事计划</a></dd>'+
                                '<dd><a href="news.html" class="yewunav">最新赛事报道</a>'+
                                    '<dl>'+
                                        '<dd><a href="javascript:;">国内赛事</a></dd>'+
                                        '<dd><a href="javascript:;">国外赛事</a></dd>'+
                                    '</dl>'+
                                '</dd>'+  
                                '<dd><a href="games.html">国外合作赛事</a></dd>'+
                            '</dl>'+
                        '</li>'+
                        '<li class="li02"><a href="training.html">培训<p>Training</p></a>'+
                        	'<dl>'+
                                '<dd><a href="training.html">项目介绍</a></dd>'+
                            '</dl>'+
                        '</li>'+
                        '<li class="li03"><a href="sponsorship01.html">GJT赞助<p>Sponsorship</p></a>'+
                            '<dl>'+
                                '<dd><a href="sponsorship01.html">2016赞助方案</a></dd>'+
                                '<dd><a href="sponsorship02.html">赞助流程</a></dd>'+
                                '<dd><a href="sponsorship03.html">赞助合同下载</a></dd>'+
                            '</dl>'+
                        '</li>'+
                        '<li class="li04"><a href="partnership01.html">合作伙伴<p>Partnership</p></a>'+
                        	'<dl>'+
                                '<dd><a href="partnership01.html">指导单位</a></dd>'+
                                '<dd><a href="partnership02.html">国外机构</a></dd>'+
                                '<dd><a href="partnership03.html">合作媒体</a></dd>'+
                                '<dd><a href="partnership04.html">合作球场</a></dd>'+
                                '<dd><a href="partnership05.html">赞助商</a></dd>'+
                            '</dl>'+
                        '</li>'+
                        '<li class="li05"><a href="infomation.html">关于高孚<p>About Us</p></a>'+
                        	'<dl>'+
                                '<dd><a href="infomation.html">高孚简介</a></dd>'+
                                '<dd><a href="business01.html" class="yewunav">业务</a>'+
                                	'<dl>'+
                                        '<dd><a href="business01.html">赛事</a></dd>'+
                                        '<dd><a href="business02.html">培训</a></dd>'+
                                        '<dd><a href="business03.html">赞助</a></dd>'+
                                    '</dl>'+
                                '</dd>'+
                                '<dd><a href="mediacenter.html">公司新闻</a></dd>'+
                                '<dd><a href="contact.html">联系我们</a></dd>'+
                            '</dl>'+
                        '</li>'+
                   '</ul>'+
                '</div>';

    $(".nav ul li").hover(function(){
        $(this).children("dl").toggle();
        //$(this).addClass("navlion").siblings().removeClass("navlion");
    });
    $(".nav ul li dl dd").hover(function(){
        $(this).children("dl").toggle();
        //$(this).addClass("navlion").siblings().removeClass("navlion");
    });

    
    $("#sub_bar ul li > a").click(function() {
        $(this).next("dl").slideToggle();
        //$(this).toggleClass("li_on");
        $(this).addClass("li_on");
        $(this).parent().siblings().children("dl").slideUp();
        $(this).parent().siblings().children("a").removeClass("li_on");
    });


    $(".nav ul li:eq(0)").addClass("li01");
    $(".nav ul li:eq(1)").addClass("li02");
    $(".nav ul li:eq(2)").addClass("li03");
    $(".nav ul li:eq(3)").addClass("li04");
    $(".nav ul li:eq(4)").addClass("li05");
    $(".nav ul li:eq(5)").addClass("li06");
    
    
    $(".statue i:eq(0)").addClass("statueon");
    
    $('.page_list ol li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });


     $(window).scroll(function(){
        var h_num=$(window).scrollTop();
        if(h_num>260){
        $('.sub_left').addClass('fixer');   
        }else{
        $('.sub_left').removeClass('fixer');            
        }           
        });
	 });


