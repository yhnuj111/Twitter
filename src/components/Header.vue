<template>
  <nav
    class="navbar navbar-light bg-light"
    :style="{
    backgroundImage: 'url(' + bannerSrc + ')', 
    height: bannerHeight + 'px', 
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center top'
    }"
  >
    <a class="navbar-brand" href="#">
      <img
        v-if="profileSrc != '' && showPics"
        :src="profileSrc"
        width="50px"
        height="50px"
        class="d-inline-block align-top"
      />
      <p
        style="display: inline; text-align: center; margin: 10px; font: italic small-caps bold 50px/30px Georgia, serif;"
      >{{username}}</p>
      <!-- {{bannerSrc}} -->
    </a>
  </nav>
</template>

<script>
import { eventBus } from "../main";
export default {
  data() {
    return {
      username: "",
      profileSrc: "",
      bannerSrc: "",
      bannerHeight: 80,
      showPics: true
    };
  },
  methods: {
    loadImgHeight() {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img.height);
        img.onerror = reject;
        img.src = this.bannerSrc;
      });
    }
  },
  async created() {
    eventBus.$on("getName", data => {
      this.username = data;
    });
    eventBus.$on("getProfilePic", data => {
      this.profileSrc = data;
    });
    eventBus.$on("getBanner", async data => {
      this.bannerSrc = data;
      // console.log('banner: ' + this.bannerSrc);
      if (this.bannerSrc === '') {
        this.bannerHeight = 80;
        this.bannerSrc = "";
      } else if (this.bannerSrc !== undefined) {
         this.bannerHeight = await this.loadImgHeight(); 
      }
    });
    eventBus.$on("updateWarn", data => {
      if (data == true) {
        this.showPics = false;
        this.username = "";
        this.bannerSrc="";
        this.bannerHeight = 80;
      } else {
        this.showPics = true;
      }
    });
  }
};
</script>

<style>
.navbar {
    background-repeat: no-repeat;
    background-position: center;
}
</style>