import { BoxIntersectionObserver } from 'lib/common/util/exposure';


export default {
    props: {
        intersectionArea: {
            type: String,
            default: '',
        },
        exposureDom: {
            type: String,
            default: '',
        },
        observeWaitTime: {
            type: Number,
            default: 0,
        },
    },
    data(){
        return {
            exposureName: 'none',
            exposureCount: 0,
        };
    },
    computed: {},
    methods: {
        exposureInit(){
            const that = this;
            BoxIntersectionObserver.observe(that.$el);
            $(this.$el).off('exposure-act').on('exposure-act', () => {
                that.exposureAct();
            });
        },
        exposureAct(){
            const that = this;
            that.$emit('exposure-act', { boxName: that.exposureName });
        },
    },
    destroyed(){
        const that = this;
        BoxIntersectionObserver.unobserve(that.$el);
    },
    mounted(){
        const that = this;
        if (!that.loading && 1) {
            setTimeout(() => {
                that.exposureInit();
            }, that.observeWaitTime);
        }
    },
};