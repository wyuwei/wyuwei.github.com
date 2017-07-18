var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARDIN_LEFT = 30;
var MARGIN_TOP = 60;
//设定截止时间
var endTime = new Date();
endTime.setTime(endTime.getTime()+3600*1000);
var curShowTimeSeconds = 0;
var balls = [];
var colors = ['#33B5E5','#0099CC','#AA66CC','#9933CC','#99CC00','#669900','#FB3','#F80','#F44','#C00'];

window.onload = function (){

	//屏幕自适应
	WINDOW_WIDTH = document.documentElement.clientWidht || document.body.clientWidth;
	WINDOW_HEIGHT = document.documentElement.clientHeight || document.body.clientHeight;

	MARDIN_LEFT = Math.round(WINDOW_WIDTH/10);
	MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);

	RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108)-1;

	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

	curShowTimeSeconds = getCurrentShowTimeSeconds();

	setInterval(function (){
		render(context);
		update();
	},50);

	/*render(context);*/
};

function getCurrentShowTimeSeconds(){
	var curTime = new Date();
	var ret = endTime.getTime() - curTime.getTime();
	ret = Math.round(ret/1000);
	return ret >=0 ? ret : 0;

}

function update(){

	var nextShowTimeSeconds = getCurrentShowTimeSeconds();
	var nextHours = parseInt(nextShowTimeSeconds / 3600);
	var nextMinutes = parseInt((nextShowTimeSeconds - nextHours*3600)/60);
	var nextSeconds = nextShowTimeSeconds % 60;

	var curHours = parseInt(curShowTimeSeconds /3600);
	var curMinutes = parseInt((curShowTimeSeconds - curHours*3600)/60);
	var curSeconds = curShowTimeSeconds % 60;

	if(nextSeconds != curSeconds){
		if(parseInt(curHours/10) != parseInt(nextHours/10)){
			addBalls(MARDIN_LEFT+0, MARGIN_TOP,parseInt(curHours/10));
		}
		if(parseInt(curHours%10) != parseInt(nextHours%10)){
			addBalls(MARDIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(curHours%10))
		}
		if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
			addBalls(MARDIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes/10))
		}
		if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
			addBalls(MARDIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes%10))
		}if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
			addBalls(MARDIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(curSeconds/10))
		}
		if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
			addBalls(MARDIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(curSeconds%10))
		} 
		curShowTimeSeconds = nextShowTimeSeconds;
	}
	updateBalls();
	//console.log(balls.length);
}

//小球的运动
function updateBalls(){
	for(var i=0; i<balls.length; i++){

		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if(balls[i].y > WINDOW_HEIGHT - RADIUS){
			balls[i].y = WINDOW_HEIGHT -RADIUS;
			//为小球的重力加速度增加0.75的摩擦率
			balls[i].vy = -balls[i].vy*0.75;
		}
	}

	//判断小球是否还在canvas中
	var cnt = 0;
	for(var i = 0; i < balls.length; i++){
		if(balls[i].x - RADIUS > 0 && balls[i].x -RADIUS <WINDOW_WIDTH){
			balls[cnt++] = balls[i];
		} 
	}
	while( balls.length > Math.min(300,cnt)){
		balls.pop();
	}	
}

//一个小球的产生
function addBalls(x,y,num){
	for(var i = 0; i<digit[num].length; i++){
		for(var j = 0; j<digit[num][i].length; j++){
			if(digit[num][i][j]==1){
				var aBall = {
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					//重力加速度是1.5+(0,1)之间的随机数
					g:1.5+Math.random(),
					//x轴速度，是4*(+/-1)的幂运算，如果随机数是奇数为负，随机数为偶为正
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					//颜色，向下取整，随机出0-10，不包含10之间的随机数
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
			}
		}
	}
}

function render(cxt){

	//对整个矩形屏幕进行刷新
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

	var hours = parseInt(curShowTimeSeconds / 3600);
	var minutes = parseInt((curShowTimeSeconds - hours * 3600)/60);
	var seconds = curShowTimeSeconds%60;


	/*var oDate = new Date();
	var hours = oDate.getHours();
	var minutes = oDate.getMinutes();
	var seconds = oDate.getSeconds();*/

	//绘制时间
	renderDigit(MARDIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt);
	renderDigit(MARDIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt);
	renderDigit(MARDIN_LEFT + 30*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
	renderDigit(MARDIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
	renderDigit(MARDIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
	renderDigit(MARDIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
	renderDigit(MARDIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
	renderDigit(MARDIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);

	//绘制小球

	for(var i = 0; i<balls.length; i++){
		cxt.fillStyle = balls[i].color;
		cxt.beginPath();
		cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI,true);
		cxt.closePath();
		cxt.fill();
	}
}

function renderDigit(x,y,num,cxt){
	cxt.fillStyle = 'rgb(0,102,253)';

	for(var i = 0; i<digit[num].length; i++){
		for(var j = 0; j<digit[num][i].length; j++){
			if(digit[num][i][j] == 1){
				cxt.beginPath();
				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS, 0 , 2*Math.PI);
				cxt.closePath();
				cxt.fill();
			}
		}
	}
}