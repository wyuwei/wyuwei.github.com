'use strict'
document.addEventListener('DOMContentLoaded',function(){
	var json={};
	var jsonprize={};
	
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
		rem=document.documentElement.clientWidth/320*50;
		document.documentElement.style.fontSize=rem+'px';
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
		if(json.province=='请选择省份')
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
	                url: 'http://124.40.121.75:9092/turnTable/register.json',
	                dataType:'jsonp',
	                data:json,
	                jsonp:'jsoncallback',
	                success:function(data){
	                	if(data.state==200)
	                	{
	                		jsonprize.tmp1=data.content.tmp1;
							$('.form').hide();
							$('footer').removeClass('active');
							$('.reward').hide();
							$('.game').addClass('active');
							$('.detail').hide();
							$('.detail_pos').hide();
	                	}
	                	else
	                	{
	                		alert(data.message);
	                	}
	                	
	                }
	            });
            }
		}
	});
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

	//大转盘
	var isBegin=false;
	var target;
	$(function(){ 
	     $(".play_btn").click(function(){
	     	if(isBegin) return false;
	     	isBegin=true;
	     	$('.wishbox').hide();
	     	$('.game_car').show();
	     	$('.sorrybox').hide();
	     	$('.msg_box').hide();
	        $(".indicator").css({"transform":"rotate(0deg)"});
	        var arr=[32,152,275];
	        function rnd(n)
	        {
	        	return parseInt(Math.random()*n);
	        }
	        function win()
	        {
	        	$('.game_car').hide();
				$('.wishbox').show();
				$('.sorrybox').hide();
	        }
	        $.ajax({
	                type: 'get',
	                url: 'http://124.40.121.75:9092/luckDraw/drawing.json',
	                dataType:'jsonp',
	                data:jsonprize,
	                jsonp:'jsoncallback',
	                success:function(data){
	                	//中奖
	                	if(data.content.tmp0&&data.content.prize)
	                	{
	                		if(data.content.prize=='爱奇艺')
	                		{
	                			target= 333;
	                			$('.reward_img').attr('src','images/iqiyi.png');
	                			$('.msgs_bot').html('爱奇艺VIP会员');
	                		}
	                		else if(data.content.prize=='优酷')
	                		{
	                			target= 93;
	                			$('.reward_img').attr('src','images/youku.png');
	                			$('.msgs_bot').html('优酷VIP会员');
	                		}
	                		else if(data.content.prize=='乐视')
	                		{
	                			target= 212;
	                			$('.reward_img').attr('src','images/leTV.png');
	                			$('.msgs_bot').html('乐视VIP会员');
	                		}
	                		$('.wishbox p').html('获得如下奖品');
	                		$(".indicator").rotate({ 
								duration:5000, //转动时间 
								angle: 0, //默认角度
								animateTo:360*6+target, //转动角度 
								easing: $.easing.easeOutSine, 
								callback: function(){ 
									win();
									isBegin=false;
									$('.msg_box').show();
								} 
							});
							if(data.content.conut==3)
							{
								isBegin = true;
								$('.play_btn span').html('确定');
								$('.play_btn').click(function(){
									window.location.reload();
								});
							}
	                	}
	                	else
	                	{
	                		if(data.content.conut==1)
							{
								
								$('.message p').html('您还有两次免费抽奖的机会！');
							}
							if(data.content.conut==2)
							{
								$('.message p').html('您还有一次免费抽奖的机会！');
							}
							target=arr[rnd(3)];
	                		$(".indicator").rotate({ 
								duration:5000, //转动时间 
								angle: 0, //默认角度
								animateTo:360*6+target, //转动角度 
								easing: $.easing.easeOutSine, 
								callback: function(){ 
									$('.game_car').hide();
									$('.wishbox').hide();
									$('.sorrybox').show();
									isBegin=false;
								} 
							});
							if(data.content.conut==3)
							{
								$('.message p').html('您的抽奖机会已使用完！');
								$('.play_btn span').html('确定');
								$(".indicator").rotate({ 
									duration:5000, //转动时间 
									angle: 0, //默认角度
									animateTo:360*6+target, //转动角度 
									easing: $.easing.easeOutSine, 
									callback: function(){ 
										$('.game_car').hide();
										$('.wishbox').hide();
										$('.sorrybox').show();
										isBegin = true;
										$('.play_btn').click(function(){
											window.location.reload();
										});
									} 
								});
							}
	                	}						 
	                }
	            });	        
	    });
	}); 
	

	$('.again').click(function(){
		$('.message').hide();
	})
		
},false);























