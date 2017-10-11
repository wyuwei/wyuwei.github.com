$(function(){
  var Path = {
    homeRoot: '',
    staticRoot: 'x80_0919'
  }
  var $win = $(window);
  var $body = $('body');
  var $wrapper = $('.wrapper', $body);

  function string2json(){
    var str = $.trim( arguments[0] );

    var obj = {};

    if(str.length != 0){
      var param = str.split(',');
      for(var i = 0; i < param.length; i++){
        var o =  param[i].split(':');
        obj[o[0]] = o[1];
      }
    }

    return obj;
  }

  /**
   * 显示一个二级页面弹窗
   * @param  {[type]} option [description]
   * @return {[type]}        [description]
   */
  function showDialog(option){
    var slide;

    var _tpl = [
      '<div class="second-page">',
        '<div class="page">',
          '<div class="now">1</div>',
          '<div class="total">1</div>',
        '</div>',

        '<div class="page-content">',
          '<a href="javascript:;" class="close"></a>',

          '<div class="control">',
            '<a href="javascript:;" class="prev"></a>',
            '<a href="javascript:;" class="next"></a>',
          '</div>',

          '<div class="slide">',
            '<div class="swiper-container">',
              '<div class="swiper-wrapper">',
              '</div>',
            '</div>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');

    var $dialog = $(_tpl);

    $dialog.appendTo($wrapper);

    // Content init
    $dialog.find('.total').html(option.number);

    var slide_html = [];

    for(var i = 1; i <= option.number; i++){
      var imgUrl = option.type +'/'+ i;

      slide_html.push([
        '<div class="swiper-slide">',
          '<img width="100%" style="margin-top:-35px" src="../'+ Path.staticRoot +'/images/'+ imgUrl +'.jpg" alt="">',
        '</div>'
      ].join(''));
    }

    $dialog.find('.swiper-wrapper').html(slide_html.join(''));
    $dialog.imagesLoaded(function(){
      $dialog.find('img').each(function(){
        var img = $(this).get(0);
        $(this).wrap('<div class="img-wrapper" style="height:'+$(window).height()+'px"/>')
      });
    });
    $dialog.find('.prev, .next').hide();

    $dialog.show('fast', function(){
      if(option.number > 1){
        var $prev = $('.prev', $dialog);
        var $next = $('.next', $dialog);
        slide = new Swiper($('.swiper-container', $dialog), {
          prevButton:'.second-page .control .prev',
          nextButton:'.second-page .control .next',
          onInit: function(swiper){
            swiper.isBeginning && $next.show();
          },
          onSlideChangeStart: function(swiper){
            $prev.show();
            $next.show();
            swiper.isBeginning && $prev.hide();
            swiper.isEnd && $next.hide();
            $dialog.find('.page .now').html(swiper.activeIndex + 1);
            $dialog.scrollTop(0);
          },
          onSlideChangeEnd: function(swiper){
          }
        });
      }
    });

    // Event init
    $dialog.on('click', '.close', function(){
      $dialog.remove();
      if(option.number > 1){
        slide.destroy(true);
        slide = null;
      }
    });
  }

  $(window).resize(function(){
    $('.img-wrapper').height($(window).height());
  });
  // Event
  $body.on('click', '[data-dialog]', function(){
    var $this = $(this);
    var param = string2json( $this.data('dialog') );

    showDialog(param)
  });
});