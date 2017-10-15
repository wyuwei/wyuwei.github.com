$(function(){
	// 导航跟随
	var navTop = $('.nav').offset().top;
	$(document).scroll(function(){
		if ($(document).scrollTop()>navTop) {
			$('.nav').css('position','fixed');
		}else{
			$('.nav').css('position','absolute');
		}
	});
	thea.superSlider('.hj-slide',{				// 这里是父级的类名
		move : 'ul',                    	// 运动模块的载体
		prev : '.prev',                 	// 向左按钮
		next : '.next',                 	// 向右按钮
		pagination : null,     	// 分页器 null表示没有
		isTime : 5000,                  	// 自动轮播间隔的时间
		effect : "slide"                	// slide是轮播 fade 是切换
	})
	// 弹窗
	thea.middlePopup({
		parId : "#mid_tc",			// 弹窗的id或者class，建议使用id
		firstTime : 15000,			// 首次弹出时间，单位是ms
		closeBtn : '.close',			// 是否有关闭按钮，默认是null，如果有请写上关闭按钮的样式名，如：'.close'
		againTime : 30000,			// 再次弹出时间，单位是ms
		changeTime : 500,			// 显示或者隐藏所用的时间，单位是ms
		againNum : 2				// 再次弹出的次数，默认为0，infinite是无限次；
	});
	// 右浮动
	changeFloatWin('#float-r',30000,3)
	function changeFloatWin(e,t,n){
		floatFollow(e);
		windowLocation(e);
		$(document).scroll(function(){
			floatFollow(e);
		})
		$(window).resize(function(){
			floatFollow(e);
			windowLocation(e);
		});
		function floatFollow(e){
			var $stop = $(document).scrollTop() + 130;
			$(e).stop().animate({'top' : $stop},'1000')
		}
		function windowLocation(e){
			var winW = $(window).width();
			if (winW>1512) {
				var disW = (winW-1200)/2-136;
				$(e).animate({'right':disW},500)
			}else{
				$(e).animate({'right':0},500)
			}
		}
		var times = 0;
		$('.close',$(e)).click(function(){
			$(e).hide();
			times++;
			if (times<n) {
				setTimeout(function(){
					$(e).show();
				},t)
			};
		})
	}
	// 获取表单默认参数
	    var dataId = $('.defaults_dataid').attr('data-id');
	    var idArr = dataId.split('-');
	    var defaultsCity = idArr[0];
	    var defaultsArea = idArr[1];
	    var defaultsNtype = idArr[2];
	    var defaultsSchool = idArr[3];
	    var defaultsCourse = idArr[4];
	    var defaultsClass = idArr[5];
	    var defaultsVip = idArr[6];
	    var defaultsContect = idArr[7];
	    var checkPhone= /^1[34578]\d{9}$/;
		var checkMail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var checkWordsNum = /^.{4,}$/
		// 清除添加的样式
		$('input',$('.sign-in')).focus(function(){
			$(this).removeClass('error');
		});
		// 模拟下拉框
		$('.input-select',$('.sign-in')).click(function(event){
			event.stopPropagation();
			var $this = $(this);
			$this.removeClass('error');
			if ($this.attr('data-select') == 'close' || !$this.attr('data-select')) {
				$('ul',$this).show();
				$this.attr('data-select','open');
			}else if($this.attr('data-select') == 'open'){
				$('ul',$this).hide();
				$this.attr('data-select','close')
			}
		});
		$('.input-select li').hover(function(){
			$(this).addClass('cur');
		},function(){
			$(this).removeClass('cur');
		})
		$('.input-select li').click(function(event){
			event.stopPropagation();
			var $text = $(this).text();
			var $dataAreaid = $(this).attr('data-areaid');
			$('.input-select p').text('区域：'+$text);
			$('.input-select ul').hide();
			$('.input-select').attr({'data-select':'close','data-areaid':$dataAreaid});
		})
		$(document).click(function(){
			if ($('.input-select').attr('data-select') == 'open') {
				$('.input-select ul').hide();
				$('.input-select').attr('data-select','close');
			};
		})
		$('.sign-in').submit(function(){
	    	var $form = $(this);
	    	checkForm($form);
	    	if ($('.error',$form).size()>0) {
	    		alert('请完善资料');
	    		return false;
	    	}else if(!checkPhone.test($('.use-tel',$form).val())){
				$('.use-tel',$form).focus();
				alert($('.use-tel',$form).attr('data-alert'));
				return false;
			}
			var $url = 'http://px.thea.cn/Listen/ListenAddAll';
	        var json = {
	            contact : $('.use-name',$form).val(),
	            content : a$('.use-school',$form).val()+$('.use-class',$form).val(),
	            mobile : $('.use-tel',$form).val(),
	            cityid : defaultsCity,
	            areaid : $('.input-select',$form).attr('data-areaid'),
	            ntypeid : defaultsNtype,
	            schoolid : defaultsSchool,
	            courseid : defaultsCourse,
	            classid : defaultsClass,
	            vip : defaultsVip
	        }
	        $.ajax({
	            url:$url,
	           	type:'get',
	            async: true,
	           	data:json,
	            dataType:'jsonp',
	            jsonp: "callback",
	            jsonpCallback:"call",
	            // jsonpCallback:"$callback", 
	            success:function($data){
	                if($data.flag == 'ok'){
	                    alert($data.message);
	                }else if($data.flag == 'no'){
	                    alert($data.message);
	                }
	            }
	        });
	    	return false;
	    })
	// 表单判断
	function checkForm(ele){
		var $input = $('input',ele);
		var $select = $('.input-select',ele);
		$input.each(function(){  
			var $this = $(this);
			var $val = $(this).val();
			var $dataVal = $(this).attr('data-value')
			if ($this.hasClass('input-required')) {
				if ($val == $dataVal) {
					$this.addClass('error');
				}
			}
		})
		if (!$select.attr('data-areaid') || $select.attr('data-areaid') =="") {
			$select.addClass('error');
		};
	}
})
