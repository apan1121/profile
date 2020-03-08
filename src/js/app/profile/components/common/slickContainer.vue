<template>
    <div class="slick-container">
        <slot></slot>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

import 'vendor/slick/slick';

export default {
    components: {

    },
    props: {
        inputOptions: {
            type: Object,
            require: true,
            default(){
                return {
                };
            },
        },
        slickToIndex: {
            type: Number,
            default: null,
        },
    },
    data(){
        return {
            $slick: null,
            options: {
                // autoplay: true,
                // autoplaySpeed: 2000,
                fade: true,
                cssEase: 'linear',
                // accessibility: true,
                // adaptiveHeight: false,
                // appendArrows: $(this.$el),
                // appendDots: $(this.$el),
                // arrows: true,
                // asNavFor: null,
                // prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                // nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                // autoplay: false,
                // autoplaySpeed: 3000,
                // centerMode: false,
                // centerPadding: '50px',
                // cssEase: 'ease',
                // customPaging(slider, i){
                //     return $('<button type="button" />').text(i + 1);
                // },
                // dots: true,
                // dotsClass: 'slick-dots',
                // draggable: true,
                // easing: 'linear',
                // edgeFriction: 0.35,
                // fade: false,
                // focusOnSelect: false,
                // focusOnChange: false,
                // infinite: true,
                // initialSlide: 0,
                lazyLoad: 'ondemand',
                // mobileFirst: false,
                // pauseOnHover: true,
                // pauseOnFocus: true,
                // pauseOnDotsHover: false,
                // respondTo: 'window',
                // responsive: null,
                // rows: 1,
                // rtl: false,
                // slide: '',
                // slidesPerRow: 1,
                // slidesToShow: 1,
                // slidesToScroll: 1,
                // speed: 500,
                // swipe: true,
                // swipeToSlide: false,
                // touchMove: true,
                // touchThreshold: 5,
                // useCSS: true,
                // useTransform: true,
                // variableWidth: false,
                // vertical: false,
                // verticalSwiping: false,
                // waitForAnimate: true,
                // zIndex: 100,
                // observer: true,
                // observeParents: true,
            },
        };
    },
    computed: {
        ...mapGetters([
        ]),
    },
    watch: {
        slickToIndex(newVal){
            const that = this;
            if (Number.isInteger(newVal)) {
                that.goTo(newVal);
            }
        },
    },
    mounted(){
        const that = this;
        if (!!this.$el.innerHTML && 1) {
            setTimeout(() => {
                that.create();
            }, 10);

            this.isMountedFlag = true;
        }
    },
    destroyed(){
        this.destroy();
    },
    methods: {
        create(){
            const that = this;
            that.$slick = $(this.$el);
            const options = { ...this.options, ...this.inputOptions };
            that.$slick.slick(options);

            if (Number.isInteger(that.slickToIndex)) {
                that.goTo(that.slickToIndex);
            }
        },
        destroy(){
            const that = this;

            if (!!that.$slick && typeof that.$slick.slick === 'function') {
                that.$slick.slick('unslick');
            }
        },
        goTo(index, dontAnimate){
            const that = this;
            if (!!that.$slick && 1) {
                $(this.$el).slick('slickGoTo', index, dontAnimate);
            }
        },
    },
};
</script>