var rule = {
    title: '旺旺影视',
    //host: 'https://www.nmdvd.com',
    //hostJs: 'HOST = pdfh(request(HOST), "b:eq(0)&&Text"); !HOST.startsWith("http") ? HOST = "https://"+HOST : HOST',
    //headers: {'User-Agent': 'PC_UA'},
    host: 'https://www.wwgz.cn',
    url: '/vod-list-id-fyfilter.html',
    filter_url: '{{fl.cateId}}-pg-fypage-order--by-{{fl.by}}-class-0-year-{{fl.year}}-letter-{{fl.letter}}-area-{{fl.area}}-lang-',
    searchUrl: '/vod-search-pg-fypage-wd-**.html',
    class_name: '电影&剧集&综艺&动漫&短剧',
    class_url: '1&2&3&4&26',
    filter_def: {
        1: {cateId: '1'},
        2: {cateId: '2'},
        3: {cateId: '3'},
        4: {cateId: '4'},
        26: {cateId: '26'}
    },
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    play_parse: true,
    lazy: $js.toString(() => {
        let init_js = `Object.defineProperties(navigator, {platform: {get: () => 'iPhone'}});`;
        input = {
            parse: 1,
            url: input,
            js: `
                try {
                    // 提取 iframe 的播放地址
                    let iframeSrc = document.querySelectorAll("iframe")[1].src;
                    if (iframeSrc.includes('https://vip.wwgz.cn:5200/nmplay/webcloud/relay.php?url=')) {
                        // 解析 relay.php 的 URL
                        let relayUrl = new URL(iframeSrc);
                        let realUrl = relayUrl.searchParams.get('url');
                        if (realUrl) {
                            location.href = realUrl;
                        }
                    } else {
                        location.href = iframeSrc;
                    }
                } catch (err) {
                    console.error('iframe 提取失败:', err);
                }
                // 点击播放按钮
                document.querySelector(".line").click();
            `,
            parse_extra: '&init_script=' + encodeURIComponent(base64Encode(init_js)),
        };
    }),
    limit: 6,
    double: true,
    推荐: '.resize_list;*;*;*;*;*',
    一级: 'ul.resize_list li;a&&title;img&&src;.sBottom&&Text;a&&href',
    二级: {
        title: '.page-bd&&h1&&Text;.content_detail:eq(1)&&li&&a:eq(2)&&Text',
        img: 'img&&src',
        desc: '.desc_item:eq(0)&&Text;.desc_item:eq(4)&&Text;.desc_item:eq(3)&&Text;.desc_item:eq(2)&&Text;.desc_item:eq(1)&&Text',
        content: '.detail-con&&p&&Text',
        tabs: '.hd',
        lists: '.numList:eq(#id) li',
    },
    搜索: '*',
    filter: 'H4sIAAAAAAAAA+2YW09TQRDHv8t5xmS3QGl5436/3zE8VDyJRMQEqgkhJGpBaBFQI61g8ZJYWiJICYZIEfplulv6LTylc2YGHwwJD8S4b2d+/+7u/Jc9O3OYs6RVfXfOemjPWtXWeCBot9y3yqypwCPbifOHp+rjihM/DUw+sS9/OOVgtZgqhFJF7ATSmi8DHEnlzuL58BIolaRE4yqcJMWLSn75UIcWSakiJflGnZyS4kNFP3+tn0VJ8dM64eSV2aSgQcvvc5kwkyhvHYroF1tMovRUYulKEtLJb6wolvYrMG0HaLdUPK1eZf6+WzTz12Rh8yVQCFytsLOpfx6ABgGOW0/rk3N3XCnALTtfUx/OQIMA5/y0SxoEuAGxhI7vgQYBakdpGgcBatG0inxW219cGWNcdXdPbycuEtlcZstdmyN0tZpWmR3XVSlwtYuVQ8oAAspug2e3wTUnFb2SdbbWnRZjnDmRza/v58Ob7uQYu7/IZRfyZzEddf8YFOMqi8fqe8hdohTwIzJrB6bpiOjYcSH245pHxCM8lcAuHxmvIF7BeTnxcs49xD2cS+KSc0FcMC79yKWfcx9xH+dVxKs49xL3ck5+Jfcrya/kfiX5ldyvJL+S+5XkV3K/kvxK7leQX8H9CvIruF9BfgX3K8iv4H4F+RXcryC/gvsV5Fdwv4L8Cu5XkF/B/Qry6zzy4zppB4M2O7BqP6YPVq95YGsA1CCpBVKLpA5IHZJ6IPVIGoA0IGkE0oikCUgTkmYgzUhagLQgaQXSiqQNSBuSdiDtSDqAdCDpBNKJpAtIF5JuIN1IeoD0IOkF0oukD0gfkn4g/UgGgAwgGQQyiGQIyBCSYSDDSEaAjCAZBTKKRNxx34HiEz8q92bZvbb2VmXWr3lM6BJ0guCEMwFet5mMTr8D5cFEcIau6oMFteyWy5nxx9N2MZexMstzw/aFXhenduQySaeFcGs9SU4BLpbao7QrlTMziWI1pVH0vuq9ZLEIk1RpmgfTPJjmwTQPpnkwzYNpHm6/eShnzYMpx6Ycm3JsyrEpx6Ycm3J8K+W44obf8vR6qUhK//rGPr19f0jsX/p+81Vu2gDTBpg2wLQBpg0wbcDttwEer/ksN/X4/6rH5r429/W/eV/P/wYOAoTqQyYAAA=='
};