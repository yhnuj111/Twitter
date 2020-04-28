<template>
  <div id="app">
    <transition name="slide" mode="out-in">
    <app-header v-show="showHeader"> </app-header>
    </transition>
    <app-warn v-if="isWarning"> </app-warn>
    <app-search :finder="isWarning"> </app-search>
    <app-cards> </app-cards>
    
  </div>
</template>

<script>
import Cards from './components/Cards.vue';
import Header from './components/Header.vue';
import Search from './components/Search.vue';
import Warning from './components/Warning.vue';
import {eventBus} from './main';
export default {
  name: 'App',
  data() {
    return {
      isWarning: false,
      showHeader: false
    }
  },
  components: {
    appCards: Cards,
    appHeader: Header,
    appSearch: Search,
    appWarn: Warning
  },
  methods: {
    sleepnow() {
      return new Promise( resolve =>
        {
          this.showHeader = false;
          resolve();
        }
      );
       
    }
  },
  created() {
    return new Promise((resolve)=>{
        eventBus.$on("updateWarn",  async data => {
          this.isWarning = (data === false);      
        });
        eventBus.$on("updateWarn", async data => {
          this.sleepnow().then(()=>{
            this.showHeader = (data === true);
          });
        });
        resolve();
    });
        
     
  },

}
</script>


<style>
body {
  margin: 0;
}


#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495e;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: 0.02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}


.slide-enter-active {
   -moz-transition-duration: .8s;
   -webkit-transition-duration: .8s;
   -o-transition-duration: .8s;
   transition-duration: .8s;
   -moz-transition-timing-function: ease-in;
   -webkit-transition-timing-function: ease-in;
   -o-transition-timing-function: ease-in;
   transition-timing-function: ease-in;
}

.slide-leave-active {
   -moz-transition-duration: .8s;
   -webkit-transition-duration: .8s;
   -o-transition-duration: .8s;
   transition-duration: .8s;
   -moz-transition-timing-function: ease-in-out;
   -webkit-transition-timing-function: ease-in;
   -o-transition-timing-function: ease-in;
   transition-timing-function: ease-in;
}

.slide-enter-to, .slide-leave {
   max-height: 100px;
   overflow: hidden;
}

.slide-enter, .slide-leave-to {
   overflow: hidden;
   max-height: 0;
}

</style>