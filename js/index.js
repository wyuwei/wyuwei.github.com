;$(function(){
	'use strict'
	 var mask = $('.mask');
	 var sideBar = $('#sideBar');
	 var sideBar_trigger = $('#sideBar_trigger');
	 var backBtn = $('.back_to_top');
	 var oMore = $('#more');
	 var nav = $('#nav');
	 var headerTop = $('#header').height();

	 var items = $('#main').find('.item');
	 var currentId = '';

	 var icons = $('.icon_group').find('.icon');
	 var iconIntros = $('.icon_group').find('.icon_intro');

	 var oUl=document.querySelector('.example ul');
	 var aLi=oUl.children;
	 var aImg=document.querySelectorAll('.img');


	 setTimeout(function() {
	 	$('.icon').mouseleave(function () {
	 	$(this).find('div').css({display:'none', 'opacity':'1'}).stop().animate({'opacity':'1'}, 200);
	 });
	 }, 5000);


	 $('.icon').mouseenter(function () {
	 	$(this).find('div').css({display:'block', 'opacity':'0'}).stop().animate({'opacity':'1'}, 1000);
	 });
	 


	 function showSideBar(){
	 	mask.fadeIn();
	 	sideBar.css('transform','translate(0,0');
	 };

	 function hideSideBar(){
	 	mask.fadeOut();
	 	sideBar.css('transform','translate('+sideBar.width()+'px'+',0)');
	 };

	 sideBar_trigger.on('click',showSideBar);

	 mask.on('click',hideSideBar);

	 backBtn.on('click',function(){
	 	$('html,body').animate({
	 		scrollTop:0
	 	},1000);
	 })

	 //轮播图
	  let oBtnPrev=document.getElementById('btn_prev');
      let oBtnNext=document.getElementById('btn_next');
      let aList=document.getElementById('ul1').children;
      let aClass=[];

      for(let i=0;i<aList.length;i++){
        aClass[i]=aList[i].className;
      }
      oBtnNext.onclick=function (){
        aClass.unshift(aClass.pop());

        for(let i=0;i<aList.length;i++){
          aList[i].className=aClass[i];
        }
      };
      oBtnPrev.onclick=function (){
        aClass.push(aClass.shift());

        for(let i=0;i<aClass.length;i++){
          aList[i].className=aClass[i];
        }
      };


	 //返回顶部   导航吸顶
	 $(window).on('scroll',function(){ 	

 	    var top = $(window).scrollTop();
	 	// if($(window).scrollTop() > $(window).height()){
	 	// 	nav.addClass('nav_scroll').stop().animate({opacity:1});
	 	// 	backBtn.fadeIn();
	 	// }else{
	 	// 	nav.removeClass('nav_scroll').stop().animate({opacity:1});
	 	// 	backBtn.fadeOut();
	 	// };

	 	if($(window).scrollTop === $(window).height() - 300){
	 		nav.css({display:'none'}).stop().animate({'opacity':0});
	 	} else if ($(window).scrollTop() > $(window).height()) {
	 		nav.addClass('nav_scroll');
	 	} else {
	 		nav.removeClass('nav_scroll');
	 	}

	 	items.each(function () {
	 		var _this = $(this);
	 		var itemTop = _this.offset().top;
	 		if(top > itemTop -50){
	 			currentId =  "#" + _this.attr('id');
	 		} else {
	 			return false;
	 		}
	 	});

	 	var currentLink = nav.find(".active");
	 	if(currentId && currentLink.attr("href") != currentId) {
	 		currentLink.removeClass('active');
	 		nav.find("[href="+ currentId +"]").addClass('active');
	 	}
	 });

	 //自动触发scroll
	 $(window).trigger('scroll');

	 for (var i = 0; i < aLi.length; i++) {
		aLi[i].onmouseover=function(){
			for (var i = 0; i < aLi.length; i++) {
				aLi[i].className='';
			}
			this.className='active';
		}
		aLi[i].onmouseout=function(){
			for (var i = 0; i < aLi.length; i++) {
				aLi[i].className='';
			}
		}
	}

});

	/* 连线 */
	var canvasPage3 = document.getElementById("myCanvas");
	$(canvasPage3).attr('width',$(window).width());
	$(canvasPage3).attr('height',$('footer').height());
	var ctx = canvasPage3.getContext("2d");
	var zhongX = 800;
	var zhongY = 385;
	function randomNum(x,y)
	{
		return Math.floor(Math.random() * (y - x + 1) + x);
	}

	function randomColor() {
		return "rgb(" + randomNum(0, 255) + "," + randomNum(0, 255) + "," + randomNum(0, 255) + ")";
	}

	function Ball() {
		this.r = randomNum(0.1, 3);
		this.color = "white";

		this.x = randomNum(this.r, canvasPage3.width - this.r);
		this.y = randomNum(this.r, canvasPage3.height - this.r);

		this.speedX = randomNum(1, 3) * (randomNum(0, 1) ? 1 : -1);
		this.speedY = randomNum(1, 3) * (randomNum(0, 1) ? 1 : -1);
	}

	Ball.prototype.move = function () {
		this.x += this.speedX*0.2;
		this.y += this.speedY*0.2;

		if(this.x<=this.r)
		{
				this.x = this.r;
				this.speedX *= -1;
		}
		if(this.x>=canvasPage3.width -this.r)
		{
				this.x = canvasPage3.width - this.r
				this.speedX *= -1;
		}
		//小球碰到上边界的处理 反弹
		if (this.y <= this.r) {
				this.y = this.r;
				//反弹
				this.speedY *= -1;
		}
		//小球碰到下边界的处理 反弹
		if (this.y >= canvasPage3.height - this.r) {
				this.y = canvasPage3.height - this.r;
				//反弹
				this.speedY *= -1;
		}
	}

	Ball.prototype.draw = function () {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
	}

	var balls = [];
	var arr = [];
	for (var i = 0; i < 0.0002 * canvasPage3.width * canvasPage3.height; i++) {
		var ball = new Ball();
		balls.push(ball);
	}

	setInterval(function () {
		arr = [];
		ctx.clearRect(0, 0, canvasPage3.width, canvasPage3.height);
		for (var i = 0; i < balls.length; i++) {
				balls[i].move();
				balls[i].draw();
				if (ballAndMouse(balls[i]) < 130) {
						ctx.lineWidth = (130 - ballAndMouse(balls[i])) * 1.5 / 130;
						ctx.beginPath();
						ctx.moveTo(balls[i].x, balls[i].y);
						ctx.lineTo(zhongX, zhongY);
						ctx.strokeStyle = balls[i].color;
						ctx.stroke();
				}
		}


			for (var i = 0; i < balls.length; i++) {
				for (var j = 0; j < balls.length; j++) {
						if (ballAndBall(balls[i], balls[j]) < 80) {
								ctx.lineWidth = (80 - ballAndBall(balls[i], balls[j])) * 0.6 / 80;
								ctx.globalAlpha = (130 - ballAndBall(balls[i], balls[j])) * 1 / 80;
								ctx.beginPath();
								ctx.moveTo(balls[i].x, balls[i].y);
								ctx.lineTo(balls[j].x, balls[j].y);
								ctx.strokeStyle = balls[i].color;
								ctx.stroke();
						}
				}
			}
			ctx.globalAlpha = 1.0;

	}, 30);

	canvasPage3.onmousemove = function (event) {
		event = event || window.event;
		zhongX = event.offsetX;
		zhongY = event.offsetY;
	}

	function ballAndMouse(obj) {
		var disX = Math.abs(zhongX - obj.x);
		var disY = Math.abs(zhongY - obj.y);
		return Math.sqrt(disX * disX + disY * disY);
	}
	function ballAndBall(obj1, obj2) {
		var disX = Math.abs(obj1.x - obj2.x);
		var disY = Math.abs(obj1.y - obj2.y);
		return Math.sqrt(disX * disX + disY * disY);
	}
