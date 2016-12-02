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


//Android和苹果设备则设置音乐片段为16
var SIZE = 32; //音乐片段数
isMobile && (SIZE = 16);


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
const Render = (ctx,type) => {	
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

//初始化heigth，width以及canvas的宽高
const init = () => {
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
 * [渲染canvas]
 * @return {[type]} [description]
 */
export const renderInit = () => {
     init();
     window.onresize = init;	  
}

/**
 * [ac description]
 * @type {[type]}
 */

//创建音频环境
// var ac = new (window.AudioContext ||window.webkitAudioContext || window.mozAudioContext)();

// //控制音量的GainNode
// var gainNode = ac[ac.createGain ? "createGain" : "createGainNode"]();

// //音频分析对象
// var analyser = ac.createAnalyser();

// analyser.connect(gainNode);

// gainNode.connect(ac.destination);

// //Android和苹果设备则设置音乐片段为16
// var SIZE = 32; //音乐片段数
// isMobile && (SIZE = 16);

/**
 * [解码]
 * @param  {[type]} arraybuffer [description]
 * @param  {[type]} fun         [description]
 * @return {[type]}             [description]
 */
// const decode = (arraybuffer,fun) => {
// 		 ac.decodeAudioData(arraybuffer, function(buffer){
// 			var bufferSourceNode = ac.createBufferSource();
// 			bufferSourceNode.buffer = buffer;
// 			fun.call(bufferSourceNode);
// 		},function(err){
// 			console.log(err);
// 		})	  
// }
/**
 * [视频可视化]
 * @param  {[type]} mv [description]
 * @return {[type]}    [description]
 */
// export const visualize = (mv) => {
// 		mv.analyser.fftSize = SIZE * 2;
// 		var arr = new Uint8Array(mv.analyser.frequencyBinCount);

// 		var requestAnimationFrame = window.requestAnimationFrame || 
// 									window.webkitRequestAnimationFrame || 
// 									window.oRequestAnimationFrame || 
// 									window.mzRequestAnimationFrame;
// 		function v(){
// 			mv.analyser.getByteFrequencyData(arr);
// 			//将分析得到的音频数据传递给mv.visualizer方法可视化
// 			mv.visualizer.call(arr);
// 			requestAnimationFrame(v);
// 		}

// 		 requestAnimationFrame(v);	  
// }


/**
 * @author [author]
 * @description [description]
 * @param {[type]} [varname] [description]
 */

export let Visualizer = function(file){
	 this.file = file;
	 console.log(this.file)
	 this.audioContext = null;
	 this.source = null;
	 //this.init();
}

Visualizer.prototype = {
	  constructor: Visualizer,
	  init: function(){
           this.prepare();
           this.start();
	  },
	  load: function(url,fun){
         var xhr = new XMLHttpRequest();
         xhr.abort();
         xhr.open('GET',url,false);
         xhr.responseType = 'arraybuffer';

         xhr.onload = function(){
               fun && fun.call(xhr.response);
         }

         xhr.send();

	  },
	  prepare: function(){
	  	  window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
	  	  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
	  	  window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
		  try {
				this.audioContext = new AudioContext();
			} catch (e) {
				console.log('!Your browser does not support AudioContext',e);
		  }
	  },
	  start: function(){
	  	   var that = this;
	  	   var file = this.file;
	  	   var fr = new FileReader();
	  	   fr.onload = function(e){
	  	   	    var fileResult = e.target.result;
	  	   	    var audioContext = that.audioContext;
	  	   	    if(!audioContext){
                    return null;
	  	   	    }
	  	   	    audioContext.decodeAudioData(fileResult,function(buffer){
                      console.log('decode successfully start Visualizer');
                      that._visualizer(audioContext,buffer)
	  	   	    },function(e){
	  	   	    	  console.log('decode Fail',e)
	  	   	    })
	  	   }

	  	  fr.onerror = function(e){
	  	  	   console.log('read file fail')   
	  	  }

	  	  fr.readAsArrayBuffer(file); 
	  },
	  _visualizer: function(audioContext,buffer){
          var audioBufferSouceNode = audioContext.createBufferSource();
          var analyser = audioContext.createAnalyser();
          var that = this;

          audioBufferSouceNode.connect(analyser);

          analyser.connect(audioContext.destination);

          audioBufferSouceNode.buffer = buffer;

          if(!audioBufferSouceNode.start){
                audioBufferSouceNode.start = audioBufferSouceNode.noteOn;
                audioBufferSouceNode.stop = audioBufferSouceNode.noteOff;
          }

          if(this.animationId !== null){
               cancelAnimationFrame(this.animationId);
          }

          if(this.source !== null){
               this.source.stop(0);
          }

          audioBufferSouceNode.start(0);
          this.status = 1;
          this.source = audioBufferSouceNode;

	      var array = new Uint8Array(analyser.frequencyBinCount);

		   function v(){
				analyser.getByteFrequencyData(array);
				requestAnimationFrame(v);
			}
		
	      requestAnimationFrame(v);

          audioBufferSouceNode.onended = function(){
          	   that._audioEnd();
          }
	  },
	  _audioEnd: function(){
        if (this.forceStop) {
            this.forceStop = false;
            this.status = 1;
            return;
        };
           this.status = 0;  	  
	  }
}