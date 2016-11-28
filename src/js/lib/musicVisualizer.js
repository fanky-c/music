var boxColumn = $("#canvasColumn");
var boxDot = $("#canvasDot");
var canvasColumn = document.createElement("canvas");
var canvasDot = document.createElement("canvas");

//添加canvas
boxColumn.append(canvasColumn);
boxDot.append(canvasDot);	

var ctxColumn = canvasColumn.getContext("2d");
var ctxDot = canvasDot.getContext("2d");
var HEIGHT, //canvas高
	WIDTH; //canvs 宽
var ARR = []; //该数组保存canvas中各图形的x,y坐标以及他们的颜色
ARR.dotMode = "random";
var isMobile = false;
var isApple = false;
!function() {
	var u = window.navigator.userAgent;
	var m = /(Android)|(iPhone)|(iPad)|(iPod)/i;
	if (m.test(u)) {
		isMobile = true;
	}
	var ap = /(iPhone)|(iPad)|(iPod)|(Mac)/i;
	if (ap.test(u)) {
		isApple = true;
	}
}();

//Android和苹果设备则设置音乐片段为16
var SIZE = 32; //音乐片段数
isMobile && (SIZE = 16);

window.onresize = init;
init();

//初始化heigth，width以及canvas的宽高
function init(){
	HEIGHT = $(window).height();
	WIDTH = $(window).width();
	canvasDot.height = canvasColumn.height = HEIGHT;
	canvasDot.width = canvasColumn.width = WIDTH;
	
	getArr(ctxColumn);
	Render(ctxColumn,'Column');

	getArr(ctxDot);
	Render(ctxDot,'Dot');
}

/**
 * [random 随机值]
 * @param  {[type]} _min [description]
 * @param  {[type]} _max [description]
 * @return {[type]}      [description]
 */
function random(_min, _max){
	var min = _min || 0;
	var max = _max || 1;
	return max >= min ? Math.round(Math.random()*(max - min) + min) : 0;
}

/**
 * [getArr 	创建线性渐变对象，以便绘制柱状图使用]
 * @return {[type]} [description]
 */
function getArr(ctx) {
	ARR.length = 0;
	ARR.linearGradient = ctx.createLinearGradient(0, HEIGHT, 0, 0);
	ARR.linearGradient.addColorStop(0, 'green');
	ARR.linearGradient.addColorStop(0.5, '#ff0');
	ARR.linearGradient.addColorStop(1, '#f00');

	for (var i = 0; i < SIZE; i++) {
		var x = random(0, WIDTH),
			y = random(0, HEIGHT),
			color = 'rgba(' + random(100, 250) + ',' + random(50, 250) + ',' + random(50, 100) + ',0)',
			ran = random(1, 4);
		ARR.push({
			x: x,
			y: y,
			color: color,
			dx: ARR.dotMode == "random" ? ran : 0,
			dx2: ran,
			dy: random(1, 5),
			cap: 0,
			cheight: 10
		});
	}
}

/**
 * [Render 渲染]
 */
function Render(ctx,type){	
	var o = null;
	var RenderCanvasType = type;		
	var w = Math.round(WIDTH / SIZE);
	var cgap = Math.round(w * 0.3);
	var cw = w - cgap;
	ctx.fillStyle = ARR.linearGradient;
	ctx.clearRect(0, 0, WIDTH, HEIGHT);

	for(var i = 0; i < SIZE; i++){		
		o = ARR[i];
		if(RenderCanvasType == 'Dot'){
			var x = o.x,
			y = o.y,
			//r = Math.round((this[i]/2+18)*(HEIGHT > WIDTH ? WIDTH : HEIGHT)/(isMobile ? 500 : 800));
			r = Math.round((i/2+18)*(HEIGHT > WIDTH ? WIDTH : HEIGHT)/(isMobile ? 500 : 800));
			o.x += o.dx;
			o.x > (WIDTH + r) && (o.x = - r);

			//开始路径，绘画圆
			ctx.beginPath();
			ctx.arc(x, y, r, 0, Math.PI * 2, true);
	    	var gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
		    gradient.addColorStop(0, "rgb(255,255,255)");
		    gradient.addColorStop(1, o.color);
		    ctx.fillStyle = gradient;
		    ctx.fill();		    
		}
		if(RenderCanvasType == 'Column'){
			//var h = this[i] / 280 * HEIGHT;
			var h = i / 280 * HEIGHT;
			ARR[i].cheight > cw && (ARR[i].cheight = cw);
			if(--ARR[i].cap < ARR[i].cheight){
				ARR[i].cap = ARR[i].cheight;
			};
			if(h > 0 && (ARR[i].cap < h + 40)){
				ARR[i].cap = h + 40 > HEIGHT ? HEIGHT : h + 40;
			}
			ctx.fillRect(w * i, HEIGHT - ARR[i].cap, cw, ARR[i].cheight);			
			ctx.fillRect(w * i, HEIGHT - h, cw, h);
		}
		
	}	
}