<template>
  <div :id="'car' + carId" class="carousel slide" data-ride="carousel" data-interval="false">
    <div class="carousel-inner">
      <div
        class="carousel-item"
        v-for="(c,idx) in allCards.src"
        :key="idx"
        :class="{active: checkActive(idx) }"
      >
        <img class="d-block w-100 myImg" :src="c.cardSrc" @click="showModal(c.cardSrc)" />
      </div>
    </div>
    <a
      class="carousel-control-prev"
      :href="'#car' + carId"
      role="button"
      data-slide="prev"
      v-if="size !== 1"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      :href="'#car' + carId"
      role="button"
      data-slide="next"
      v-if="size !== 1"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
    <modals-container />
  </div>
</template>

<script>
//import { Carousel3d, Slide } from "vue-carousel-3d";
export default {
  props: {
    allCards: {
      type: Object
    },
    carId: {
      type: Number
    },
    size: {
      type: Number
    }
  },
  methods: {
    checkActive(idx) {
      return idx === 0;
    },

    showModal(s) {
      this.$modal.show(
        {
          template: `<div style="position:relative;  overflow: visible;">
      <button type="button" class="close"  aria-label="Close" style="position: absolute;
    top: 10px;
    right: 10px;" @click="$emit('close')">
      <span aria-hidden="true">&times;</span>
      </button>
      <img  class="d-block w-100 myImg" style="z-index:1" :src="source" />
    </div>`,
          props: ["source"]
        },
        {
          source: s
        },
        {
          height: "auto",
          scrollable: true
        },
        {
          "before-close": event => {
            console.log("this will be called before the modal closes");
          }
        }
      );
    }
  }
};
</script>

<style scoped>
.myImg {
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}
.myImg:hover {
  opacity: 0.7;
}


</style>