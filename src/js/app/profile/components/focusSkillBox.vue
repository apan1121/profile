<template>
    <div class="focus-skill-box" :class="{ show: show, menu_fixed: pageSetting_menu_fixed }">
        {{ getLang('common.focusSkill') }}
        <span class="skill" v-text="focusSkill"></span>
        <span class="icon icon-close" @click="clear"></span>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapMutations, mapGetters } from 'vuex';

import { getLang, mixpanel } from 'lib/common/util';

export default {
    components: {

    },
    props: {

    },
    data(){
        return {

        };
    },
    computed: {
        ...mapGetters([
            'focusSkill',
            'pageSetting_menu_fixed',
            'pageSetting_focusTab',
        ]),
        show(){
            let show = false;
            if (!!this.focusSkill && 1) {
                show = true;
            }
            return show;
        },
    },
    watch: {
        focusSkill(newVal){
            if (!!newVal && 1) {
                mixpanel.track('choose_skill', newVal);
            } else {
                mixpanel.track('clear_skill');
            }
        },
    },
    mounted(){
    },
    methods: {
        ...mapMutations([
            'setFocusSkill',
        ]),
        getLang,
        clear(){
            this.setFocusSkill('');
        },
    },
};
</script>