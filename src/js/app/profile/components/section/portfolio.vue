<template>
    <section class="section-box" :class="{ show: showSection }" :style="{ opacity: opacity }">
        <div class="section-header">
            <h2 class="section-title">
                <i class="icon" :class="menuIcon[boxName]"></i>
                {{ getLang(`common.boxTitle.${boxName}`) }}
            </h2>
        </div>
        <div class="section-content">
            <div class="row">
                <div v-for="(productInfo, productIndex) in products"
                    :key="productIndex"
                    class="pr-10 pb-15"
                    :class="colSize"
                >
                    <product-box v-bind="productInfo"
                        :index="productIndex"
                        @click-photo="clickProductPhoto"
                        @click="clickProductBox"
                    ></product-box>
                </div>
            </div>
        </div>


        <cool-light-box
            :items="lightBoxItem"
            :index="lightBoxPhotoIndex"
            :loop="false"
            @close="lightBoxPhotoIndex = null"
        >
        </cool-light-box>
    </section>
</template>
<script>
import CoolLightBox from 'vue-cool-lightbox';
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css';

import { mapActions, mapGetters } from 'vuex';
import { getLang } from 'lib/common/util';
import section from 'lib/common/mixins/section';

import productBox from '../common/productBox.vue';

export default {
    components: {
        productBox,
        CoolLightBox,
    },
    mixins: [section],
    props: {

    },
    data(){
        return {
            boxName: 'portfolio',
            products: getLang('portfolio.products'),
            minWidth: 300,
            colSize: 'col-6',
            lightBoxProductIndex: null,
            lightBoxPhotoIndex: null,
        };
    },
    computed: {
        ...mapGetters([
            'pageSetting_windowWidth',
        ]),
        lightBoxItem(){
            let item = [];
            if (this.lightBoxProductIndex !== null) {
                item = this.products[this.lightBoxProductIndex].product_photo;
            }
            return item;
        },
    },
    watch: {
        pageSetting_windowWidth: {
            handler(){
                this.calcColSize();
            },
            deep: true,
        },
    },
    mounted(){
        this.calcColSize();
    },
    methods: {
        ...mapActions({
        }),

        calcColSize(){
            const that = this;
            let colSize = 'col-6';

            if ($(that.$el).width() / 2 < that.minWidth) {
                colSize = 'col-12';
            }
            that.colSize = colSize;
        },
        clickProductBox(index){
            console.log('clickProductBox', index);
        },
        clickProductPhoto(params){
            console.log(params);
            this.lightBoxProductIndex = params.productIndex;
            this.lightBoxPhotoIndex = params.photoIndex;
        },
    },
};
</script>