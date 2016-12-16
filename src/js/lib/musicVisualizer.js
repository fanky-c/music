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


/**
 * [判断客户端UA]
 * @param  {[type]} ( [description]
 * @return {[type]}   [description]
 */
(() => {
	var u = window.navigator.userAgent;
	var m = /(Android)|(iPhone)|(iPad)|(iPod)/i;
	if (m.test(u)) {
		isMobile = true;
	}
	var ap = /(iPhone)|(iPad)|(iPod)|(Mac)/i;
	if (ap.test(u)) {
		isApple = true;
	}
})();


//Android和苹果设备则设置音乐片段为16
var SIZE = 32; //音乐片段数
isMobile && (SIZE = 16);

/**
 * [random 随机值]
 * @param  {[type]} _min [description]
 * @param  {[type]} _max [description]
 * @return {[type]}      [description]
 */
const random = (_min, _max) => {
	var min = _min || 0;
	var max = _max || 1;
	return max >= min ? Math.round(Math.random()*(max - min) + min) : 0;
}

/**
 * [getArr 	创建线性渐变对象，以便绘制柱状图使用]
 * @return {[type]} [description]
 */
const getArr = (ctx) => {
	ARR.length = 0;
	ARR.linearGradient = ctx.createLinearGradient(0, HEIGHT, 0, 0);
	ARR.linearGradient.addColorStop(0, 'green');
	ARR.linearGradient.addColorStop(0.5, '#3ebaf0');
	ARR.linearGradient.addColorStop(1, '#ffd257');

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
const Render = (ctx,type,musicArray) => {	
	var o = null;
	var RenderCanvasType = type;
	return function() {
		var w = Math.round(WIDTH / SIZE);
		var cgap = Math.round(w * 0.3);
		var cw = w - cgap;
		ctx.fillStyle = ARR.linearGradient;
		ctx.clearRect(0, 0, WIDTH, HEIGHT);


		for (var i = 0; i < SIZE; i++) {
			o = ARR[i];
			if (RenderCanvasType == 'Dot') {
				var x = o.x,
					y = o.y,
					r = Math.round((musicArray[i]/2+18)*(HEIGHT > WIDTH ? WIDTH : HEIGHT)/(isMobile ? 500 : 800));
				o.x += o.dx;
				o.x > (WIDTH + r) && (o.x = -r);

				//开始路径，绘画圆
				ctx.beginPath();
				ctx.arc(x, y, r, 0, Math.PI * 2, true);
				var gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
				gradient.addColorStop(0, "rgb(255,255,255)");
				gradient.addColorStop(1, o.color);
				ctx.fillStyle = gradient;
				ctx.fill();
			}
			if (RenderCanvasType == 'Column') {
				var h = musicArray[i] / 280 * HEIGHT;
				ARR[i].cheight > cw && (ARR[i].cheight = cw);
				if (--ARR[i].cap < ARR[i].cheight) {
					ARR[i].cap = ARR[i].cheight;
				};
				if (h > 0 && (ARR[i].cap < h + 40)) {
					ARR[i].cap = h + 40 > HEIGHT ? HEIGHT : h + 40;
				}
				ctx.fillRect(w * i, HEIGHT - ARR[i].cap, cw, ARR[i].cheight);
				ctx.fillRect(w * i, HEIGHT - h, cw, h);
			}

		}
	}
}

//初始化heigth，width以及canvas的宽高
const init = () => {
	HEIGHT = $(window).height();
	WIDTH = $(window).width();
	canvasDot.height = canvasColumn.height = HEIGHT;
	canvasDot.width = canvasColumn.width = WIDTH;
	
	getArr(ctxColumn);
	// Render(ctxColumn,'Column');

	getArr(ctxDot);
	// Render(ctxDot,'Dot');
}

/**
 * [渲染canvas]
 * @return {[type]} [description]
 */
export const renderInit = () => {
     init();
     window.onresize = init;	  
}


/**
 * @author [fanky_c]
 * @description [description]
 * @param {[type]} [varname] [description]
 */

export const Visualizer = function(urlList,callBack){
	 //创建AudioContext环境
	 this.context = new (window.AudioContext || window.webkitAudioContext)();
	 
	 //创建一个新的AudioBufferSourceNode接口
	 this.source = this.context.createBufferSource();
    
     //分析音频源
     this.analyser = this.context.createAnalyser();
    
     this.source.connect(this.analyser);
  

     //控制音量
     this.gainNode = this.context.createGain();

     this.source.connect(this.gainNode);

     //表示context中所有音频（节点）的最终目标节点，一般是音频渲染设备，比如扬声器。     
     this.source.connect(this.context.destination);
     
     this.gainNode.gain.value = 0;
     console.log('ww3',this.gainNode.gain);

     this.currentTime = 0;
	 this.urlList = urlList;
	 this.callBack = callBack;
	 this.bufferList = new Array();
	 this.loadCount = 0;
	 this.size = SIZE || 32;
	 this.init();
}

Visualizer.timer = null;  //类属性

Visualizer.prototype = {
	  constructor: Visualizer,
	  init: function(){	       
	        this.play();
	  },
	  play: function(){
	  	  var that = this;
	  	  for(let i=0;i<this.urlList.length;++i){
                  this.load(this.urlList[i],i);
	  	  }
	  },
	  animation: function(bufferList){
     	 var requestAnimationFrame =
         	 window.requestAnimationFrame ||
         	 window.webkitRequestAnimationFrame ||
         	 window.oRequestAnimationFrame ||
         	 window.mzRequestAnimationFrame;
        var  musicArray = [];
        var  that = this;
        var  timer = null; 	 
             
             this.source.buffer = this.bufferList[0];

             this.analyser.fftSize = this.size * 2;

             musicArray = new Uint8Array(this.analyser.frequencyBinCount);

             Visualizer.timer && (window.cancelAnimationFrame || window.mozCancelAnimationFrame)(Visualizer.timer);

			function v() {
				that.analyser.getByteFrequencyData(musicArray);
				that.currentTime = that.context.currentTime;
				that.RafTimes = requestAnimationFrame(v);
				Render(ctxDot, 'Dot', musicArray)();
				Render(ctxColumn, 'Column', musicArray)();
			}

			Visualizer.timer = requestAnimationFrame(v);

	  },	  
	  load: function(url,index){
         var that = this;
         var xhr = new XMLHttpRequest();         
         xhr.abort();
         xhr.open('GET',url,true);
         xhr.responseType = 'arraybuffer';
         
         console.log('当前请求路径:'+url);

         xhr.onload = function(){
               that.context.decodeAudioData(xhr.response,function(buffer){
                    if(!buffer){
                         console.log('error decoding file data:' + url);
                         return;
                    }
                    that.bufferList[index] = buffer;
                    if(++that.loadCount == that.urlList.length){                        
	                       that.source.start ? that.source.start(0) : that.source.noteOn(0);
	                       that.animation(that.bufferList);
	                       that.callBack && that.callBack.apply(that);
                    }
               },function(error){
               	     console.error('decodeAudioData error', error)
               })

         }

         xhr.onerror = function(){
         	  console.log('XHR error')
         }

         xhr.send();

	  },
	  replay: function(){  //重新播放
        this.source && (this.source.start ? this.source.start(this.context.currentTime) : this.source.noteOn(this.context.currentTime));  
	    console.log(this.context.currentTime);
	  },
	  pause: function(){ //暂停播放  
		if (!this.source.stop) {
			this.source.stop = this.source.noteOff;
		}
		this.source.stop(this.context.currentTime);	   
         //this.source && (this.source.stop ? this.source.stop(this.context.currentTime || 0) : this.source.noteOff(this.context.currentTime || 0)); 
	  },
	  stop: function(){  //停止播放
		if (!this.source.stop) {
			this.source.stop = this.source.noteOff;
		}
		this.source.stop(0);
	  	//this.source && (this.source.stop ? this.source.stop(0) : this.source.noteOff(0));
	  },	  
	  changeVolume: function(num){
	  	  this.gainNode.gain.value = num;
	  	  console.log(this.gainNode.gain);
	  }	  

}	