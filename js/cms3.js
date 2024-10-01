
muban.mxpro.二级.desc = '.module-info-item:eq(4)&&Text;;;.module-info-item-content:eq(1)&&Text;.module-info-item-content:eq(0)&&Text';
muban.mxpro.二级.tabs = '#y-playList .module-tab-item';
var rule={
    title:'小阳影院',
    模板:'mxpro',
    host:'https://mov.xiaom.us.kg',
    url:'/index.php/vod/show/id/fyclass/page/fypage.html',
    //class_parse: '.navbar-items li:gt(1):lt(7);a&&title;a&&href;.*/(.*?).html',
    //一级: '.module-items.module-poster-items-base;a&&title;.lazyload&&data-original;.module-item-note&&Text;a&&href',
    lazy:`js:
        var html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
        var url = html.url;
        if (html.encrypt == '1') {
            url = unescape(url)
        } else if (html.encrypt == '2') {
            url = unescape(base64Decode(url))
        }
        if (/\\.m3u8|\\.mp4/.test(url)) {
            input = {
                jx: 0,
                url: url,
                parse: 0
            }
        } else {
            input
        }
    `,
}
