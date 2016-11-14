(function($){
  // Settings
  var repeat = localStorage.repeat || 0,
    shuffle = localStorage.shuffle || 'false',
    continous = true,
    autoplay = true,
    playlist = [
    {
        "title": "麦田",
        "artist": "纯音乐"
    },
    {
        "title": "Evelyn",
        "artist": "电影原声 "
    },
    {
        "title": "命",
        "artist": "电影原声"
    },
    {
        "title": "驼羔之歌",
        "artist": "马头琴"
    },
    {
        "title": "一声佛号一声心",
        "artist": "佛教音乐"
    },
    {
        "title": "殇",
        "artist": "杰奎琳·杜普雷 "
    },
    {
        "title": "风の誓",
        "artist": "梁邦彦い"
    },
    {
        "title": "琵琶语",
        "artist": "林海"
    },
    {
        "title": "夜的钢琴曲（五）",
        "artist": "石进"
    },
    {
        "title": "大地之梦",
        "artist": "梶浦由記"
    },
    {
        "title": "1945完整演奏版",
        "artist": "海角七号"
    },
    {
        "title": "Amarantine",
        "artist": "enya"
    },
    {
        "title": "APHRODITE",
        "artist": "S.E.N.S"
    },
    {
        "title": "Ave Maria",
        "artist": "Libera"
    },
    {
        "title": "Brave Soul",
        "artist": "S.E.N.S"
    },
    {
        "title": "Castle Gwyn",
        "artist": "Arlene Faith"
    },
    {
        "title": "Dave kozI believe",
        "artist": "Saxophone"
    },
    {
        "title": "D大调卡农",
        "artist": "帕赫贝尔"
    },
    {
        "title": "hear our prayer",
        "artist": "纯音乐"
    },
    {
        "title": "Jade Moon",
        "artist": "S.E.N.S"
    },
    {
        "title": "Jupiter",
        "artist": "Ccotbyel"
    },
    {
        "title": "Kalinikta",
        "artist": "Nicos"
    },
    {
        "title": "Karma",
        "artist": "喜马拉雅原声"
    },
    {
        "title": "kimi wo omou melodi",
        "artist": "atchorike"
    },
    {
        "title": "Kiss the rain",
        "artist": "纯音乐"
    },
    {
        "title": "La Partita（布鲁斯口琴）",
        "artist": "纯音乐"
    },
    {
        "title": "leaving",
        "artist": "NightLeaVe"
    },
    {
        "title": "Leaving Wallbrook On The Road",
        "artist": "Hans Zimmer"
    },
    {
        "title": "Letter",
        "artist": "Heaven Rain"
    },
    {
        "title": "ln un altra vita",
        "artist": "Ludovico Einaudi"
    },
    {
        "title": "Love Conquers All",
        "artist": "杨沛霖"
    },
    {
        "title": "Luv Letter",
        "artist": "DJ OKAWARI"
    },
    {
        "title": "pole dorogi",
        "artist": "DJEIEM "
    },
    {
        "title": "Rissa mento",
        "artist": "电影原声 "
    },
    {
        "title": "river flowns in you",
        "artist": "李闰珉"
    },
    {
        "title": "Serenade",
        "artist": "Jim Brickman"
    },
    {
        "title": "Soul die Hook ist Für euch",
        "artist": "maXimum"
    },
    {
        "title": "Steps",
        "artist": "神秘园"
    },
    {
        "title": "sunset in the lake",
        "artist": "DAISHI DANCE"
    },
    {
        "title": "Tears",
        "artist": "钢琴曲"
    },
    {
        "title": "The Forbidden Garden",
        "artist": "印象中国"
    },
    {
        "title": "the truth that you leave",
        "artist": "PianoBoy"
    },
    {
        "title": "True",
        "artist": "Slient Hill 2 "
    },
    {
        "title": "Ya-Na-Hana",
        "artist": "Various Artists"
    },
    {
        "title": "You",
        "artist": "BGM"
    },
    {
        "title": "いつも何度でも(八音盒版)",
        "artist": "久石让"
    },
    {
        "title": "わらべ唄",
        "artist": "宗次郎"
    },
    {
        "title": "不再需要爱情",
        "artist": "电影原声 "
    },
    {
        "title": "乱红",
        "artist": "纯音乐"
    },
    {
        "title": "予感",
        "artist": "伊福部昭"
    },
    {
        "title": "五月雨",
        "artist": "火影插曲"
    },
    {
        "title": "人生若只如初见",
        "artist": "钢琴曲"
    },
    {
        "title": "假如爱有天意",
        "artist": "电影原声"
    },
    {
        "title": "克罗地亚狂想曲",
        "artist": "马克西姆"
    },
    {
        "title": "再见警察",
        "artist": "纯音乐"
    },
    {
        "title": "写给海洋",
        "artist": "纯音乐"
    },
    {
        "title": "出埃及记演奏版",
        "artist": "马克西姆"
    },
    {
        "title": "北冥寺",
        "artist": "卢小旭"
    },
    {
        "title": "千年风雅（陶笛）",
        "artist": "子雷"
    },
    {
        "title": "和兰花在一起",
        "artist": "Yanni"
    },
    {
        "title": "哭泣的城市",
        "artist": "纯音乐"
    },
    {
        "title": "回梦游仙",
        "artist": "纯音乐"
    },
    {
        "title": "夜曲",
        "artist": "钢琴曲 "
    },
    {
        "title": "夜莺",
        "artist": "Yanni"
    },
    {
        "title": "大海",
        "artist": "闫月"
    },
    {
        "title": "天之痕",
        "artist": "纯音乐"
    },
    {
        "title": "天空之城",
        "artist": "钢琴曲"
    },
    {
        "title": "她",
        "artist": "安妮宝贝"
    },
    {
        "title": "孤独",
        "artist": "火影插曲"
    },
    {
        "title": "安妮的仙境",
        "artist": "班得瑞"
    },
    {
        "title": "平遥古韵",
        "artist": "印象中国"
    },
    {
        "title": "幸福至上",
        "artist": "钢琴曲  "
    },
    {
        "title": "幽幽海谷情",
        "artist": "卢小旭"
    },
    {
        "title": "幽灵公主",
        "artist": "久石让"
    },
    {
        "title": "彼幕苍年 ",
        "artist": "纯音乐"
    },
    {
        "title": "微笑的上弦月",
        "artist": "纯音乐"
    },
    {
        "title": "忧伤还是快乐",
        "artist": "纯音乐"
    },
    {
        "title": "悲伤回流",
        "artist": "纯音乐"
    },
    {
        "title": "悲伤逆止 秋水浮生",
        "artist": "药 师"
    },
    {
        "title": "故乡的原风景",
        "artist": "宗次郎"
    },
    {
        "title": "故宫的回忆",
        "artist": "S.E.N.S"
    },
    {
        "title": "敦煌",
        "artist": "闫月"
    },
    {
        "title": "无止境的见识",
        "artist": "班得瑞"
    },
    {
        "title": "时代を越える想い",
        "artist": "犬夜叉原声带"
    },
    {
        "title": "星之所在",
        "artist": "动漫原声"
    },
    {
        "title": "星空",
        "artist": "里查德·克莱德曼"
    },
    {
        "title": "春、ふたたび",
        "artist": "宮西希"
    },
    {
        "title": "春野",
        "artist": "班得瑞"
    },
    {
        "title": "曙光 ",
        "artist": "川井郁子"
    },
    {
        "title": "梦中的婚礼",
        "artist": "里查德·克莱德曼"
    },
    {
        "title": "森林狂想曲",
        "artist": "吴金黛"
    },
    {
        "title": "水墨丹青凤凰城",
        "artist": "印象中国"
    },
    {
        "title": "水边的阿狄丽娜",
        "artist": "里查德·克莱德曼"
    },
    {
        "title": "沉睡的城市",
        "artist": "电影原声"
    },
    {
        "title": "涟姿荷映",
        "artist": "纯音乐"
    },
    {
        "title": "火影疾风",
        "artist": "动漫原声"
    },
    {
        "title": "烛光中的卡布奇诺",
        "artist": "王俊雄"
    },
    {
        "title": "琥珀色の海へ",
        "artist": "なアーティスト"
    },
    {
        "title": "相约到来生",
        "artist": "钢琴曲"
    },
    {
        "title": "神话",
        "artist": "小提琴"
    },
    {
        "title": "神话",
        "artist": "钢琴曲"
    },
    {
        "title": "祭奠之歌",
        "artist": "古风纯乐"
    },
    {
        "title": "离开你的那一天",
        "artist": "纯音乐"
    },
    {
        "title": "童年",
        "artist": "钢琴曲"
    },
    {
        "title": "紫のゆかり ふたたび",
        "artist": "Rin"
    },
    {
        "title": "罗密欧与朱丽叶",
        "artist": "里查德·克莱德曼"
    },
    {
        "title": "茗记",
        "artist": "2ND LIFE"
    },
    {
        "title": "草原の涙",
        "artist": "矶村由纪子 "
    },
    {
        "title": "草庙村",
        "artist": "诛仙"
    },
    {
        "title": "莫失莫忘",
        "artist": "仙剑插曲"
    },
    {
        "title": "菊次郎的夏天",
        "artist": "久石让"
    },
    {
        "title": "萤火虫之舞",
        "artist": "山居岁月"
    },
    {
        "title": "请不要爱我",
        "artist": "钢琴曲"
    },
    {
        "title": "诸神之诗",
        "artist": "姬神"
    },
    {
        "title": "跨越时代的思念",
        "artist": "犬夜叉"
    },
    {
        "title": "远山的守候",
        "artist": "电影原声 "
    },
    {
        "title": "远方的寂静",
        "artist": "林海"
    },
    {
        "title": "那一天的河川",
        "artist": "钢琴曲"
    },
    {
        "title": "雪之梦",
        "artist": "钢琴"
    },
    {
        "title": "雪映移城",
        "artist": "钢琴原声"
    },
    {
        "title": "风之丘",
        "artist": "卢家宏"
    },
    {
        "title": "风居住的街道",
        "artist": "矶村由纪子"
    },
    {
        "title": "魔女宅急便",
        "artist": "久石让"
    },
    {
        "title": "Sundial Dreams",
        "artist": "Kevin Kern"
    },
    {
        "title": "Through the Arbor",
        "artist": "Kevin Kern"
    },
    {
        "title": "The Winding Path",
        "artist": "Kevin Kern"
    },
    {
        "title": "Flowing With the Tea",
        "artist": "Karunesh"
    },
    {
        "title": "Moon Temple",
        "artist": "Karunesh"
    },
    {
        "title": "千年の祈り",
        "artist": "姫神"
    },
    {
        "title": "時の薫り",
        "artist": "西村由紀江"
    },
    {
        "title": "Scabs",
        "artist": "Bryson Andres"
    },
    {
        "title": "秘密",
        "artist": "卡洛儿"
    },
    {
        "title": "Beethoven Virus",
        "artist": "Diana Boncheva"
    },
    {
        "title": "清尘雅琴",
        "artist": "群星"
    },
    {
        "title": "沉醉于风中",
        "artist": "S.E.N.S"
    },
    {
        "title": "睡莲",
        "artist": "贾鹏芳"
    },
    {
        "title": "騎士王の誇り",
        "artist": "川井憲次"
    },
    {
        "title": "云水禅心",
        "artist": "群星"
    },
    {
        "title": "Les Choristes",
        "artist": "放牛班的春天"
    },
    {
        "title": "Molde Canticle",
        "artist": "Sissel"
    },
    {
        "title": "The Rain",
        "artist": "Joe Hisaishi"
    },
    {
        "title": "百鬼夜行抄",
        "artist": "森英治"
    },
    {
        "title": "孤独な巡礼",
        "artist": "川井憲次"
    },
    {
        "title": "Refrain",
        "artist": "Anan Ryoko"
    },
    {
        "title": "Flower Dance",
        "artist": "DJ OKAWARI"
    },
    {
        "title": "Mi Pequena Estrella",
        "artist": "Solas"
    },
    {
        "title": "Moon Flow",
        "artist": "Nomak"
    },
    {
        "title": "My Irish Friend",
        "artist": "Secret Garden"
    },
    {
        "title": "Pearl White Story",
        "artist": "S.E.N.S"
    },
    {
        "title": "Renegade",
        "artist": "Yanni"
    },
    {
        "title": "サクラ サクラ (Instrumental with 尺八三味线)",
        "artist": "Rin"
    },
    {
        "title": "峨眉金顶",
        "artist": "卢小旭"
    },
    {
        "title": "峠",
        "artist": "遠TONE音"
    },
    {
        "title": "奇迹の山",
        "artist": "岸部真明"
    },
    {
        "title": "山海之歌",
        "artist": "吴金黛"
    },
    {
        "title": "杨柳",
        "artist": "范宗沛"
    },
    {
        "title": "夜的钢琴曲一",
        "artist": "石进"
    },
    {
        'title': "風のとおり道",
        "artist": "Joe Hisaishi"
    },
    {
        "title": "烟雨江南",
        "artist": "周志宏"
    },
    {
        "title": "天空之城",
        "artist": "AGTM 木吉他俱乐部"
    },
    {
        "title": "田野静悄悄",
        "artist": "包朝克"
    },
    {
        "title": "田野静悄悄",
        "artist": "纯音乐"
    },
    {
        "title": "茜云",
        "artist": "遠TONE音"
    },
    {
        "title": "Beyond The Trails Of Tears",
        "artist": "Amanecer Ecuador"
    },
    {
        "title": "Matsuri",
        "artist": "Amernan"
    },
    {
        "title": "NEXT TO YOU",
        "artist": "Ken Arai"
    },
    {
        "title": "Last Of The Wilds",
        "artist": "Nightwish"
    },
    {
        "title": "予感",
        "artist": "Sensitive Heart"
    },
    {
        "title": "Empire of Angels",
        "artist": "Thomas Bergersen"
    },
    {
        "title": "Tatanka",
        "artist": "Various Artists"
    },
    {
        "title": "秋姉妹のなく頃に in the autumn sky",
        "artist": "ばんばんしー"
    },
    {
        "title": "寂静之声",
        "artist": "明仔"
    },
    {
        "title": "The Last Of The Mohicans",
        "artist": "Amanecer Ecuador"
    },
    {
        "title": "Mayampi",
        "artist": "Amernan"
    },
    {
        "title": "It's only the fairy tale",
        "artist": "梶浦由記"
    },
    {
        "title": "致青春",
        "artist": "Piano by kschanmusic"
    },
    {
        "title": "兰花草",
        "artist": "陈占美"
    }
]

  // Load playlist
  for (var i=0; i<playlist.length; i++){
    var item = playlist[i];
    $('#playlist').append('<li>'+item.title+' - '+item.artist+'</li>');
  }

  var time = new Date(),
    currentTrack = shuffle === 'true' ? time.getTime() % playlist.length : 0,
    trigger = false,
    audio, timeout, isPlaying, playCounts;

  var play = function(){
    audio.play();
    $('.playback').addClass('playing');
    timeout = setInterval(updateProgress, 500);
    isPlaying = true;
  }

  var pause = function(){
    audio.pause();
    $('.playback').removeClass('playing');
    clearInterval(updateProgress);
    isPlaying = false;
  }

  // Update progress
  var setProgress = function(value){
    var currentSec = parseInt(value%60) < 10 ? '0' + parseInt(value%60) : parseInt(value%60),
      ratio = value / audio.duration * 100;

    $('.timer').html(parseInt(value/60)+':'+currentSec);
    $('.progress .pace').css('width', ratio + '%');
    $('.progress .slider a').css('left', ratio + '%');
  }

  var updateProgress = function(){
    setProgress(audio.currentTime);
  }

  // Progress slider
  $('.progress .slider').slider({step: 0.1, slide: function(event, ui){
    $(this).addClass('enable');
    setProgress(audio.duration * ui.value / 100);
    clearInterval(timeout);
  }, stop: function(event, ui){
    audio.currentTime = audio.duration * ui.value / 100;
    $(this).removeClass('enable');
    timeout = setInterval(updateProgress, 500);
  }});

  // Volume slider
  var setVolume = function(value){
    audio.volume = localStorage.volume = value;
    $('.volume .pace').css('width', value * 100 + '%');
    $('.volume .slider a').css('left', value * 100 + '%');
  }

  var volume = localStorage.volume || 0.5;
  $('.volume .slider').slider({max: 1, min: 0, step: 0.01, value: volume, slide: function(event, ui){
    setVolume(ui.value);
    $(this).addClass('enable');
    $('.mute').removeClass('enable');
  }, stop: function(){
    $(this).removeClass('enable');
  }}).children('.pace').css('width', volume * 100 + '%');

  $('.mute').click(function(){
    if ($(this).hasClass('enable')){
      setVolume($(this).data('volume'));
      $(this).removeClass('enable');
    } else {
      $(this).data('volume', audio.volume).addClass('enable');
      setVolume(0);
    }
  });

  // Switch track
  var switchTrack = function(i){
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

  // Shuffle
  var shufflePlay = function(){
    var time = new Date(),
      lastTrack = currentTrack;
    currentTrack = time.getTime() % playlist.length;
    if (lastTrack == currentTrack) ++currentTrack;
    switchTrack(currentTrack);
  }

  // Fire when track ended
  var ended = function(){
    pause();
    audio.currentTime = 0;
    playCounts++;
    if (continous == true) isPlaying = true;
    if (repeat == 1){
      play();
    } else {
      if (shuffle === 'true'){
        shufflePlay();
      } else {
        if (repeat == 2){
          switchTrack(++currentTrack);
        } else {
          if (currentTrack < playlist.length) switchTrack(++currentTrack);
        }
      }
    }
  }

  var beforeLoad = function(){
    var endVal = this.seekable && this.seekable.length ? this.seekable.end(0) : 0;
    $('.progress .loaded').css('width', (100 / (this.duration || 1) * endVal) +'%');
  }

  // Fire when track loaded completely
  var afterLoad = function(){
    if (autoplay == true) play();
  }

    var random = Math.floor(1 + Math.random() * 9);
    $('#background').css('background-image', 'url(./img/bg' + random + '.webp)');
  // Load track
  var loadMusic = function(i){
    var item = playlist[i],
      newaudio = $('<audio>').html('<source src="./music/'+item.title+' - '+item.artist+'.mp3">').appendTo('#player');
    
    $('.cover').html('<img src="./img/bg'+random+'.webp" alt="'+item.title+'">');
    $('.tag').html('<strong>'+item.title+'</strong><span class="artist">'+item.artist+'</span>');
    $('#playlist li').removeClass('playing').eq(i).addClass('playing');
    if ($('#playlist li').eq(i).offset().top > 600) {
      $('body').scrollTo('li.playing', {duration: 1500});
    }
    $('title').text(item.title + " - " + item.artist);
    audio = newaudio[0];
    audio.volume = $('.mute').hasClass('enable') ? 0 : volume;
    audio.addEventListener('progress', beforeLoad, false);
    audio.addEventListener('durationchange', beforeLoad, false);
    audio.addEventListener('canplay', afterLoad, false);
    audio.addEventListener('ended', ended, false);

    // change background image
    // $('#background').css('background-image', 'url(./img/bg' + random + '.webp)');
  }

  loadMusic(currentTrack);
  $('.playback').on('click', function(){
    if ($(this).hasClass('playing')){
      pause();
    } else {
      play();
    }
  });
  $('.rewind').on('click', function(){
    if (shuffle === 'true'){
      shufflePlay();
    } else {
      switchTrack(--currentTrack);
    }
  });
  $('.fastforward').on('click', function(){
    if (shuffle === 'true'){
      shufflePlay();
    } else {
      switchTrack(++currentTrack);
    }
  });
  $('#playlist li').each(function(i){
    var _i = i;
    $(this).on('click', function(){
      switchTrack(_i);
    });
  });

  if (shuffle === 'true') $('.shuffle').addClass('enable');
  if (repeat == 1){
    $('.repeat').addClass('once');
  } else if (repeat == 2){
    $('.repeat').addClass('all');
  }

  $('.repeat').on('click', function(){
    if ($(this).hasClass('once')){
      repeat = localStorage.repeat = 2;
      $(this).removeClass('once').addClass('all');
    } else if ($(this).hasClass('all')){
      repeat = localStorage.repeat = 0;
      $(this).removeClass('all');
    } else {
      repeat = localStorage.repeat = 1;
      $(this).addClass('once');
    }
  });

  $('.shuffle').on('click', function(){
    if ($(this).hasClass('enable')){
      shuffle = localStorage.shuffle = 'false';
      $(this).removeClass('enable');
    } else {
      shuffle = localStorage.shuffle = 'true';
      $(this).addClass('enable');
    }
  });
  // 监听键盘事件
  $(document).keydown(function(event){ 
    if(event.keyCode == 37){ 
      if (shuffle === 'true'){
          shufflePlay();
      } else {
          switchTrack(--currentTrack);
      }
    } else if (event.keyCode == 39){ 
      if (shuffle === 'true'){
        shufflePlay();
      } else {
        switchTrack(++currentTrack);
      }
    } else if (event.keyCode == 32){
      event.preventDefault();
      if ($('.playback').hasClass('playing')){
        pause();
      } else {
        play();
      }
    } 
  }); 
})(jQuery);