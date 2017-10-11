'use strict'
document.addEventListener('DOMContentLoaded',function(){
	var json={};
	var jsonprize={};
	$('.start').click(function(){
		$('header').addClass('active');
		$('footer').addClass('active');
		$('footer img').attr('src','images/floor.png');
	});
	//留资
	var local_prov='';
	var local_city='';
	$(function(){
		getLocation();
		$('#sheng').change(function(){
			var prov=$(this).val();
			$('#ddlCityID').html('<option>请选择城市</option>');
			$('#shop_1').html('<option>请选择经销商</option>');
			getCity(prov);
		});
		$('#ddlCityID').change(function(){
			$('#shop_1').html('<option value="0">请选择经销商</option>');
			var dealer=dealers.dealers[$(this).val()];
			for(var i in dealer){
				$('#shop_1').append('<option value="'+dealer[i][0]+'">'+dealer[i][1]+'</option>')
			}
		});
	});
	function getLocation(){
		$.ajax({
			type :"get",
			url:"http://api.map.baidu.com/location/ip?ak=UArD9KlHW2VQQdRNBIW8IudFsDRZRFM0&coor=bd09ll",
			dataType:"jsonp",
			success:function(data){
				var _prov_name=data.content.address_detail.province;
				var _invalid=["省","市"];
				if($.inArray(_prov_name,_invalid)){
					_prov_name=_prov_name.substring(0,_prov_name.length-1);
				}
				if(_prov_name=='新疆维吾尔自治'){
					_prov_name="新疆";
				}
				local_prov=_prov_name;
				local_city=data.content.address_detail.city;
				getProvince();
			},
			error:function(){
				//console.log('定位失败');
			}
		});
	}
	function getProvince(){
		$('#sheng').html('<option>请选择省份</option>');
		for(var i in dealers.provs){
			$('#sheng').append('<option value="'+i+'">'+dealers.provs[i]+'</option>');
		}
		if(local_prov){
			$('#sheng option:contains("'+local_prov+'")').prop('selected',true);
			$('#sheng').trigger('change');
		}
	}
	function getCity(prov){
		$('#ddlCityID').html('<option value="0">请选择城市</option>');
		var city=dealers.citys[prov];
		for(var i in city){
			$('#ddlCityID').append('<option value="'+city[i][0]+'">'+city[i][1]+'</option>')
		}
		if(local_city){
			$('#ddlCityID option:contains("'+local_city+'")').prop('selected',true);
			$('#ddlCityID').trigger('change');
		}
	}

	var oHeight=document.documentElement.clientHeight;
	var oBigH;
	window.onresize=function()
	{
		$('footer').hide();
		oBigH=document.documentElement.clientHeight;
		if(oBigH==oHeight)
		{
			$('footer').show();
		}
	};
	$('input[name=name]').focus(function(){
		$('.notice').html('');
	});
	$('input[name=name]').blur(function(){
		if(!$(this).val())
		{
			$('.notice').html('*请输入姓名');
		}
		else
		{
			json.name=$('input[name=name]').val();
		}
	});
	var bOk=true;
	;(function(){
		var re=/^1[34578][0-9]{9}$/;

		$('input[name=phone]').focus(function(){
			$('.notice').html('');
		});
		
		$('input[name=phone]').blur(function(){
			if(!re.test($(this).val()))
			{
				$('.notice').html('*请输入正确的手机号');
				bOk=false;
			}
			else
			{
				bOk=true;
				json.phone=$(this).val();
			}
		});
	})();
	$('.reward').click(function(){
		json.province=$('#sheng option:selected').text();
		json.city=$('#ddlCityID option:selected').text();
		json.address=$('#shop_1 option:selected').text();
		json.distributor=$('select[name=impress]').val();
		json.sex=$('select[name=sex]').val();
		json.phone=$('input[name=phone]').val();
		json.name=$('input[name=name]').val();
		if(!json.province)
		{
			$('.notice').html('*请选择省份');
			return;
		}
		else if(json.province=='请选择省份')
		{
			$('.notice').html('*请选择省份');
			return;
		}
		else if(!json.city)
		{
			$('.notice').html('*请选择城市');
			return;
		}
		else if(json.city=='请选择城市')
		{
			$('.notice').html('*请选择城市');
			return;
		}
		else if(!json.address)
		{
			$('.notice').html('*请选择经销商');
			return;
		}
		else if(json.address=='请选择经销商')
		{
			$('.notice').html('*请选择经销商');
			return;
		}
		else if(json.distributor=='你对全新B50印象：')
		{
			$('.notice').html('*请选择你对全新B50印象');
			return;
		}
		else if(json.name=='')
		{
			$('.notice').html('*请输入姓名');
			return;
		}
		else if(json.sex=='请选择性别')
		{
			$('.notice').html('*请选择性别');
			return;
		}
		else if(json.phone=='')
		{
			$('.notice').html('*请输入手机号');
			return;
		}
		else
		{
			if(bOk)
			{
				$.ajax({
	                type: 'get',
	                url: 'http://124.40.121.75:9092/luckDraw/save.json',
	                dataType:'jsonp',
	                data:json,
	                jsonp:'jsoncallback',
	                success:function(data){
	                	if(data.state==200)
	                	{
	                		jsonprize.tmp1=data.content.tmp1;
		                    $('header').css({'background':'url(images/game_bg.jpg)'});
							$('.form').hide();
							$('footer img').attr('src','images/game_foot.png');
							$('footer').removeClass('active');
							$('.reward').hide();
							$('.game').addClass('active');
							$('.detail').hide();
							$('.detail_pos').hide();
						}
						else
						{
							alert('您已经参加过活动啦！')
						}
	                }
	            });
            }
		}
	});

	;(function(){
		var i=0;
		function opacity(){
			$('.arrow i').eq(i).stop().animate({'opacity':'0.3'},function(){
				i++;
				if(i==$('.arrow i').length)
				{
					$('.arrow i').each(function(){
						$('.arrow i').css({'opacity':1});
					});
					i=0;
				}
				opacity();
			})
		}
		$('.arrow i').eq(i).stop().animate({'opacity':'0.3'},function(){
			i++;
			opacity();
		})
	})();
	

	$('select').each(function(){
		$('select').change(function(){
			$('.notice').html('');
		});
	});
	
	$('.detail').click(function(){
		$('.detail').hide();
		$('.detail_pos').show();
	});
	$('.closed').click(function(){
		$('.detail').show();
		$('.detail_pos').hide();
	});

	
	//老虎机
	jQuery.extend( jQuery.easing,  
	{  
	    easeInOutCirc: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		}
	});  
	var isBegin = false;
	$(function(){
		var u =300;
		var oBtn=document.querySelector('.play_btn');
		var endY;
		var disY;
		function sorry()
		{
			$('.msgs').html('很遗憾！');
			$('.wechat').show();
			$('.giftbox').hide();
		}
		function fnMove(ev)
		{
			endY=ev.targetTouches[0].pageY-oBtn.offsetTop;
			if(endY>disY&&!isBegin)
			{
				$('.play_box').addClass('active');
			}
			ev.preventDefault();
		}
		function rnd(n)
        {
        	return parseInt(Math.random()*n);
        }
		function fnEnd()
		{	
			if(endY>disY)
			{
				if(isBegin) return false;
				isBegin = true;
				$.ajax({
	                type: 'get',
	                url: 'http://124.40.121.75:9092/luckDraw/drawing.json',
	                dataType:'jsonp',
	                data:jsonprize,
	                jsonp:'jsoncallback',
	                success:function(data){
	                	var result;
	                	var num_arr;
	                	$('.play_box').removeClass('active');
						$(".num").css('backgroundPositionY',0);
	                	if(data.content.tmp0&&data.content.prize)
	                	{
	                		//中奖了
	                		if(data.content.prize=='爱奇艺')
	                		{
	                			result= 111;
	                		}
	                		else if(data.content.prize=='优酷')
	                		{
	                			result= 222;
	                		}
	                		else if(data.content.prize=='乐视')
	                		{
	                			result= 333;
	                		}
	                		else if(data.content.prize=='电影票')
	                		{
	                			result= 444;
	                		}
							num_arr = (result+'').split('');
							$(".num").each(function(index){
								var _num = $(this);
								setTimeout(function(){
									_num.animate({
										backgroundPositionY: (u*60) - (u*num_arr[index])
									},{
										duration: 6000+index*3000,
										easing: "easeInOutCirc",
										complete: function(){
											if(index==2) 
											{
												if(data.content.prize=='爱奇艺')
						                		{
						                			$('.giftbox img').attr('src','images/iqiyi.png');
						                			$('.gift_bot').html('爱奇艺VIP会员');
						                		}
						                		else if(data.content.prize=='优酷')
						                		{
						                			$('.giftbox img').attr('src','images/youku.png');
						                			$('.gift_bot').html('优酷VIP会员');
						                		}
						                		else if(data.content.prize=='乐视')
						                		{
						                			$('.giftbox img').attr('src','images/leTV.png');
						                			$('.gift_bot').html('乐视VIP会员');
						                		}
						                		else if(data.content.prize=='电影票')
						                		{
						                			$('.giftbox img').attr('src','images/tickit.png');
						                			$('.gift_bot').html('电影票');
						                		}
						                		$('.msg_box').show();
						                		$('.wechat').hide();
												$('.giftbox').show();
												$('.message').show();
												$('.msgs').html('恭喜你！');
												$('.message p').html('获得如下奖品');
												$('.message .again span').html('确定');
												isBegin = false;
												if(data.content.conut==3)
												{
													isBegin = true;
												}
											}
										}
									});
								}, index * 300);
							});
	                	}
	                	else
	                	{
	                		var arrnot=[110,112,113,114,115,117,118,119,120,121,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,220,221,223,224,225,226,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,246,246,247,248,249,250,301,302,302,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,334,335,336,337,339,340,341,342,343,344,345,346,347,348,349,350,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432,433,434,435,436,437,438,439,440,441,442,443,445,446,447,448,450];
	                		result= arrnot[rnd(166)];
							num_arr = (result+'').split('');
							$(".num").each(function(index){
								var _num = $(this);
								setTimeout(function(){
									_num.animate({
										backgroundPositionY: (u*60) - (u*num_arr[index])
									},{
										duration: 6000+index*3000,
										easing: "easeInOutCirc",
										complete: function(){
											if(index==2)
											{
												if(data.content.conut==1)
												{
													$('.message p').html('您还有两次免费抽奖的机会！');
													isBegin = false;
												}
												if(data.content.conut==2)
												{
													$('.message p').html('您还有一次免费抽奖的机会！');
													isBegin = false;
												}
												if(data.content.conut==3)
												{
													$('.message p').html('您的抽奖次数用完了');
													$('.again span').html('返回');
													isBegin = true;
												}
												if(data.content.conut==4)
												{
													$('.message p').html('抽奖机会已使用完');
													$('.wechat').html('您的抽奖机会已经用完，<br/>感谢您的参与！');
													$('.again span').html('确定');
													isBegin = true;
												}
												if(data.content.conut>4)
												{
													isBegin = true;
												}
												sorry();
												$('.message').show();												
											}
										}
									});
								}, index * 300);
							});
	                	}	 
	                }
	            });
			}
		}
		oBtn.addEventListener('touchstart',function(ev){
			disY=ev.targetTouches[0].pageY-oBtn.offsetTop;
			ev.preventDefault();
		},false);
		oBtn.addEventListener('touchmove',fnMove,false);
		oBtn.addEventListener('touchend',fnEnd,false);

	});
	$('.again').click(function(){
		$('.message').hide();
		$('.msg_box').hide();
	})
	//weixin
	wx.ready(function () {
		wx.onMenuShareAppMessage({
			title: '全新奔腾B50焕新启程',
			desc: '观影霸王票随心享！乐视、优酷、爱奇艺VIP名额限时送！豪礼狂送，乐享不停！',
			link: "http://events.tensynad.com/faw-benteng/2016/movie_0701/index.html",
			imgUrl: 'http://events.tensynad.com/faw-benteng/2016/movie_0701/images/icon.jpg',
			trigger: function (res) {
			},
			success: function (res) {
				$.ajax({
		                type: 'get',
		                url: 'http://124.40.121.75:9092/luckDraw/callBack.json',
		                dataType:'jsonp',
		                data:jsonprize,
		                jsonp:'jsoncallback',
		                success:function(data){
							if(data.state==200)
							{
								isBegin = false;
								alert('已分享成功，增加一次抽奖机会!');
							}
							else
							{
								alert('已分享成功!');
							}
		                }
		        });
				$('.message').hide();
			},
			cancel: function (res) {
				//alert('已取消');
			},
			fail: function (res) {
				// alert(JSON.stringify(res));
			}
		});

		wx.onMenuShareTimeline({
			title: '全新奔腾B50焕新启程',
			link: "http://events.tensynad.com/faw-benteng/2016/movie_0701/index.html",
			imgUrl: 'http://events.tensynad.com/faw-benteng/2016/movie_0701/images/icon.jpg',
			trigger: function (res) {
			},
			success: function (res) {
				$.ajax({
		                type: 'get',
		                url: 'http://124.40.121.75:9092/luckDraw/callBack.json',
		                dataType:'jsonp',
		                data:jsonprize,
		                jsonp:'jsoncallback',
		                success:function(data){
							if(data.state==200)
							{
								isBegin = false;
								alert('已分享成功，增加一次抽奖机会!');
							}
							else
							{
								alert('已分享成功!');
							}
		                }
		        });
				$('.message').hide();
			},
			cancel: function (res) {
				//alert('已取消分享');
			},
			fail: function (res) {
				//alert(JSON.stringify(res));
			}
		});
	});
		
},false);























