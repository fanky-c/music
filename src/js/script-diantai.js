(function($){
  // Settings
  var repeat = localStorage.repeat || 0,
    shuffle = localStorage.shuffle || 'false',
    continous = true,
    autoplay = true,
    playlist = [
    {
        "title": "麦田",
        "artist": "纯音乐",
        "cover": "img/bg.jpg",
        "mp3": "music/麦田 - 纯音乐.ogg"
    },
    {
        "title": "Evelyn",
        "artist": "电影原声 ",
        "cover": "img/bg.jpg",
        "mp3": "music/Evelyn - 电影原声 .ogg"
    },
    {
        "title": "命",
        "artist": "电影原声",
        "cover": "img/bg.jpg",
        "mp3": "music/命 - 电影原声.ogg"
    },
    {
        "title": "驼羔之歌",
        "artist": "马头琴",
        "cover": "img/bg.jpg",
        "mp3": "music/驼羔之歌 - 马头琴.ogg"
    },
    {
        "title": "一声佛号一声心",
        "artist": "佛教音乐",
        "cover": "img/bg.jpg",
        "mp3": "music/一声佛号一声心 - 佛教音乐.ogg"
    },
    {
        "title": "殇",
        "artist": "杰奎琳·杜普雷 ",
        "cover": "img/bg.jpg",
        "mp3": "music/殇 - 杰奎琳·杜普雷 .ogg"
    },
    {
        "title": "风の誓",
        "artist": "梁邦彦い",
        "cover": "img/bg.jpg",
        "mp3": "music/风の誓 - 梁邦彦い.ogg"
    },
    {
        "title": "琵琶语",
        "artist": "林海",
        "cover": "img/bg.jpg",
        "mp3": "music/琵琶语 - 林海.ogg"
    },
    {
        "title": "夜的钢琴曲（五）",
        "artist": "石进",
        "cover": "img/bg.jpg",
        "mp3": "music/夜的钢琴曲（五） - 石进.ogg"
    },
    {
        "title": "大地之梦",
        "artist": "梶浦由記",
        "cover": "img/bg.jpg",
        "mp3": "music/大地之梦 - 梶浦由記.ogg"
    },
    {
        "title": "1945完整演奏版",
        "artist": "海角七号",
        "cover": "img/bg.jpg",
        "mp3": "music/1945完整演奏版 - 海角七号.ogg"
    },
    {
        "title": "Amarantine",
        "artist": "enya",
        "cover": "img/bg.jpg",
        "mp3": "music/Amarantine - enya.ogg"
    },
    {
        "title": "APHRODITE",
        "artist": "S.E.N.S",
        "cover": "img/bg.jpg",
        "mp3": "music/APHRODITE - S.E.N.S.ogg"
    },
    {
        "title": "Ave Maria",
        "artist": "Libera",
        "cover": "img/bg.jpg",
        "mp3": "music/Ave Maria - Libera.ogg"
    },
    {
        "title": "Brave Soul",
        "artist": "S.E.N.S",
        "cover": "img/bg.jpg",
        "mp3": "music/Brave Soul - S.E.N.S.ogg"
    },
    {
        "title": "Castle Gwyn",
        "artist": "Arlene Faith",
        "cover": "img/bg.jpg",
        "mp3": "music/Castle Gwyn - Arlene Faith.ogg"
    },
    {
        "title": "Dave kozI believe",
        "artist": "Saxophone",
        "cover": "img/bg.jpg",
        "mp3": "music/Dave kozI believe - Saxophone.ogg"
    },
    {
        "title": "D大调卡农",
        "artist": "帕赫贝尔",
        "cover": "img/bg.jpg",
        "mp3": "music/D大调卡农 - 帕赫贝尔.ogg"
    },
    {
        "title": "hear our prayer",
        "artist": "纯音乐",
        "cover": "img/bg.jpg",
        "mp3": "music/hear our prayer - 纯音乐.ogg"
    },
    {
        "title": "Jade Moon",
        "artist": "S.E.N.S",
        "cover": "img/bg.jpg",
        "mp3": "music/Jade Moon - S.E.N.S.ogg"
    },
    {
        "title": "Jupiter",
        "artist": "Ccotbyel",
        "cover": "img/bg.jpg",
        "mp3": "music/Jupiter - Ccotbyel.ogg"
    },
    {
        "title": "Kalinikta",
        "artist": "Nicos",
        "cover": "img/bg.jpg",
        "mp3": "music/Kalinikta - Nicos.ogg"
    },
    {
        "title": "Karma",
        "artist": "喜马拉雅原声",
        "cover": "img/bg.jpg",
        "mp3": "music/Karma - 喜马拉雅原声.ogg"
    },
    {
        "title": "kimi wo omou melodi",
        "artist": "atchorike",
        "cover": "img/bg.jpg",
        "mp3": "music/kimi wo omou melodi - atchorike.ogg"
    },
    {
        "title": "Kiss the rain",
        "artist": "纯音乐",
        "cover": "img/bg.jpg",
        "mp3": "music/Kiss the rain - 纯音乐.ogg"
    },
    {
        "title": "La Partita（布鲁斯口琴）",
        "artist": "纯音乐",
        "cover": "img/bg.jpg",
        "mp3": "music/La Partita（布鲁斯口琴） - 纯音乐.ogg"
    },
    {
        "title": "leaving",
        "artist": "NightLeaVe",
        "cover": "img/bg.jpg",
        "mp3": "music/leaving - NightLeaVe.ogg"
    },
    {
        "title": "Leaving Wallbrook On The Road",
        "artist": "Hans Zimmer",
        "cover": "img/bg.jpg",
        "mp3": "music/Leaving Wallbrook On The Road - Hans Zimmer.ogg"
    },
    {
        "title": "Letter",
        "artist": "Heaven Rain",
        "cover": "img/bg.jpg",
        "mp3": "music/Letter - Heaven Rain.ogg"
    },
    {
        "title": "ln un altra vita",
        "artist": "Ludovico Einaudi",
        "cover": "img/bg.jpg",
        "mp3": "music/ln un altra vita - Ludovico Einaudi.ogg"
    },
    {
        "title": "Love Conquers All",
        "artist": "杨沛霖",
        "cover": "img/bg.jpg",
        "mp3": "music/Love Conquers All - 杨沛霖.ogg"
    },
    {
        "title": "Luv Letter",
        "artist": "DJ OKAWARI",
        "cover": "img/bg.jpg",
        "mp3": "music/Luv Letter - DJ OKAWARI.ogg"
    },
    {
        "title": "pole dorogi",
        "artist": "DJEIEM ",
        "cover": "img/bg.jpg",
        "mp3": "music/pole dorogi - DJEIEM .ogg"
    },
    {
        "title": "Rissa mento",
        "artist": "电影原声 ",
        "cover": "img/bg.jpg",
        "mp3": "music/Rissa mento - 电影原声 .ogg"
    },
    {
        "title": "river flowns in you",
        "artist": "李闰珉",
        "cover": "img/bg.jpg",
        "mp3": "music/river flowns in you - 李闰珉.ogg"
    },
    {
        "title": "Serenade",
        "artist": "Jim Brickman",
        "cover": "img/bg.jpg",
        "mp3": "music/Serenade - Jim Brickman.ogg"
    },
    {
        "title": "Soul die Hook ist Für euch",
        "artist": "maXimum",
        "cover": "img/bg.jpg",
        "mp3": "music/Soul die Hook ist Für euch - maXimum.ogg"
    },
    {
        "title": "Steps",
        "artist": "神秘园",
        "cover": "img/bg.jpg",
        "mp3": "music/Steps - 神秘园.ogg"
    },
    {
        "title": "sunset in the lake",
        "artist": "DAISHI DANCE",
        "cover": "img/bg.jpg",
        "mp3": "music/sunset in the lake - DAISHI DANCE.ogg"
    },
    {
        "title": "Tears",
        "artist": "钢琴曲",
        "cover": "img/bg.jpg",
        "mp3": "music/Tears - 钢琴曲.ogg"
    },
    {
        "title": "The Forbidden Garden",
        "artist": "印象中国",
        "cover": "img/bg.jpg",
        "mp3": "music/The Forbidden Garden - 印象中国.ogg"
    },
    {
        "title": "the truth that you leave",
        "artist": "PianoBoy",
        "cover": "img/bg.jpg",
        "mp3": "music/the truth that you leave - PianoBoy.ogg"
    },
    {
        "title": "True",
        "artist": "Slient Hill 2 ",
        "cover": "img/bg.jpg",
        "mp3": "music/True - Slient Hill 2 .ogg"
    },
    {
        "title": "Ya-Na-Hana",
        "artist": "Various Artists",
        "cover": "img/bg.jpg",
        "mp3": "music/Ya-Na-Hana - Various Artists.ogg"
    },
    {
        "title": "You",
        "artist": "BGM",
        "cover": "img/bg.jpg",
        "mp3": "music/You - BGM.ogg"
    },
    {
        "title": "いつも何度でも(八音盒版)",
        "artist": "久石让",
        "cover": "img/bg.jpg",
        "mp3": "music/いつも何度でも(八音盒版) - 久石让.ogg"
    },
    {
        "title": "わらべ唄",
        "artist": "宗次郎",
        "cover": "img/bg.jpg",
        "mp3": "music/わらべ唄 - 宗次郎.ogg"
    },
    {
        "title": "不再需要爱情",
        "artist": "电影原声 ",
        "cover": "img/bg.jpg",
        "mp3": "music/不再需要爱情 - 电影原声 .ogg"
    },
    {
        "title": "乱红",
        "artist": "纯音乐",
        "cover": "img/bg.jpg",
        "mp3": "music/乱红 - 纯音乐.ogg"
    },
    {
        "title": "予感",
        "artist": "伊福部昭",
        "cover": "img/bg.jpg",
        "mp3": "music/予感 - 伊福部昭.ogg"
    },
    {
        "title": "五月雨",
        "artist": "火影插曲",
        "cover": "img/bg.jpg",
        "mp3": "music/五月雨 - 火影插曲.ogg"
    },
    {
        "title": "人生若只如初见",
        "artist": "钢琴曲",
        "cover": "img/bg.jpg",
        "mp3": "music/人生若只如初见 - 钢琴曲.ogg"
    },
    {
        "title": "假如爱有天意",
        "artist": "电影原声",
        "cover": "img/bg.jpg",
        "mp3": "music/假如爱有天意 - 电影原声.ogg"
    },
    {
        "title": "克罗地亚狂想曲",
        "artist": "马克西姆",
        "cover": "img/bg.jpg",
        "mp3": "music/克罗地亚狂想曲 - 马克西姆.ogg"
    },
    {
        "title": "再见警察",
        "artist": "纯音乐",
        "cover": "img/bg.jpg",
        "mp3": "music/再见警察 - 纯音乐.ogg"
    },
    {
        "title": "写给海洋",
        "artist": "纯音乐",
        "cover": "img/bg.jpg",
        "mp3": "music/写给海洋 - 纯音乐.ogg"
    },
    {
        "title": "出埃及记演奏版",
        "artist": "马克西姆",
        "cover": "img/bg.jpg",
        "mp3": "music/出埃及记演奏版 - 马克西姆.ogg"
    },
    {
        "title": "北冥寺",
        "artist": "卢小旭",
        "cover": "img/bg.jpg",
        "mp3": "music/北冥寺 - 卢小旭.ogg"
    },
    {
        "title": "千年风雅（陶笛）",
        "artist": "子雷",
        "cover": "img/bg.jpg",
        "mp3": "music/千年风雅（陶笛） - 子雷.ogg"
    },
    {
        "title": "和兰花在一起",
        "artist": "Yanni",
        "cover": "img/bg.jpg",
        "mp3": "music/和兰花在一起 - Yanni.ogg"
    },
    {
        "title": "哭泣的城市",
        "artist": "纯音乐",
        "cover": "img/bg.jpg",
        "mp3": "music/哭泣的城市 - 纯音乐.ogg"
    },
    {
        "title": "回梦游仙",
        "artist": "纯音乐",
        "cover": "img/bg.jpg",
        "mp3": "music/回梦游仙 - 纯音乐.ogg"
    },
    {
        "title": "夜曲",
        "artist": "钢琴曲 ",
        "cover": "img/bg.jpg",
        "mp3": "music/夜曲 - 钢琴曲 .ogg"
    },
    {
        "title": "夜莺",
        "artist": "Yanni",
        "cover": "img/bg.jpg",
        "mp3": "music/夜莺 - Yanni.ogg"
    },
    {
        "title": "大海",
        "artist": "闫月",
        "cover": "img/bg.jpg",
        "mp3": "music/大海 - 闫月.ogg"
    },
    {
        "title": "天之痕",
        "artist": "纯音乐",
        "cover": "img/bg.jpg",
        "mp3": "music/天之痕 - 纯音乐.ogg"
    },
    {
        "title": "天空之城",
        "artist": "钢琴曲",
        "cover": "img/bg.jpg",
        "mp3": "music/天空之城 - 钢琴曲.ogg"
    },
    {
        "title": "她",
        "artist": "安妮宝贝",
        "cover": "img/bg.jpg",
        "mp3": "music/她 - 安妮宝贝.ogg"
    },
    {
        "title": "孤独",
        "artist": "火影插曲",
        "cover": "img/bg.jpg",
        "mp3": "music/孤独 - 火影插曲.ogg"
    },
    {
        "title": "安妮的仙境",
        "artist": "班得瑞",
        "cover": "img/bg.jpg",
        "mp3": "music/安妮的仙境 - 班得瑞.ogg"
    },
    {
        "title": "平遥古韵",
        "artist": "印象中国",
        "cover": "img/bg.jpg",
        "mp3": "music/平遥古韵 - 印象中国.ogg"
    },
    {
        "title": "幸福至上",
        "artist": "钢琴曲  ",
        "cover": "img/bg.jpg",
        "mp3": "music/幸福至上 - 钢琴曲  .ogg"
    },
    {
        "title": "幽幽海谷情",
        "artist": "卢小旭",
        "cover": "img/bg.jpg",
        "mp3": "music/幽幽海谷情 - 卢小旭.ogg"
    },
    {
        "title": "幽灵公主",
        "artist": "久石让",
        "cover": "img/bg.jpg",
        "mp3": "music/幽灵公主 - 久石让.ogg"
    },
    {
        "title": "彼幕苍年 ",
        "artist": "纯音乐",
        "cover": "img/bg.jpg",
        "mp3": "music/彼幕苍年  - 纯音乐.ogg"
    },
    {
        "title": "微笑的上弦月",
        "artist": "纯音乐",
        "cover": "img/bg.jpg",
        "mp3": "music/微笑的上弦月 - 纯音乐.ogg"
    },
    {
        "title": "忧伤还是快乐",
        "artist": "纯音乐",
        "cover": "img/bg.jpg",
        "mp3": "music/忧伤还是快乐 - 纯音乐.ogg"
    },
    {
        "title": "悲伤回流",
        "artist": "纯音乐",
        "cover": "img/bg.jpg",
        "mp3": "music/悲伤回流 - 纯音乐.ogg"
    },
    {
        "title": "悲伤逆止 秋水浮生",
        "artist": "药 师",
        "cover": "img/bg.jpg",
        "mp3": "music/悲伤逆止 秋水浮生 - 药 师.ogg"
    },
    {
        "title": "故乡的原风景",
        "artist": "宗次郎",
        "cover": "img/bg.jpg",
        "mp3": "music/故乡的原风景 - 宗次郎.ogg"
    },
    {
        "title": "故宫的回忆",
        "artist": "S.E.N.S",
        "cover": "img/bg.jpg",
        "mp3": "music/故宫的回忆 - S.E.N.S.ogg"
    },
    {
        "title": "敦煌",
        "artist": "闫月",
        "cover": "img/bg.jpg",
        "mp3": "music/敦煌 - 闫月.ogg"
    },
    {
        "title": "无止境的见识",
        "artist": "班得瑞",
        "cover": "img/bg.jpg",
        "mp3": "music/无止境的见识 - 班得瑞.ogg"
    },
    {
        "title": "时代を越える想い",
        "artist": "犬夜叉原声带",
        "cover": "img/bg.jpg",
        "mp3": "music/时代を越える想い - 犬夜叉原声带.ogg"
    },
    {
        "title": "星之所在",
        "artist": "动漫原声",
        "cover": "img/bg.jpg",
        "mp3": "music/星之所在 - 动漫原声.ogg"
    },
    {
        "title": "星空",
        "artist": "里查德·克莱德曼",
        "cover": "img/bg.jpg",
        "mp3": "music/星空 - 里查德·克莱德曼.ogg"
    },
    {
        "title": "春、ふたたび",
        "artist": "宮西希",
        "cover": "img/bg.jpg",
        "mp3": "music/春、ふたたび - 宮西希.ogg"
    },
    {
        "title": "春野",
        "artist": "班得瑞",
        "cover": "img/bg.jpg",
        "mp3": "music/春野 - 班得瑞.ogg"
    },
    {
        "title": "曙光 ",
        "artist": "川井郁子",
        "cover": "img/bg.jpg",
        "mp3": "music/曙光  - 川井郁子.ogg"
    },
    {
        "title": "梦中的婚礼",
        "artist": "里查德·克莱德曼",
        "cover": "img/bg.jpg",
        "mp3": "music/梦中的婚礼 - 里查德·克莱德曼.ogg"
    },
    {
        "title": "森林狂想曲",
        "artist": "吴金黛",
        "cover": "img/bg.jpg",
        "mp3": "music/森林狂想曲 - 吴金黛.ogg"
    },
    {
        "title": "水墨丹青凤凰城",
        "artist": "印象中国",
        "cover": "img/bg.jpg",
        "mp3": "music/水墨丹青凤凰城 - 印象中国.ogg"
    },
    {
        "title": "水边的阿狄丽娜",
        "artist": "里查德·克莱德曼",
        "cover": "img/bg.jpg",
        "mp3": "music/水边的阿狄丽娜 - 里查德·克莱德曼.ogg"
    },
    {
        "title": "沉睡的城市",
        "artist": "电影原声",
        "cover": "img/bg.jpg",
        "mp3": "music/沉睡的城市 - 电影原声.ogg"
    },
    {
        "title": "涟姿荷映",
        "artist": "纯音乐",
        "cover": "img/bg.jpg",
        "mp3": "music/涟姿荷映 - 纯音乐.ogg"
    },
    {
        "title": "火影疾风",
        "artist": "动漫原声",
        "cover": "img/bg.jpg",
        "mp3": "music/火影疾风 - 动漫原声.ogg"
    },
    {
        "title": "烛光中的卡布奇诺",
        "artist": "王俊雄",
        "cover": "img/bg.jpg",
        "mp3": "music/烛光中的卡布奇诺 - 王俊雄.ogg"
    },
    {
        "title": "琥珀色の海へ",
        "artist": "なアーティスト",
        "cover": "img/bg.jpg",
        "mp3": "music/琥珀色の海へ - なアーティスト.ogg"
    },
    {
        "title": "相约到来生",
        "artist": "钢琴曲",
        "cover": "img/bg.jpg",
        "mp3": "music/相约到来生 - 钢琴曲.ogg"
    },
    {
        "title": "神话",
        "artist": "小提琴",
        "cover": "img/bg.jpg",
        "mp3": "music/神话 - 小提琴.ogg"
    },
    {
        "title": "神话",
        "artist": "钢琴曲",
        "cover": "img/bg.jpg",
        "mp3": "music/神话 - 钢琴曲.ogg"
    },
    {
        "title": "祭奠之歌",
        "artist": "古风纯乐",
        "cover": "img/bg.jpg",
        "mp3": "music/祭奠之歌 - 古风纯乐.ogg"
    },
    {
        "title": "离开你的那一天",
        "artist": "纯音乐",
        "cover": "img/bg.jpg",
        "mp3": "music/离开你的那一天 - 纯音乐.ogg"
    },
    {
        "title": "童年",
        "artist": "钢琴曲",
        "cover": "img/bg.jpg",
        "mp3": "music/童年 - 钢琴曲.ogg"
    },
    {
        "title": "紫のゆかり ふたたび",
        "artist": "Rin",
        "cover": "img/bg.jpg",
        "mp3": "music/紫のゆかり ふたたび - Rin.ogg"
    },
    {
        "title": "罗密欧与朱丽叶",
        "artist": "里查德·克莱德曼",
        "cover": "img/bg.jpg",
        "mp3": "music/罗密欧与朱丽叶 - 里查德·克莱德曼.ogg"
    },
    {
        "title": "茗记",
        "artist": "2ND LIFE",
        "cover": "img/bg.jpg",
        "mp3": "music/茗记 - 2ND LIFE.ogg"
    },
    {
        "title": "草原の涙",
        "artist": "矶村由纪子 ",
        "cover": "img/bg.jpg",
        "mp3": "music/草原の涙 - 矶村由纪子 .ogg"
    },
    {
        "title": "草庙村",
        "artist": "诛仙",
        "cover": "img/bg.jpg",
        "mp3": "music/草庙村 - 诛仙.ogg"
    },
    {
        "title": "莫失莫忘",
        "artist": "仙剑插曲",
        "cover": "img/bg.jpg",
        "mp3": "music/莫失莫忘 - 仙剑插曲.ogg"
    },
    {
        "title": "菊次郎的夏天",
        "artist": "久石让",
        "cover": "img/bg.jpg",
        "mp3": "music/菊次郎的夏天 - 久石让.ogg"
    },
    {
        "title": "萤火虫之舞",
        "artist": "山居岁月",
        "cover": "img/bg.jpg",
        "mp3": "music/萤火虫之舞 - 山居岁月.ogg"
    },
    {
        "title": "请不要爱我",
        "artist": "钢琴曲",
        "cover": "img/bg.jpg",
        "mp3": "music/请不要爱我 - 钢琴曲.ogg"
    },
    {
        "title": "诸神之诗",
        "artist": "姬神",
        "cover": "img/bg.jpg",
        "mp3": "music/诸神之诗 - 姬神.ogg"
    },
    {
        "title": "跨越时代的思念",
        "artist": "犬夜叉",
        "cover": "img/bg.jpg",
        "mp3": "music/跨越时代的思念 - 犬夜叉.ogg"
    },
    {
        "title": "远山的守候",
        "artist": "电影原声 ",
        "cover": "img/bg.jpg",
        "mp3": "music/远山的守候 - 电影原声 .ogg"
    },
    {
        "title": "远方的寂静",
        "artist": "林海",
        "cover": "img/bg.jpg",
        "mp3": "music/远方的寂静 - 林海.ogg"
    },
    {
        "title": "那一天的河川",
        "artist": "钢琴曲",
        "cover": "img/bg.jpg",
        "mp3": "music/那一天的河川 - 钢琴曲.ogg"
    },
    {
        "title": "雪之梦",
        "artist": "钢琴",
        "cover": "img/bg.jpg",
        "mp3": "music/雪之梦 - 钢琴.ogg"
    },
    {
        "title": "雪映移城",
        "artist": "钢琴原声",
        "cover": "img/bg.jpg",
        "mp3": "music/雪映移城 - 钢琴原声.ogg"
    },
    {
        "title": "风之丘",
        "artist": "卢家宏",
        "cover": "img/bg.jpg",
        "mp3": "music/风之丘 - 卢家宏.ogg"
    },
    {
        "title": "风居住的街道",
        "artist": "矶村由纪子",
        "cover": "img/bg.jpg",
        "mp3": "music/风居住的街道 - 矶村由纪子.ogg"
    },
    {
        "title": "魔女宅急便",
        "artist": "久石让",
        "cover": "img/bg.jpg",
        "mp3": "music/魔女宅急便 - 久石让.ogg"
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

  // 封面
  $('.cover').html('<img src="'+item.cover+'" alt="'+item.title+'">');

  // Load track
  var loadMusic = function(i){
    var item = playlist[i],
      newaudio = $('<audio>').html('<source src="'+item.mp3+'"><source src="'+item.mp3+'">').appendTo('#player');

    $('.tag').html('<strong>'+item.title+'</strong><span class="artist">'+item.artist+'</span>');
    // $('#playlist li').removeClass('playing').eq(i).addClass('playing');
    // if ($('#playlist li').eq(i).offset().top > 600) {
    //   $('body').scrollTo('li.playing', {duration: 1500});
    // }
    $('title').text(item.title + " - " + item.artist);
    audio = newaudio[0];
    audio.volume = $('.mute').hasClass('enable') ? 0 : volume;
    audio.addEventListener('progress', beforeLoad, false);
    audio.addEventListener('durationchange', beforeLoad, false);
    audio.addEventListener('canplay', afterLoad, false);
    audio.addEventListener('ended', ended, false);
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
    }
  });
})(jQuery);