$(function(){
/*吸顶部分*/
    var $startTop = $('.head_foot').offset().top;
    $(window).bind('scroll',function(){
        if($(window).scrollTop() >= $startTop){
            $('#head .space1').css('display','block');
            $(".head_foot").css({position:'fixed',zIndex:'100',top: '0',background:'#000'});
            $(".head_foot_con a").css({color:'#fff'})
            $(".head_foot_con a div").css({display:'block',background:'url(images/space_03.png)'})
        }else {
            $(".head_foot_con a div").css({display:'none'});
            $('#head .space1').css('display','none');
            $(".head_foot").css({position:'static',background:'#fff'});
            $(".head_foot_con a").css({color:'#000'});
            $(".head_foot_con a div").css({display:'none',background:'url(images/space_02.png)'})
        };
    });
/*IT技术服务*/
    $('.main_4 li').hover(function(){
        var i=$('.main_4 li').index(this);
        $('.main_4 li').eq(i).css({background:'#000',color:'#fff'});
        $('.main_4 li').eq(i).find('div').show(200);
        $('.main_4 li').eq(i).find('img').attr('src','images/main_4_1_'+i+'.jpg');
    },function(){
        var i=$('.main_4 li').index(this);
        $('.main_4 li').eq(i).find('div').stop().hide(200);
        $('.main_4 li').eq(i).find('img').attr('src','images/main_4_2_'+i+'.jpg');
        $('.main_4 li').eq(i).css({background:'',color:'#000'});
    });
/*IT解决方案*/
    $('.main_3 li').hover(function(){
        var i=$('.main_3 li').index(this);
        $('.main_3 li').eq(i).find('img').attr('src','images/main_03_1_'+(i+1)+'.jpg');
        $('.main_3 li').eq(i).css({background:'#003791',color:'#fff'});
        if (i==0||i==1||i==4||i==5||i==8||i==9) {
            // $('.main_3 li').eq(i).find('div').animate({left:'220px'},200);
            $('.main_3 li').eq(i).find('div').show(200);
            $('.main_3 li').eq(i).css({borderRadius:'8px 0 0 8px'});
        }else if(i==2||i==3||i==6||i==7||i==10||i==11) {
            $('.main_3 li').eq(i).css({borderRadius:'0 8px 8px 0'});
            // $('.main_3 li').eq(i).find('div').animate({right:'220px'},200);
            $('.main_3 li').eq(i).find('div').show(200);
        }
    },function(){
        var i=$('.main_3 li').index(this);
        $('.main_3 li').eq(i).find('img').attr('src','images/main_03_2_'+(i+1)+'.jpg');
        $('.main_3 li').eq(i).css({background:'#fff',color:'#000',borderRadius:'8px'});
        if (i==0||i==4||i==8) {
            // $('.main_3 li').eq(i).find('div').stop().animate({left:'-581px'},0);
            $('.main_3 li').eq(i).find('div').stop().hide(200);
        }else if(i==1||i==5||i==9) {
            // $('.main_3 li').eq(i).find('div').stop().animate({left:'-823px'},0);
            $('.main_3 li').eq(i).find('div').stop().hide(200);
        }else if(i==2||i==6||i==10) {
            // $('.main_3 li').eq(i).find('div').stop().animate({right:'-804px'},0);
            $('.main_3 li').eq(i).find('div').stop().hide(200);
        }else if(i==3||i==7||i==11) {
            // $('.main_3 li').eq(i).find('div').stop().animate({right:'-563px'},0);
            $('.main_3 li').eq(i).find('div').stop().hide(200);
        }
    });
/*公司简介--轮播*/
    var x=0,v=1,timer=null;
    var firstimg=$('.lunbo .con img:first').clone();
    var lastimg=$('.lunbo .con img:last').clone();
    $('.lunbo .con').append(firstimg);
    $('.lunbo .con').prepend(lastimg);
    var imgW=$(window).width();
    if (imgW<=1030) {
        imgW=1030;
    }else{
        imgW=$(window).width();
    }
    $('.lunbo .con img').css('width',imgW);
    $('.lunbo .con').css('width',imgW*$('.lunbo .con img').length);
    $('.lunbo .out').css('width',imgW);
    $('.lunbo .main').css('width',imgW);
    $('.lunbo .out').scrollLeft($('.lunbo .con img').width());
    function move(){
        timer=setInterval(function(){
            x++;
            if (x>=$('.lunbo .nav li').length) {
                x=0;
            };
            v++;
            if (v>=$('.lunbo .con img').length) {
                v=2;
                $('.lunbo .out').scrollLeft(imgW);
            }
            $('.lunbo .out').stop().animate({scrollLeft:imgW*v});
            $('.lunbo .nav li a').removeClass('select')
            $('.lunbo .nav li').eq(x).children().addClass('select');
        },3000)
    };
    move();
    $('.lunbo .nav li').click(function(){
        clearInterval(timer);
        x=$('.lunbo .nav li').index(this);
        v=x+1;
        $('.lunbo .nav li a').removeClass('select')
        $('.lunbo .nav li').eq(x).children().addClass('select');
        $('.lunbo .out').stop().animate({scrollLeft:imgW*v});
        move();
    });
});