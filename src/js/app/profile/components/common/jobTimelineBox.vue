<template>
    <div class="timeline-item" :class="{ 'view-in': view_in, focus: focus }">
        <div class="timeline-content">
            <div v-if="jobInfo.company_logo" class="logo">
                <img :src="jobInfo.company_logo">
            </div>
            <div class="section-table">
                <div class="section-tr">
                    <div class="section-td" rel="th">
                        {{ getLang('common.title.company_name') }}
                    </div>
                    <div class="section-td">
                        {{ jobInfo.company_name }}
                    </div>
                </div>
                <div class="section-tr">
                    <div class="section-td" rel="th">
                        {{ getLang('common.title.company_title') }}
                    </div>
                    <div class="section-td">
                        {{ jobInfo.company_title }}
                    </div>
                </div>
                <div class="section-tr">
                    <div class="section-td" rel="th">
                        {{ getLang('common.title.company_product') }}
                    </div>
                    <div class="section-td">
                        <div v-for="(product, productIndex) in jobInfo.company_product"
                            :key="productIndex"
                            class="section-td-item"
                        >
                            {{ product }}
                        </div>
                    </div>
                </div>
                <div class="section-tr">
                    <div class="section-td" rel="th">
                        {{ getLang('common.title.experience') }}
                    </div>
                    <div class="section-td">
                        <div v-for="(experience, experienceIndex) in jobInfo.experience"
                            :key="experienceIndex"
                            class="skill-label tooltip"
                            :data-title="getLang('common.showSimilar')"
                            :class="{ focus: focusSkill === experience }"
                            @click="chooseSkill(experience)"
                        >
                            {{ experience }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="border">
        </div>
        <div class="time" :data-start-date="jobInfo.startDate" :data-end-date="jobInfo.endDate"></div>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapMutations, mapGetters } from 'vuex';

import { mixpanel } from 'lib/common/util';

import timeline from 'lib/common/mixins/timeline';


export default {
    components: {

    },
    mixins: [timeline],
    props: {
        jobInfo: {
            type: Object,
            default: () => {},
        },
    },
    data(){
        return {
            viewInTimer: null,
        };
    },
    computed: {
        ...mapGetters([
        ]),
        focus(){
            let flag = false;
            if (!this.focusSkill || this.jobInfo.experience.includes(this.focusSkill)) {
                flag = true;
            }
            return flag;
        },
    },
    watch: {
        view_in(newVal){
            if (newVal) {
                this.viewInTimer = setTimeout(() => {
                    mixpanel.track('view_job', { title: this.jobInfo.company_name });
                }, 2000);
            } else {
                clearTimeout(this.viewInTimer);
            }
        },
    },
    mounted(){
    },
    methods: {
        ...mapMutations([
            'setFocusSkill',
        ]),
        chooseSkill(skill){
            this.setFocusSkill(skill);
        },
    },
};
</script>