/* *
 * 姝ゆ彃浠朵粎闄怐IV>UL>LI缁撴瀯锛孋SS鏍峰紡瀹氫滑涔熻涓ユ牸鎸夌収渚嬪瓙涓殑鎬濊矾
 * 浣滆€咃細TERRILLTANG
 * 浣滆€呴偖绠憋細549697621@qq.com
 * 2014-04-16
 * */
(function ($) {
    $.fn.fadeImages = function (options) {
        var opt = $.extend({
            time: 3000,                 //鍔ㄧ敾闂撮殧鏃堕棿
            fade: 1000,                 //娣″叆娣″嚭鐨勫姩鐢绘椂闂�
            dots: true,                //鏄惁鍚敤鍥剧墖鎸夐挳
            complete:function(){}     //娣″叆瀹屾垚鍚庣殑鍥炶皟鍑芥暟
        }, options);
        var t = parseInt(opt.time), f = parseInt(opt.fade), d = opt.dots, i = 0, j = 0, k, l, m, set,cb=opt.complete;
        m = $(this).find("ul li");
        m.hide();
        l = m.length;
        if(l<=0){
            return false;
        }
        if (d) {
            $(this).append("<ol id='dots'></ol>");
            for (j = 0; j < l; j++) {
                $(this).find("ol").append("<li>" + (j + 1) + "</li>");
            }
            $(this).find("ol li").eq(0).addClass("active");
        }
        //鍒濆鍖�
        show(0);
        //鍥剧墖鍒囨崲鍑芥暟
        function show(i) {
            m.eq(i).addClass("curr").css("z-index",2).stop(true,true).fadeIn(f,cb);
            m.eq(i).siblings().css("z-index",1).removeClass("curr").stop(true,true).fadeOut(f);
        }

        //閫楃偣鍒囨崲鍑芥暟
        function dots(i) {
            $("ol#dots li").eq(i).addClass("active").siblings().removeClass();
        }

        //鍥剧墖鑷姩鎾斁鍑芥暟
        function play() {
            if (i++ < l - 1) {
                set = setTimeout(function () {
                    show(i);
                    dots(i);
                    play();
                }, t + f)
            }
            else {
                i = -1;
                play();
            }
        }

        play();
        //榧犳爣缁忚繃鍋滄涓庢挱鏀�
        m.hover(function () {
            clearTimeout(set);
            k = i;
        }, function () {
            i = k - 1;
            play();
        });
        //鐐瑰嚮涓嬫柟閫楃偣鎺у埗鍔ㄧ敾
        if (d) {
            $(this).on("click", "ol#dots li", function () {
                i = $(this).index();
                dots(i);
                show(i);
            })
        }
        return this;
    }
}(jQuery));