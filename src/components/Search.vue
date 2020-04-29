<template>
  <form class="form-inline" style="padding: 30px; margin: auto; justify-content: center">
    <app-dropbox> </app-dropbox>
    <input
      class="form-control mr-sm-2"
      type="text"
      placeholder="Enter Twitter Id"
      aria-label="Search"
      v-model="name"
      lazy
    />
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click.prevent="submit">Search</button>
  </form>
</template>

<script>
import { eventBus } from "../main";
import dropbox from "./Dropdown.vue";
export default {
  data() {
    return {
      name: "",
      dummy:"",
      finded: false
    };
  },
  components: {
    appDropbox: dropbox
  },
  methods: {
    async submit(e) {
      if (this.dummy !== this.name) {
       this.dummy = this.name;
      await this.axios
        .post("http://13.58.192.11/search", {
          screen_name: this.name
        })
        .then(res => {
          if (res.length === 0) {
              this.finded = false;
              eventBus.$emit("updateWarn", this.finded);
          } else if (res.status === 200 && res.data.status === 200) {
            let un = res.data.msg;
            console.log(un);
            if (un.length !== 0) {
              let username = un[0].user.name;
              let userProfilePic = un[0].user.profile_image_url;
              let banner = "";
              if (un[0].user.profile_banner_url !== undefined) {
                banner = un[0].user.profile_banner_url;
                eventBus.$emit("getBanner", banner);
               } else {
                banner = "";
                eventBus.$emit("getBanner", banner);
              }
              this.finded = true;
              
              eventBus.$emit("updateWarn", this.finded);
              eventBus.$emit("getName", username);
              eventBus.$emit("getProfilePic", userProfilePic);
              eventBus.$emit("updateCard", un);
              
            }
          } else {
            this.finded = false;
            
            eventBus.$emit("updateWarn", this.finded);
          }
        })
        .catch(err => {
          console.log(err);
        });
      }
    }
  }
};
</script>