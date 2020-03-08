import { mapMutations, mapGetters } from 'vuex';
import { getLang } from 'lib/common/util';
// import IntersectionObserverBox from 'lib/common/mixins/IntersectionObserverBox';


export default {
    props: {
        clickTabKey: {
            default: '',
            type: String,
        },
    },
    // mixins: [IntersectionObserverBox],
    data(){
        return {
            boxName: '',
            showSection: false,
            scrollTop: 0,
            contentTop: 0,
            contentHeight: 0,
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
        ]),
        opacity(){
            const that = this;
            let opacity = 1;

            if (that.viewPercent[that.boxName] < 0.15) {
                opacity = that.viewPercent[that.boxName];
            }

            return opacity;
        },
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
            this.detectViewPercent();
        },
        contentHeight(){
            this.detectViewPercent();
        },
        scrollTop(){
            this.detectViewPercent();
        },
        clickTabKey(newVal, oldVal){
            if (!!newVal && newVal !== oldVal && newVal === this.boxName) {
                this.$emit('scroll-to', $(this.$el).offset().top);
            }
        },
    },
    mounted(){
        const that = this;
        setTimeout(() => {
            that.setSectionInfo();
        });
    },
    methods: {
        ...mapMutations([
            'registerViewPercent',
        ]),
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
        detectViewPercent(){
            const that = this;
            const elmTop = $(that.$el).offset().top;
            const elmBottom = elmTop + $(that.$el).outerHeight();

            let viewPercent = 0;
            if (that.contentTop + that.contentHeight > elmTop && elmBottom > that.contentTop) {
                let detectTop = elmTop;
                if (detectTop <= that.contentTop) {
                    detectTop = that.contentTop;
                }

                let detectBottom = elmBottom;
                if (detectBottom >= that.contentTop + that.contentHeight) {
                    detectBottom = that.contentTop + that.contentHeight;
                }

                viewPercent = (detectBottom - detectTop) / that.contentHeight;
            }

            if (that.viewPercent[that.boxName] !== viewPercent) {
                that.registerViewPercent({
                    boxName: that.boxName,
                    viewPercent,
                });
            }
        },
        exposureAct(){
            // this.showSection = true;
        },
    },
};