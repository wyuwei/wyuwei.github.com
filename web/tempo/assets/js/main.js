/**
 * Created by hebo on 16/8/7.
 */
var $index = $('#index');

$(function () {
    init();
})

function init() {
    createjs.MotionGuidePlugin.install();

    var loader = new createjs.LoadQueue(false);
    loader.installPlugin(createjs.Sound);
    loader.addEventListener("progress", handleFileProgress);
    loader.addEventListener("fileload", handleFileLoad);
    loader.addEventListener("complete", handleComplete);
    loader.loadFile({src: "assets/media/bg.mp3", id: "bgAudio"}, true);
    loader.loadManifest([
        //{id: "cloud", src:"assets/images/cloud.png"},
        //{id: "fang", src:"assets/images/fang.png"},
        //{id: "body", src:"assets/images/body.png"},
        //{id: "front", src:"assets/images/front.png"},
        //{id: "begin", src:"assets/images/begin.png"},
        //{id: "top", src:"assets/images/index-top.png"},
        {id: "camt", src:"assets/images/find/camt.png"},
        {id: "kxpgm", src:"assets/images/find/kxpgm.png"},
        {id: "mmxxg", src:"assets/images/find/mmxxg.png"},
        {id: "qxmlh", src:"assets/images/find/qxmlh.png"},
        {id: "txcm", src:"assets/images/find/txcm.png"},
        {id: "xsbbh", src:"assets/images/find/xsbbh.png"},
        {id: "zxwx", src:"assets/images/find/zxwx.png"},
        {id: "icon_camt", src:"assets/images/find/icon_camt.png"},
        {id: "icon_kxpgm", src:"assets/images/find/icon_kxpgm.png"},
        {id: "icon_mmxxg", src:"assets/images/find/icon_mmxxg.png"},
        {id: "icon_qxmlh", src:"assets/images/find/icon_qxmlh.png"},
        {id: "icon_txcm", src:"assets/images/find/icon_txcm.png"},
        {id: "icon_xsbbh", src:"assets/images/find/icon_xsbbh.png"},
        {id: "paper", src:"assets/images/paper.png"},
    ]);
}

function handleFileProgress(event) {
    var progress = parseInt(event.loaded*100)+"%";
    $index.find('.progress').html(progress);
}

function handleFileLoad(evt) {
}

function handleComplete(evt) {
    $index.find('.pro-txt').hide();
    $index.find('.begin').show();
    playmusic();

    $(".music").on("touchstart",function(){
        if ( $(this).hasClass("play") )
        {
            $(this).removeClass("play");
            $("#music>span").addClass("zshow").html("关闭");
            setTimeout(function(){$("#music>span").removeClass("zshow")},1000);
            createjs.Sound.stop();
        }
        else
        {
            $(this).addClass("play");
            $("#music>span").addClass("zshow").html("开启");
            setTimeout(function(){$("#music>span").removeClass("zshow")},1000);
            createjs.Sound.play('bgAudio',{loop:-1});
        }
    })
    function playmusic()
    {
        $(".music").addClass("play");
        createjs.Sound.play('bgAudio',{loop:-1});
    }

    $('.begin').find('.begin-bt').on('touchstart',function () {
        $('#index').hide();
        setTimeout(function(){
            $('.notice').hide();
        },1500);
    });
    onload();

}


(function (factory) {

    var root = (typeof self == 'object' && self.self == self && self) ||
        (typeof global == 'object' && global.global == global && global);

    if (typeof define === 'function' && define.amd) {
        define(['exports'], function (exports) {
            root.Orienter = factory(root, exports);
        });
    } else if (typeof exports !== 'undefined') {
        factory(root, exports);
    } else {
        root.Orienter = factory(root, {});
    }

}(function (root, Orienter) {
    function extend(obj, obj2) {
        for (var prop in obj2) {
            obj[prop] = obj2[prop];
        }
    }

    Orienter = function () {
        this.initialize.apply(this, arguments);
    };

    extend(Orienter.prototype, {
        //VERT: 'latical',//垂直
        //HORI: 'lonzontal',//水平
        lon: 0,
        lat: 0,
        direction: 0,
        fix: 0,
        os: '',
        initialize: function () {
            this.lon = 0;
            this.lat = 0;
            this.direction = window.orientation || 0;

            switch (this.direction) {
                case 0:
                    this.fix = 0;
                    break;
                case 90:
                    this.fix = -270;
                    break;
                case -90:
                    this.fix = -90;
                    break;
            }

            if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
                this.os = 'ios';
            }else{
                this.os = (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux')) ? 'android' : '';
            }
        },

        init: function () {
            this._orient = this.orientHandler.bind(this);
            window.addEventListener('deviceorientation', this._orient, false);

            this._change = this.changeHandler.bind(this);
            window.addEventListener('orientationchange', this._change, false);
        },

        destroy: function () {
            window.removeEventListener('deviceorientation', this._orient, false);
            window.removeEventListener('orientationchange', this._change, false);
        },

        changeHandler: function (event) {
            this.direction = window.orientation;
            //alert(window.orientation);
        },

        orientHandler: function (event) {
            switch (this.os) {
                case 'ios':
                    switch (this.direction) {
                        case 0:
                            this.lon = event.alpha + event.gamma;
                            if (event.beta > 0) this.lat = event.beta - 90;
                            break;
                        case 90:
                            if (event.gamma < 0) {
                                this.lon = event.alpha - 90;
                            } else {
                                this.lon = event.alpha - 270;
                            }
                            if (event.gamma > 0) {
                                this.lat = 90 - event.gamma;
                            } else {
                                this.lat = -90 - event.gamma;
                            }
                            break;
                        case -90:
                            if (event.gamma < 0) {
                                this.lon = event.alpha - 90;
                            } else {
                                this.lon = event.alpha - 270;
                            }
                            if (event.gamma < 0) {
                                this.lat = 90 + event.gamma;
                            } else {
                                this.lat = -90 + event.gamma;
                            }
                            break;
                    }
                    break;
                case 'android':
                    switch (this.direction) {
                        case 0:
                            this.lon = event.alpha + event.gamma + 30;
                            if (event.gamma > 90){
                                this.lat = 90 - event.beta;
                            }else{
                                this.lat = event.beta - 90;
                            }
                            break;
                        case 90:
                            this.lon = event.alpha - 230;
                            if (event.gamma > 0) {
                                this.lat = 270 - event.gamma;
                            } else {
                                this.lat = -90 - event.gamma;
                            }
                            break;
                        case -90:
                            this.lon = event.alpha - 180;
                            this.lat = -90 + event.gamma;
                            break;
                    }
                    break;
            }

            this.lon += this.fix;
            this.lon %= 360;
            if (this.lon < 0) this.lon += 360;

            this.lon = Math.round(this.lon);
            this.lat = Math.round(this.lat);

            if (this.handler) this.handler.apply(this, [{a:Math.round(event.alpha), b:Math.round(event.beta), g:Math.round(event.gamma), lon: this.lon, lat: this.lat, dir: this.direction}]);
        }

    });

    return Orienter;
}));

//onload();

function onload() {
    $('#stage').show();
    var finds=[];
    var settings = {
        viewprot:$('.panorama-view'),
        start_position: 0,
        image_width: 0,
        image_height: 0,
        mouse_wheel_multiplier: 20,
        bind_resize: true
    };

    var viewport = settings.viewprot;
    var panoramaContainer = viewport.children('.panorama-container');
    var viewportImage = panoramaContainer.find('.pbg').children('img:first');
    //var imgbox22 = $('#img-box22');
    var imgbox2 = $('#img-box2');
    var imgbody1 = $('#img-body1');
    var imgbody2 = $('#img-body2');
    var imgbox4 = $('#img-box4');

    var pbg = panoramaContainer.find('.pbg');
    pbg.css({position:"absolute",left:"-2000px",top:0});

    //var img22 = imgbox22.find('img');
    var img2 = imgbox2.find('img');
    var imgb1 = imgbody1.find('img');
    var imgb2 = imgbody2.find('img');
    var img4 = imgbox4.find('img');

    if(settings.image_width<=0 && settings.image_height<=0){
        settings.image_width = parseInt(viewportImage.data("width"));
        settings.image_height = parseInt(viewportImage.data("height"));
        if (!(settings.image_width) || !(settings.image_height)) return;
    }
    var image_ratio = settings.image_height/settings.image_width;
    var elem_height = parseInt(viewport.height());
    var elem_width = parseInt(elem_height/image_ratio);
    var image_map = viewportImage.attr('usemap');
    var image_areas;
    var isDragged = false;
    var mouseXprev = 0;
    var scrollDelta = 0;

    viewportImage.height(elem_height).removeAttr("usemap").css("left",0).clone().css("left",elem_width+"px").insertAfter(viewportImage);

    //img22.height(elem_height).removeAttr("usemap").css("left",0).clone().css("left",elem_width+"px").insertAfter(img22);
    img2.height(elem_height).removeAttr("usemap").css("left",0).clone().css("left",elem_width+"px").insertAfter(img2);

    imgb1.height(elem_height).removeAttr("usemap").css("left",0).clone().css("left",elem_width+"px").insertAfter(imgb1);
    imgb2.height(elem_height).removeAttr("usemap").css("left",0).clone().css("left",elem_width+"px").insertAfter(imgb2);
    img4.height(elem_height).removeAttr("usemap").css("left",0).clone().css("left",elem_width+"px").insertAfter(img4);

    panoramaContainer.css({
        'margin-left': '-'+settings.start_position+'px',
        'width': (elem_width*2)+'px',
        'height': (elem_height)+'px'
    });

    var pbgleft;
    setInterval( function() {
        if (isDragged) return false;
        scrollDelta = scrollDelta * 0.98;
        if (Math.abs(scrollDelta)<=2) scrollDelta = 0;
        scrollView(panoramaContainer, elem_width, scrollDelta);
        pbgleft = parseInt(pbg.css('left'),10);
        pbgleft++;
        //console.info(settings.image_width)
        if(pbgleft > 0){
            pbgleft = -2000;
        }
        pbg.css('left',pbgleft+'px');
        //console.info(pbgleft);
    }, 16);
    viewport.mousedown(function(e){
        if (isDragged) return false;
        $(this).addClass("grab");
        isDragged = true;
        mouseXprev = e.clientX;
        scrollOffset = 0;
        return false;
    }).mouseup(function(){
        $(this).removeClass("grab");
        isDragged = false;
        scrollDelta = scrollDelta * 0.45;
        return false;
    }).mousemove(function(e){
        if (!isDragged) return false;
        scrollDelta = parseInt((e.clientX - mouseXprev));
        mouseXprev = e.clientX;
        scrollView(panoramaContainer, elem_width, scrollDelta);
        return false;
    }).bind('contextmenu',stopEvent).bind('touchstart', function(e){
        if (isDragged) return false;
        isDragged = true;
        mouseXprev = e.originalEvent.touches[0].pageX;
        scrollOffset = 0;
    }).bind('touchmove', function(e){
        e.preventDefault();
        if (!isDragged) return false;
        var touch_x = e.originalEvent.touches[0].pageX;
        scrollDelta = parseInt((touch_x - mouseXprev));
        mouseXprev = touch_x;
        scrollView(panoramaContainer, elem_width, scrollDelta);

        //imgbox2.add(imgbox3).removeClass('animated bounceInLeft bounceInLeft2 bounceInRight bounceInRight2');

    }).bind('touchend', function(e){
        isDragged = false;
        scrollDelta = scrollDelta * 0.45;
        //panoramaContainer.find('.img-box2').animate({left:0},500);
        //panoramaContainer.find('.img-box3').animate({left:0},1000);

        //console.info(scrollDelta);

        /*
         if(scrollDelta<0){
         imgbox2.addClass('animated bounceInLeft');
         imgbox3.addClass('animated bounceInLeft2');
         }else{
         imgbox2.addClass('animated ');
         imgbox3.addClass('animated bounceInRight2');
         }
         */

    });

    if (image_map) {
        $('map[name='+image_map+']').children('area').each(function(){
            var area_coord, area_fragment;
            switch ($(this).attr("shape").toLowerCase()){
                case 'rect':
                    area_coord = $(this).attr("coords").split(",");
                    area_fragment = $("<a class='area' href='"+$(this).attr("href")+"' data-id='"+$(this).data('id')+"' title='"+$(this).attr("alt")+"'>"+$(this).attr("alt")+"</a>");
                    // opacity support in older browser
                    area_fragment.css({opacity:0.2});
                    panoramaContainer.append(area_fragment.data("stitch",1).data("coords",area_coord));
                    panoramaContainer.append(area_fragment.clone().data("stitch",2).data("coords",area_coord));
                    break;
            }
        }).remove();
        image_areas = panoramaContainer.children(".area");
        image_areas.mouseup(stopEvent).mousemove(stopEvent).mousedown(stopEvent);
        repositionHotspots(image_areas,settings.image_height,elem_height,elem_width);
    }

    if (settings.bind_resize){
        $(window).resize(function(){
            elem_height = parseInt(viewport.height());
            elem_width = parseInt(elem_height/image_ratio);
            panoramaContainer.css({
                'width': (elem_width*2)+'px',
                'height': (elem_height)+'px'
            });
            viewportImage.css("left",0).next().css("left",elem_width+"px");
            if (image_map) repositionHotspots(image_areas,settings.image_height,elem_height,elem_width);
        });
    }
    if (settings.callback && typeof settings.callback === 'function'){
        var img = 0;
        $('.panorama-container img').load(function(e){
            img += 1;
            if (img == 2) {
                settings.callback();
            }
        });
    }

    function stopEvent(e){
        e.preventDefault();
        return false;
    }

    function scrollView(panoramaContainer,elem_width,delta){
        var newMarginLeft = parseInt(panoramaContainer.css('marginLeft'))+delta;
        if (newMarginLeft > 0) newMarginLeft = -elem_width;
        if (newMarginLeft < -elem_width) newMarginLeft = 0;
        panoramaContainer.css('marginLeft', newMarginLeft+'px');
    }

    function repositionHotspots(areas,image_height,elem_height,elem_width){
        var percent = elem_height/image_height;
        areas.each(function(){
            area_coord = $(this).data("coords");
            stitch = $(this).data("stitch");
            switch (stitch){
                case 1:
                    $(this).css({
                        'left':     (area_coord[0]*percent)+"px",
                        'top':      (area_coord[1]*percent)+"px",
                        //'width':  ((area_coord[2]-area_coord[0])*percent)+"px",
                        //'height': ((area_coord[3]-area_coord[1])*percent)+"px"
                        'width':    (area_coord[2]*percent)+"px",
                        'height':   (area_coord[3]*percent)+"px",
                    });
                    break;
                case 2:
                    $(this).css({
                        'left':     (elem_width+parseInt(area_coord[0])*percent)+"px",
                        'top':      (area_coord[1]*percent)+"px",
                        //'width':  ((area_coord[2]-area_coord[0])*percent)+"px",
                        //'height': ((area_coord[3]-area_coord[1])*percent)+"px"
                        'width':    (area_coord[2]*percent)+"px",
                        'height':   (area_coord[3]*percent)+"px",
                    });
                    break;
            }
            $(this).on('touchstart',function(){
                var id = $(this).data('id');
                if($.inArray(id, finds) === -1){
                    finds.push(id);
                }
                $('#find_icon').removeClass().addClass('icon_'+id).addClass('active');
                if(id=='zxwx')
                {
                    $('#layer').show();
                    $('#find').removeClass().addClass('find-'+id).css('opacity',0).show().animate({
                        opacity:1
                    },1000);
                    $('#find_icon').removeClass('active');
                }
                else
                {
                    setTimeout(function(){
                        $('#layer').show();
                        $('#find').removeClass().addClass('find-'+id).css('opacity',0).show().animate({
                            opacity:1
                        },1000);
                        $('#find_icon').removeClass('active');
                    },1000);
                }

                var len = finds.length;
                for(var i =0 ;i<len;i++){
                    $('#find ul li').eq(i).addClass('cur');
                }
            })
        });
    }


    $('#layer').on('touchstart',function () {
        $(this).hide();
        $('#find').hide();
        var len = finds.length;
        if(len == 7){
            //$('#layer').show();
            $('#findAll').show().on('touchstart',function () {
                //var n = randomInt(1,10);
                $('.paper').addClass('active');
                var n = 10;
                if(n <= 3){
                    jiang(0)
                }else{
                    jiang(1);
                }
            });
        }
    });
    //animationEnd
    var transition="transition";
        var body=document.body || document.documentElement;
        var style=body.style;
        var vendorPrefix=(function(){
            var i=0, vendor=["Moz", "Webkit", "Khtml", "O", "ms"];
            transition=transition.charAt(0).toUpperCase() + transition.substr(1);   
            while (i < vendor.length) {
                if (typeof style[vendor[i] + transition] === "string") {
                  return vendor[i];
                }
                i++;
            }
            return false;
            })();
        var animationEnd=(function(){
            if(vendorPrefix=="Webkit"){
                return "webkitAnimationEnd";
            }else{
                return "animationend";
            }
        }());
    document.querySelector('.paper7').addEventListener(animationEnd,function(){
        $('.contribute').show();
    });

    function randomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function jiang(type) {
        var $res = $('#result');
        $res.find('.zhong').hide();
        $res.find('.meiz').hide();
        $('#share').hide();
        $res.show();
        if(type == 1){
            $res.find('.zhong').show();
        }else{
            $res.find('.meiz').show();
        }
    }

    $('.meiz').find('.sharebt').on('touchstart',function () {
        $('.meiz').hide();
        $('#share').data('jiang',false).show().find('.share-txt').html('你的寻宝实力毋庸置疑，手气欠佳？<br>邀请亲朋友好友一同参与挑战吧！');
    }).end().find('.replaybt').on('touchstart',function () {
        $('#result').hide();
        $('#layer').show();
        $('#findAll').show();
    });
    $('.zhong').find('.sharebt').on('touchstart',function () {
        $('.paper').removeClass('active');
        $('.zhong').hide();
        $('#share').data('jiang',true).show().find('.share-txt').html('有实力寻宝，有运气得奖，好事不能独享，<br>快邀请亲朋友好友一同加入寻“宝”大军吧！');
    });

    $('#share').on('touchstart',function () {
        $(this).hide();
        var jiang = $(this).data('jiang');
        if(jiang){
            $('.zhong').show();
        }else{
            $('.meiz').show();
        }
    });


    var o = new Orienter();
    var tip = document.getElementById('tip');
    var prevlon = 0;
   /* var scrollNum = elem_width/360;*/
    var scrollNum = 26;
    var oldAlpha=0;
    var oldBeta=0;
    var oldGamma=0;

    o.handler = function (obj) {
        var lon = obj.lon;
        var alpha=obj.a;
        var beta=obj.b;
        var gamma=obj.g;
        
        if(lon - prevlon >1){
            scrollView(panoramaContainer, elem_width, scrollNum);
        }else if(lon - prevlon < -1){

            scrollView(panoramaContainer, elem_width, -scrollNum);
            /*
             tip.innerHTML =
             'alpha:' + obj.a +
             '<br>' + 'beta:' + obj.b +
             '<br>' + 'gamma:' + obj.g +
             '<br>' + 'longitude:' + obj.lon +
             '<br>' + 'latitude:' + obj.lat +
             '<br>' + 'direction:' + obj.dir+
             '<br>' + '-';
             */

        }
        /*tip.innerHTML =
             'alpha:' + obj.a +
             '<br>' + 'beta:' + obj.b +
             '<br>' + 'gamma:' + obj.g +
             '<br>' + 'longitude:' + obj.lon +
             '<br>' + 'latitude:' + obj.lat +
             '<br>' + 'direction:' + obj.dir+
             '<br>' + 'scrollNum'+scrollNum+
             '<br>'+'elem_width'+elem_width;
*/        prevlon = lon;
        oldAlpha=alpha;
        oldBeta=beta;
        oldGamma=gamma;
    };
    o.init();
    //imgbox2.add(imgbox3).parallax();
    var scene = document.getElementById('stage');
    //var parallax = new Parallax(scene);
    /*
     $('.bxslider').bxSlider({
     slideWidth:520,
     controls:false
     });
     */

 wx.ready(function () {
    wx.onMenuShareAppMessage({
        title: '德国奇遇',
        desc: '转角遇到新Tempo',
        link: "http://cdn.evener.com/tempo/",
        imgUrl: 'http://cdn.evener.com/tempo/assets/images/icon.jpg',
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
        title: '德国奇遇 | 转角遇到新Tempo',
        link: "http://cdn.evener.com/tempo/",
        imgUrl: 'http://cdn.evener.com/tempo/assets/images/icon.jpg',
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


