<template>
  <div class="mdisk-home" v-if="!errorMsg">
    <navigate-modal v-if="isPC" v-model="navigateModalOpen"></navigate-modal>
    <title-bar :inApp="inApp" @Toast="showToast"></title-bar>

    <sterra-ad ad-pos="top" style="margin-top: 5px">
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

    <video-player
      :video="video"
      :duration="duration"
      @play="onClickPlayer"
      @earn="onEarn"
      @favorite="onClickFavorite(1)"
    ></video-player>

    <div v-if="useSimplePlayerFirst">
      <option-btn-group
        class="simple-player"
        :can-favorite="false"
        :downloadable="downloadable"
        @download="onSimpleDownload"
        @play="onSimplePlay('splayonlineClickedSp')"
      ></option-btn-group>

      <option-btn-group
        title="Option2"
        :downloadable="downloadable"
        :can-favorite="isIOS"
        @download="onDownload"
        @favorite="onClickFavorite"
        @play="onPlay('playonlineClickedSp')"
      ></option-btn-group>
    </div>
    <div v-else>
      <option-btn-group
        :downloadable="downloadable"
        :can-favorite="isIOS"
        @download="onDownload"
        @favorite="onClickFavorite"
        @play="onPlay('playonlineClickedSp')"
      ></option-btn-group>

      <option-btn-group
        class="simple-player"
        title="Option2"
        :can-favorite="false"
        :downloadable="downloadable"
        @download="onSimpleDownload"
        @play="onSimplePlay('splayonlineClickedSp')"
      ></option-btn-group>
    </div>

    <observable-wrapper @displayed="bottomAdVisible = true">
      <sterra-ad ad-pos="bottom" v-if="bottomAdVisible">
        <yllix-ad ad-pos="bottom"></yllix-ad>
      </sterra-ad>
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

    <live-ad @modelOpen="modelOpen" @openDeep="openMXPDeeplink"></live-ad>
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
import ObservableWrapper from "@/components/disk/ObservableWrapper.vue";
import OptionBtnGroup from "@/components/disk/OptionBtnGroup.vue";
import VideoPlayer from "@/components/disk/VideoPlayer.vue";
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
    OptionBtnGroup,
    VideoPlayer,
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

      navigateModalOpen: false,
      bottomAdVisible: false,
    };
  },
  computed: {
    ...mapState("disk", [
      "video",
      "errorMsg",
      "isBuggyChrome",
      "isPC",
      "defaultAds",
      "isIOS",
      "useSimplePlayerFirst",
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
        h: 8,
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
      return !!(this.video && this.video.downloadUrl);
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
    mxGooglePlayLiveUrl() {
      return "intent:market://details?id=com.mxtech.videoplayer.ad&referrer=utm_source%3Dtelegram_bot%26utm_medium%3Dweb%26utm_campaign%3Dsplive#Intent;action=android.intent.action.VIEW;category=android.intent.category.DEFAULT;category=android.intent.category.BROWSABLE;package=com.android.vending;end";
    },

    simpleGooglePlayUrl() {
      return "intent:market://details?id=com.young.simple.player&referrer=utm_source%3Dtelegram_bot%26utm_medium%3Dweb%26utm_campaign%3Dtelegram_bot#Intent;action=android.intent.action.VIEW;category=android.intent.category.DEFAULT;category=android.intent.category.BROWSABLE;package=com.android.vending;end";
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
      "fetchLiveList",
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
    openMXPDeeplink(href) {
      window.location.href = href;

      this.timeHandle = setTimeout(() => {
        this.timeHandle = null;
        this.$gtag.event("intentResponse", {
          state: "no-responding",
          duration: Date.now() - Date.now(),
        });
        window.location.href = this.mxGooglePlayLiveUrl;
      }, 4000);
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
    onClickPlayer() {
      let rand = Math.random();
      if (rand < 0.02) {
        window.location.href =
          "https://www.safestgatetocontent.com/iejgdk1g8k?key=b6a378fa803dda128078d881f6ad844f";
        return;
      } else if (rand < 0.04) {
        window.location.href = "https://zikroarg.com/4/5101295";
        return;
      }

      if (this.useSimplePlayerFirst) {
        this.onSimplePlay("splayonlineClickedSp");
      } else {
        this.onPlay("playButtonClickedSp");
      }
    },
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

      if (this.video.isDeeplink) {
        let url = new URL(this.video.src);
        url.searchParams.append("utm_medium", this.video.fromUser);
        url.searchParams.append("utm_campaign", this.video.id);
        this.openApp(url.toString(), this.mxGooglePlayUrl);
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

      if (this.video.isDeeplink) {
        let url = new URL(this.video.src);
        url.searchParams.append("utm_medium", this.video.fromUser);
        url.searchParams.append("utm_campaign", this.video.id);
        this.openApp(url.toString(), this.mxGooglePlayUrl);
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
    onClickFavorite(id) {
      this.$gtag.event("favouriteClick", { ID: id });
      window.location = `https://t.me/YourFavoriteHelperrbot?start=f-${this.params.id}`;
    },
  },
  created() {
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
    if (this.params.id) {
      this.fetchVideo(this.params.id);
    }

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
    this.fetchLiveList();
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
    height: 34px;
    line-height: 34px;
    padding-left: 16px;
    color: #35344c;
    width: 100%;
    display: flex;
    justify-content: space-between;

    .report {
      float: right;
      height: 20px;
      font-size: 0;
      margin: 7px 16px 0 12px;
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
