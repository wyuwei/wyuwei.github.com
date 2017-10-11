$(document).ready(function(){
	//scrolling
	;(function(){
		function scrolling(bigbox,littlebox){
			var oBox=document.getElementById(bigbox);
			var oPrev=oBox.getElementsByTagName('a')[0];
			var oNext=oBox.getElementsByTagName('a')[1];
			var oUlBox=document.getElementById(littlebox);
			var aVideos=document.getElementsByTagName('video');
			var aUl=oUlBox.children;
			var iNow=0;
			oUlBox.innerHTML+=oUlBox.innerHTML;
			oUlBox.style.width=aUl[0].offsetWidth*aUl.length+'px';
			var w=oUlBox.offsetWidth/2;
			function tab()
			{
				if(iNow<0)
				{
					iNow=(iNow%aUl.length+aUl.length)%aUl.length;
				}
				startMove(oUlBox,-iNow*aUl[0].offsetWidth);
			}
			var left=0;
			function startMove(obj,iTarget)
			{
				var start=left;
				var dis=iTarget-start;
				var count=Math.floor(300/16);
				var n=0;
				clearInterval(obj.timer);
				obj.timer=setInterval(function(){
					n++;
					var a=1-n/count;
					left=start+dis*(1-Math.pow(a,3));
					if(left<0)
					{
						obj.style.left=left%w+'px';
					}
					if(left>0)
					{
						obj.style.left=(left%w-w)%w+'px';
					}
					if(n==count)
					{
						clearInterval(obj.timer);
					}
				},16);
			}
			oPrev.onclick=function()
			{
				iNow--;
				tab();
				for(var i=0;i<aVideos.length;i++)
				{
					aVideos[i].pause();
					//aVideos[i].currentTime=0;
				}
				
			};
			oNext.onclick=function()
			{
				iNow++;
				tab();
				for(var i=0;i<aVideos.length;i++)
				{
					aVideos[i].pause();
					//aVideos[i].currentTime=0;
				}
			};
		}
		scrolling('little_pic','little_ul');
		scrolling('big_pic','big_pic_content');
		//scrolling('videos_box','videos');
	})();
	//show_image
	;(function(){
		function BigPicture(Box,name,pos){
			var oUlBox=document.getElementById(Box);
			var oPos=document.getElementById(pos);
			var aLi=oUlBox.getElementsByTagName('li');
			var iNow=0;
			var oImg=oPos.getElementsByTagName('img')[0];
			var oPrev=oPos.getElementsByTagName('a')[0];
			var oNext=oPos.getElementsByTagName('a')[1];
			var oClose=oPos.getElementsByTagName('i')[0];
			var oText=oPos.getElementsByTagName('span')[0];
			for(var i=0;i<aLi.length;i++)
			{
				;(function(index){
					aLi[i].onclick=function()
					{
						oPos.style.display='block';
						iNow=index;
						imgtab(name);
						_hmt.push(['_trackEvent', 'image', 'picShow', 'picShow']);
					};
				})(i);
			}
			function imgtab(name)
			{
				oImg.src='images/'+name+(iNow+1)+'.jpg';
				oText.innerHTML='Images '+(iNow+1)+' of '+(aLi.length)/2;
			}
			
			oClose.onclick=function(){
				oPos.style.display='none';
			};
			oPrev.onclick=function()
			{
				iNow--;
				if(iNow<0)
				{
					iNow=(aLi.length)/2-1;
				}
				imgtab(name);
				_hmt.push(['_trackEvent', 'image', 'picShow', 'picShow']);
			};
			oNext.onclick=function()
			{
				iNow++;
				if(iNow==(aLi.length)/2)
				{
					iNow=0;
				}
				imgtab(name);
				_hmt.push(['_trackEvent', 'image', 'picShow', 'picShow']);
			};
		}
		BigPicture('little_ul','little_pic','show_little');
		BigPicture('big_pic','big_detail_pic','show_Big');
	})();
	//form
	var json={};
	;(function(){
		$('input[name=name]').blur(function(){
			var re=/^[\u4e00-\u9fa5]+$/i;
			if(!re.test($(this).val()))
			{
				$(this).next().html('*璇疯緭鍏ヤ腑鏂囧鍚�');
			}
			else
			{
				$(this).next().html('');
			}
		});
	})();
	;(function(){
		$('input[name=phone]').blur(function(){
			var re=/^1[34578][0-9]{9}$/;
			if(!re.test($(this).val()))
			{
				$(this).next().html('*璇疯緭鍏ユ纭墜鏈哄彿');
			}
			else
			{
				$(this).next().html('');
			}
		});
	})();
	//video
	var oVideo=document.querySelector('#example_video_1');
	oVideo.onended=function(){
		oVideo.currentTime=0;
		$('.poster').show();
	};

	$('.poster').click(function(){
		$('.poster').hide();
		oVideo.play();
		_hmt.push(['_trackEvent', 'video1', 'play', 'magotan']);
	});
	var $province     =  $("#province"),
	    $city             =  $("#city"),
	    $dealer             =  $("#dealer");
	var phtml = "<option value=''>璇烽€夋嫨鐪佷唤</option>";
	    $.each( global_data, function(i,n){
	        phtml += '<option value="'+i+'">'+i+'</option>';
	    });
	    $province.html(phtml);
	    $city.html("<option value=''>璇烽€夋嫨鍩庡競</option>");
	    $dealer.html("<option value=''>璇烽€夋嫨缁忛攢鍟�</option>");
	$province.on("change",function(){
	    var p         = $(this).val();
	    var chtml = '<option value="">璇烽€夋嫨鍩庡競</option>';
	    if(p != ''){
		    $.each( global_data[p], function(i, n){
		        chtml += '<option value="'+i+'">'+i+'</option>';
		    });
		}
		$('.province_text').html($('#province option:checked').text());
		$('.city_text').html('璇烽€夋嫨鍩庡競');
		$('.dealer_text').html('璇烽€夋嫨缁忛攢鍟�');
	    $city.html(chtml); 
	    $dealer.html("<option value=''>璇烽€夋嫨缁忛攢鍟�</option>");
	});
	$city.on("change",function(){
		var p = $province.val();
		var c         = $(this).val();
	    var dhtml = '<option value="">璇烽€夋嫨缁忛攢鍟�</option>';
	    if(c != ''){
		    $.each( global_data[p][c], function(i, n){
		        dhtml += '<option value="'+n.name+'">'+n.name+'</option>';
		    });
		}
		$('.city_text').html($('#city option:checked').text());
		$('.dealer_text').html('璇烽€夋嫨缁忛攢鍟�');
	    $dealer.html(dhtml);
	});
	$dealer.on("change",function(){
		$('.dealer_text').html($('#dealer option:checked').text());
	});
	var bOk=true;
	$('.submit').click(function(){
		var rename=/^[\u4e00-\u9fa5]+$/i;
		if(!rename.test($('input[name=name]').val()))
		{
			alert('璇疯緭鍏ヤ腑鏂囧鍚嶏紒');
			return;
		}
		else
		{
			json.t1=$('input[name=name]').val();
		}
		var rephone=/^1[34578][0-9]{9}$/;
		if(!rephone.test($('input[name=phone]').val()))
		{
			alert('璇疯緭鍏ユ纭墜鏈哄彿锛�');
			return;
		}
		else
		{
			json.t2=$('input[name=phone]').val();
		}
		
		json.t3=$("#province").val();
		json.c1=$("#city").val();
		json.c2=$('#dealer').val();
		json.c3=$('#wantcar').val();
		
		if(json.t3==''){
			alert('璇烽€夋嫨鐪佷唤锛�');
			return;
		}
		else if(json.c1==''){
			alert('璇烽€夋嫨鍩庡競锛�');
			return;
		}
		else if(json.c2==''){
			alert('璇烽€夋嫨缁忛攢鍟嗭紒');
			return;
		}
		else{
			if(bOk)
			{
	            bOk=false;

				$.ajax({
	                type: 'get',
	                url: 'http://datamagotan.leadaction.com.cn/activity-web/mt/save.json',
	                dataType:'jsonp',
	                data:json,
	                jsonp:'jsoncallback',
	                success:function(data){
	                	if(data.state==200)
	                	{
	                		alert('鎻愪氦鎴愬姛锛�');
	                		$('.dealer_text').html('璇烽€夋嫨缁忛攢鍟�');
	                		$('.city_text').html('璇烽€夋嫨鍩庡競');
	                		$('.province_text').html('璇烽€夋嫨鐪佷唤');
	                		document.getElementById('form').reset();
	                		_hmt.push(['_trackEvent', 'submit', 'submit', 'form']);
	                	}
	                	else
	                	{
	                		alert(data.message);
	                	}
	                	bOk=true;
	                }
	            });
			}
		}
;	});
});