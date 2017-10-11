'use strict'
document.addEventListener('DOMContentLoaded',function(){
	var json={};
	var jsonprize={};
		
	//分享
	wx.ready(function () {
		wx.onMenuShareAppMessage({
			title: '9.98万起！全新奔腾X80送5000元购置税补贴',
			desc: '267项全面升级，全新改变，处处安心，全新奔腾X80创变上市！',
			link: "http://events.tensynad.com/faw-benteng/2016/x80_0919/index.html",
			imgUrl: 'http://events.tensynad.com/faw-benteng/2016/x80_0919/images/icon.jpg',
			trigger: function (res) {
			},
			success: function (res) {
				$.ajax({
		                type: 'get',
		                url: 'http://211.99.237.159:9092/X80/count.json',
		                dataType:'jsonp',
		                data:jsonprize,
		                jsonp:'jsoncallback',
		                success:function(data){
							
		                }
		        });
			},
			cancel: function (res) {
				//alert('已取消');
			},
			fail: function (res) {
				// alert(JSON.stringify(res));
			}
		});

		wx.onMenuShareTimeline({
			title: '9.98万起！全新奔腾X80送5000元购置税补贴',
			link: "http://events.tensynad.com/faw-benteng/2016/x80_0919/index.html",
			imgUrl: 'http://events.tensynad.com/faw-benteng/2016/x80_0919/images/icon.jpg',
			trigger: function (res) {
			},
			success: function (res) {
				$.ajax({
		                type: 'get',
		                url: 'http://211.99.237.159:9092/X80/count.json',
		                dataType:'jsonp',
		                data:jsonprize,
		                jsonp:'jsoncallback',
		                success:function(data){
							
		                }
		        });
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























