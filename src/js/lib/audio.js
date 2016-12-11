import {renderInit,Visualizer} from './musicVisualizer';

let repeat = localStorage.repeat || 0,
	shuffle = localStorage.shuffle || 'false',
	continous = true,
	autoplay = true,
	playlist = [];
let time = new Date(),
  	currentTrack = shuffle === 'true' ? time.getTime() % playlist.length : 0,
  	trigger = false,
  	track = null,
  	audio, timeout, isPlaying, playCounts;

let VisualizerClass = null;

/**
 * 随即切换背景图
 */
const getRandom = (num) => {
	return Math.floor(1 + Math.random() * num);
}
$('#background').css('background-image', 'url(../images/bg' + getRandom(12) + '.webp)');


/**
 *  音频列表UI
 */
playlist = [{
	     	"title": "Scorpions",
	     	"artist": "抒情"	       	  
	       },{
	     	"title": "Mika - Relax, Take It Easy",
	     	"artist": "抒情"	       	  
	       },{
	     	"title": "Sam Tsui - Sugar",
	     	"artist": "抒情"	       	  
	       }];
	       	    
for(let i=0; i<playlist.length; ++i){
      let itemList = playlist[i];
      $('#playlist').append('<li>'+itemList.title+' - '+itemList.artist+'</li>');
}



/**
 *  操作音乐播放器
 */
const play = () => {
	 audio.play();
	 $('.playback').addClass('playing');
	 //VisualizerClass.start();  //开启可视化
	 timeout = setInterval(updateAudioProgress, 500);
	 isPlaying = true;
}

const pause = () => {
	  audio.pause();
	  $('.playback').removeClass('playing');
	  VisualizerClass.stop();  //暂停可视化
	  updateAudioProgress && clearInterval(updateAudioProgress);
	  isPlaying = false;
}

const setAudioProgress = (value) => {
    var currentSec = parseInt(value%60) < 10 ? '0' + parseInt(value%60) : parseInt(value%60),
        ratio = value / audio.duration * 100;

	    $('.timer').html(parseInt(value/60)+':'+currentSec);
	    $('.progress .pace').css('width', ratio + '%');
	    $('.progress .slider a').css('left', ratio + '%');	 
}

const updateAudioProgress = () => {
	  setAudioProgress(audio.currentTime);   
}

$('.progress .slider').slider({
	step: 0.1,
	slide: (event, ui) => {
		$(this).addClass('enable');
		setAudioProgress(audio.duration * ui.value / 100);
		clearInterval(timeout);
	},
	stop: (event, ui) => {
		audio.currentTime = audio.duration * ui.value / 100;
		$(this).removeClass('enable');
		timeout = setInterval(updateAudioProgress, 500);
	}
});




/**
 *  控制音量
 */
const setVolume = (value) => {
       audio.volume = localStorage.volume = value;
       $('.volume .pace').css('width', value * 100 + '%');
       $('.volume .slider a').css('left', value * 100 + '%');       
}


let volume = localStorage.volume || 0.5;

$('.volume .slider').slider({
	max: 1,
	min: 0,
	step: 0.01,
	value: volume,
	slide: (event, ui) => {
		setVolume(ui.value);
		$(this).addClass('enable');
		$('.mute').removeClass('enable');
	},
	stop: () => {
		$(this).removeClass('enable');
	}
}).children('.pace').css('width', volume * 100 + '%');

//无声和有声切换
$('.mute').click(function(){
	if ($(this).hasClass('enable')) {
		setVolume($(this).data('volume'));
		$(this).removeClass('enable');
	} else {
		$(this).data('volume', audio.volume).addClass('enable');
		setVolume(0);
	}
});


/**
 *   循环模式
 */
const switchTrack = (i) => {
    if (i < 0){
      track = currentTrack = playlist.length - 1;
    } else if (i >= playlist.length){
      track = currentTrack = 0;
    } else {
      track = i;
    }
    $('audio').remove();
    loadMusic(track);
    if (isPlaying == true) play();   	  
}

const shufflePlay = () => {
	var time = new Date(),
		lastTrack = currentTrack;

	currentTrack = time.getTime() % playlist.length;
	if (lastTrack == currentTrack) ++currentTrack;
	switchTrack(currentTrack);
}

const ended = () =>{
	pause();
	audio.currentTime = 0;
	playCounts++;
	if (continous == true) isPlaying = true;
	if (repeat == 1) {
		play();
	} else {
		if (shuffle === 'true') {
			shufflePlay();
		} else {
			if (repeat == 2) {
				switchTrack(++currentTrack);
			} else {
				if (currentTrack < playlist.length) switchTrack(++currentTrack);
			}
		}
	}
}

const beforeLoad = function (obj) {
    var endVal = obj.seekable && obj.seekable.length ? $(obj)[0].seekable.end(0) : 0;
    $('.progress .loaded').css('width', (100 / (obj.duration || 1) * endVal) +'%');
}


const afterLoad = () => {
	if (autoplay == true) play();
}

/**
 *   加载文件,从加载列表中获取
 */
const loadMusic = (i) => {
	var item = playlist[i],
	    random = getRandom(12),
		newaudio = $('<audio>').html('<source src="../file/' + item.title + '.mp3">').appendTo('#player');

	$('.cover').html('<img src="../images/bg' + random + '.webp" alt="' + item.title + '">');
	$('#background').css('background-image', 'url(../images/bg' + random + '.webp)');
	$('.tag').html('<strong>' + item.title + '</strong><span class="artist">' + item.artist + '</span>');
	$('#playlist li').removeClass('playing').eq(i).addClass('playing');
	if ($('#playlist li').eq(i).offset().top > 600) {
		$('body').scrollTo('li.playing', {
			duration: 1500
		});
	}
	$('title').text(item.title + " - " + item.artist);
	audio = newaudio[0];
	audio.volume = $('.mute').hasClass('enable') ? 0 : volume;
     VisualizerClass && VisualizerClass.stop();
	 VisualizerClass  = new Visualizer(
	       ['../file/'+ item.title +'.mp3']
	  );

    
    //提示音频的元数据已加载
	audio.addEventListener('loadstart',function(){
		console.log('loadstart'); 
	},false)

	//更改声频、视频的时长时
	audio.addEventListener('durationchange', function(){
		  beforeLoad(this);
		  console.log('durationchange');
	}, false); 

	
	//提示音频的元数据已加载
	audio.addEventListener('loadedmetadata', function(){
		   afterLoad();
		   console.log('loadedmetadata');
	}, false);
    
    //提示当前帧的数据是可用的
	audio.addEventListener('loadeddata',function(){
		  console.log('loadeddata');
	},false)    
	
	//浏览器正在下载媒体数据时
	audio.addEventListener('progress', function(){
		  beforeLoad(this);
		  console.log('progress');
	}, false);    
	
	
	//浏览器可以播放媒体数据时
	audio.addEventListener('canplay', function(){
		  afterLoad();
		  console.log('canplay');

	}, false);

	//当浏览器可以在不因缓冲而停顿的情况下播放时
	audio.addEventListener('ended', function(){
		  ended();
		  console.log('ended');
	}, false);

	//提示视频能够不停顿地一直播放
	audio.addEventListener('canplaythrough',function(){
		  console.log('canplaythrough');
	 
	},false);	
}

loadMusic(currentTrack || 0);


//暂停播放
$('.playback').on('click', function(){
  	if ($(this).hasClass('playing')) {
  		pause();
  	} else {
  		play();
  	}
});

//上一首
$('.rewind').on('click', () => {
	if (shuffle === 'true') {
		shufflePlay();
	} else {
		switchTrack(--currentTrack);
	}
});

//下一首
$('.fastforward').on('click', () => {
	if (shuffle === 'true') {
		shufflePlay();
	} else {
		switchTrack(++currentTrack);
	}
});

//自己选择
$('#playlist li').each(function(i){
	var _i = i;
	$(this).on('click', () => {
		switchTrack(_i);
	});
});


	if (shuffle === 'true') $('.shuffle').addClass('enable');
	if (repeat == 1) {
		$('.repeat').addClass('once');
	} else if (repeat == 2) {
		$('.repeat').addClass('all');
	}
   
   //单曲循环和顺序播放
  $('.repeat').on('click', function(){
  	if ($(this).hasClass('once')) {
  		repeat = localStorage.repeat = 2;
  		$(this).removeClass('once').addClass('all');
  	} else if ($(this).hasClass('all')) {
  		repeat = localStorage.repeat = 0;
  		$(this).removeClass('all');
  	} else {
  		repeat = localStorage.repeat = 1;
  		$(this).addClass('once');
  	}
  });
  
  //随机播放
  $('.shuffle').on('click', function(){
  	if ($(this).hasClass('enable')) {
  		shuffle = localStorage.shuffle = 'false';
  		$(this).removeClass('enable');
  	} else {
  		shuffle = localStorage.shuffle = 'true';
  		$(this).addClass('enable');
  	}
  });


/**
 *  监听键盘事件
 */
$(document).keydown((event) => {
	event.preventDefault();
	if (event.keyCode == 37) {
		if (shuffle === 'true') {
			shufflePlay();
		} else {
			switchTrack(--currentTrack);
		}
	} else if (event.keyCode == 39) {
		if (shuffle === 'true') {
			shufflePlay();
		} else {
			switchTrack(++currentTrack);
		}
	} else if (event.keyCode == 32) {
		if ($('.playback').hasClass('playing')) {
			pause();
		} else {
			play();
		}
	}
});

$(() => {
   rotatingSlider('.slider3d');
   renderInit();
})