var rule = {
  title: '电影驿站',
  host: 'https://www.dyyz.cc/',
  class_name: '电影&电视剧&综艺&动漫&短剧',
  class_url: '1&2&3&4&49',
  searchUrl: '/vodsearch/**----------fypage---.html',
  searchable: 2,
  quickSearch: 0,
  headers: {
    'User-Agent': 'MOBILE_UA',
  },
  url: '/index.php/api/vod?type=fyclass-fyfilter&page=fypage',
  filterable: 0,
  filter_url: '',
  filter: {},
  filter_def: {},
  detailUrl: '',
  play_parse: true,
  lazy: `
    js:
    let html = request(input);
    let hconf = html.match(/r player_.*?=(.*?)</)[1];
    let json = JSON5.parse(hconf);
    let url = json.url;
    if (json.encrypt == '1') {
      url = unescape(url);
    } else if (json.encrypt == '2') {
      url = unescape(base64Decode(url));
    }
    if (/\\.(m3u8|mp4|m4a|mp3)/.test(url)) {
      input = {
        parse: 0,
        jx: 0,
        url: url,
      };
    } else {
      input = url && url.startsWith('http') && tellIsJx(url ? {parse:0,jx:1,url:url} : input;
    }
  `,
  limit: 6,
  推荐: '.list-swiper .public-list-box;a&&title;.lazy&&data-src;.public-list-prb&&Text;a&&href',
  一级: `
    js:
    let furl = input.split("?")[0];
    let fbody = input.split("?")[1];
    let timestamp = Math.round(new Date() / 1e3).toString();
    let key = md5("DS" + timestamp + "DCC147D11943AF75");
    fbody = fbody + "&time=" + timestamp + "&key=" + key;
    fetch_params.body = fbody;
    let fhtml = post(furl, fetch_params);
    let data = JSON.parse(fhtml);
    VODS = data.list.map(function(item) {
      return {
        vod_name: item.vod_name,
        vod_pic: item.vod_pic,
        vod_url: item.vod_url,
        vod_id: item.vod_id
      };
    });
  `,
  二级: `
    js:
    let html = request(input);
    VOD = {};
    VOD.vod_id = input;
    VOD.vod_name = pdfh(html, '.slide-info-title&&Text');
    VOD.type_name = pdfh(html, '.slide-info:eq(2)--strong&&Text');
    VOD.vod_pic = pd(html, 'img&&data-src', input);
    VOD.vod_remarks = pdfh(html, '.slide-info-remarks&&Text');
    VOD.vod_year = pdfh(html, '.slide-info-remarks:eq(1)&&Text');
    VOD.vod_area = pdfh(html, '.slide-info-remarks:eq(2)&&Text');
    VOD.vod_director = pdfh(html, '.slide-info:eq(1)--strong&&Text;.info-parameter&&ul&&li:eq(3)&&Text');
    VOD.vod_actor = pdfh(html, '.detail-info-row-main:eq(1)&&Text');
    VOD.vod_content = pdfh(html, '#height_limit&&Text');
    
    let r_ktabs = pdfa(html, '.anthology-tab&&a');
    let ktabs = r_ktabs.map(it => pdfh(it, 'body&&Text'));
    VOD.vod_play_from = ktabs.join('$$$');
    
    let klists = [];
    let r_plists = pdfa(html, '.anthology-list-play');
    r_plists.forEach((rp) => {
        let klist = pdfa(rp, 'body&&a').map((it) => {
        return pdfh(it, 'a&&Text') + '$' + pd(it, 'a&&href', input);
        });
        klist = klist.join('#');
        klists.push(klist);
    });
    VOD.vod_play_url = klists.join('$$$');
  `,
  搜索: '.public-list-box;img&&alt;.lazy&&data-src;.public-list-prb&&Text;a&&href',
};
