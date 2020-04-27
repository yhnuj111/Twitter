<template>
  <nav
    class="navbar navbar-light bg-light"
    ref="header"
    :style="{
    backgroundImage: 'url(' + bannerSrc + ')', 
    height: bannerHeight + 'px', 
    backgroundPosition: 'center top',
    backgroundAttachment: 'fixed',
    backgroundSize: 'auto'
    }"
  >
 
  <div style="position:relative; display: flex; align-self: flex-end; justify-content: center; width: auto;" >
    <div class="imageCropper">
      <img
        v-if="profileSrc != '' && showPics"
        :src="profileSrc"
        style="
                margin: 0 auto;
                height: 100%;
                width: auto;"
      />
    </div> 
    <p
        style=" display: inline-block; justify-content: center; margin: 10px; font: italic small-caps 2em/1em bold Georgia, serif;"
      >{{username}}</p>
  </div>
  </nav>
</template>

<script>
import { eventBus } from "../main";
import UserProfile from "./UserProfiler.vue";
export default {
  components: {
    appUserProfile: UserProfile
  },
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
    // handleScroll() {
    //   let scrolledY = window.scrollY;
    //   this.$refs.header.style.backgroundPosition = 'left ' + ((scrolledY)) + 'px';
    // }
  },
  async created() {
    // window.addEventListener('scroll', this.handleScroll);
    eventBus.$on("getName", data => {
      this.username = data;
    });
    eventBus.$on("getProfilePic", data => {
      this.profileSrc = data;
    });
    eventBus.$on("getBanner", async data => {
      this.bannerSrc = data;
      // console.log('banner: ' + this.bannerSrc);
      if (this.bannerSrc === "") {
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
        this.bannerSrc = "";
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
.imageCropper {
  width: 50px;
  height: 50px;
  
  float: left;
  overflow: hidden;
  border-radius: 50%;
}
</style>

