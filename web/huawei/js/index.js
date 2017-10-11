$(document).ready(function(){
    /*var cx6_scale=3.2239;
    $('#cx6_mainbody').css({'height':cx6_scale*$(window).width()});
    $(window).resize(function(){
        if($(window).width()<1100)
        {
            return;
        }
        $('#cx6_mainbody').css({'height':cx6_scale*$(window).width()});
    });*/

//华为 公用
        (function ($) {
            sdw_hw = function (options) {
//将用户传进来的参数扩展覆盖默认参数
                this.obj = $.extend({}, sdw_hw.Defaults, options);
                this.gb = {
                    containerObj: this.obj.containerObj || $(".container"),
                    load: false,
                    isHeight: true,
                    hTimer: '',
                    w: 0,
                };
                this.init();
            };
            sdw_hw.Defaults = {
                mainObj: '',
                containerObj: '', //
                animateObj: "", //需要运动的对象
                easing: "easeIn", //运动速度变化
                imgCompEvent: '', //图片加载完执行
                addEvent: '',
                removeEvent: '',
                topHalf: 0.5, //上半部分 漏出 多少 后执行
                bottomHalf: 0.5, // 下半部分 漏出 多少 后执行
                proportion: 1, //整个页面的高宽比 ： 高/宽
                single: [], //针对性 事件
            };
            sdw_hw.prototype = {
                init: function () {
                    var _this = this;
                    _this.obj.containerObj.find(_this.obj.animateObj).each(function () {
                        if ($("html").hasClass("ltie8")) {
                            var css = new Object($(this).data("end"));
                            $(this).css(css);
                        } else {
                            var css = new Object($(this).data("start"));
                            $(this).css(css);
                        }

                    });
                    _this.imgInit();
                    _this.setHeight();
                    $(window).scroll(function () {
                        _this.scrollEvent();
                    });
                    $(window).resize(function () {
                        _this.gb.isHeight = false;
                        _this.setHeight();
                        _this.scrollEvent();
                    });
                    _this.gb.hTimer = setInterval(function () {
                        if (_this.gb.isHeight) {
                            _this.setHeight();
                        } else {
                            clearInterval(_this.gb.hTimer);
                        }
                    }, 1000);
                },
                setHeight: function () {
                    var _this = this;
                    var width = _this.obj.mainObj.width();
                    if (_this.gb.w === width) {
                        return;
                    }
                    _this.gb.w = width;
                    var height = width * _this.obj.proportion;
                    _this.obj.mainObj.css({
                        height: height
                    });
                },
                imgInit: function () {
                    var _this = this;
                    var imgs = $("img");
                    var maxl = imgs.length;
                    var loadnum = 0;
                    for (var i = 0; i < maxl; i++) {
                        var img = new Image();
                        img.onload = checkLoad;
                        img.oncomplete = checkLoad;
                        img.onerror = checkLoad;
                        img.src = imgs[i];
                    }

                    function checkLoad() {
                        loadnum++;
                        if (loadnum === maxl) {
                            _this.gb.load = true;
                            var width = _this.obj.mainObj.width();
                            var height = width * _this.obj.proportion;
                            _this.obj.mainObj.css({
                                height: height
                            });
                            _this.obj.containerObj.find(_this.obj.animateObj).addClass("box");
                            _this.obj.containerObj.find(_this.obj.animateObj).each(function () {
                                var delay = $(this).data("delay") || '0s';
                                var duration = ($(this).data("speed") + "ms") || "2s";
                                $(this).css({
                                    "transition-delay": delay,
                                    "-webkit-transition-delay": delay,
                                    "-moz-transition-delay": delay,
                                    "-o-transition-delay": delay,
                                    "-ms-transition-delay": delay,
                                    "transition-duration": duration,
                                    "-webkit-transition-duration": duration,
                                    "-moz-transition-duration": duration,
                                    "-o-transition-duration": duration,
                                    "-ms-transition-duration": duration
                                });
                            });

                            setTimeout(function () {
                                _this.scrollEvent();
                                if (typeof _this.obj.imgCompEvent === 'function') {
                                    _this.obj.imgCompEvent();

                                }
                            }, 500);

                        }
                    }
                },
                scrollEvent: function () {
                    var _this = this;
                    if (!_this.gb.load || $("html").hasClass("ltie8"))
                        return;
                    var topArray = _this.obj.containerObj;
                    topArray.each(function (i) {
                        var _self = $(this);
                        var div_b = _self.offset().top;
                        var ds = $(document).scrollTop();
                        if ((div_b <= ds && (div_b + _self.height()) >= (ds + _self.height() * _this.obj.topHalf)) //上半部分 多余 0.5 可见
                                || (div_b <= (ds + $(window).height() - _self.height() * _this.obj.bottomHalf)) && (div_b + _self.height()) >= (ds + $(window).height())//下班部分 多余 0.5 可见
                                || (div_b >= ds && (div_b + _self.height()) <= (ds + $(window).height()))) {  // 完全可见
                            if (typeof _this.obj.addEvent === 'function') {
                                _this.obj.addEvent(_self);
                            }
                            _self.find(_this.obj.animateObj).each(function () {
                                var _st = $(this);
                                _this.imgAnimate(_st, true)
                            });
                        } else {
                            if (typeof _this.obj.removeEvent === 'function') {
                                _this.obj.removeEvent(_self);
                            }
                            _self.find(_this.obj.animateObj).each(function () {
                                var _st = $(this);
                                _this.imgAnimate(_st, false)
                            });

                        }
                    });
                    _this.singleEvent();
                },
                singleEvent: function () {
                    var _this = this;
                    for (var i = 0; i < _this.obj.single.length; i++) {
                        var o = _this.obj.single[i];
                        var v = o.eq.offset().top;
                        var s = $(document).scrollTop();
                        var vh = o.eq.height();
                        if ((v <= s && (v + vh) >= (s + vh * o.topH)) //上半部分 多余 0.2 可见
                                || (v <= (s + $(window).height() - vh * o.bottomH)) && (v + vh) >= (s + $(window).height())//下班部分 多余 0.5 可见
                                || (v >= s && (v + vh) <= (s + $(window).height()))) {
                            if (typeof o.addEvent === 'function') {
                                o.addEvent(o);
                            }
//                } else if ((v + vh <= s) || v >= (s + $(window).height())) {
                        } else {
                            if (typeof o.removeEvent === 'function') {
                                o.removeEvent(o);
                            }
                        }
                    }
                },
                imgAnimate: function (div, StartOrEnd) {
                    var _this = this;
                    var occur = div.data("occur");
                    if (StartOrEnd || occur === 1) {
                        var speed = (div.data("speed") ? parseInt(div.data("speed")) : 2000);
//                console.log(StartOrEnd ? div.data("end") : div.data("start"))
                        var weiyi = StartOrEnd ? div.data("end") : div.data("start");
                        if ($("html").hasClass("normal")) {
                            speed = 0;
                        }
                        if (div.is(":animated")) {
                            div.stop();
                        }
                        div.animate(weiyi, speed, _this.obj.easing);
                    }
                },
//        事件绑定
                events: function () {

                },
            }
        })(jQuery);
jQuery.extend(jQuery.easing,
        {
            easeIn: function (e, f, a, h, g) {
                return h * (f /= g) * f + a
            }, easeOut: function (e, f, a, h, g) {
                return -h * (f /= g) * (f - 2) + a
            }, easeInOut: function (e, f, a, h, g) {
                if ((f /= g / 2) < 1) {
                    return h / 2 * f * f + a
                }
                return -h / 2 * ((--f) * (f - 2) - 1) + a
            }
        });


var flag = true;
var flag2 = true;
var sdw_hw = new sdw_hw({
    mainObj: $("#cx6_mainbody"),
    containerObj: $(".cx6_container"),
    animateObj: ".cx6_animate",
    easing: "easeIn",
    topHalf: .5,
    bottomHalf: .5,
    proportion: '3.2239',
    single: [

        {eq: $(".cx6_camera"),
            topH: 0.5,
            bottomH: 0.5,
            addEvent: function (self) {
                if (!$(".cx6_camera").hasClass("cur")) {
                    flag2 = true;
                    $(".cx6_camera").addClass("cur");
                    setTimeout(function () {
                        $(".cx6_camera_before").addClass("active");
                        $(".cx6_camera_after").addClass("active");
                    }, 1600);

                } else {
                    /*setTimeout(function () {
                        $(".cx6_camera_before").attr("src","images/cx6_camera_before.png");
                    }, 300);*/
                }
            },
            removeEvent: function (self) {
                $(".cx6_camera").removeClass("cur");
                $(".cx6_camera_before").removeClass("active");
                $(".cx6_camera_after").removeClass("active");
            }
        }
    ],
    addEvent: function (self) {
        self.addClass("active");
    },
    removeEvent: function (self) {
        self.removeClass("active");
    },
    imgCompEvent: function () {
        
        sdw_hw.setHeight();
    }
});


});