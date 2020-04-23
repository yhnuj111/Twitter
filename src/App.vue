<template>
  <div id="app">
    <app-header> </app-header>
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
      isWarning: false
    }
  },
  components: {
    appCards: Cards,
    appHeader: Header,
    appSearch: Search,
    appWarn: Warning
  },
  created() {
    eventBus.$on("updateWarn",  data => {
      this.isWarning = data;
    });
  }
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
</style>