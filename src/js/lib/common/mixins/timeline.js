import { mapMutations, mapGetters } from 'vuex';
import { getLang } from 'lib/common/util';

export default {
    components: {

    },
    props: {

    },
    data(){
        return {
            scrollTop: 0,
            contentTop: 0,
            contentHeight: 0,
            view_in: false,
            viewInTimer: null,
        };
    },
    computed: {
        ...mapGetters([
            'pageSetting_scrollTop',
            'pageSetting_contentScrollTop',
            'pageSetting_contentHeight',
            'pageSetting_contentOffsetTop',
            'pageSetting_isMobile',
            'pageSetting_windowWidth',
            'pageSetting_windowHeight',
            'menuIcon',
            'viewPercent',
            'focusSkill',
        ]),
    },
    watch: {
        pageSetting_contentOffsetTop: {
            deep: true,
            handler(newVal, oldVal){
                if (newVal !== oldVal) {
                    this.setSectionInfo();
                }
            },
        },
        pageSetting_contentScrollTop: {
            deep: true,
            handler(newVal, oldVal){
                if (newVal !== oldVal) {
                    this.setSectionInfo();
                }
            },
        },
        pageSetting_contentHeight: {
            deep: true,
            handler(newVal, oldVal){
                if (newVal !== oldVal) {
                    this.setSectionInfo();
                }
            },
        },
        pageSetting_isMobile: {
            deep: true,
            handler(newVal, oldVal){
                if (newVal !== oldVal) {
                    this.setSectionInfo();
                }
            },
        },
        pageSetting_windowWidth: {
            deep: true,
            handler(newVal, oldVal){
                if (newVal !== oldVal) {
                    this.setSectionInfo();
                }
            },
        },
        pageSetting_windowHeight: {
            deep: true,
            handler(newVal, oldVal){
                if (newVal !== oldVal) {
                    this.setSectionInfo();
                }
            },
        },

        pageSetting_scrollTop: {
            deep: true,
            handler(newVal, oldVal){
                if (newVal !== oldVal) {
                    this.setSectionInfo();
                }
            },
        },

        contentTop(){
            this.detectViewMiddle();
        },
        contentHeight(){
            this.detectViewMiddle();
        },
        scrollTop(){
            this.detectViewMiddle();
        },
    },
    mounted(){
        const that = this;
        setTimeout(() => {
            that.setSectionInfo();
        });
    },
    methods: {
        ...mapMutations({
        }),
        getLang,
        setSectionInfo(){
            const that = this;
            if (that.pageSetting_isMobile) {
                that.contentTop = that.pageSetting_scrollTop;
                that.contentHeight = $('body').height();
                that.scrollTop = that.pageSetting_scrollTop;
            } else {
                that.contentTop = that.pageSetting_contentOffsetTop;
                that.contentHeight = that.pageSetting_contentHeight;
                that.scrollTop = that.pageSetting_contentScrollTop;
            }
        },
        detectViewMiddle(){
            const that = this;

            const helf = that.contentTop + that.contentHeight / 2;
            const top = $(this.$el).offset().top;
            const bottom = top + $(this.$el).height();

            if (top < helf && helf < bottom) {
                that.view_in = true;
            } else {
                that.view_in = false;
            }

            // console.log('in', that.view_in);
        },
    },
};