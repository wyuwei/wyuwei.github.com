// 获取元素
function getElem(elem){
    return document.querySelector(elem);
}

function getAllElem(elems){
  return document.querySelectorAll(elems);
}

// 获取、设置样式
function getCls(elem){
  return elem.getAttribute('class');
}

function setCls(elem, cls){
  return elem.setAttribute('class', cls);
}

// 添加、删除样式
function addCls(elem, cls){
  var baseCls = getCls(elem);
  if(baseCls.indexOf(cls) === -1){
    setCls(elem, baseCls +' '+ cls);
  }
}

function delCls(elem, cls){
  var baseCls = getCls(elem);
  if(baseCls.indexOf(cls) != -1){
    setCls(elem, baseCls.split(cls).join('').replace(/\s+/g, ' '));
  }
}

// 初始化
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

// 给元素添加init样式
function setScreenInit(screenCls){
  var screen = getElem(screenCls);    // 获取当前元素
  var animateElements = screenAnimateElements[screenCls];  //需要设置的动画元素

  for(var i = 0; i<animateElements.length; i++){
    var element = document.querySelector(animateElements[i]);
    var baseCls = element.getAttribute('class');
    element.setAttribute('class', baseCls + ' ' + animateElements[i].substr(1)+'-init');
  }
}

window.onload = function (){
  for(var k in screenAnimateElements){
    if(k === '.first-screen'){
      continue;
    }
    setScreenInit(k);
  }
}

// 滑动添加动画
var navItems = getAllElem('.nav-item-a');
var silderItems = getAllElem('.silder-item');

// 导航动态添加样式
function switch_active(index, elem, cls){
  for(var i = 0; i< elem.length; i++){
    delCls(elem[i], cls);
  }
  addCls(elem[index], cls);
}

function playAnimateDone(screenCls){
  var screen = getElem(screenCls);
  var animateElements = screenAnimateElements[screenCls];

  for(var i = 0; i<animateElements.length; i++){
    var element = document.querySelector(animateElements[i]);
    var baseCls = element.getAttribute('class');
    element.setAttribute('class',baseCls.replace('-init','-done'));
  }
}

window.onscroll = function (){
  var top = document.body.scrollTop;
  // console.log(top);

  if(top > 740){
    addCls(getElem('.header'), 'header_active');
    addCls(getElem('.silder'), 'silder-active');
  }else{
    delCls(getElem('.header'), 'header_active');
    delCls(getElem('.silder'), 'silder-active');

    switch_active(0, navItems, 'nav-item-active');
    switch_active(0, silderItems, 'silder-item-active');
  }

  if(top > 1){
    playAnimateDone('.first-screen');
    switch_active(0, navItems, 'nav-item-active');
    switch_active(0, silderItems, 'silder-item-active');
  }
  if(top > 800*1 - 66){
    playAnimateDone('.second-screen');
    switch_active(1, navItems, 'nav-item-active');
    switch_active(1, silderItems, 'silder-item-active');
  }
  if(top > 800*2 - 66){
    playAnimateDone('.third-srceen');
    switch_active(2, navItems, 'nav-item-active');
    switch_active(2, silderItems, 'silder-item-active');
  }
  if(top > 800*3 - 66){
    playAnimateDone('.fourth-screen');
    switch_active(3, navItems, 'nav-item-active');
    switch_active(3, silderItems, 'silder-item-active');
  }
  if(top > 800*4 - 66){
    playAnimateDone('.fifth-screen');
    switch_active(4, navItems, 'nav-item-active');
    switch_active(4, silderItems, 'silder-item-active');
  }
}

// 双向定位
function setNavJump(i, elem, cls){
  var item = elem[i];
  item.onclick = function (){
    var numTop = i*800 + 'px';
    $(document.body).animate({scrollTop: numTop}, 800);
  }
}

for(var i = 0; i<navItems.length; i++){
  setNavJump(i, navItems);
  //switch_active(i, navItems, 'nav-item-active');
}

for(var i = 0; i<silderItems.length; i++){
  setNavJump(i, silderItems);
  //switch_active(i, silderItems, 'silder-item-active');
}

// 鼠标滑动效果

var navTip = getElem('.nav-tip');

function setTip(index, elem){
  elem[index].onmouseenter = function () {
   navTip.style.left = elem[index].offsetLeft + 'px';
  }

  var activeIndex = 0;
  elem[index].onmouseleave = function () {
  for(var i = 0; i< elem.length; i++){
      if(getCls(elem[i]).indexOf('nav-item-active') === -1){
        activeIndex = i;
        break;
      }
    }
    navTip.style.left = (activeIndex * 98) + 'px';
  }
}

for(var i = 0; i< navItems.length; i++){
  setTip(i, navItems);
}

setTimeout(function (){
  playAnimateDone('.first-screen')
}, 500);
