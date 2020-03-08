<template>
    <section class="section-box" :class="{ show: showSection }" :style="{ opacity: opacity }">
        <div class="section-header">
            <h2 class="section-title">
                <i class="icon" :class="menuIcon[boxName]"></i>
                {{ getLang(`common.boxTitle.${boxName}`) }}
            </h2>
        </div>
        <div class="section-content">
            <div class="timeline-box">
                <template v-for="(jobInfo, key) in jobList">
                    <job-timeline-box :key="key" :job-info="jobInfo"></job-timeline-box>
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

import jobTimelineBox from '../common/jobTimelineBox.vue';

export default {
    components: {
        jobTimelineBox,
    },
    mixins: [section],
    props: {

    },
    data(){
        return {
            boxName: 'job',
            jobList: getLang('job.items'),
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