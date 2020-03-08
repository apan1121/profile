<template>
    <div ref="box" class="menu-box" :class="{
        fixed: isFixed,
    }"
    >
        <div class="menu-wrapper" rel="tab">
            <template v-for="(menuIcon, menuKey) in menuIcon">
                <div :key="menuKey"
                    class="menu-item"
                    :data-title="getLang(`common.boxTitle.${menuKey}`)"
                    :class="{
                        active: focusTab === menuKey
                    }"
                    @click="clickMenuTab(menuKey)"
                >
                    <i class="icon" :class="menuIcon"></i>
                </div>
            </template>
        </div>


        <div class="menu-wrapper" rel="tool">
            <div
                class="menu-item"
                data-title="qrcode"
                @click="openQrcode(true)"
            >
                <i class="icon icon-qrcode"></i>
            </div>
            <div
                v-if="localLang !== 'en-us'"
                class="menu-item"
                data-title="Trans to English"
                @click="chooseLang('en-us')"
            >
                <span class="icon icon-trans">
                    EN
                </span>
            </div>
            <div
                v-if="localLang !== 'zh-tw'"
                class="menu-item"
                data-title="翻譯成中文"
                @click="chooseLang('zh-tw')"
            >
                <span class="icon icon-trans">
                    中
                </span>
            </div>
        </div>

        <div class="qrcode-wrapper"
            :class="{ show: qrcodeOpen}"
            @click="openQrcode(false)"
        >
            <div class="qrcode-wrapper-box">
                <img :src="qrcodeUrl">
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import Cookies from 'js-cookie';
import { mapMutations, mapGetters } from 'vuex';
import { getLang } from 'lib/common/util';


export default {
    components: {

    },
    props: {

    },
    data(){
        return {
            top: false,

            focusTab: '',

            localLang: window.localLang,

            qrcodeOpen: false,
        };
    },
    computed: {
        ...mapGetters([
            'pageSetting_scrollTop',
            'pageSetting_isMobile',
            'pageSetting_menu_fixed',
            'pageSetting_focusTab',
            'viewPercent',
            'menuIcon',
        ]),
        isFixed(){
            const that = this;
            let fixed = false;
            if (!!that.top && 1) {
                fixed = that.pageSetting_scrollTop > that.top;
            }

            if (that.pageSetting_menu_fixed !== fixed) {
                that.setPageSetting({ menu_fixed: fixed });
            }

            return fixed;
        },
        qrcodeUrl(){
            return `http://chart.apis.google.com/chart?cht=qr&chl=${encodeURI(location.href)}&chs=400x400`;
        },
    },
    watch: {
        pageSetting_isMobile(){
            const that = this;
            if (that.top === false) {
                that.top = $(that.$refs.box).parent().offset().top;
            }
        },
        viewPercent(){
            const that = this;
            const obj = that.viewPercent;
            that.focusTab = Object.keys(that.viewPercent).reduce((a, b) => (obj[a] > obj[b] ? a : b));
            if (this.pageSetting_focusTab !== that.focusTab) {
                this.setPageSetting({ focusTab: that.focusTab });
            }
        },
    },
    mounted(){

    },
    methods: {
        ...mapMutations([
            'setPageSetting',
        ]),
        getLang,
        clickMenuTab(tabKey){
            if (tabKey !== this.focusTab) {
                this.$emit('click-menu-tab', tabKey);
            }
        },
        chooseLang(langKey){
            Cookies.set('langKey', langKey, { expires: 7 });
            window.location.reload();
        },
        openQrcode(bool){
            this.qrcodeOpen = bool;
        },
    },
};
</script>