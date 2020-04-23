<template>
  <div :id="'car' + carId" class="carousel slide" data-ride="carousel" data-interval="false">
    <div class="carousel-inner">
      <div class="carousel-item " v-for="(c,idx) in allCards.src" :key="idx" :class="{active: checkActive(idx) }">
        <a :href="c.cardSrc" target="_blank">
        <img class="d-block w-100" :src="c.cardSrc" />
        </a>
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
    }
  }
};
</script>