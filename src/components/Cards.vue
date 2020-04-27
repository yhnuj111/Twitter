<template>
    
    <app-card> </app-card>
       
</template>

<script>
import Card from "./Card.vue";
import {eventBus} from "../main";
export default {
    data() {
        return {
            show: false
        };
    },
    components: {
        appCard: Card
    }
    
};
</script>