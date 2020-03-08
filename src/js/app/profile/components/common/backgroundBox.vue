<template>
    <div class="background-box">
        <slick-container class="slick-container" :slick-to-index="slickToIndex">
            <template v-for="(img, imgKey) in backgroundImg">
                <div :key="imgKey" class="slider-item">
                    <div class="background-item lazyload" :data-src="img">
                    </div>
                </div>
            </template>
        </slick-container>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

import slickContainer from './slickContainer.vue';

export default {
    components: {
        slickContainer,
    },
    props: {

    },
    data(){
        return {
            focusTab: '',
            mapping: {},
        };
    },
    computed: {
        ...mapGetters([
            'backgroundImg',
            'menuIcon',
            'viewPercent',
        ]),
        slickToIndex(){
            return this.mapping[this.focusTab] || 0;
        },
    },
    watch: {
        viewPercent(){
            const that = this;
            const obj = that.viewPercent;
            that.focusTab = Object.keys(that.viewPercent).reduce((a, b) => (obj[a] > obj[b] ? a : b));
        },
    },
    mounted(){
        $('body').trigger('lazyImg');
        this.setTabMapping();
    },
    methods: {
        setTabMapping(){
            const mapping = {};

            Object.keys(this.menuIcon).forEach((tabKey, tabIndex) => {
                mapping[tabKey] = tabIndex;
            });

            this.mapping = mapping;
        },
    },
};
</script>