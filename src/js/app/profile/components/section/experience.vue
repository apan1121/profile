<template>
    <section class="section-box" :class="{ show: showSection }" :style="{ opacity: opacity }">
        <div class="section-header">
            <h2 class="section-title">
                <i class="icon" :class="menuIcon[boxName]"></i>
                {{ getLang(`common.boxTitle.${boxName}`) }}
            </h2>
        </div>
        <div class="section-content">
            <div class="row mb-15">
                <div v-for="(skillInfo, skillIndex) in skills" :key="skillIndex" class="col-6">
                    <progress-box :name="skillInfo.name" :score="skillInfo.score"></progress-box>
                </div>
            </div>
            <div class="section-table">
                <template v-for="(info, key) in tools">
                    <div :key="key" class="section-tr">
                        <div class="section-td" rel="th">
                            {{ getLang(`common.title.${key}`, {}, key) }}
                        </div>
                        <div class="section-td">
                            <span v-for="item in info"
                                :key="item"
                                class="section-td-label"
                                :class="{
                                    focus: !focusSkill || focusSkill === item
                                }"
                                v-text="item"
                            ></span>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>
<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { getLang } from 'lib/common/util';
import section from 'lib/common/mixins/section';

import progressBox from '../common/progressBox.vue';


export default {
    components: {
        progressBox,
    },
    mixins: [section],
    props: {

    },
    data(){
        return {
            boxName: 'experience',
            tools: getLang('experience.tools'),
            skills: getLang('experience.skills'),
        };
    },
    computed: {
        ...mapGetters([
            'focusSkill',
        ]),
    },
    watch: {

    },
    mounted(){
    },
    methods: {
        getLang,
    },
};
</script>