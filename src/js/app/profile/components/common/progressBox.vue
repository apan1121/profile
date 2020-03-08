<template>
    <div class="progress-box">
        <div class="progress-bar" :style="{ width: `${showScore}%` }"></div>
        <div class="progress-name" v-text="name"></div>
        <div class="progress-score">
            {{ showScore }}%
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

import IntersectionObserverBox from 'lib/common/mixins/IntersectionObserverBox';

export default {
    components: {

    },
    mixins: [IntersectionObserverBox],
    props: {
        name: {
            type: String,
            default: '',
        },
        score: {
            type: [String, Number],
            default: 0,
        },
    },
    data(){
        return {
            showScore: 0,
            duration: 800,
        };
    },
    computed: {
    },
    watch: {

    },
    mounted(){
    },
    methods: {
        ...mapActions({
        }),
        exposureAct(){
            this.animateValue();
        },
        animateValue(){
            const that = this;
            // assumes integer values for start and end

            const range = that.score - 0;
            // no timer shorter than 50ms (not really visible any way)
            const minTimer = 50;
            // calc step time to show all interediate values
            let stepTime = Math.abs(Math.floor(that.duration / range));

            // never go below minTimer
            stepTime = Math.max(stepTime, minTimer);

            // get current time and calculate desired end time
            const startTime = new Date().getTime();
            const endTime = startTime + that.duration;
            let timer;

            function run(){
                const now = new Date().getTime();
                const remaining = Math.max((endTime - now) / that.duration, 0);
                const value = Math.round(that.score - (remaining * range));
                that.showScore = value;
                if (value === that.score) {
                    clearInterval(timer);
                }
            }

            timer = setInterval(run, stepTime);
            run();
        },
    },
};
</script>