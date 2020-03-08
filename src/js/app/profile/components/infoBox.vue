<template>
    <div class="info-box">
        <div class="info-item" rel="avatar-box">
            <div class="avatar-img-box">
                <div class="avatar-img lazyload" :data-src="profileInfo.photo">
                </div>
            </div>
        </div>
        <div class="info-item" rel="brief-box">
            <div class="brief-wrapper">
                <div class="brief-item" rel="brief-name">
                    {{ profileInfo.name }}
                </div>
                <div class="brief-item" rel="brief-nametitle">
                    <i class="icon icon-job-title"></i>
                    {{ profileInfo.title }}
                </div>
                <div class="brief-item" rel="brief-location">
                    <i class="icon icon-location"></i>
                    {{ profileInfo.location }}
                </div>
            </div>
        </div>
        <div class="info-item" rel="intro-box">
            <div class="intro-wrapper">
                <vue-perfect-scrollbar class="perfect-scrollbar">
                    {{ profileInfo.intro }}
                </vue-perfect-scrollbar>
            </div>
        </div>
        <div class="info-item" rel="contact-box">
            <div class="contact-wrapper">
                <div v-for="(socialUrl, socialKey) in profileInfo.social" :key="socialKey" class="contact-item">
                    <a :href="socialUrl" :title="socialKey" target="_blank"
                        @click="clickSocial(socialKey)"
                    >
                        <div class="contact-info">
                            <i class="icon" :class="`icon-${socialKey}`"></i>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { getLang, mixpanel } from 'lib/common/util';

import VuePerfectScrollbar from 'vue-perfect-scrollbar';

export default {
    components: {
        VuePerfectScrollbar,
    },
    props: {

    },
    data(){
        return {
            profileInfo: getLang('profile'),
        };
    },
    computed: {
        ...mapGetters([
        ]),
    },
    watch: {

    },
    mounted(){
    },
    methods: {
        ...mapActions({
        }),
        clickSocial(socialKey){
            mixpanel.track('click_social', { social: socialKey, in: 'info' });
        },
    },
};
</script>