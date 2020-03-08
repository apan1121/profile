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
                <template v-for="(eduInfo, eduIndex) in educationList">
                    <edu-timeline-box :key="eduIndex" :edu-info="eduInfo"></edu-timeline-box>
                    <!-- <div :key="eduIndex" class="timeline-item">
                        <div class="timeline-content">
                            <div class="section-table">
                                <div class="section-tr">
                                    <div class="section-td" rel="th">
                                        {{ getLang('common.title.school_name') }}
                                    </div>
                                    <div class="section-td">
                                        {{ eduInfo.school_name }}
                                    </div>
                                </div>
                                <div class="section-tr">
                                    <div class="section-td" rel="th">
                                        {{ getLang('common.title.edu_title') }}
                                    </div>
                                    <div class="section-td">
                                        {{ eduInfo.edu_title }}
                                    </div>
                                </div>
                                <div class="section-tr">
                                    <div class="section-td" rel="th">
                                        {{ getLang('common.title.experience') }}
                                    </div>
                                    <div class="section-td">
                                        <div v-for="(experienceInfo, experienceIndex) in eduInfo.experience"
                                            :key="experienceIndex"
                                            class="section-td-item"
                                        >
                                            {{ experienceInfo }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="border">
                        </div>
                        <div class="time" :data-start-date="eduInfo.startDate" :data-end-date="eduInfo.endDate"></div>
                    </div> -->
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
import eduTimelineBox from '../common/eduTimelineBox.vue';

export default {
    components: {
        eduTimelineBox,
    },
    mixins: [section],
    props: {

    },
    data(){
        return {
            boxName: 'education',
            educationList: getLang('education.items'),
            itemKeys: [
                'school_name',
                'edu_title',
                'experience',
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