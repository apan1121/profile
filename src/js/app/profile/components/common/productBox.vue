<template>
    <div class="product-box" :class="{ focus: focus }" @click="clickProductBox">
        <div class="type" v-text="type"></div>
        <div class="thumbnail" @click.stop="clichTumbnail">
            <template v-if="product_photo.length > 0">
                <div class="thumbnail-box-img tooltip"
                    :data-title="getLang('common.showPic')"
                >
                    <div
                        class="thumbnail-img lazyload"
                        :data-src="product_photo[0]"
                        @click.stop="clickPhoto(0)"
                    >
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="thumbnail-default">
                    <img :src="'./dist/img/default-Image.png'">
                </div>
            </template>

            <div v-if="dotCount" class="thumbnail-dot-wrapper">
                <div v-for="i in dotCount" :key="i" class="thumbnail-dot"></div>
            </div>
        </div>

        <div class="product-title">
            <component :is="product_link ? 'a': 'span'"
                :href="product_link"
                target="_blank"
                class="tooltip"
                :data-title="!!product_link? getLang('common.goto'): getLang('common.noMoreLink')"
                @click.stop="clickLink"
            >
                {{ product_name }}
                <i v-if="product_link" class="icon icon-link"></i>
            </component>
        </div>

        <div class="product-experience">
            <div v-for="(skill, skillIndex) in skills"
                :key="skillIndex"
                class="skill-label tooltip"
                :data-title="getLang('common.showSimilar')"
                :class="{ focus: focusSkill === skill }"
                @click="chooseSkill(skill)"
                v-text="skill"
            ></div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapMutations, mapGetters } from 'vuex';
import { getLang } from 'lib/common/util';

import slickContainer from './slickContainer.vue';


export default {
    components: {
        slickContainer,
    },
    props: {
        index: {
            type: Number,
            default: 0,
        },
        product_name: {
            type: String,
            default: '',
        },
        product_link: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: '',
        },
        product_photo: {
            type: Array,
            default(){
                return [];
            },
        },
        skills: {
            type: Array,
            default(){
                return [];
            },
        },
    },
    data(){
        return {
            slickOption: {
                arrows: false,
                centerPadding: '25px',
                draggable: true,
                dots: true,
                dotsClass: 'slick-dots slick-dark-dots',
                infinite: true,
                speed: 300,
                slidesToShow: 1,
            },
        };
    },
    computed: {
        ...mapGetters([
            'focusSkill',
        ]),
        dotCount(){
            return this.product_photo.length > 3 ? 3 : this.product_photo.length;
        },
        focus(){
            let flag = false;
            if (!this.focusSkill || this.skills.includes(this.focusSkill)) {
                flag = true;
            }
            return flag;
        },
    },
    watch: {

    },
    mounted(){
        $('body').trigger('lazyImg');
    },
    methods: {
        ...mapMutations(['setFocusSkill']),
        getLang,
        clickLink(e){

        },
        clickPhoto(pIndex){
            this.$emit('click-photo', { productIndex: this.index, photoIndex: pIndex });
        },
        clickProductBox(){
            this.$emit('click', this.index);
        },
        chooseSkill(skill){
            this.setFocusSkill(skill);
        },
    },
};
</script>