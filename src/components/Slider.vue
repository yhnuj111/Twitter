<template>
  <div :id="'car' + carId" class="carousel slide" data-ride="carousel" data-interval="false">
    <div class="carousel-inner">
      <div
        class="carousel-item"
        v-for="(c,idx) in allCards.src"
        :key="idx"
        :class="{active: checkActive(idx) }"
      >
        <img  class="d-block w-100 myImg" :src="c.cardSrc" />
        <div id="myModal" class="modal">
          <!-- The Close Button -->
          <span class="close">&times;</span>

          <!-- Modal Content (The Image) -->
          <img class="modal-content" id="img01">
        </div>
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

<style scoped>
.myImg {
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}
.myImg:hover {opacity: 0.7;}
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
}
/* Modal Content (Image) */
.modal-content {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
}

#caption {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
  text-align: center;
  color: #ccc;
  padding: 10px 0;
  height: 150px;
}
/* Add Animation */
.modal-content, #caption {  
  -webkit-animation-name: zoom;
  -webkit-animation-duration: 0.6s;
  animation-name: zoom;
  animation-duration: 0.6s;
}

@-webkit-keyframes zoom {
  from {-webkit-transform:scale(0)} 
  to {-webkit-transform:scale(1)}
}
@keyframes zoom {
  from {transform:scale(0)}
  to {transform:scale(1)}
}

/* The Close Button */
.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

/* 100% Image Width on Smaller Screens */
@media only screen and (max-width: 700px){
  .modal-content {
    width: 100%;
  }
}

</style>