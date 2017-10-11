// window.onload = function () {
//   var nav = document.getElementsByTagName('nav')[0];
//   if(document.body.clientWidth<1000){
//     nav.style.display = 'none';
//   }
// }

var screenAnimateElements = {
  '.first-screen' : [
    '.first-info',
    '.first-img-1',
    '.first-img-2'
  ],
  '.second-screen' : [
    '.second-title',
    '.second-info-2',
    '.second-info-1',
    '.second-img',
    '.second-point',
    '.second-point-1',
    '.second-point-2',
    '.second-point-3'
  ],
  '.third-srceen' : [
    '.third-title',
    '.third-info-1',
    '.third-info-2',
    '.third-img',
    '.third-screen-feature'
  ],
  '.fourth-screen' : [
    '.fourth-info-title',
    '.fourth-info',
    '.fourth-img-item-1',
    '.fourth-img-item-2',
    '.fourth-img-item-3',
    '.fourth-img-item-4'
  ],
  '.fifth-screen' : [
    '.fifth-title',
    '.fifth-info',
    '.fifth-img'
  ]

}

function setScreenAnimate(screenCls){
  var screen = document.querySelector(screenCls);    // 获取当前元素
  var animateElements = screenAnimateElements[screenCls];  //需要设置的动画元素

  var isSetAnimationClass = false;
  var isAnimationDone = false;

  screen.onclick = function () {
  //  alert(1);
    // 初始化样式
    if(!isSetAnimationClass){
      for(var i = 0; i<animateElements.length; i++){
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class', baseCls + ' ' + animateElements[i].substr(1)+'-init');
      }
      isSetAnimationClass = true;
      return;
    }

    // 添加done样式
    if(!isAnimationDone){
      for(var i = 0; i<animateElements.length; i++){
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class',baseCls.replace('-init','-done'));
      }
      isAnimationDone = true;
      return;
    }

    // 添加init样式
    if(isAnimationDone){
      for(var  i= 0; i<animateElements.length; i++){
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class', baseCls.replace('-done','-init'));
      }
      isAnimationDone = false;
      return;
    }
  }
}


for(var k in screenAnimateElements){
  setScreenAnimate(k);
}
