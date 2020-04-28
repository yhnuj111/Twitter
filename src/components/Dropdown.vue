<template>
  <div>
    <b-form-select v-model="selected" :options="options"></b-form-select>
  </div>
</template>

<script>
import { eventBus } from "../main";
export default {
    data() {
        return {
            selected: null,
            options: [
                {value: 'a', text: "Videos & Images"},
                {value: 'b', text: "Text Only"},
                {value: 'c', text: "Misc"}
            ]
        };
    },
    watch: {
        selected(val) {
            eventBus.$emit("updateSelectedType", val);
        }
    }
}
</script>

<style scoped>
div {
    margin-right: 5px;
}
</style>