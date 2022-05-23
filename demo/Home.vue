<template>
  <div class="mdisk-home" v-if="!errorMsg">
    <navigate-modal v-if="isPC" v-model="navigateModalOpen"></navigate-modal>
    <title-bar :inApp="inApp" @Toast="showToast"></title-bar>

    <sterra-ad ad-pos="top" v-if="!shouldUseScreenAd">
      <yllix-ad ad-pos="top"></yllix-ad>
    </sterra-ad>

    <report
      v-if="reportShow"
      @report="onReport"
      @close="closeReport"
      @Toast="showToast"
    ></report>
    <toast ref="toast"></toast>

    <div class="disk-video-title t-18 t-ellipsis">
      <div class="t-ellipsis">{{ video && video.name }}</div>
      <div class="report" @click="reportShow = true">
        <div class="warning"></div>
        <div class="label-report">Report</div>
      </div>
    </div>

    <div
      class="disk-video"
      :style="videoStyle"
      @click.stop="onPlay('playButtonClickedSp')"
    >
      <!-- <div class="download-icon" @click.stop="onDownload" v-if="!isIOS"></div> -->
      <div class="earn-icon" @click.stop="onEarn"></div>
      <div
        class="favorite-prompt"
        @click.stop="onClickFavorite(1)"
        :class="{ 'favorite-prompt-ios': isIOS }"
      ></div>

      <div class="video-cover">
        <div class="videoplay"></div>
        <div class="videotext">Click to play</div>
      </div>
      <div class="video-duration t-14 t-white">{{ duration }}</div>
    </div>

    <div class="option-title"></div>
    <ul class="disk-btns btn-flex" v-if="!isIOS">
      <li :class="{ disabled: !downloadable }" class="w-1">
        <div class="btn-item t-white t-12" @click.stop="onDownload">
          <span class="btn-txt btn-download">Download</span>
        </div>
      </li>
      <li class="w-1">
        <div
          class="btn-item t-white t-12"
          @click.stop="onPlay('playonlineClickedSp')"
        >
          <span class="btn-txt btn-play">Play Online</span>
        </div>
      </li>
      <li class="w-52">
        <div
          class="btn-item t-white t-12 fav-icon-con"
          @click.stop="onClickFavorite(2)"
        >
          <div class="fav-icon"></div>
        </div>
      </li>
    </ul>

    <ul class="disk-btns" v-else>
      <li :class="{ disabled: !downloadable }">
        <div
          class="btn-item t-white t-12"
          @click.stop="onPlay('playonlineClickedSp')"
        >
          <span class="btn-txt btn-play">Play Online</span>
        </div>
      </li>
      <li>
        <div class="btn-item t-white t-12" @click.stop="onClickFavorite">
          <span class="btn-txt btn-favourite">Favourite</span>
        </div>
      </li>
    </ul>

    <div
      class="option-toggle"
      v-if="!showSimplePlayer && !isIOS"
      @click.stop="showSimplePlayerControl"
    >
      MORE PLAYER
    </div>

    <!-- <div class="simple-player" v-if="showSimplePlayer && !isIOS">
      <div class="option-title">Option2</div>
      <ul class="disk-btns">
        <li :class="{ disabled: !downloadable }">
          <div class="btn-item t-white t-12" @click.stop="onMxOnlineDownload">
            <span class="btn-txt btn-download">Download Video</span>
          </div>
        </li>
        <li>
          <div
            class="btn-item t-white t-12"
            @click.stop="onMxOnlinePlay('splayonlineClickedSp')"
          >
            <span class="btn-txt btn-play">Play Online</span>
          </div>
        </li>
      </ul>
    </div> -->

    <div class="simple-player-2" v-if="showSimplePlayer && !isIOS">
      <div class="option-title">Option2</div>
      <ul class="disk-btns">
        <li :class="{ disabled: !downloadable }">
          <div class="btn-item t-white t-12" @click.stop="onSimpleDownload">
            <span class="btn-txt btn-download">Download Video</span>
          </div>
        </li>
        <li>
          <div
            class="btn-item t-white t-12"
            @click.stop="onSimplePlay('splayonlineClickedSp')"
          >
            <span class="btn-txt btn-play">Play Online</span>
          </div>
        </li>
      </ul>
    </div>

    <observable-wrapper
      @displayed="bottomAdVisible = true"
      v-if="!shouldUseScreenAd"
    >
      <sterra-native-ad ad-pos="bottom" v-if="bottomAdVisible">
        <yllix-ad ad-pos="bottom"></yllix-ad>
      </sterra-native-ad>
    </observable-wrapper>

    <div class="disk-details">
      <div class="t-12">
        <div class="info-title">Video Information</div>
        <span class="info-user">{{
          video && video.owner && `${this.video.owner} · `
        }}</span>
        <span class="info-time">{{
          video &&
          video.publishTime &&
          `${timeFormat(this.video.publishTime)} · `
        }}</span>
        <span class="info-resolution">{{
          video &&
          video.width &&
          video.height &&
          `${this.video.width}*${this.video.height} · `
        }}</span>
        <span class="info-size">{{ video && videoSize }}</span>
      </div>
    </div>

    <news-feed-list></news-feed-list>

    <ul class="disclaim">
      <li>
        This website only provide service that help you convert your video to
        link easily.
      </li>
      <li>This website does not provide a storage/dissemination function.</li>
      <li>
        You can report the video that contains a problem like copyright, porn,
        violence, etc, we will not provide service for those videos.
      </li>
    </ul>

    <live-ad @modelOpen="modelOpen" v-if="false"></live-ad>
  </div>
  <div v-else class="mdisk-home error">
    {{ errorMsg }}
  </div>
</template>

<script>
import NavigateModal from "@/components/disk/NavigateModal.vue";
import TitleBar from "@/components/disk/TitleBar.vue";
import NewsFeedList from "@/components/disk/NewsFeedList.vue";
import Report from "@/components/disk/Report.vue";
import Toast from "@/components/disk/toast.vue";
import YllixAd from "@/components/disk/YllixAd.vue";
import LiveAd from "@/components/disk/liveAd.vue";
import SterraAd from "@/components/disk/SterraAd.vue";
import SterraNativeAd from "@/components/disk/SterraNativeAd.vue";
import ObservableWrapper from "@/components/disk/ObservableWrapper.vue";
import { mapActions, mapState } from "vuex";
import { convertToMMSS } from "@/util/duration";

export default {
  components: {
    NavigateModal,
    TitleBar,
    NewsFeedList,
    Report,
    Toast,
    ObservableWrapper,
    YllixAd,
    LiveAd,
    SterraAd,
    SterraNativeAd,
  },
  data() {
    return {
      timeHandle: null,
      reportShow: false,
      showSimplePlayer: false,
      videoList: [],
      next: "",
      allLoaded: true,
      videoListLoading: false,
      nowTimeStr: 0,
      inApp: false,
      nowGif: {},

      navigateModalOpen: false,
      bottomAdVisible: false,
    };
  },
  computed: {
    ...mapState("disk", [
      "video",
      "errorMsg",
      "isBuggyChrome",
      "gifMap",
      "isPC",
      "defaultAds",
      "isIOS",
      "shouldUseScreenAd",
    ]),

    testing() {
      return this.$route.query.status === "testing";
    },
    needFillAd() {
      return !(this.video && this.video.poster);
    },
    params() {
      let id = this.$route.params.id || this.$route.query.id;
      let wh = this.$route.params.wh
        ? this.$route.params.wh.split("x")
        : [this.$route.query.w || "0", this.$route.query.h || "0"];
      if (wh.length < 2) {
        wh = ["0", "0"];
      }

      return {
        id,
        w: 16,
        h: 9,
      };
    },
    videoStyle() {
      // let defaultCoverStyle = `url(${require('../../assets/disk/default_bg.png')}) center/cover no-repeat`

      let style = {};
      let backgrounds = [];

      let w = this.params.w;
      let h = this.params.h;
      let paddingTop = 56.39;
      if (w && w !== 0 && h && h !== 0) {
        paddingTop = (h * 100) / w;
      }
      if (paddingTop > 150) {
        let height = 270;
        style["height"] = `${height}px`;
        if (this.video && this.video.poster) {
          let coverStyle = `url(${this.video.poster}) center/contain no-repeat`;
          backgrounds.push(coverStyle);
        }
      } else {
        style["paddingTop"] = `${paddingTop}%`;
        if (this.video && this.video.poster) {
          let coverStyle = `url(${this.video.poster}) center/cover no-repeat`;
          backgrounds.push(coverStyle);
        }
      }
      // backgrounds.push(defaultCoverStyle)
      style["background"] = backgrounds.join(",");

      return style;
    },
    videoSize() {
      let size = null;
      if (this.video.id) {
        let s = this.video.size;
        let map = ["B", "KB", "M", "G"];
        let count = 0;
        while (s > 1024) {
          s /= 1024;
          count++;
        }
        size = s.toFixed(1) + map[count];
      }
      return size;
    },
    duration() {
      return convertToMMSS(this.video ? this.video.duration : 0);
    },
    downloadable() {
      return this.video && this.video.downloadUrl;
    },
    trackInfo() {
      let info = {
        fromuser: this.video.fromUser,
        video: this.video.id,
        source: this.video.userSrc,
        duration: this.video.duration,
        domain: this.video.playDomain,
      };
      return encodeURIComponent(JSON.stringify(info));
    },
    mxGooglePlayUrl() {
      return "intent:market://details?id=com.mxtech.videoplayer.ad&referrer=utm_source%3Dtelegram_bot%26utm_medium%3Dweb%26utm_campaign%3Dtelegram_bot#Intent;action=android.intent.action.VIEW;category=android.intent.category.DEFAULT;category=android.intent.category.BROWSABLE;package=com.android.vending;end";
    },
    simpleGooglePlayUrl() {
      return "intent:market://details?id=com.young.simple.player&referrer=utm_source%3Dtelegram_bot%26utm_medium%3Dweb%26utm_campaign%3Dtelegram_bot#Intent;action=android.intent.action.VIEW;category=android.intent.category.DEFAULT;category=android.intent.category.BROWSABLE;package=com.android.vending;end";
    },
    takaGooglePlayUrl() {
      return "intent:market://details?id=com.next.innovation.takatak&referrer=utm_source%3DSP%26utm_medium%3Dweb%26utm_campaign%3DSP#Intent;action=android.intent.action.VIEW;category=android.intent.category.DEFAULT;category=android.intent.category.BROWSABLE;package=com.android.vending;end";
    },
    mxOnlineGooglePlayUrl() {
      return "intent:market://details?id=com.mxtech.videoplayer.online&referrer=utm_source%3Dtelegram_bot%26utm_medium%3Dweb%26utm_campaign%3Dtelegram_bot#Intent;action=android.intent.action.VIEW;category=android.intent.category.DEFAULT;category=android.intent.category.BROWSABLE;package=com.android.vending;end";
    },
    splayerAppStoreUrl() {
      return "https://apps.apple.com/app/splayer-all-video-player/id1616607575";
    },
  },
  methods: {
    ...mapActions("disk", [
      "fetchVideo",
      "report",
      "fetchSpDpwnloadLink",
      "fetchNewsList",
    ]),
    onReport(reason) {
      this.report({ id: this.params.id, reason });
    },
    closeReport() {
      this.reportShow = false;
    },
    showToast(str) {
      if (this.isPC) {
        return;
      }
      this.$refs["toast"].showToast(str);
    },
    modelOpen() {
      this.navigateModalOpen = true;
    },
    openApp(href, googlePlayUrl) {
      if (this.isPC) {
        this.navigateModalOpen = true;
        return;
      }

      this.nowTimeStr = Date.now();

      if (this.video && this.video.src) {
        window.location.href = href;
      }

      if (this.timeHandle) {
        clearTimeout(this.timeHandle);
        this.timeHandle = null;
      }

      this.timeHandle = setTimeout(() => {
        this.timeHandle = null;
        this.$gtag.event("intentResponse", {
          state: "no-responding",
          duration: Date.now() - this.nowTimeStr,
        });
        window.location.href = googlePlayUrl;
      }, 4000);
    },
    openTaka(href, googlePlayUrl) {
      this.nowTimeStr = Date.now();
      window.location.href = href;

      if (this.timeHandle) {
        clearTimeout(this.timeHandle);
        this.timeHandle = null;
      }

      this.timeHandle = setTimeout(() => {
        this.timeHandle = null;
        window.location.href = googlePlayUrl;
      }, 4000);
    },
    /* onMxOnlinePlay (clickEvent) {
      this.$gtag.event('splayerPlayonlineClicked', { url: this.video.src })
      this.$gtag.event(clickEvent, { url: this.video.src, fromuser: this.video.fromUser })
      this.showToast('Loading...')
      let intent = `intent:${this.video.src}#Intent;action=com.mxtech.videoplayer.online.playback_online;category=android.intent.category.DEFAULT;category=android.intent.category.BROWSABLE;package=com.mxtech.videoplayer.online;`

      let arr = [intent]
      arr.push('b.decode_mode=2;')
      arr.push(`S.mx_stream_url=${encodeURIComponent(this.video.streamingUrl)};`)
      arr.push(`S.download_url=${encodeURIComponent(this.video.downloadUrl)};`)

      this.video.id && arr.push(`S.id=${this.video.id};`)
      this.video.name && arr.push(`S.title=${encodeURIComponent(this.video.name)};`)
      this.video.size && arr.push(`l.total_size=${this.video.size};`)
      this.video.fromUser && arr.push(`S.tr_parameter=${this.trackInfo};`)

      arr.push('end')
      let url = arr.join('')
      this.openApp(url, this.mxOnlineGooglePlayUrl)
    },
    onMxOnlineDownload () {
      this.$gtag.event('splayerDownloadClicked', { url: this.video.downloadUrl })
      this.$gtag.event('sdownloadClickedSp', { url: this.video.downloadUrl, fromuser: this.video.fromUser })
      if (!this.downloadable) {
        return
      }

      this.showToast('Loading...')
      let intent = `intent:${this.video.downloadUrl}#Intent;action=com.mxtech.videoplayer.online.download;category=android.intent.category.DEFAULT;category=android.intent.category.BROWSABLE;package=com.mxtech.videoplayer.online;`
      let arr = [intent]
      arr.push('b.decode_mode=2;')

      this.video.id && arr.push(`S.id=${this.video.id};`)
      this.video.name && arr.push(`S.title=${encodeURIComponent(this.video.name)};`)
      this.video.size && arr.push(`l.total_size=${this.video.size};`)
      this.video.poster && arr.push(`S.thumbnail=${encodeURIComponent(this.video.poster)};`)
      this.video.fromUser &&
        arr.push(`S.tr_parameter=${this.trackInfo};`)
      arr.push('end')
      let url = arr.join('')

      this.openApp(url, this.mxOnlineGooglePlayUrl)
    }, */
    onSimplePlay(clickEvent) {
      this.$gtag.event("splayerPlayonlineClicked", { url: this.video.src });
      this.$gtag.event(clickEvent, {
        url: this.video.src,
        fromuser: this.video.fromUser,
      });
      this.showToast("Loading...");
      let intent = `intent:${this.video.src}#Intent;action=com.young.simple.player.playback_online;package=com.young.simple.player;`;

      let arr = [intent];
      arr.push("b.decode_mode=2;");
      arr.push(
        `S.mx_stream_url=${encodeURIComponent(this.video.streamingUrl)};`
      );
      arr.push(`S.download_url=${encodeURIComponent(this.video.downloadUrl)};`);

      this.video.id && arr.push(`S.id=${this.video.id};`);
      this.video.name &&
        arr.push(`S.title=${encodeURIComponent(this.video.name)};`);
      this.video.size && arr.push(`l.total_size=${this.video.size};`);
      this.video.fromUser && arr.push(`S.tr_parameter=${this.trackInfo};`);

      arr.push("end");
      let url = arr.join("");
      this.openApp(url, this.simpleGooglePlayUrl);
    },
    onSimpleDownload() {
      this.$gtag.event("splayerDownloadClicked", {
        url: this.video.downloadUrl,
      });
      this.$gtag.event("sdownloadClickedSp", {
        url: this.video.downloadUrl,
        fromuser: this.video.fromUser,
      });
      if (!this.downloadable) {
        return;
      }

      this.showToast("Loading...");
      let intent = `intent:${this.video.downloadUrl}#Intent;action=com.young.simple.player.download;category=android.intent.category.DEFAULT;category=android.intent.category.BROWSABLE;package=com.young.simple.player;`;
      let arr = [intent];
      arr.push("b.decode_mode=2;");

      this.video.id && arr.push(`S.id=${this.video.id};`);
      this.video.name &&
        arr.push(`S.title=${encodeURIComponent(this.video.name)};`);
      this.video.size && arr.push(`l.total_size=${this.video.size};`);
      this.video.poster &&
        arr.push(`S.thumbnail=${encodeURIComponent(this.video.poster)};`);
      this.video.fromUser && arr.push(`S.tr_parameter=${this.trackInfo};`);
      arr.push("end");
      let url = arr.join("");

      this.openApp(url, this.simpleGooglePlayUrl);
    },
    onPlay(clickEvent) {
      this.$gtag.event(clickEvent, {
        url: this.video.src,
        fromuser: this.video.fromUser,
      });
      this.showToast("Loading...");

      if (this.isIOS) {
        let playUrl = `splayer://playback?url=${this.video.src}&action=playback`;
        this.openApp(playUrl, this.splayerAppStoreUrl);
        return;
      }

      let intent = `intent:${this.video.src}#Intent;package=com.mxtech.videoplayer.ad;`;
      if (this.isBuggyChrome) {
        intent = `intent:${this.video.src}#Intent;action=com.mxtech.videoplayer.ad.playback_local;category=android.intent.category.DEFAULT;category=android.intent.category.BROWSABLE;package=com.mxtech.videoplayer.ad;`;
      }
      if (this.video.useOnlinePlayer) {
        intent = `intent:${this.video.src}#Intent;action=com.mxtech.videoplayer.ad.playback_online;category=android.intent.category.DEFAULT;category=android.intent.category.BROWSABLE;package=com.mxtech.videoplayer.ad;`;
      }

      let arr = [intent];
      arr.push("b.decode_mode=2;");
      arr.push(
        `S.mx_stream_url=${encodeURIComponent(this.video.streamingUrl)};`
      );
      arr.push(`S.download_url=${encodeURIComponent(this.video.downloadUrl)};`);

      this.video.id && arr.push(`S.id=${this.video.id};`);
      this.video.name &&
        arr.push(`S.title=${encodeURIComponent(this.video.name)};`);
      this.video.size && arr.push(`l.total_size=${this.video.size};`);
      this.video.fromUser && arr.push(`S.tr_parameter=${this.trackInfo};`);

      arr.push("end");
      let url = arr.join("");

      this.openApp(url, this.mxGooglePlayUrl);
    },
    onDownload() {
      this.$gtag.event("downloadClickedSp", {
        url: this.video.downloadUrl,
        fromuser: this.video.fromUser,
      });
      if (!this.downloadable) {
        return;
      }
      this.showToast("Loading...");

      if (this.isIOS) {
        let downloadUrl = `splayer://playback?url=${this.video.downloadUrl}&action=download`;
        this.openApp(downloadUrl, this.splayerAppStoreUrl);
        return;
      }

      let intent = `intent:${this.video.downloadUrl}#Intent;action=com.mxtech.videoplayer.ad.download;category=android.intent.category.DEFAULT;category=android.intent.category.BROWSABLE;package=com.mxtech.videoplayer.ad;`;
      if (this.video.useOnlineDownloader) {
        intent = `intent:${this.video.downloadUrl}#Intent;action=com.mxtech.videoplayer.ad.download_stream;category=android.intent.category.DEFAULT;category=android.intent.category.BROWSABLE;package=com.mxtech.videoplayer.ad;`;
      }
      let arr = [intent];
      arr.push("b.decode_mode=2;");

      this.video.id && arr.push(`S.id=${this.video.id};`);
      this.video.name &&
        arr.push(`S.title=${encodeURIComponent(this.video.name)};`);
      this.video.size && arr.push(`l.total_size=${this.video.size};`);
      this.video.poster &&
        arr.push(`S.thumbnail=${encodeURIComponent(this.video.poster)};`);
      this.video.fromUser && arr.push(`S.tr_parameter=${this.trackInfo};`);
      arr.push("end");
      let url = arr.join("");

      this.openApp(url, this.mxGooglePlayUrl);
    },
    timeFormat(time) {
      time = new Date(time);
      const month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return `${time.getDate()} ${
        month[time.getMonth()]
      } ${time.getFullYear()}`;
    },
    onDownloadSpd() {
      this.$gtag.event("videoUnderAdUnitClicked");
      this.fetchSpDpwnloadLink()
        .then((res) => res.json())
        .then((res) => {
          this.$gtag.event("bannerClick", { url: res.url });
          const a = document.createElement("a");
          a.href = res.url;
          a.click();
        });
    },
    joinUs() {
      this.$gtag.event("channelClickSp", {
        url: "https://t.me/globalmovietop1",
      });
      window.location = "https://t.me/globalmovietop1";
    },
    // goRobot () {
    //   this.$gtag.event('channelClickSp', { url: 'https://t.me/VideoToolMoneyTreebot' })
    //   window.location = 'https://t.me/VideoToolMoneyTreebot'
    // },
    onEarn() {
      this.$gtag.event("earn$Clicksp");
      window.location = "https://t.me/VideoToolMoneyTreebot";
    },
    showSimplePlayerControl() {
      this.$gtag.event("morePlayerClickedSp");
      this.showSimplePlayer = true;
    },
    getVideoBgImg(poster) {
      if (!poster)
        return {
          backgroundImage: `url(${require("../../assets/disk/default_bg.png")})`,
        };
      let BgImage = `url(${poster})`;
      return {
        backgroundImage: BgImage,
      };
    },
    takaClick(type) {
      this.$gtag.event("takaBannerClick", { ID: this.nowGif.id, type });
      let takaUrl = `intent://mxplay.com/page/detail?id=${this.nowGif.id}&type=r_shortv&utm_source=SP#Intent;scheme=mxtakatak;package=com.next.innovation.takatak;S.browser_fallback_url=market://details?id=com.next.innovation.takatak&referrer=utm_source%3DSp%26;end`;
      this.showToast("Loading...");
      this.openTaka(takaUrl, this.takaGooglePlayUrl);
    },
    takaComputedStyle() {
      return {
        backgroundImage: `url(${this.nowGif.source})`,
      };
    },
    onClickFavorite(id) {
      this.$gtag.event("favouriteClick", { ID: id });
      window.location = `https://t.me/YourFavoriteHelperrbot?start=f-${this.params.id}`;
    },
  },
  created() {
    console.log("isIOS", this.isIOS);
    // 生成随机数，并获取当前gif对象
    let random = Math.floor(Math.random() * this.gifMap.length);
    this.nowGif = this.gifMap[random];

    // console.log(navigator.userAgent)
    // 客户端写死了 UA，以此判断是否在app里面
    if (
      navigator.userAgent ===
      "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36"
    ) {
      this.inApp = true;
    }
    this.$gtag.event("sharePageView", { type: this.inApp ? "off" : "on" });
  },
  mounted() {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && this.timeHandle) {
        this.$gtag.event("intentResponse", {
          state: "response",
          duration: Date.now() - this.nowTimeStr,
        });
        clearTimeout(this.timeHandle);
        this.timeHandle = null;
      }
    });
  },
};
</script>

<style lang="less">
.mdisk-home {
  position: relative;
  max-width: 480px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: white;

  &.error {
    padding-top: 20px;
    color: red;
    text-align: center;
    font-size: 16px;
  }

  .join-us {
    height: 60px;
    margin: 12px 16px 0;
    background-image: url("../../assets/disk/movie-3.webp");
    background-size: 100% 100%;
  }

  .default-iframe-ads {
    display: flex;
    justify-content: center;
    & > div {
      &:not(:first-child) {
        padding-left: 5px;
      }
    }
  }

  .disk-video-title {
    height: 46px;
    line-height: 46px;
    padding-left: 16px;
    color: #35344c;
    width: 100%;
    display: flex;
    justify-content: space-between;

    .report {
      float: right;
      height: 20px;
      font-size: 0;
      margin: 10px 16px 0 12px;
      cursor: pointer;
      .warning {
        width: 20px;
        height: 20px;
        background: url(../../assets/disk/warning.png) no-repeat center/cover;
        display: inline-block;
        margin-right: 6px;
      }

      .label-report {
        display: inline-block;
        font-family: Muli;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 20px;
        letter-spacing: normal;
        color: #7b89a3;
        vertical-align: text-bottom;
      }
    }
  }

  .disk-video {
    position: relative;
    margin: 0 auto;
    background-image: linear-gradient(to bottom, #002c4e, #00010c);

    .video-cover {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .videoplay {
      background: url(../../assets/disk/play.svg) no-repeat;
      width: 50px;
      height: 50px;
      margin: 0 auto;
      margin-bottom: 8px;
    }
    .videotext {
      font-family: Muli;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: center;
      color: #fff;
    }

    .video-duration {
      position: absolute;
      bottom: 10px;
      right: 12px;
    }

    .download-icon {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 48px;
      height: 48px;
      background: url(../../assets/disk/download.webp) center/cover no-repeat;
      z-index: 999;
    }

    .earn-icon {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 48px;
      height: 48px;
      background: url(../../assets/disk/earn.webp) center/cover no-repeat;
      z-index: 999;
    }

    .favorite-prompt {
      position: absolute;
      top: 66px;
      right: 12px;
      width: 48px;
      height: 48px;
      background: url(../../assets/disk/favorite-solid.png) center/cover
        no-repeat;
      z-index: 999;
    }

    // .favorite-prompt-ios{
    //   top: 12px;
    //   right: 12px;
    // }
  }

  .option-title {
    margin: 16px 0 8px;
    padding-left: 16px;
    font-size: 14px;
    color: #999;
  }
  .option-toggle {
    width: 110px;
    margin: 14px auto 0;
    padding-right: 24px;
    font-size: 12px;
    font-weight: 500;
    color: #7e7e7e;
    background: url(../../assets/disk/more-player-icon.svg) right center/24px
      no-repeat;
    cursor: pointer;
  }

  ul.disk-btns {
    margin-bottom: 12px;
    padding: 0 8px;
    box-sizing: content-box;

    li {
      display: inline-block;
      width: 50%;
      padding: 0 8px;
    }

    li.w-1 {
      flex: 1;
    }

    li.w-52 {
      width: 52px;
    }

    li.disabled .btn-item {
      background: #aaa;
    }

    .btn-item {
      display: block;
      height: 36px;
      line-height: 36px;
      border-radius: 3px;
      text-align: center;
      background-image: linear-gradient(104deg, #ff6443 -24%, #efac19 155%);
      text-decoration: none;
    }
    .btn-txt {
      padding-left: 20px;
      background-repeat: no-repeat;
      background-size: 16px;
      background-position: left center;
      user-select: none;
    }
    .btn-download {
      background-image: url(../../assets/disk/download.svg);
    }
    .btn-play {
      background-image: url(../../assets/disk/play-small.svg);
    }
    .fav-icon-con {
      padding-top: 4px;
    }
    .fav-icon {
      width: 28px;
      height: 28px;
      margin: 0 auto;
      background-image: url(../../assets/disk/fav_heart.svg);
      background-size: 100% 100%;
    }
    .btn-favourite {
      background-image: url(../../assets/disk/favourite.svg);
    }
  }
  ul.btn-flex {
    display: flex;
  }
  .simple-player {
    ul.disk-btns {
      .btn-item {
        background-image: linear-gradient(285deg, #3d9cfd, #2674f4 0%);
      }
    }
  }
  .simple-player-2 {
    ul.disk-btns {
      .btn-item {
        background-image: linear-gradient(285deg, #ff6d6d, #ff2e67 0%);
      }
    }
  }

  .disk-details {
    padding: 0 16px;
    color: #505a78;
    line-height: 16px;
    font-family: Muli;

    .desc-title,
    .info-title {
      color: #35344c;
      font-size: 13px;
      font-weight: 500;
      margin: 8px 0;

      * {
        color: #505a78;
      }
    }
  }

  .disclaim {
    margin: 16px;
    padding-top: 16px;
    padding-bottom: 16px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    color: #7b89a3;
    font-size: 12px;
  }
}
</style>
