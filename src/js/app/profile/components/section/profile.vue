<template>
    <section class="section-box" :class="{ show: showSection }" :style="{ opacity: opacity }">
        <div class="section-header">
            <h2 class="section-title">
                <i class="icon" :class="menuIcon[boxName]"></i>
                {{ getLang(`common.boxTitle.${boxName}`) }}
            </h2>
        </div>
        <div class="section-content">
            <div class="section-table">
                <template v-for="key in itemKeys">
                    <div v-if="!!profileInfo[key]" :key="key" class="section-tr">
                        <div class="section-td" rel="th">
                            {{ getLang(`common.title.${key}`) }}
                        </div>
                        <div class="section-td">
                            {{ profileInfo[key] }}
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>
<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import section from 'lib/common/mixins/section';

import { getLang } from 'lib/common/util';


export default {
    components: {

    },
    mixins: [section],
    props: {

    },
    data(){
        return {
            boxName: 'profile',
            profileInfo: getLang('profile'),
            itemKeys: [
                'name', 'sex', 'birth', 'age', 'army', 'location', 'married', 'interest',
            ],
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
    },
};
</script>