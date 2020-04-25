<template>
  <div class="container">
    <div class="card grid-item" style="width: 18rem;" v-for="(c,idx) in filterCards" :key="idx">
      <!-- <img class="card-img-top" alt="Card image cap" v-if="c.types === 'photo' " :src="c.src"/> -->
      <video
        class="card-img-top"
        v-if="c.type ==='video' || c.type === 'animated_gif'"
        controls
        loop
      >
        <source :src="c.src[0].cardSrc" type="video/mp4" />
      </video>
      <app-slider v-else-if="c.type === 'photo'" :allCards="c" :carId="idx" :size="c.src.length"></app-slider>
      <div class="card-body">
        <h5 class="card-title">{{c.cardTitle}}</h5>
        <p class="card-text">{{ c.description }}</p>
        <button v-clipboard:copy="c.description" class="btn btn-primary">Click to Copy Text</button>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import { eventBus } from "../main";
import Slider from "./Slider.vue";
export default {
  data() {
    return {
      username: "",
      tweets: null,
      cards: []
    };
  },
  components: {
    appSlider: Slider
  },
  computed: {
    filterCards() {
      return this.cards.filter(c => c.type !== "");
    }
  },
  methods: {
    async arrangeData() {
      let allTweets = this.tweets;
      this.cards = [];
      // console.log(allTweets);
      
      try {
        for (let i = 0; i < allTweets.length; ++i) {
          let cardSrc = "";
          let type = "";
          let bitrate = 0;
          let medias = [];
          if (allTweets[i].extended_entities) {
            type = allTweets[i].extended_entities.media[0].type;

            if (type === "video") {
              for (
                let j = 0;
                j <
                allTweets[i].extended_entities.media[0].video_info.variants
                  .length;
                ++j
              ) {
                if (
                  allTweets[i].extended_entities.media[0].video_info.variants[j]
                    .bitrate
                ) {
                  if (
                    allTweets[i].extended_entities.media[0].video_info.variants[
                      j
                    ].bitrate > bitrate
                  ) {
                    bitrate =
                      allTweets[i].extended_entities.media[0].video_info
                        .variants[j].bitrate;
                    cardSrc =
                      allTweets[i].extended_entities.media[0].video_info
                        .variants[j].url;
                  }
                }
              }
              medias.push({ cardSrc });
            } else if (type === "animated_gif") {
              for (
                let j = 0;
                j <
                allTweets[i].extended_entities.media[0].video_info.variants
                  .length;
                ++j
              ) {
                if (
                  allTweets[i].extended_entities.media[0].video_info.variants[j]
                    .bitrate !== null
                ) {
                  if (
                    allTweets[i].extended_entities.media[0].video_info.variants[
                      j
                    ].bitrate >= bitrate
                  ) {
                    bitrate =
                      allTweets[i].extended_entities.media[0].video_info
                        .variants[j].bitrate;
                    cardSrc =
                      allTweets[i].extended_entities.media[0].video_info
                        .variants[j].url;
                  }
                }
              }
              medias.push({ cardSrc });
            } else if (type === "photo") {
              
              for (
                let j = 0;
                j < allTweets[i].extended_entities.media.length;
                ++j
              ) {
                cardSrc = allTweets[i].extended_entities.media[j].media_url;
                medias.push({ cardSrc });
              }
            }
          } else {
            if (!("media" in allTweets[i].entities)) {
              cardSrc = "";
              type = "";
              medias.push({ cardSrc });
            } else {
              // console.log(i + " " + allTweets[i].entities.media.length);
              for (let j = 0; j < allTweets[i].entities.media.length; ++j) {
                cardSrc = "";
                cardSrc = allTweets[i].entities.media[j].media_url;
                medias.push({ cardSrc });
              }
              // medias.push({cardSrc: cardSrc});
            }
          }
          let tmp = {
            cardTitle: allTweets[i].created_at,
            description: allTweets[i].text,
            src: medias,
            type
          };
          this.cards.push(tmp);
        }
      } catch (err) {
        console.log(err);
      }
    }
  },

  async mounted() {
    eventBus.$on("updateCard", async data => {
      this.tweets = data;
      // console.log(this.tweets);
      await this.arrangeData();
    });
  },
  created() {
    eventBus.$on("updateWarn",  data => {     
      if (data) {    
        this.cards = [];
      }
    });
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.container > div {
  margin: 20px;
}
</style>