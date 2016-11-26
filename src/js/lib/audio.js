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

/**
 * 随即切换背景图
 */
const getRandom = function(num){
	return Math.floor(1 + Math.random() * num);
}
$('#background').css('background-image', 'url(../images/bg' + getRandom(12) + '.webp)');


/**
 *  音频列表UI
 */
playlist = [{
	     	"title": "123",
	     	"artist": "轻音乐"
	       },{
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
const play = function(){
	 audio.play();
	 $('.playback').addClass('playing');
	 timeout = setInterval(updateAudioProgress, 500);
	 isPlaying = true;
}

const pause = function(){
	  audio.pause();
	  $('.playback').removeClass('playing');
	  updateAudioProgress && clearInterval(updateAudioProgress);
	  isPlaying = false;
}

const setAudioProgress = function(value){
    var currentSec = parseInt(value%60) < 10 ? '0' + parseInt(value%60) : parseInt(value%60),
        ratio = value / audio.duration * 100;

	    $('.timer').html(parseInt(value/60)+':'+currentSec);
	    $('.progress .pace').css('width', ratio + '%');
	    $('.progress .slider a').css('left', ratio + '%');	 
}

const updateAudioProgress = function (){
	  setAudioProgress(audio.currentTime);   
}

$('.progress .slider').slider({
	step: 0.1,
	slide: function(event, ui) {
		$(this).addClass('enable');
		setAudioProgress(audio.duration * ui.value / 100);
		clearInterval(timeout);
	},
	stop: function(event, ui) {
		audio.currentTime = audio.duration * ui.value / 100;
		$(this).removeClass('enable');
		timeout = setInterval(updateAudioProgress, 500);
	}
});




/**
 *  控制音量
 */
const setVolume = function(value){
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
	slide: function(event, ui) {
		setVolume(ui.value);
		$(this).addClass('enable');
		$('.mute').removeClass('enable');
	},
	stop: function() {
		$(this).removeClass('enable');
	}
}).children('.pace').css('width', volume * 100 + '%');

//无声和有声切换
$('.mute').click(function() {
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
const switchTrack = function(i){
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

const shufflePlay = function(){
	var time = new Date(),
		lastTrack = currentTrack;

	currentTrack = time.getTime() % playlist.length;
	if (lastTrack == currentTrack) ++currentTrack;
	switchTrack(currentTrack);
}

const ended = function(){
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

const beforeLoad = function(){
    var endVal = this.seekable && this.seekable.length ? this.seekable.end(0) : 0;
    $('.progress .loaded').css('width', (100 / (this.duration || 1) * endVal) +'%'); 
}


const afterLoad = function(){
	if (autoplay == true) play();
}

/**
 *   加载文件,从加载列表中获取
 */
const loadMusic = function(i){
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
	audio.addEventListener('progress', beforeLoad, false);
	audio.addEventListener('durationchange', beforeLoad, false);
	audio.addEventListener('canplay', afterLoad, false);
	audio.addEventListener('ended', ended, false);
}

loadMusic(currentTrack || 0);


//暂停播放
$('.playback').on('click', function() {
  	if ($(this).hasClass('playing')) {
  		pause();
  	} else {
  		play();
  	}
});

//上一首
$('.rewind').on('click', function() {
	if (shuffle === 'true') {
		shufflePlay();
	} else {
		switchTrack(--currentTrack);
	}
});

//下一首
$('.fastforward').on('click', function() {
	if (shuffle === 'true') {
		shufflePlay();
	} else {
		switchTrack(++currentTrack);
	}
});

//自己选择
$('#playlist li').each(function(i) {
	var _i = i;
	$(this).on('click', function() {
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
  $('.repeat').on('click', function() {
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
  $('.shuffle').on('click', function() {
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
$(document).keydown(function(event) {
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
		event.preventDefault();
		if ($('.playback').hasClass('playing')) {
			pause();
		} else {
			play();
		}
	}
});

$(function(){
   rotatingSlider('.slider3d');
})