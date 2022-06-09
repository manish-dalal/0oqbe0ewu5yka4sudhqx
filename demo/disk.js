let API = process.env.EDISK_HOST;
let SPD_API = process.env.SPD_VERSION_API;

let chromeVersionMatch = navigator.appVersion.match(/Chrome\/((?:\d+\.?)+)/);
let chromeVersion = chromeVersionMatch && chromeVersionMatch[1];
let chromeVersionSegs = chromeVersion && chromeVersion.split('.');
let isBuggyChrome = chromeVersion && parseInt(chromeVersionSegs[0]) >= 95;

function isStreamingUrl(link) {
  let url = new URL(link);
  return url.pathname.endsWith('.m3u8') || url.pathname.endsWith('.mpd');
}

function isDeeplinkUrl(link) {
  let url = new URL(link);
  return url.protocol.startsWith('mxplay');
}

function judgeClient() {
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
  // let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  if (isAndroid) {
    return 'Android';
  } else {
    return 'IOS';
  }
}

const useSimplePlayerFirst = Math.random() < 0.72;
const shouldUsePushAd = Math.random() < 0.98;
const shouldUsePushAd2 = Math.random() < 0.01;

export default {
  namespaced: true,
  state: {
    video: {},
    errorMsg: '',
    isBuggyChrome,

    newsList: {
      offset: 0,
      loading: false,
      feeds: [],
      signs: new Set(),
    },

    useSimplePlayerFirst,
    shouldUsePushAd,
    shouldUsePushAd2,

    isPC: !(
      /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ||
      window.localStorage.getItem('usingMobile')
    ),
    isIOS: judgeClient() === 'IOS' && false,
    liveList: [],
  },
  mutations: {
    SET_VIDEO(state, video) {
      state.video = video || {};
    },
    SET_VIDEO_ERROR(state, err) {
      state.errorMsg = err.message;
    },
    SET_NEWSLIST_LOADING(state, status) {
      state.newsList.loading = status;
    },
    SET_NEWSLIST_FEEDS(state, data) {
      let adIds = ['7992015368', '8649904187', '9468748560'];

      let items = (data.result || []).reduce((all, item) => {
        if (!state.newsList.signs.has(item.sign)) {
          state.newsList.signs.add(item.sign);
          all.push(item);
        }
        return all;
      }, []);

      // eslint-disable-next-line
      let [feeds, _] = items.reduce(
        ([all, nextAdIndex], item, i) => {
          item.headimg = item.s3_headimg
            ? `https://assets-1.mdisk.me${item.s3_headimg}`
            : item.headimg;
          item.publish = new Date(item.utc_publish * 1000).toLocaleString(
            'en',
            {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }
          );
          item.expanded = false;
          item.ad = false;
          all.push(item);

          if ((i + 1 + state.newsList.offset) % 3 === 0) {
            all.push({ ad: true, displayed: false, adId: adIds[nextAdIndex] });
            nextAdIndex = (nextAdIndex + 1) % adIds.length;
          }
          return [all, nextAdIndex];
        },
        [state.newsList.feeds, 0]
      );

      state.newsList.feeds = feeds;
      state.newsList.offset += data.result_num;
    },
    SET_ISPC(state, bool) {
      state.isPC = Boolean(bool);
    },
    SET_LIVELIST(state, list) {
      state.liveList = list;
    },
  },
  actions: {
    fetchVideo({ commit, dispatch, state }, id) {
      if (id) {
        let url = `${API}/v1/file/cdnurl?param=${id}`;
        if (state.isIOS) url = `${API}/v1/file/cdnurl?param=${id}&sys=ios`;
        return fetch(url, {
          method: 'GET',
        })
          .then((res) => {
            if (res.status >= 500) {
              return {};
            }

            if (res.status >= 400) {
              return res.text().then((msg) => {
                throw new Error(msg);
              });
            }

            return res.json();
          })
          .then((data) => {
            let streamingUrl = data.source;
            let downloadUrl = data.download;
            let playUrl = downloadUrl;
            if (!playUrl) {
              playUrl = streamingUrl;
            }

            let domainMatches = playUrl.match(
              /(?:https|mxplay|mxplayer)?:\/\/([^/]*)/
            );
            let domain = domainMatches[1];

            let isDeeplink = isDeeplinkUrl(playUrl);
            let useOnlinePlayer = isStreamingUrl(playUrl);
            let useOnlineDownloader = isStreamingUrl(downloadUrl);

            let owner = data.display_name || '';
            if (owner.length <= 4) {
              owner = owner.substring(0, Math.floor(owner.length / 2)) + '***';
            } else {
              owner =
                owner.substring(0, 2) +
                '***' +
                owner.substring(owner.length - 2, owner.length);
            }

            let poster = data.poster || '';

            let filename = data.filename || 'untitled';
            // if (/k[_.]?g[_.]?f\s*(chapter)?\s*2?/i.test(filename)) {
            //   throw new Error('content blocked by copyright issue')
            // }

            filename = filename.replace(/#/g, '');
            filename = filename.replace(
              /ass|anal|adult|blow|boob|booty|bhosadi|bdsm|cock|c0ck|chinal|chod|choochii|choot|chudai|chutiya|condom|cum|cunt|cumshots|cowgirl|chutmarike|dick|dildo|doggy\s*st(i|y)le|desi|doodh|deepthroat|ejackulate|ejaculate|f\*ck|faggot|fcuk|fisting|fuck|fudi|fingering|g\s*spot|ga*nd|genitalia|ghanta|gissum|gangbang|gfpd|haramzad|hijde|horny|hand\s*job|hot|kameenay|kanjri|katua|khota|khotey|kutiya|kutt(a|e|i)|klpd|lannd|lauda|lavda|loda|lodu|love\s*making|lund|lingerie|maachod|maachudi|madarchod|make(ing)?\s*love|mardana\s*kamzori|masturbate|mumme|muttha|morning\s*wood|naked|nipple|nude|nudity|orgasm|orgi|orgy|oral|pen+is|pennis|private\s*part|prostitut?|pussy|panties|penetration|pubic\s*hair|quickie|quiky|r\*pe|ra+ndi?|randva|rape|raping|reverse\s*cowgirl|\$ex|saala|se?x|strip|slut|seduce|threesome|tits|teen|ul?l(u|oo)|vagina|virginity|virgin|vibrator|whore|18+|badwap|beeg|bfxxx|brazzer|erotic|sax|sxe|tube|vidmate|xvideos?|xxx|xnxx?|xvedio/gi,
              '***'
            );

            let video = {
              id: data.rid || id,
              type: 'raw_mp4',
              owner,
              name: filename,
              src: playUrl,
              downloadUrl,
              streamingUrl,
              playDomain: domain,
              fromUser: data.from || '',
              userSrc: data.source_type || '',
              duration: data.duration || 0,
              poster,
              isDeeplink,
              useOnlinePlayer,
              useOnlineDownloader,
              size: data.size || 0,
              width: data.width || 0,
              height: data.height || 0,
              publishTime: data.ts || 0,
            };

            commit('SET_VIDEO', video);
            return true;
          })
          .catch((err) => {
            commit('SET_VIDEO_ERROR', err);
            return false;
          });
      }
    },
    report({ commit }, body) {
      return fetch(`${API}/v1/report`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    },
    fetchSpDpwnloadLink({ commit }) {
      return fetch(`${SPD_API}/v1/version`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    },
    fetchNewsList({ commit, state }, size) {
      if (state.newsList.loading) {
        return;
      }

      commit('SET_NEWSLIST_LOADING', true);
      return fetch(
        `https://feed.mdisk.me/api/get_list/all?offset=${
          state.newsList.offset
        }&size=${size || 10}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.errno !== 0) {
            throw new Error(data.msg);
          }

          commit('SET_NEWSLIST_FEEDS', data);
        })
        .catch(() => {})
        .then(() => {
          commit('SET_NEWSLIST_LOADING', false);
        });
    },
    updateisPC({ commit }, bool) {
      commit('SET_ISPC', bool);
    },
    fetchLiveList({ commit }) {
      fetch(`${API}/v1/live/rooms`, { method: 'GET' })
        .then((res) => res.json())
        .then((res) => {
          commit('SET_LIVELIST', res.rooms);
        });
    },
  },
};
