<template>
    <div class="page-content-box">
        <div class="page-content-item" rel="info-box">
            <info-box></info-box>
        </div>
        <div class="page-content-item" rel="content-box">
            <div class="content-box-wrapper">
                <component :is="contentComponent"
                    ref="contentBox"
                    class="perfect-scrollbar"
                    @ps-scroll-y="vueScrollHandle"
                >
                    <template v-for="(menuIcon, menuKey) in menuIcon">
                        <component
                            :is="sectionKeys[menuKey]"
                            :key="menuKey"
                            :click-tab-key="clickTabKey"
                            @scroll-to="scrollTo"
                        ></component>
                    </template>
                </component>
            </div>
        </div>
        <div class="page-content-item" rel="menu-box">
            <menu-box :focus-tab="focusTabKey" @click-menu-tab="clickMenuTab"></menu-box>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapMutations, mapGetters } from 'vuex';

import VuePerfectScrollbar from 'vue-perfect-scrollbar';

import infoBox from './infoBox.vue';
import contentBox from './contentBox.vue';
import menuBox from './menuBox.vue';

import sectionProfile from './section/profile.vue';
import sectionEducation from './section/education.vue';
import sectionJob from './section/job.vue';
import sectionExperience from './section/experience.vue';
import sectionPortfolio from './section/portfolio.vue';

export default {
    components: {
        VuePerfectScrollbar,
        infoBox,
        contentBox,
        menuBox,

        sectionProfile,
        sectionJob,
        sectionExperience,
        sectionPortfolio,
        sectionEducation,
    },
    props: {

    },
    data(){
        return {
            scrollTop: 0,
            pageWidth: 0,
            focusTabKey: 'profile',
            clickTabKey: '',
            sectionKeys: {
                profile: 'sectionProfile',
                education: 'sectionEducation',
                job: 'sectionJob',
                experience: 'sectionExperience',
                portfolio: 'sectionPortfolio',
            },
        };
    },
    computed: {
        ...mapGetters([
            'menuIcon',
            'pageSetting_isMobile',
        ]),
        contentComponent(){
            const that = this;
            let co = 'VuePerfectScrollbar';
            if (that.pageSetting_isMobile) {
                co = 'div';
            }
            return co;
        },
    },
    watch: {
        contentComponent(newVal, oldVal){
            const that = this;
            if (newVal !== oldVal) {
                that.vueScrollHandle();
            }
        },
        clickTabKey(newVal){
            const that = this;
            if (!!newVal && 1) {
                setTimeout(() => {
                    that.clickTabKey = '';
                }, 100);
            }
        },
    },
    mounted(){
        const that = this;
        that.init();
    },
    methods: {
        ...mapMutations([
            'setPageSetting',
        ]),
        init(){
            const that = this;
            $(window).bind('resize', () => {
                setTimeout(() => {
                    if (that.contentComponent === 'VuePerfectScrollbar') {
                        that.vueScrollHandle();
                    }
                }, 100);
            }).trigger('resize');
        },
        vueScrollHandle(evt){
            const that = this;
            if (!!that.$refs.contentBox.$el && 1) {
                that.setPageSetting({
                    contentScrollTop: that.$refs.contentBox.$el.scrollTop,
                    contentOffsetTop: $(that.$refs.contentBox.$el).offset().top,
                    contentHeight: $(that.$refs.contentBox.$el).height(),
                });
            }
        },
        clickMenuTab(tabKey){
            this.clickTabKey = tabKey;
        },
        scrollTo(positionOrg){
            const that = this;
            let position = positionOrg;
            let target = 'html,body';
            if (!that.pageSetting_isMobile) {
                target = that.$refs.contentBox.$el;
                position = position - $(target).offset().top + that.$refs.contentBox.$el.scrollTop;
            } else {
                position -= 60;
            }

            $(target).stop(true, true).animate({ scrollTop: position }, 300, 'swing');
        },
    },
};
</script>