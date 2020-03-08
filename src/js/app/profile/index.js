import Vue from 'vue';
import Cookies from 'js-cookie';
import { mapActions, mapGetters, mapMutations } from 'vuex';

import { createStore } from 'lib/store/index';
import { func, getLang, mixpanel } from 'lib/common/util';

import '../app';

import 'jquery';
import 'vendor/YTPlayer/jquery.mb.YTPlayer';
import pageContentBox from './components/pageContentBox.vue';
import backgroundBox from './components/common/backgroundBox.vue';
import focusSkillBox from './components/focusSkillBox.vue';

const store = createStore([
    'common',
]);


mixpanel.track('view', { langKey: window.localLang });


const Page = new Vue({
    el: '#appBox',
    components: {
        pageContentBox,
        backgroundBox,
        focusSkillBox,
    },
    data(){
        return {
            mobileSize: 750,
            ytPlayer: false,
            ytPlayerBufferCount: 0,
            videoPlay: false,

        };
    },
    computed: {
        ...mapGetters([
            'browser',
            'pageSetting_focus',
            'pageSetting_isMobile',
        ]),
    },
    watch: {
        ytPlayerBufferCount(){
            const that = this;
            if (that.ytPlayerBufferCount > 4 && !!that.ytPlayer) {
                that.ytPlayer.YTPStop();
            }
        },
        videoPlay(newVal){
            const that = this;
            if (newVal) {
                $('.background').addClass('opacity-zero');
            } else {
                $('.background').removeClass('opacity-zero');
            }
        },
        'browser.mobile': (newVal) => {
            if (newVal) {
                $('body').addClass('mobile');
            } else {
                $('body').addClass('pc');
            }
        },
        pageSetting_focus(newVal){
            if (newVal) {
                mixpanel.track('view_focus');
            } else {
                mixpanel.track('view_blur');
            }
        },
        pageSetting_isMobile(newVal){
            mixpanel.track('device_type', { isMobile: newVal });
        },
    },
    mounted(){
        const that = this;
        document.title = getLang('common.web_title');
        that.init();
    },
    methods: {
        ...mapMutations([
            'setPageSetting',
            'setBrowserInfo',
        ]),
        init(){
            const that = this;
            that.setBrowserInfo();
            $('body').trigger('resizeImg');
            $('body').trigger('lazyImg');

            $(window).bind('focus', func.throttle(() => {
                that.setPageSetting({
                    focus: true,
                });
            }, 500)).trigger('focus');

            $(window).bind('blur', func.throttle(() => {
                that.setPageSetting({
                    focus: false,
                });
            }, 500));

            $(window).bind('scroll resize', () => {
                that.setPageSetting({
                    scrollTop: $(window).scrollTop(),
                });
            });

            $(window).bind('resize', func.throttle(() => {
                let isMobile = false;
                if ($(window).width() <= that.mobileSize) {
                    isMobile = true;
                }
                that.setPageSetting({
                    isMobile,
                    windowWidth: $(window).width(),
                    windowHeight: $(window).height(),
                });
            }, 10)).trigger('resize');

            setTimeout(() => {
                // that.setYTPlayer();
            }, 0);
        },
        setYTPlayer(){
            const that = this;

            const ytPlayer = $('#bk-video');
            that.ytPlayer = ytPlayer;

            const defaultOpt = {
                containment: '#bk-video-box-wrapper',
                showControls: false,
                autoPlay: true,
                loop: false,
                mute: true,
                opacity: 0.65,
                quality: 'small',
                playOnlyIfVisible: false,
                stopMovieOnBlur: false,
                ratio: '4/3',
                addRaster: true,
                anchor: 'top,center',
            };

            const ytList = [
                {
                    videoURL: 'LeqPnre-j2A',
                    stopAt: 15,
                    ...defaultOpt,
                },
                {
                    videoURL: 'dsJvFMOjd9k',
                    startAt: 5,
                    stopAt: 25,
                    ...defaultOpt,
                },
                {
                    videoURL: '5yRBM9Md6vc',
                    ...defaultOpt,
                },
                {
                    videoURL: 'nNXmyt0G0Y4',
                    startAt: 15,
                    ...defaultOpt,
                },
            ];

            ytPlayer.YTPlaylist(ytList, true, (video) => {
                console.log(video.videoID);
            });


            ytPlayer.on('YTPReady', () => {
                console.log('YTPReady');
            });

            ytPlayer.on('YTPStart', () => {
                console.log('YTPStart');
                that.ytPlayerBufferCount = 0;
            });

            ytPlayer.on('YTPPlay', () => {
                console.log('YTPPlay');
                that.videoPlay = true;
            });


            ytPlayer.on('YTPBuffering', (e, a) => {
                console.log('YTPBuffering');
                that.ytPlayerBufferCount += 1;
            });

            ytPlayer.on('YTPEnd', () => {
                console.log('YTPEnd');
                that.videoPlay = false;
            });

            ytPlayer.on('YTPTime', (e) => {
                // console.log('YTPTime', e);
            });


            ytPlayer.YTPApplyFilters({
                opacity: 100,
                brightness: 60,
            });
        },
    },
    store,
});