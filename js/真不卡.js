var rule = {
    title:'真不卡影视',
    //host:'https://gfvod.com',
    host:'http://www.kan8.tv',
    // hostJs:'print(HOST);let html=request(HOST,{headers:{"User-Agent":PC_UA}});let src=jsp.pdfh(html,"li:eq(0)&&a:eq(0)&&Text");print(src);HOST=src',
    url:'/films/fyclass_fypage.html',
    // url:'/vodshow/fyfilter.html',
    filterable:0,//是否启用分类筛选,
    searchUrl: '/search.php**,post',
    searchable: 2,//是否启用全局搜索,
    headers: {
        'User-Agent': 'PC_UA',
    },
    class_parse: '.ewave-header__menu&&li;a&&Text;a&&href;/(\\d+).html',
    play_parse: true,
    lazy:`js:
        var html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
        var url = html.url;
        var from = html.from;
        if (html.encrypt == '1') {
            url = unescape(url)
        }else if(/lzm3u8/.test(input)){
    play_Url='json:https://jx.m3u8.biz/gg.php?url=';
    input={jx:0,url:input,playUrl:play_Url,parse:1}
} else if (html.encrypt == '2') {
            url = unescape(base64Decode(url))
        }
        if (/m3u8|mp4/.test(url)) {
            input = url
        } else {
            var jx =request(HOST + "/static/player/" + from + ".js").match(/ src="(.*?)'/)[1];
			log(jx)
            let con=request(jx.replace('index','ec')+ url, {headers: {'Referer': HOST}}).match(/let ConFig.*}/)[0];
			log(con)
			eval(con+'\\nrule.ConFig=ConFig')
			function ec(str, uid) {
				eval(getCryptoJS());
				return CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(str, CryptoJS.enc.Utf8.parse('2890' + uid + 'tB959C'), {
					iv: CryptoJS.enc.Utf8.parse('2F131BE91247866E'),
					mode: CryptoJS.mode.CBC,
					padding: CryptoJS.pad.Pkcs7
				}));
			};
			//log(rule.ConFig.url)
			//log(rule.ConFig.config.uid)
			let purl=ec(rule.ConFig.url, rule.ConFig.config.uid);
			//log(purl)
			input = {
			   jx: 0,
			   url: purl,
			   parse:0,
			}
        }`,
    double: false, // 推荐内容是否双层定位
    推荐: '.tab-content&&li;*;*;;*',
    一级: '.ewave-vodlist&&li;.lazyload&&title;.lazyload&&data-original;;a&&href',
    二级: {
        "title": "h1&&Text;.data--span:eq(0)&&Text",
        "img": ".lazyload&&data-original",
        "desc": ".data:eq(3)&&Text;;;.data--span:eq(1)&&Text;.data--span:eq(2)&&Text",
        "content": ".desc--a&&Text",
        "tabs": ".nav-tabs&&li",
        "lists": ".ewave-content__playlist:eq(#id)&&li"
    },
    搜索: '.ewave-vodlist__media&&li;*;*;;*',
}
